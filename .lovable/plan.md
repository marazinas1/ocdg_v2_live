## Step 1 — Foundation: schema, storage, admin auth

Foundation-only. No admin UI beyond a single login page. No changes to existing property pages, data files, or routes (except adding `/admin/login`).

---

### 1. Database migration

One migration creating everything below.

**`app_role` enum** — `'admin'` (leaves room for future roles).

**`user_roles` table**
- `id uuid pk`, `user_id uuid references auth.users on delete cascade`, `role app_role not null`, `created_at timestamptz`
- Unique `(user_id, role)`
- GRANT `SELECT` to `authenticated`; GRANT `ALL` to `service_role`. No `anon` grant.

**`is_admin(_user_id uuid default auth.uid())` — SECURITY DEFINER**
- `language sql stable`, `set search_path = public`
- Returns true iff a row exists in `user_roles` with `role = 'admin'`
- Prevents RLS recursion when policies reference it

**`properties` table** — exactly the columns specified:
- `id`, `slug` (unique), `title`, `unit`, `headline`, `tagline`, `description`, `price`
- `status text not null default 'coming_soon'` with CHECK in `('coming_soon','active','under_contract','sold')`
- `bedrooms`, `full_baths`, `half_baths`, `total_rooms`, `sqft` (all nullable int)
- `location_neighborhood`, `location_city` default `'Ocean City'`, `location_state` default `'NJ'`, `location_highlight`
- `specs jsonb default '[]'`, `floor_plans jsonb default '[]'`, `luxury_features jsonb default '[]'`, `location_features jsonb default '[]'`
- `listed_date date`, `sort_order int default 0`, `published boolean default false`
- `created_at`, `updated_at timestamptz`
- Indexes: `slug`, `status`, `published`, `(published, sort_order)`

**`property_images` table**
- `id`, `property_id uuid references properties on delete cascade`
- `category text not null` with CHECK in `('hero','card','exterior','exterior_closeup','interior','floor_plan')`
- `floor_plan_id text` (links to an entry in `properties.floor_plans` jsonb)
- `storage_path text not null`, `alt_text text`, `sort_order int default 0`, `created_at`
- Indexes: `property_id`, `(property_id, category)`

**Trigger** — `update_updated_at_column()` (reused if already present) → `BEFORE UPDATE ON properties`.

**GRANTs** (in the migration, before RLS):
- `properties`: `SELECT` to `anon, authenticated`; `ALL` to `service_role`. No insert/update/delete to `anon`/`authenticated` — admin writes go through `authenticated` role and are gated by RLS, so also grant `INSERT, UPDATE, DELETE` to `authenticated`.
- `property_images`: same pattern as `properties`.
- `user_roles`: `SELECT` to `authenticated` only, `ALL` to `service_role`.

### 2. RLS policies (per-operation, defensive)

**`properties`** — RLS enabled:
- `SELECT` for `anon, authenticated` — `USING (published = true)`
- `SELECT` for `authenticated` (admin bypass) — `USING (public.is_admin())`
- `INSERT` for `authenticated` — `WITH CHECK (public.is_admin())`
- `UPDATE` for `authenticated` — `USING (public.is_admin()) WITH CHECK (public.is_admin())`
- `DELETE` for `authenticated` — `USING (public.is_admin())`

**`property_images`** — RLS enabled:
- `SELECT` for `anon, authenticated` — `USING (EXISTS (SELECT 1 FROM properties p WHERE p.id = property_id AND p.published = true))`
- `SELECT` / `INSERT` / `UPDATE` / `DELETE` for `authenticated` gated by `public.is_admin()` (mirrors the `properties` pattern; INSERT/UPDATE also validate that `property_id` exists in WITH CHECK)

**`user_roles`** — RLS enabled:
- `SELECT` for `authenticated` — `USING (public.is_admin())`
- No INSERT/UPDATE/DELETE policies → writes are impossible from any client. Admin provisioning happens via SQL (service role) only.

### 3. Storage bucket

Create `property-images` — **public read** (marketing images on the public site).

RLS policies on `storage.objects` scoped to `bucket_id = 'property-images'`:
- Public `SELECT` — handled by bucket being public
- `INSERT` / `UPDATE` / `DELETE` for `authenticated` — `USING/WITH CHECK (public.is_admin())`

### 4. Supabase auth configuration

Call `configure_auth`:
- `disable_signup: true` (public signup off — admins created manually)
- `auto_confirm_email: true` (so manually-created admins can log in without an email flow)
- `external_anonymous_users_enabled: false`
- `password_hibp_enabled: true`

### 5. Admin login page

New files, no edits to existing components:

- `src/pages/admin/AdminLogin.tsx` — email + password + submit. Styled with the site's design tokens from `src/index.css` (serif headings, charcoal text, subtle borders, cream/ivory background). No signup link, no "create account" link, no password reset link. On success → `navigate('/admin')`. On failure → inline error message.
- `src/App.tsx` — add exactly one line inside `<Routes>` (above the catch-all): `<Route path="/admin/login" element={<AdminLogin />} />` with a `lazy(...)` import at the top. Nothing else changes.

Sign-in flow uses the existing `@/integrations/supabase/client`. After `signInWithPassword` succeeds, we verify the account is actually an admin by selecting from `user_roles` (blocked for non-admins by RLS → treated as "not authorized" and we sign them back out). `/admin` itself is not built in this step; visiting it will 404 until Step 2.

### 6. Creating the first admin

Since public signup is disabled, the user creates the first admin via **Cloud → Users → Add user** (email + password, mark email confirmed). Then, in the SQL editor on Cloud, run:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<paste the new user id>', 'admin');
```

I'll include this exact snippet in the completion message along with a link to open the backend.

---

### Technical notes

- `is_admin()` is `SECURITY DEFINER` with `SET search_path = public` — required to prevent RLS recursion when `user_roles` policies also call it, and to avoid search-path hijacking.
- Storage policies go on `storage.objects`, not `storage.buckets` (per platform rules).
- The `authenticated` role gets broad table grants; RLS + `is_admin()` is what actually restricts writes. This is the standard Supabase pattern.
- Nothing in `src/lib/propertyData.ts`, `src/lib/currentProjects.ts`, or any existing page is touched.

### Deliverable after apply

I will confirm:
1. Tables created: `properties`, `property_images`, `user_roles` (+ `app_role` enum, `is_admin()` function, `update_updated_at_column` trigger)
2. RLS policies on each table (listed per-operation)
3. Storage bucket `property-images` + its object policies
4. Auth settings applied
5. The exact two-step snippet for creating the first admin