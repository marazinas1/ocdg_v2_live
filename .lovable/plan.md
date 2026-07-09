## Goal

Introduce ONE dynamic public property page driven by the `properties` + `property_images` tables, without touching any of the ~20 hardcoded property TSX files. Old and new coexist for side-by-side comparison.

## 1. New route

`src/App.tsx` — add a single lazy route (nothing else touched):

```
/developments/property/:slug  →  <PropertyPage />
```

Placed above the `*` catch-all.

## 2. Shared spec-icon registry (single source of truth)

New file: `src/lib/specIcons.ts`

- Exports `SPEC_ICON_KEYS` — the canonical list of admin-selectable keys:
  `elevator, appliances, floors, resilience, pool, fireplace, kitchen, deck`.
- Exports `SPEC_ICON_MAP: Record<string, LucideIcon>` covering:
  - All 8 admin keys: `elevator→ArrowUpFromLine`, `appliances→ChefHat`, `floors→Sparkles` (existing usage), `resilience→ShieldCheck`, `pool→Waves`, `fireplace→Flame`, `kitchen→UtensilsCrossed`, `deck→Sun`.
  - Legacy keys still present in hardcoded pages so a Step-4 migration renders correctly: `hardwood→TreePine`, `hvac→Thermometer`, `rooftop→Sparkles`, `flooring→Sparkles`.
- Exports `getSpecIcon(key: string): LucideIcon` returning `SPEC_ICON_MAP[key] ?? Sparkles`. Sparkles remains the fallback for genuinely unknown keys only.
- `src/components/admin/SpecsEditor.tsx` is updated to import `SPEC_ICON_KEYS` instead of its local `SPEC_ICONS` const so the dropdown and the public renderer cannot drift apart. This is the only pre-existing file modified beyond `App.tsx`, and it's a pure refactor — same 8 values in the same order.
- `PropertyPage.tsx` imports `getSpecIcon` for its spec grid.

## 3. New file: `src/pages/PropertyPage.tsx`

Fetching (react-query, already wired in `App.tsx`):

- `useQuery(['property', slug])` → `supabase.from('properties').select('*').eq('slug', slug).maybeSingle()`
- `useQuery(['property-images', property.id], enabled: !!property)` → `supabase.from('property_images').select('*').eq('property_id', property.id).order('sort_order')`
- Admin check: `useAdminAuth()` (existing hook). If `!property` or (`property.published === false` and not admin) → `<Navigate to="/404" replace />`.
- Loading: full-screen skeleton matching existing `PageFallback` styling.

Image URL resolution:

- Never call `storage.list()`.
- Per row: `supabase.storage.from('property-images').getPublicUrl(row.storage_path).data.publicUrl`.
- Group by `category`: `hero`, `card`, `exterior`, `exterior_closeup`, `interior`, `floor_plan`. Floor-plan rows carry `floor_plan_id` matching entries in `properties.floor_plans` jsonb.

Rendering — 1:1 with `Bayland3213.tsx` visual structure:

1. **Hero** — parallax + Ken Burns using the `hero` category image. Status pill, title, unit, headline, price, bed/bath/location line, tagline, "View the Opportunity" CTA. Hero `<img>` uses `loading="eager"` + `fetchpriority="high"` for LCP; gallery stays lazy.
2. **Highlights bar** — derived from `bedrooms`, `full_baths`+`half_baths`, `total_rooms`, `sqft`. Missing values are omitted.
3. **Vision** — headline, tagline, description; bed/bath/room mini-grid; secondary image = `exterior[0]` or first non-hero image.
4. **Exterior gallery** — grid of `exterior` (falling back to `exterior_closeup`). Lightbox with ←/→/Esc keyboard nav, factored as a small inline `Lightbox` helper in the same file.
5. **Floor plans** — tabs from `properties.floor_plans` jsonb (`{id, name, description, highlights}`). Image = `property_images` row where `category='floor_plan'` and `floor_plan_id` matches. Hidden if array empty/null.
6. **Interior gallery** — `interior` category, shared lightbox with exterior.
7. **Specs grid** — `properties.specs` jsonb (`{icon, title, description}`). Icon resolved via `getSpecIcon(spec.icon)` from §2. Section hidden if empty.
8. **Luxury + Location features** — two `<ul>`s from the jsonb arrays. Each hidden individually if empty.
9. **Inquiry section** — inline `<PropertyInquiryForm property={property} />` (see §4).
10. **SEO** — `<SEO title={title} description={tagline||headline} path={location.pathname} />`, using card image publicUrl if present.

`GlobalNav` + `GlobalFooter` wrap the page.

Missing-data behavior: every section renders behind a truthy guard so partial properties look clean.

## 4. Inquiry form (correct implementation)

Modeled on `Contact.tsx` + `Register.tsx`, NOT on the fake `setTimeout` handler in the hardcoded property pages.

- Fields: name, email, phone, interest (select seeded from `propertyConfig.interestLevels`), message. Honeypot `<input name="company">` hidden off-screen, identical to Contact.
- `formatPhone` helper reused (inline copy, keeps the page standalone).
- Validation: 10-digit US phone; toast error otherwise. Honeypot filled → silent return.
- Submit:
  1. `crypto.randomUUID()` → insert into `leads` with `{name, email, phone, interest, message, source: property.title, user_agent: navigator.userAgent}`.
  2. `supabase.functions.invoke('send-transactional-email', { body: { templateName: 'inquiry-notification', idempotencyKey: `property-${property.slug}-${id}`, templateData: { name, email, phone, interest, message, source: property.title } } })`.
  3. Success toast referencing the property title; reset form.
- Error path: same fallback toast as Contact/Register with phone + email.

## 5. Backend fix

Migration: extend the `email_send_log.status` CHECK to include `'rate_limited'`.

```sql
ALTER TABLE public.email_send_log DROP CONSTRAINT email_send_log_status_check;
ALTER TABLE public.email_send_log ADD CONSTRAINT email_send_log_status_check
  CHECK (status IN ('pending','sent','suppressed','failed','bounced','complained','dlq','rate_limited'));
```

No other schema, RLS, edge function, or config change.

## 6. Explicit non-goals

- No edits to any existing `src/pages/*` property file, category page, `src/lib/*` data file, `Hero.tsx`, `Register.tsx`, `Contact.tsx`, `SEO.tsx`, or admin pages beyond the `SpecsEditor` icon-list refactor in §2.
- No `src/App.tsx` changes beyond adding one lazy import and one `<Route>`.
- No deletions.
- Sending domain not configured (out of scope until go-live).

## Files touched

- `src/App.tsx` (add route)
- `src/pages/PropertyPage.tsx` (new)
- `src/lib/specIcons.ts` (new, shared)
- `src/components/admin/SpecsEditor.tsx` (import shared key list)
- one migration for the `email_send_log` CHECK

## Verification after build

1. `/developments/property/<slug>` for a fully-populated DB property → visual parity with `Bayland3213.tsx` section-by-section.
2. Sparsely-populated property → sections without data are absent, not empty.
3. Inquiry form submit → new row in `leads`; `email_send_log` entry created (delivery will fail without a verified domain but must not throw a client error toast).
4. Unpublished property while signed out → redirects to NotFound; signed in as admin → renders.
5. Every admin-selectable spec icon renders a distinct icon (no unintended Sparkles fallback).
6. Old hardcoded pages still work unchanged.
