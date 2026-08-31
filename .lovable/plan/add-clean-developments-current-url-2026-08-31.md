# Add clean /developments/current URL

## Goal

Add a shareable, clean URL for "Current Developments" (active + under_contract combined) that mirrors the existing `/developments/sold` pattern. Keep `/developments?filter=current` and `/developments?filter=sold` working as fallbacks.

## Current state

- `usePublicProperties.ts` already accepts `status?: PropertyStatus | PropertyStatus[]` and uses `.in("status", statusFilter)` when an array is passed.
- `CategoryPage.tsx` currently restricts its `status` prop to a single `PropertyStatus`, even though the underlying hook supports arrays.
- `GlobalNav.tsx`, `Index.tsx`, and `Developments.tsx` all point to the query-param versions (`/developments?filter=current` and `/developments?filter=sold`).
- `App.tsx` has category routes for `/developments/active-listings`, `/developments/under-contract`, and `/developments/sold`, but no `/developments/current`.

## Implementation

### 1. Extend `CategoryPage.tsx` to accept a status array

In `src/components/CategoryPage.tsx`:

- Change the `status` prop type from `PropertyStatus` to `PropertyStatus | PropertyStatus[]`.
- Keep the `usePublicProperties({ status })` call unchanged — the hook already normalizes arrays internally.
- No other visual, pagination, or behavioral changes.

This keeps existing single-status usages (`ActiveListings.tsx`, `UnderContract.tsx`, `SoldProjects.tsx`) working exactly as before.

### 2. Create `src/pages/CurrentDevelopments.tsx`

Match `SoldProjects.tsx` structure exactly:

```tsx
import CategoryPage from "@/components/CategoryPage";

const CurrentDevelopments = () => (
  <CategoryPage
    status={["active", "under_contract"]}
    eyebrow="Our Portfolio"
    heading="Current Developments"
    seoTitle="Current Developments — Ocean City Custom Homes"
    seoDescription="Active and under-contract luxury custom homes by Ocean City Development Group."
    path="/developments/current"
    emptyMessage="No current developments at this time."
  />
);

export default CurrentDevelopments;
```

### 3. Register the route in `src/App.tsx`

Add a lazy import:

```tsx
const CurrentDevelopments = lazy(() => import("./pages/CurrentDevelopments"));
```

Register the route among the other category routes, before the dynamic `/developments/:slug` catch-all:

```tsx
<Route path="/developments/current" element={<CurrentDevelopments />} />
```

### 4. Point internal links to the new clean URLs

Keep `/developments?filter=current` and `/developments?filter=sold` handling in `Developments.tsx` intact — they remain functional fallbacks.

Update these three places:

- `src/components/GlobalNav.tsx` (`developmentCategories`):
  - Current Developments → `/developments/current`
  - Sold → `/developments/sold`
- `src/pages/Index.tsx` homepage button:
  - "View All Current Projects" → `/developments/current`
- `src/pages/Developments.tsx` `seeAllLinks` (used only in the "All" overview tab):
  - current → `/developments/current`
  - sold → `/developments/sold`

## Verification

- `/developments/current` loads and displays active + under_contract properties in the same styled grid as `/developments/sold`.
- Existing single-status `CategoryPage` pages (`/developments/active-listings`, `/developments/under-contract`, `/developments/sold`) still render correctly.
- Top nav dropdown, homepage "View All Current Projects" button, and "All" overview links point to `/developments/current` and `/developments/sold`.
- `/developments?filter=current` and `/developments?filter=sold` still preselect the correct tab when visited directly.
- Typecheck passes.
- No publish.
