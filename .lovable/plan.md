# Send admin invitations from your own domain

Right now invitation emails come from the default sender `no-reply@auth.lovable.cloud`, because no sending domain is configured for this project. Yes — they can come from `no-reply@oceancitydevelopment.com` instead.

## Steps

1. **Set up the sender domain** — you complete this in the email setup dialog for `oceancitydevelopment.com`. It creates a delegated sending subdomain and the DNS records needed for authentication. DNS verification can take from a few minutes up to 72 hours.
2. **Create branded auth email templates** — I generate the six authentication emails (invitation, signup confirmation, password reset, magic link, email change, reauthentication) and style them to match the site: Playfair Display headings, Inter body, charcoal buttons, OCDG logo, and copy that matches the admin panel wording ("Accept invitation", "Set your password").
3. **Deploy and activate** — once deployed, invitations automatically switch to your own sender as soon as DNS verifies. Until then, the default Lovable sender keeps working, so nothing breaks in the meantime.

## What stays the same

The `manage-users` invite flow, roles, and the `/admin/set-password` landing page are unchanged — only the sender address and the look of the email change.

## Note on DNS

Setup adds nameserver records for a mail subdomain. Your website DNS and the apex domain are unaffected.

<presentation-actions>
<presentation-open-email-setup>Set up email domain</presentation-open-email-setup>
</presentation-actions>
