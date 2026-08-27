# Settings: split into tabs + editable homepage quote

## 1. Tabs instead of one long page

Settings becomes three tabs, each with its own Save button so you only ever save what you are looking at:

- **Brand** — logo, dark-background logo, favicon (and the site name).
- **Homepage** — hero image, eyebrow, headline, subline, CTA label, plus the new quote block.
- **About page** — header photo, Our Story photo, portrait, all About copy, and the Trusted Collaborators partner editor.

Image uploads keep saving instantly the way they do today (upload = live); the text fields save with the tab's Save button.

## 2. Patrick's homepage quote becomes editable

The quote section on the homepage is currently hardcoded:

> "We don't just build houses; we craft coastal legacies through timeless design and uncompromising quality."
> Patrick Halliday

Two new fields in the Homepage tab — quote text and attribution — drive it. If either is cleared, the current wording is used as the fallback, so nothing changes visually until you edit it.

## Technical notes

- Additive migration on `site_settings`: nullable `home_quote` and `home_quote_attribution` text columns (existing grants/RLS already cover the table).
- `useSiteSettings.ts`: add the two columns to `COLUMNS`/`SiteSettingsRow`, extend `HERO_FALLBACKS` with the quote strings, and expose them through `resolveHero()` (or a small `home` resolver) so `Index.tsx` reads them.
- `Index.tsx`: replace the hardcoded quote paragraph and attribution with the resolved values; the crop-mark styling stays untouched.
- `AdminSettings.tsx`: wrap the existing sections in the shadcn `Tabs` component (`Brand` / `Homepage` / `About page`). Existing `AssetSlot`, partner editor, and save handlers are reused as-is — only the layout and the placement of each Save button change.
