# Resend invitations: auto-email the re-invite branch + per-user button

## Correction to one premise

The fresh-invite path does **not** call a `send-transactional-email` function with an `admin-invite` template — no such function or template exists in this project. Fresh invites go through the auth invite email (Supabase invite → the branded auth invite template, sent from the verified domain `notify.oceancitydevelopment.com`, which is verified and active). The only app-email template today is the inquiry notification.

So Part A needs a small addition: a branded **admin invite** app-email template that the re-invite branch can send. Everything else works as described.

## Part A — send the re-invite link automatically

`supabase/functions/manage-users/index.ts`, existing-account branch:

1. Keep `generateLink('recovery')` exactly as is (link generation is unchanged, role untouched).
2. After the link is generated, send it with the scaffolded app-email helper `sendTemplateEmail('admin-invite', email, { templateData: { role, actionLink }, idempotencyKey: ... })`.
3. On success return `emailSent: true`; on failure (or a suppressed recipient) log the reason and return `emailSent: false`. Either way `actionLink` and `reinvited: true` are still returned, so the UI's copy-link fallback panel keeps working. Response shape is otherwise unchanged.
4. Sending never blocks the response with an error — the branch always returns success with the link.

New template `supabase/functions/_shared/transactional-email-templates/admin-invite.tsx`:
- Branded to the site (charcoal/white, Playfair-style heading treatment, square-ish CTA) consistent with the existing inquiry template.
- Props: `role`, `actionLink`; subject "You've been invited to the Ocean City Development admin".
- Registered in `registry.ts` as `admin-invite`.

Supporting changes:
- Add `supabase/functions/manage-users/deno.json` (copy of the preview function's) so the `.tsx` import compiles at deploy.
- Add a `[functions.manage-users]` entry with `verify_jwt = true` in `supabase/config.toml` if absent (behaviour unchanged — the function already checks the caller's JWT/role itself).
- Deploy `manage-users` and `preview-transactional-email`.

Guards, roles, self-lock, shielded developers, `wouldRemoveLastOwner`, and the fresh-invite path are untouched.

## Part B — "Resend invitation" button

`src/pages/admin/AdminUsers.tsx`, in each row's actions area:

- Render a small outline "Resend invitation" button only when `!u.confirmed` and `!isSelf`.
- Click calls the existing `useInviteUser()` mutation with `{ email: u.email, role: u.role }` (falling back to the current role select value if role is null); the backend routes it into the Part A branch because the account exists.
- Success: toast `Invitation resent to {email}`; if the result carries `actionLink`/`password`, open the existing handover panel so the manual copy-link fallback still shows when sending failed.
- Error: existing error toast pattern.
- Button is disabled while the mutation is pending (tracked per row so only the clicked row shows the spinner state).

No other files change.

## Verification

- Re-invite of an existing unconfirmed account sends a real branded email from the verified domain and returns `emailSent: true`.
- If sending fails, `emailSent: false` plus `actionLink` still reaches the UI and the copy panel appears.
- Button shows only for pending/unconfirmed users, never for confirmed users or the caller's own row.
- Typecheck passes. No publish.
