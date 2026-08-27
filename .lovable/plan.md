# Plan: Role hierarchy foundation (developer / owner / editor)

First step of the admin role-hierarchy upgrade. Database foundation + frontend role-check updates only. No publish.

## Step 1 — Migration 1: enum values

```sql
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'developer';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'owner';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'editor';
```

## Step 2 — Migration 2: functions + role migration

Runs after Migration 1 is committed (Postgres enum-commit requirement).

1. Rewrite `is_admin(_user_id uuid DEFAULT auth.uid())` — SECURITY DEFINER, STABLE, sql, `SET search_path = public`; new body checks `role IN ('developer','owner')`. Re-apply existing REVOKE/GRANT (revoke from PUBLIC/anon, grant authenticated + service_role).
2. New helpers, all SECURITY DEFINER STABLE sql, `SET search_path = public`, EXECUTE granted to `authenticated` + `service_role`, revoked from PUBLIC/anon:
   - `is_developer(_user_id uuid DEFAULT auth.uid())` → `role = 'developer'`
   - `is_owner(_user_id uuid DEFAULT auth.uid())` → `role IN ('developer','owner')`
   - `is_staff(_user_id uuid DEFAULT auth.uid())` → `role IN ('developer','owner','editor')`
   - `has_role(_user_id uuid, _role app_role)` → exact-role EXISTS check
3. Migrate existing account:
   `UPDATE public.user_roles SET role = 'developer' WHERE role = 'admin';`

The 13 existing RLS policies, leads policies, email system, and properties/property_images logic are untouched — they call `is_admin()`, so the rewrite covers them.

## Step 3 — Frontend role checks (accept hierarchy)

- `src/hooks/admin/useAdminAuth.ts`: replace `.eq("role", "admin")` with `.in("role", ["developer", "owner"])`.
- `src/pages/admin/AdminLogin.tsx`: same change in both role-check spots (initial session check and post-sign-in check).

## Step 4 — Types + verification

- Regenerate `src/integrations/supabase/types.ts` (supabase--get_types) so the new enum values are typed.
- Verify:
  - (a) enum contains developer/owner/editor alongside existing values
  - (b) `is_admin()` returns true for developer and owner
  - (c) your account row is now `developer` and passes `is_admin()`
  - (d) all 13 RLS policies unchanged (spot-check policy definitions)
  - (e) the 3 frontend checks use the hierarchy
  - (f) typecheck passes
- No publish. Live site untouched until the full sequence is verified.
