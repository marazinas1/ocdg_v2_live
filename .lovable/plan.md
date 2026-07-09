## Update: 3112 Bay Ave & 905-907 Brighton Place → Under Contract

### Goal
Move two active listings into the **Under Contract** status across the site's data registry and their standalone property pages, while keeping prices visible and preserving the existing UI language.

### Scope
Only change the status fields and the hero badge indicator. No new pages, no content rewrites, no image or route changes.

### Changes
1. **Central project registry** (`src/lib/currentProjects.ts`)
   - Set `3112 Bay Ave` and `905-907 Brighton Place` to:
     - `status: "Under Contract"`
     - `statusColor: "bg-amber-600"`
   - Keep all other metadata (price, specs, images, dates, links) unchanged.

2. **3112 Bay Ave property page** (`src/pages/Bay3112.tsx`)
   - Update `propertyData.status` to `"Under Contract"`.
   - Change the hero status dot from `bg-emerald-400` to `bg-amber-400` to match the Under Contract taxonomy.

3. **905-907 Brighton Place property page** (`src/pages/Brighton905907.tsx`)
   - Update `propertyData.status` to `"Under Contract"`.
   - Change the hero status dot from `bg-emerald-400` to `bg-amber-400`.

### Expected site-wide effects
- Both properties disappear from the **Active Listings** filtered page (`/developments/active-listings`).
- Both properties appear in the **Under Contract** filtered page (`/developments/under-contract`) sorted by `listedDate`.
- The home page carousel, Developments page, and other consumers of `currentProjects` automatically reflect the new amber badge/status.
- Prices remain visible on both standalone pages and in any card/list view that shows price.

### Validation
- Read back the updated `currentProjects.ts` rows to confirm the exact status fields.
- Spot-check the hero badge in `Bay3112.tsx` and `Brighton905907.tsx`.
- Verify the site builds successfully.