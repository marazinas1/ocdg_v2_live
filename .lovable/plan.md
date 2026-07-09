
# Step 2 — Admin Panel (CRUD)

Everything below is added under `src/pages/admin/` and `src/components/admin/`. No public page, no `src/lib/*` data file, and no existing property page is touched. `src/App.tsx` gets only new `/admin/*` routes.

## 1. Route additions in `src/App.tsx`

Four new lazy routes, all above the catch-all, all wrapped in `<AdminProtected>`:

- `/admin` → `AdminProperties` (list)
- `/admin/properties/new` → `AdminPropertyForm`
- `/admin/properties/:id/edit` → `AdminPropertyForm`
- `/admin` catches unknown `/admin/*` and redirects to `/admin`

`/admin/login` stays as-is (public).

## 2. Protected shell — `src/components/admin/AdminProtected.tsx` + `AdminShell.tsx`

`AdminProtected` runs an auth+role check before rendering children:

1. Subscribe to `supabase.auth.onAuthStateChange` first (per platform rules), then call `getSession()`.
2. If no session → redirect to `/admin/login`.
3. Call `getUser()` to re-validate against the auth server, then query `user_roles` for `role='admin'` (blocked by RLS for non-admins → treated as unauthorized, sign out, redirect).
4. While either check is in-flight: render the same full-screen spinner used elsewhere. Never flash protected content, never redirect prematurely.

`AdminShell` renders a top bar: "OCDG Admin" wordmark, current user email, "Sign out" button (`supabase.auth.signOut()` → `/admin/login`). Children render inside a max-width container.

## 3. Data hooks — `src/hooks/admin/`

React Query is already installed but unused; wire it up here only.

- `useProperties()` — list of all rows (published + drafts), joined with `card` image URL via `getPublicUrl`.
- `useProperty(id)` — full row + all `property_images` for the form.
- `useUpdatePropertyStatus()` — optimistic mutation, rolls back and toasts on error.
- `useUpsertProperty()` — insert/update wrapper.
- `useDeleteProperty()` — deletes storage objects first, then DB rows (see §7).
- `useSlugAvailability(slug, excludeId?)` — debounced uniqueness check that pings `properties` before save; never relies on catching the DB unique-constraint error.

All mutations invalidate `["admin-properties"]` and, where relevant, `["admin-property", id]`.

## 4. Property list — `src/pages/admin/AdminProperties.tsx`

Layout:

```text
┌ AdminShell ────────────────────────────────────┐
│  Properties           [+ Add New Property]     │
│  Search…       [ All | Coming | Active | UC | Sold ]
│  ┌────────────────────────────────────────────┐│
│  │ img | Title | Price | Status▼ | Pub | Date | Edit ││
│  └────────────────────────────────────────────┘│
└────────────────────────────────────────────────┘
```

- Card thumbnail from `property_images` where `category = 'card'` (fallback: skeleton placeholder).
- Status column is a shadcn `Select` bound to `useUpdatePropertyStatus` — one click, optimistic, toast on success, rollback + toast.error on failure. Values: `coming_soon | active | under_contract | sold`.
- Status badge palette (labels + Tailwind classes, mirrors the visual convention in `src/lib/currentProjects.ts`):
  - `coming_soon` → "Coming Soon" · `bg-slate-200 text-slate-800`
  - `active` → "Active Listing" · `bg-emerald-500 text-white`
  - `under_contract` → "Under Contract" · `bg-amber-600 text-white`
  - `sold` → "Sold" · `bg-slate-500 text-white`
- Published column: shadcn `Switch` (also optimistic).
- Filter tabs + title search filter client-side over the already-fetched list.
- Empty state (`properties.length === 0` after fetch): centered message + primary "Add New Property" button.

## 5. Property form — `src/pages/admin/AdminPropertyForm.tsx`

Single component for both `new` and `edit`. `react-hook-form` (already in deps) + `zod` for validation. Sections rendered as shadcn `Card`s with clear headers.

