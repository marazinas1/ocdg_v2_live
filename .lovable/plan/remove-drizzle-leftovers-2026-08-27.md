# Remove Drizzle leftovers

No publish, no database changes, no functional changes.

## One correction to the request

The request assumes no `drizzle/` folder exists. It does — and it holds real migration history:

- `0000_create_testimonials.sql`
- `0001_create_site_settings.sql`
- `0002_site_settings_about_fields.sql`
- `0003_site_settings_home_quote.sql`
- `0004_create_page_views_analytics.sql`

Only `0004` has already been mirrored into `supabase/migrations/20260827133000_create_page_views_analytics.sql`. The other four exist nowhere else — no `supabase/migrations` file mentions `testimonials` or `site_settings`. Deleting the folder as-is would drop the recorded history for the testimonials and site-settings tables (which are live in the database).

So: mirror first, then delete.

## Steps

1. Copy the four unmirrored SQL files verbatim into `supabase/migrations/`, keeping the project's `YYYYMMDDHHMMSS_<name>.sql` convention and preserving their original order, with timestamps placed before the existing `20260827101500_leads_inbox_state.sql`:
   - `20260826130000_create_testimonials.sql`
   - `20260826130100_create_site_settings.sql`
   - `20260826130200_site_settings_about_fields.sql`
   - `20260826130300_site_settings_home_quote.sql`

   These are records only — nothing is re-applied; the database already has all of it.

2. Delete `drizzle/` entirely (`schema.ts`, `migrations/`, `meta/` journal and snapshots) and `drizzle.config.ts`.

3. Remove `drizzle-kit` and `drizzle-orm` from `package.json` dependencies and refresh the lockfile.

## Verification

- (a) `drizzle.config.ts` and `drizzle/` are gone; `rg drizzle` returns nothing outside archived plan notes
- (b) no `drizzle-*` entries in `package.json`
- (c) typecheck passes
- (d) production build succeeds and the preview still loads
- the four mirrored SQL files exist and are byte-identical to the originals
- no publish
