# Step 1C — Admin Users UI

Connect the existing `manage-users` backend function to a real admin interface for inviting and managing users. No publish, no backend changes.

## What gets built

**1. Users data layer (`src/hooks/admin/useAdminUsers.ts`)**
React Query hooks wrapping the five backend actions:
- `useAdminUsers()` — lists all accounts (email, role, confirmed, last sign-in, developer flag, last-owner flag)
- `useInviteUser()`, `useSetUserRole()`, `useRevokeUser()`, `useDeleteUser()` — each invalidates the users list on success
- Errors returned by the function (403 guards, "At least one owner account must remain") are surfaced as thrown errors with the exact backend message so the UI can toast them verbatim
- Role type used by the UI: `'owner' | 'editor'` only. `'developer'` is display-only, never selectable.

**2. Users page (`src/pages/admin/AdminUsers.tsx`)**
Built with OCDG's existing admin look (same card/table/button styling as AdminProperties), not HA's visuals.
- Table of users: email, role badge, status (Confirmed / Pending), last sign-in date
- Invite form: email input + role picker limited to Owner / Editor, submit button
- Per-user actions: change role (Owner/Editor), Revoke access, Delete account — Revoke and Delete behind confirmation dialogs (AlertDialog), Delete worded as irreversible
- Developer rows render read-only ("Managed by developer") for non-developer viewers, mirroring the backend shield rule
- Self row shows no destructive actions (backend rejects self-changes anyway)
- Invite result handling:
  - email sent → success toast
  - `reinvited: true` → "This account already exists — a password reset link was generated"
  - fallback (`actionLink` and/or temporary `password` returned) → a panel showing the link/password with copy buttons and a note to hand it over manually

**3. Password setup page (`src/pages/admin/AdminSetPassword.tsx`)**
The landing page for invite/recovery links at `/admin/set-password`: waits for the session from the link, then new-password + confirm fields, updates the password, and redirects to `/admin`. If no session is present, it explains the link expired and points to the login page. It does **not** require an existing admin role.

## Routing and navigation

In `src/App.tsx`, both new lazy routes go **before** the `"/admin/*"` catch-all:
- `/admin/users` → `AdminUsers`, wrapped in the same admin protection pattern as the other admin pages
- `/admin/set-password` → `AdminSetPassword`, unprotected (an invited user has no role yet)

In `src/components/admin/AdminShell.tsx`, add a "Users" nav link to `/admin/users` in the header, alongside the existing shell items.

## Out of scope

The `manage-users` function, property pages, email system, and all RLS stay untouched.

## Verification after build

Confirm the 3 files exist; routes registered before the catch-all; Users link in AdminShell; role picker limited to owner/editor; `/admin/set-password` reachable without admin auth; typecheck passes.