### Basics
- `title`, `unit` (optional), `slug` (auto-generated from title on change while user hasn't manually edited it; slugify → lowercase, hyphens, url-safe; live uniqueness check + inline error), `status` (Select), `price` (free text), `listed_date` (date input), `published` (Switch).

### Copy
- `headline`, `tagline`, `description` (Textarea), `location_highlight`.

### Details
- `bedrooms`, `full_baths`, `half_baths`, `total_rooms`, `sqft` (all optional integers), `location_neighborhood`, `location_city` (default `Ocean City`), `location_state` (default `NJ`).

### Images (fixed-slot uploader, §6)
Slot groups with the exact counts from the standard package:

- Hero — 1
- Card thumbnail — 1
- Exterior renderings — 3 required + "Add more" button
- Close-up exterior — 3 required + "Add more"
- Interior renderings — 6 required + "Add more"

Each slot: click or drag-drop, upload progress bar, preview, alt text input (auto-prefilled `"{title} - {category label}"`), Replace, Remove. Reorder within a category via up/down buttons (updates `sort_order`).

### Floor Plans (repeatable, `properties.floor_plans` jsonb + `property_images` with `category='floor_plan'`)
Each row:
- `id` (uuid generated client-side, stored in the jsonb entry AND on the linked image row as `floor_plan_id`)
- `name` (e.g. "Ground Level")
- Image upload → `category='floor_plan'`, `floor_plan_id = row.id`
- `description`
- `highlights` — add/remove short strings
- Drag-to-reorder rows

### Specs (`properties.specs` jsonb)
Repeatable rows: `icon` (Select of `elevator | appliances | floors | resilience | pool | fireplace | kitchen | deck`), `title`, `description`.

### Features
- `luxury_features` and `location_features` — two independent string lists with add / remove / reorder.

### Behavior
- `beforeunload` guard + in-app `<Prompt>` equivalent (`useBlocker`) when `formState.isDirty`.
- Save flow: validate → uniqueness check → upsert `properties` row → diff `property_images` rows (insert new, update changed alt/sort/floor_plan_id, delete removed) → success toast → invalidate queries → stay on page (edit) or navigate to `/admin/properties/:id/edit` (new).
- Delete button (edit mode only): shadcn `AlertDialog` confirmation → `useDeleteProperty` (§7).

## 6. Image processing & upload — `src/lib/admin/imageUpload.ts`

Pure browser pipeline, no server function:

1. Read file → decode via `createImageBitmap`.
2. Compute target long-edge: 800px for `card`, 2400px for everything else. Skip resize if already smaller.
3. Draw to `OffscreenCanvas` (fallback: hidden `<canvas>`) → `canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 })`.
4. Upload to `property-images` at `${slug}/${category}/${crypto.randomUUID()}.jpg` via `supabase.storage.from('property-images').upload(...)` with `cacheControl: '31536000', contentType: 'image/jpeg', upsert: false`.
5. Progress reported via `onUploadProgress` (v2 API) → per-slot progress bar.
6. On success: insert/update `property_images` row with `storage_path`, `category`, `alt_text`, `sort_order`, `floor_plan_id?`.
7. On failure: keep slot in error state with a Retry button; nothing is written to the DB and no orphan is created.
8. Public URL for previews: `supabase.storage.from('property-images').getPublicUrl(storage_path).data.publicUrl`. `storage.list()` is never called anywhere.

## 7. Deletion — zero orphans

For every path that removes an image, the storage object is deleted before (or immediately after) the DB row:

- Removing / replacing a single slot in the form: `storage.remove([old_path])` → then delete/update the `property_images` row.
- Deleting an entire property (`useDeleteProperty`):
  1. Fetch all `storage_path`s for the property from `property_images`.
  2. `storage.from('property-images').remove(paths)` in one call (chunked to 100 if needed).
  3. `DELETE FROM properties WHERE id = ?` — `property_images` rows disappear via `ON DELETE CASCADE`.
  4. Toast success. On storage-delete failure: abort DB delete and toast error, so the row is never orphaned in reverse either.

Removing a floor-plan row also deletes its linked `property_images` object.

## 8. Files created

```text
src/App.tsx                                     (edit: add 3 admin routes)
src/components/admin/AdminProtected.tsx
src/components/admin/AdminShell.tsx
src/components/admin/StatusBadge.tsx
src/components/admin/StatusSelect.tsx
src/components/admin/ImageSlot.tsx
src/components/admin/ImageSlotGroup.tsx
src/components/admin/FloorPlanEditor.tsx
src/components/admin/SpecsEditor.tsx
src/components/admin/StringListEditor.tsx
src/hooks/admin/useAdminAuth.ts
src/hooks/admin/useProperties.ts
src/hooks/admin/useProperty.ts
src/hooks/admin/useUpsertProperty.ts
src/hooks/admin/useDeleteProperty.ts
src/hooks/admin/useSlugAvailability.ts
src/hooks/admin/useUnsavedChangesGuard.ts
src/lib/admin/status.ts             (status labels + badge classes)
src/lib/admin/slug.ts               (slugify helper)
src/lib/admin/imageUpload.ts        (resize + upload pipeline)
src/lib/admin/schema.ts             (zod schemas for the form)
src/pages/admin/AdminProperties.tsx
src/pages/admin/AdminPropertyForm.tsx
```

## 9. Explicitly out of scope for this step

- No dynamic public property page (Step 3).
- No changes to `src/App.tsx` beyond the three added routes.
- No changes to any `src/lib/currentProjects.ts`, `src/lib/pastProjects.ts`, or any existing page/component.
- No new DB migrations — Step 1's schema is used as-is.
- No leads view (deferred until we intentionally add its RLS policy).

## 10. Technical notes

- React Query client is already provided at the app root; no changes needed there.
- Auth check pattern: `onAuthStateChange` first, then `getSession`; `getUser` re-validates before trusting the id in the `user_roles` lookup.
- All admin data mutations go through the `authenticated` role and are gated by RLS + `is_admin()` — no service key is ever used from the browser.
- Storage uploads rely on the admin-only INSERT/UPDATE/DELETE policies on `storage.objects` established in Step 1; public reads work via the CDN path.
- Client-side image pipeline uses `createImageBitmap` + `OffscreenCanvas` (widely supported in evergreen browsers) with a `<canvas>` fallback — this is where 1.5MB originals become ~150–400KB JPEGs before they ever hit the network.
