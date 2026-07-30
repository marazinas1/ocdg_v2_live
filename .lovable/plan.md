## What I found

The Lovable dashboard card shows a broken-image icon, not a blank one — meaning an image URL is being requested and failing to load, rather than no screenshot existing.

Verified facts:
- The project is published and public; the live site returns 200.
- `robots.txt` allows all bots; the `noindex` script only fires on non-production hosts.
- `index.html` hardcodes `og:image` and `twitter:image` as `https://www.oceancitydevelopment.com/og-image.jpg`.
- That exact URL returns **302 → `https://oceancitydevelopment.com/og-image.jpg`** (the `www` host redirects to the apex). The apex URL returns a valid `image/jpeg`.

Lovable hosting normally injects the project's own screenshot as the social preview, but this project overrides it with a hardcoded URL that redirects across hosts. That redirected URL is the most likely reason the card image fails while every other project (which has no hardcoded override) shows fine. The same applies to `og:url`.

## Plan

1. In `index.html`, change the hardcoded social URLs from the redirecting `www` host to the canonical apex host that serves a direct 200:
   - `og:url` → `https://oceancitydevelopment.com`
   - `og:image` → `https://oceancitydevelopment.com/og-image.jpg`
   - `twitter:image` → `https://oceancitydevelopment.com/og-image.jpg`
2. Also update the `Sitemap:` line in `public/robots.txt` to the apex host so it matches the canonical domain and stops relying on a redirect.
3. Verify after publish: fetch the published HTML, confirm the meta tags carry the apex URLs, and confirm each image URL answers `200 image/jpeg` with no redirect hop.
4. You press Publish (I have no publish tool in this project). If the card is still broken afterwards, fallback: remove the hardcoded `og:image` / `twitter:image` tags entirely so Lovable hosting injects its own auto-generated screenshot, exactly like the other projects in your dashboard.

## Technical notes

- Frontend-only edit to `index.html` plus one line in `public/robots.txt`. No database, no component, no route changes.
- Removing the override (step 4 fallback) means social previews use Lovable's auto screenshot rather than your branded `og-image.jpg`; that is why it is a fallback, not the first move.
