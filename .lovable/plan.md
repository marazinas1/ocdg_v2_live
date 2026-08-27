# Step 1B — manage-users edge function

Backend only. No frontend UI, no new tables, no publish.

## What gets built

One new file: `supabase/functions/manage-users/index.ts`, ported line-for-line from the Halliday-Architects reference function, with the role naming adapted to this project.

### Actions

| Action | Body | Effect |
|---|---|---|
| `list` | — | All users with role, createdAt, lastSignInAt, confirmed, `isDeveloper`, `isLastOwner` |
| `invite` | `{ email, role: 'owner' \| 'editor' }` | Invitation email; falls back to create-user + recovery link if the sending domain isn't verified; existing user gets a recovery link with `reinvited: true` |
| `set_role` | `{ userId, role: 'owner' \| 'editor' }` | Replaces the user's role rows |
| `revoke` | `{ userId }` | Removes all role rows (account stays) |
| `delete_user` | `{ userId }` | Removes role rows, then deletes the auth account |

### Role naming adapted for OCDG

- `platform_owner` → `developer` everywhere
- `isPlatformOwner` → `isDeveloper` (`roles.includes('developer')`)
- `platformOwnerIds` → `developerIds` (rows with `role === 'developer'`)
- list payload field `isPlatformOwner` → `isDeveloper`
- `ManageableRole = z.enum(['owner','editor'])` — `developer` can never be granted through this function

### Security model (unchanged from the reference)

- Bearer JWT required; caller identity re-validated server-side with `asCaller.auth.getUser()`
- Caller must hold `developer` or `owner`, read from the database with the service client — a role sent by the client is never trusted; otherwise 403
- Self-lock: `body.userId === callerId` → 403
- `shielded()`: a non-developer cannot modify a developer account → 403
- `wouldRemoveLastOwner()`: any change that would leave zero owners → 409
- Two clients: `asCaller` (anon key + user JWT) for identity, `admin` (service role) for all writes
- Zod validation on the whole body via a discriminated union; 400 on failure
- CORS headers on every response, including errors

### Other details

- `appLink()` uses `APP_BASE_URL`, then the parsed request `Origin`, then the hard fallback `https://oceancitydevelopment.com`
- Invite `redirectTo` is `appLink('/admin/set-password', origin)` — that route does not exist yet and comes in the next (frontend) step; the link simply lands on the app until then
- Temp-password prefix changed from `Ha` to `Oc`
- Roles are written to the existing `public.user_roles` (its `UNIQUE(user_id, role)` backs the `onConflict: 'user_id,role'` upsert). No schema change.
- `supabase/config.toml` stays as-is (`verify_jwt` defaults to false; the JWT is validated in code)

## Not touched

Email system, properties, leads, existing RLS policies, frontend.

## Verification

- (a) all 5 actions present in the deployed function
- (b) checks `developer` / `owner`, no `admin` or `platform_owner` strings remain
- (c) self-lock, shielded, wouldRemoveLastOwner, and JWT re-validation all present
- (d) no new tables
- (e) typecheck passes; smoke-test the deployed function unauthenticated to confirm it returns 401
- no publish
