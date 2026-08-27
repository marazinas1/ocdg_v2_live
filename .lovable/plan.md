# Site Settings in the Admin Panel

Add a Settings section to the admin panel — same idea as in Halliday-Architects — so the logo, favicon and homepage hero content can be changed without touching code. Only Developer and Owner accounts can open and edit it.

## What becomes editable

**Brand**
- Site name
- Logo (light backgrounds)
- Dark-background logo (optional; without it the main logo is knocked out to white)
- Favicon

**Homepage hero**
- Hero background image
- Eyebrow line (currently "Ocean City Development Group")
- Headline (currently "Building the Future of Ocean City")
- Subline (currently "Premier Residential Developments & Custom Homes")
- Button label (currently "View Developments")

Every field falls back to today's hardcoded value, so nothing can ever render blank or logo-less if a field is cleared or the record has not been saved yet.

## Where the logo appears after a change

Uploading a new logo updates it everywhere in one go:
- Public site header (GlobalNav)
- Footer (GlobalFooter)
- Admin login screen (both the mobile mark and the dark split panel)
- Admin sidebar

The favicon is swapped in the browser tab at runtime. Note: link-preview thumbnails on social networks are a separate static image and are not part of this change.

## Permissions

Everyone can read the settings (the public site needs them). Only Developer and Owner can save changes or upload brand assets — enforced in the database, in storage rules, and by hiding the Settings menu item from Editors.

## Technical notes

1. **Database** — new `public.site_settings` singleton table: `site_name`, `logo_path`, `logo_dark_path`, `favicon_path`, `hero_image_path`, `hero_eyebrow`, `hero_headline`, `hero_subline`, `hero_cta_label`, timestamps. Grants: `SELECT` to `anon` + `authenticated`; insert/update/delete to `authenticated` gated by `is_admin()` (which already resolves to developer/owner); `ALL` to `service_role`. RLS: public read, `is_admin()` write. Reuse the `update_updated_at_column` trigger. Seed one row with the current homepage copy. Regenerate Supabase types.
2. **Storage** — new public `brand-assets` bucket with public read and `is_admin()`-gated insert/update/delete storage policies.
3. **Upload helper** — `src/lib/admin/uploadBrandAsset.ts`: canvas-resize + encode (PNG for logo/favicon to keep transparency, JPG for the hero at 2400px), upload to `brand-assets`, return the path; helpers for public URL and delete-on-replace.
4. **Hooks** — `src/hooks/useSiteSettings.ts` (public react-query read, 60s stale time, resolved URLs + fallbacks, `useFaviconFromSettings`) and `src/hooks/admin/useSiteSettingsAdmin.ts` (save mutation invalidating the public key).
5. **Component** — `src/components/BrandLogo.tsx` with `variant="light" | "dark"`, used to replace the four `ocdg-logo.png` imports in GlobalNav, GlobalFooter, AdminLogin and AdminSidebar. The About page partner logos stay as-is.
6. **Admin page** — `src/pages/admin/AdminSettings.tsx` wrapped in `AdminProtected`, with brand asset slots (upload/replace/remove + preview on light and dark surfaces) and a hero form with per-field placeholders showing the fallback text. Route `/admin/settings` registered before the admin catch-all; sidebar item added with a Settings icon, rendered only for developer/owner.
7. **Homepage** — `src/pages/Index.tsx` hero reads image and copy from settings, keeping the parallax, `fetchPriority="high"` preload and current styling; the bundled image remains the fallback.
8. Verify with a typecheck plus an authenticated browser pass over `/admin/settings` and the public homepage.
