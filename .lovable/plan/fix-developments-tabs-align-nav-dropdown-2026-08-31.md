# Fix Developments tabs + align nav dropdown

## Part A — /developments tab rendering

In `src/pages/Developments.tsx`:

1. Filtered tabs ("Current Developments", "Sold") render a full grid instead of a carousel:
   - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` with `PublicPropertyCard`, same as `CategoryPage.tsx`.
   - Pagination: `PAGE_SIZE = 9`, "See More" button adds 9 more, shown only when more remain.
   - Reset `visibleCount` back to 9 whenever the active tab changes.
   - Loading state: same card skeletons used by `CategoryPage.tsx` (extracted/shared or mirrored locally).
   - Cards get raw property rows from `usePublicProperties()` filtered by status (`active` + `under_contract` for Current, `sold` for Sold), which is the exact shape `PublicPropertyCard` expects.
   - Empty state text stays as it is today.
2. `renderCategorySection()` (carousel + "See All …" link) stays untouched and is used only by the "All" overview tab.
3. In `seeAllLinks`, change the Sold href from `/developments/sold` to `/developments?filter=sold` so both overview links stay on the unified page.

## Part B — Top navigation dropdown

In `src/components/GlobalNav.tsx`, replace the three-item `developmentCategories` with two items:

```text
Current Developments -> /developments?filter=current
Sold                 -> /developments?filter=sold
```

Applies to both the desktop dropdown and the mobile submenu (they share the same array). Legacy routes `/developments/active-listings`, `/developments/under-contract`, `/developments/sold` stay registered in `App.tsx` and keep working for old links — they are only removed from the menu.

## Verification

- Current and Sold tabs render a grid with a working "See More".
- "All" overview unchanged (carousels + See All links).
- Homepage "View All Current Projects" lands on a working Current view.
- Nav dropdown shows two entries, each preselecting the right tab.
- Legacy standalone URLs still load directly.
- Typecheck passes. No publish.
