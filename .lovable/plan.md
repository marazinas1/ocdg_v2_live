# Built-in site analytics in the admin panel

Add a privacy-friendly, self-hosted visit tracker to the site and a new **Analytics** page in the admin panel. No Google account, no cookie banner, no third-party scripts — all data stays in your own backend.

## What you will see

New sidebar item **Analytics** (placed above Settings), with a date-range switch: last 7 / 30 / 90 days.

- **Summary cards** — page views, unique visitors, inquiries in the period, and conversion rate (inquiries ÷ unique visitors), each with a percentage change vs the previous period.
- **Traffic chart** — daily line/area chart of views and unique visitors.
- **Top pages** — most visited pages with view counts, property pages shown by their title.
- **Traffic sources** — grouped referrers (Google, Facebook, Instagram, Zillow/MLS, direct, other).
- **Devices** — mobile vs desktop vs tablet split.
- **Recent activity** — last visits with page, source and time.

A compact **Views this week** card also appears on the existing Dashboard, linking through to Analytics.

## How tracking works

Every public page load sends one lightweight ping to a backend function. Nothing is stored in the browser, no cookies, no personal data:

- Stored per visit: path, referrer host, device type, day, and a daily rotating anonymous visitor hash (salt + IP + user agent, one-way). The raw IP is never stored.
- Unique visitors = distinct daily hashes, so the same person visiting twice in a day counts once.
- Obvious bots and crawlers are filtered out by user agent.
- Admin routes (`/admin/*`) and preview routes are never tracked.

## SEO note

This gives you traffic and behaviour data. It does not show Google search rankings, keywords or impressions — that data only exists in Google Search Console. If you later want clicks/impressions/queries/average position in the same Analytics page, that can be added as a second tab once a Google account is connected. Say the word and I will plan that separately.

## Corrections confirmed

1. Access is `is_admin()` (developer + owner only) — both for the `page_views` SELECT policy and the `analytics_summary()` internal guard. Editors do not see analytics, and the Analytics sidebar item is hidden for them.
2. The migration is recorded as a plain timestamped file in `supabase/migrations/`, matching the existing history. No Drizzle or other tooling; the identical SQL is applied to the database.
3. The visitor-hash salt lives in a backend secret (`ANALYTICS_SALT`), read with `Deno.env.get`. Never hardcoded, never in the repo. It is combined with the current date so hashes rotate daily and cannot be linked across days.
4. Added: `track-view` accepts requests only when `Origin`/`Referer` is `oceancitydevelopment.com`, `www.oceancitydevelopment.com`, the Lovable preview host, or localhost. Anything else gets a silent 204 with nothing recorded.

## Step 1 — exact migration SQL

File: `supabase/migrations/<timestamp>_create_page_views_analytics.sql`

```sql
-- Privacy-friendly first-party page view tracking
CREATE TABLE public.page_views (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path          text NOT NULL,
  referrer_host text,
  source        text NOT NULL DEFAULT 'direct',
  device        text NOT NULL DEFAULT 'unknown',
  country       text,
  visitor_hash  text NOT NULL,
  day           date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX page_views_day_idx        ON public.page_views (day);
CREATE INDEX page_views_created_at_idx ON public.page_views (created_at DESC);
CREATE INDEX page_views_path_idx       ON public.page_views (path);
CREATE INDEX page_views_visitor_idx    ON public.page_views (day, visitor_hash);

GRANT SELECT ON public.page_views TO authenticated;
GRANT ALL    ON public.page_views TO service_role;

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read page views"
  ON public.page_views FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Service role can manage page views"
  ON public.page_views FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Aggregated analytics for the admin panel. Admin-only (developer/owner).
CREATE OR REPLACE FUNCTION public.analytics_summary(_from date, _to date)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
BEGIN
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'not authorised';
  END IF;

  IF _from IS NULL OR _to IS NULL OR _to < _from OR (_to - _from) > 400 THEN
    RAISE EXCEPTION 'invalid date range';
  END IF;

  SELECT jsonb_build_object(
    'totals', (
      SELECT jsonb_build_object(
        'views', count(*),
        'visitors', count(DISTINCT visitor_hash)
      )
      FROM public.page_views
      WHERE day BETWEEN _from AND _to
    ),
    'previous', (
      SELECT jsonb_build_object(
        'views', count(*),
        'visitors', count(DISTINCT visitor_hash)
      )
      FROM public.page_views
      WHERE day BETWEEN (_from - (_to - _from) - 1) AND (_from - 1)
    ),
    'daily', COALESCE((
      SELECT jsonb_agg(row_to_json(d) ORDER BY d.day)
      FROM (
        SELECT day,
               count(*)                     AS views,
               count(DISTINCT visitor_hash) AS visitors
        FROM public.page_views
        WHERE day BETWEEN _from AND _to
        GROUP BY day
      ) d
    ), '[]'::jsonb),
    'top_pages', COALESCE((
      SELECT jsonb_agg(row_to_json(p))
      FROM (
        SELECT path, count(*) AS views
        FROM public.page_views
        WHERE day BETWEEN _from AND _to
        GROUP BY path
        ORDER BY count(*) DESC
        LIMIT 15
      ) p
    ), '[]'::jsonb),
    'sources', COALESCE((
      SELECT jsonb_agg(row_to_json(s))
      FROM (
        SELECT source, count(*) AS views
        FROM public.page_views
        WHERE day BETWEEN _from AND _to
        GROUP BY source
        ORDER BY count(*) DESC
      ) s
    ), '[]'::jsonb),
    'devices', COALESCE((
      SELECT jsonb_agg(row_to_json(v))
      FROM (
        SELECT device, count(*) AS views
        FROM public.page_views
        WHERE day BETWEEN _from AND _to
        GROUP BY device
      ) v
    ), '[]'::jsonb),
    'leads', (
      SELECT count(*) FROM public.leads
      WHERE created_at::date BETWEEN _from AND _to
    )
  ) INTO result;

  RETURN result;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.analytics_summary(date, date) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.analytics_summary(date, date) TO authenticated;
```

## Step 2 — edge function `track-view`

Public (no JWT), and in this order: Origin/Referer allowlist check → bot user-agent filter → payload validation (path max 300 chars, must start with `/`, never `/admin`) → device and source derived from headers → `visitor_hash = sha256(ANALYTICS_SALT + utc_date + ip + user_agent)` → single service-role insert. Every path returns 204; the public site is never affected by a tracking failure. Raw IP and full user agent are used only in memory for the hash and are never stored.

## Step 3 — frontend tracking

`src/hooks/usePageTracking.ts`, mounted once in `App.tsx`. Fires on route change (`useLocation`), skips `/admin/*` and `/admin/preview`, uses `navigator.sendBeacon` with a `fetch(..., { keepalive: true })` fallback, and swallows all errors.

## Step 4 — admin UI

`src/hooks/admin/useAnalytics.ts` (react-query calling `analytics_summary`) and `src/pages/admin/AdminAnalytics.tsx` built with the existing `recharts` and shadcn cards in the current admin style. Lazy route `/admin/analytics`, sidebar entry visible to developer/owner only, and a compact "Views this week" card on `AdminDashboard.tsx`.

## Step 5 — retention

Rows are kept as raw visits. A cleanup job can be added later if volume grows; at this site's scale storage is negligible.


No changes to public page design or existing behaviour. Nothing is published until you ask.
