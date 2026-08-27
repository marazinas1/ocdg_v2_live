# Settings: favicon preview, menu order, dynamic About page

Three changes, all building on the Settings page that already controls the logo and homepage hero.

## 1. Show the favicon we already use

The Settings favicon slot says "Nothing uploaded" because no favicon has been uploaded to the database yet — but the site does ship one (`public/favicon.png`, plus the 16/32px versions referenced in `index.html`).

Fix: the favicon slot previews the current built-in favicon whenever nothing custom has been uploaded, exactly like the Logo and Hero slots already do with their bundled defaults. The caption under it reads "Currently using the built-in favicon" so it is obvious that this is the default, not an upload. Uploading replaces it site-wide; Remove returns to the built-in one.

## 2. Settings goes last in the admin menu

Sidebar order becomes: Dashboard, Properties, Inquiries, Testimonials, Users, Settings.

## 3. About page becomes editable from Settings

A new "About page" section in Settings, with the current page content pre-filled as the starting values. Everything falls back to today's wording and images if a field is cleared.

Editable images:
- Page header background photo
- "Our Story" side photo (the craftsmanship image)
- Patrick Halliday portrait

Editable text:
- Header eyebrow and title
- Our Story: label, heading, two paragraphs, the italic pull-quote and its attribution line
- Leadership: name and role under the portrait
- Our Promise: label, heading and paragraph

Editable partners ("Trusted Collaborators"):
- Section label, heading and intro
- A list of partners, each with logo image, name, website link and description
- Add, edit, reorder and remove partners; the public About page renders whatever list is saved

Everything saved here appears on the public About page immediately.

## Technical notes

- Extend the existing `site_settings` singleton with nullable `about_*` text columns and an `about_partners` JSONB array (`{ id, name, url, logo_path, description }`); partner logos and About images upload to the existing public `brand-assets` bucket through `uploadBrandAsset.ts` (new kinds: `about_hero`, `about_story`, `about_portrait`, `partner_logo`). Migration is additive with grants/RLS matching the current table (public read, `is_admin()` write).
- `useSiteSettings.ts` gains an `about` resolver mirroring `resolveHero()`, with the current hardcoded strings and bundled images as fallbacks, so nothing changes visually until an admin edits something.
- `AdminSettings.tsx` gets an "About page" section reusing the existing `AssetSlot` component, plus a small repeatable partner editor.
- `About.tsx` reads from `useSiteSettings()`; bundled images stay imported purely as fallbacks.
- Favicon slot: `AdminSettings` falls back to `/favicon.png` for its preview, and `useFaviconFromSettings()` leaves the static `index.html` icon untouched when no custom favicon is set.
