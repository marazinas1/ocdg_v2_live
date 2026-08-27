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

## Technical details

1. **Database migration**
   - `page_views` table: `id`, `path`, `referrer_host`, `source` (derived), `device`, `visitor_hash`, `country` (from edge headers when available), `created_at`, `day` (date).
   - Indexes on `created_at`, `day`, `path`.
   - GRANTs: `service_role` full access; `authenticated` SELECT. RLS on — read policy `is_staff(auth.uid())`, no anon access at all (writes go through the edge function's service role).
   - `analytics_summary(_from date, _to date)` security-definer SQL function returning the aggregates in one round trip, with an internal `is_staff()` guard; EXECUTE revoked from `public`/`anon`.

2. **Edge function `track-view`** (public, no JWT) — validates the payload, drops bot user agents, derives device/source from headers, computes the daily visitor hash with a server-side salt secret, inserts one row. Fails silently (204) so the public site never breaks.

3. **Frontend tracking** — `src/hooks/usePageTracking.ts` mounted once in `App.tsx`, fires on route change via `useLocation`, skips `/admin` paths, uses `sendBeacon` with fetch fallback, never blocks rendering.

4. **Admin UI** — `src/hooks/admin/useAnalytics.ts` (react-query, calls the summary function) and `src/pages/admin/AdminAnalytics.tsx` using existing `recharts` + shadcn cards, styled like the current admin pages. Lazy route `/admin/analytics`, sidebar entry, and a summary card added to `AdminDashboard.tsx`.

5. **Retention** — rows are raw visits; a monthly cleanup can be added later if volume grows. At this site's scale storage is negligible.

No changes to public page design or existing behaviour. Nothing is published until you ask.
