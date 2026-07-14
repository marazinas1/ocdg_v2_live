
# Step 5A — Switch public site to the database (revised)

Route resolution moves off hardcoded property `<Route>` entries onto a single dynamic `/developments/:slug`. Category and index pages start querying the `properties` table. Old TSX files and lib data files stay in the repo (deleted in 5B) — only routing and data sources change.

## 1. Routing (src/App.tsx)

Rewrite the routes block in this exact order so `:slug` never eats a category segment:

```text
/, /about
/developments                                (Developments — kept)
/developments/active-listings                (ActiveListings — kept)
/developments/current-projects               (redirect → /developments/active-listings)
/developments/under-contract                 (UnderContract — kept)
/developments/coming-soon                    (ComingSoon — kept)
/developments/sold                           (SoldProjects — kept)

/developments/current-projects/:slug         (redirect → /developments/:slug)
/developments/sold/:slug                     (redirect → /developments/:slug)
/developments/past-projects                  (redirect → /developments/sold)
/developments/past-projects/:slug            (redirect → /developments/:slug)
/developments/property/:slug                 (redirect → /developments/:slug)

/developments/:slug                          (PropertyPage — canonical, LAST)
/gallery, /sold, /testimonials, /contact, /unsubscribe, /admin/*, *
```

Remove all 20+ individual hardcoded property `<Route>` entries and lazy imports (MorningsideRoad, TwentyEighthStreet, DundeePage, AsburyAve, SimpsonAve, Asbury4138, Central1100, BarkDrive209, Asbury5516, Walnut6, Asbury2700, Arkansas38, Waverly522, Brighton905907, Waterway13, Bay3112, Bayland3213, West1651, Glenwood1901, StCharles844, Rosemar1909, Bay5404, ArchiveDelancey918, ArchiveAnchor109/111/113). The `.tsx` files stay on disk. Redirects use small `useParams` wrappers around `<Navigate to={\`/developments/${slug}\`} replace />` (same pattern as existing `PastProjectsRedirect`).

## 2. Category pages → react-query against `properties`

New hook `src/hooks/usePublicProperties.ts`:

- `usePublicProperties(filter?: { status?: PropertyStatus | PropertyStatus[] })` — selects the fields cards need (id, slug, title, price, status, tagline, description, location_neighborhood, location_city, location_state, listed_date, published) from `properties` where `published = true`, ordered by `listed_date desc nulls last, created_at desc`.
- Second query fetches all `property_images` rows with `category = 'card'` for the returned ids in a single round-trip, joined client-side into `card_image_url` via `getPublicUrl`. Falls back to the first `hero` image when no `card` row exists (archives), else null.
- Returns typed `PublicPropertyCard[]` — everything the current card layout needs.

**Badge colors — mirror `src/lib/admin/status.ts` exactly.** Import `STATUS_BADGE_CLASSES` and `STATUS_LABELS` and use them directly on public cards so admin and public UI can never disagree:

- coming_soon → `bg-slate-200 text-slate-800`
- active → `bg-emerald-500 text-white`
- under_contract → `bg-amber-600 text-white`
- sold → `bg-slate-500 text-white`

This intentionally changes today's `bg-charcoal` sold badge to `bg-slate-500` on the public site to match the admin convention (user directive).

Rewrite these five pages to consume the hook. Card markup copies today's DOM verbatim (aspect ratio, hover scale, typography, dot-in-badge). All card links point to `/developments/${slug}`.

- **Index.tsx** — featured carousel: `status in ['active','under_contract']`, active first then under_contract, listed_date desc within each. Same `PropertyCarousel` props.
- **Developments.tsx** — all published, grouped by status in existing tab UI.
- **ActiveListings.tsx** — `status = 'active'`, 9-per-page paginator preserved.
- **UnderContract.tsx** — `status = 'under_contract'`, same paginator.
- **ComingSoon.tsx** — `status = 'coming_soon'`. Empty state ("No upcoming developments yet") when zero rows. Drop hardcoded placeholders.
- **SoldProjects.tsx** — `status = 'sold'`, paginator preserved. Keep `<PastDevelopmentsSection />` unchanged (still lib-backed; touched in 5B).

Loading = existing spinner. Empty categories = inline empty state.

## 3. GalleryPage.tsx → DB images

New hook `usePublicGalleryImages()`:

- Fetches all `property_images` where the parent property is published, sorted by property, then category (exterior, exterior_closeup, interior, floor_plan…), then sort_order.
- Groups by property. Uses collage layout when a property has ≥6 exterior + ≥6 interior images, else `PhotoGrid`. `link` → `/developments/${slug}`.

Lightbox, layout, load-more unchanged — only the data source swaps.

## 4. PropertyPage.tsx — add prev/next property nav (NEW in this revision)

The dynamic `PropertyPage` today has **no** prev/next nav; today's static TSX pages do (see `MorningsideRoad.tsx` bottom: `← <prev> | ← Back to Developments | <next> →`). When 5A routes everything through `PropertyPage`, this nav must be added there so nothing regresses.

Implementation, inserted between the inquiry section and `<GlobalFooter />`:

- New hook `usePropertyNeighbors(currentSlug, currentStatus)`:
  - Fetches all published properties (id, slug, title, status, listed_date) — cached by react-query.
  - Filters to the same status group, sorts by `listed_date desc nulls last, created_at desc`, loops (wraps at ends), returns `{ prev, next }`.
- Renders three-column bar identical to today's static markup: `← <prev.title>` | `← Back to Developments` | `<next.title> →`. Uses the same border/typography classes (`border-t border-border py-8`, `text-xs tracking-[0.15em] uppercase text-muted-slate hover:text-charcoal`).
- All three links use `/developments/${slug}` and `/developments` respectively.
- If the property has no siblings (only one in its status group), show just the "Back to Developments" link, centered.

`ArchivePropertyPage.tsx` and every static `<Property>.tsx` file are no longer routed — their hardcoded prev/next links become irrelevant (files stay for 5B cleanup).

## 5. Nav & other internal links

- `GlobalNav` and `GlobalFooter` — no changes; existing category URLs still valid.
- `Index.tsx` "View All Current Projects" → change from `/developments/current-projects` to `/developments/active-listings`.
- `getProjectLink` / `getPastProjectLink` helpers stay in the lib files (still referenced by unrouted TSX pages).

## 6. Verification

- `/developments/active-listings` renders 7 active cards; `/developments/under-contract` renders 6; `/developments/sold` renders 13 (plus PastDevelopmentsSection); `/developments/coming-soon` renders empty state; `/developments` shows all three groups with correct counts.
- `/developments/active-listings` NOT swallowed by `:slug`.
- `/developments/71-morningside-road` opens the DB-backed PropertyPage with prev/next nav wrapping within the active group.
- `/developments/current-projects/71-morningside-road`, `/developments/sold/209-bark-drive`, `/developments/past-projects/209-bark-drive`, `/developments/property/71-morningside-road` all `Navigate replace` to `/developments/<slug>`.
- Toggle a property status in admin → refresh category pages → card moves categories; the neighbor loop on PropertyPage also reshuffles.
- Public badge colors match admin (sold is slate-500, coming_soon is slate-200, etc.).
- Homepage carousel shows active + under_contract from DB.
- Build + typecheck clean.

## 7. Out of scope for 5A

- No deletion of any `src/pages/<Property>.tsx`, `src/components/ArchivePropertyPage.tsx`, or lib data files.
- No sitemap/robots changes.
- No admin changes.
- `PastDevelopmentsSection` and `src/lib/galleryProjects.ts`-only consumers remain lib-backed until 5B.
