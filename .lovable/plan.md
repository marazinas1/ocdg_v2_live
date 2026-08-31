# Footer credit link to Deerva

## Goal
Add a subtle, neutral footer credit that links to `https://www.deerva.com`, making it easy for visitors to find the platform developer without being distracting.

## Changes
1. **Update `src/components/GlobalFooter.tsx`**
   - In the bottom copyright bar (next to the existing "© 2026 Ocean City Development Group, LLC. All rights reserved." and "Admin" link), add a small muted line:
     - Text: "Platform developed and maintained by Deerva"
     - "Deerva" is a link to `https://www.deerva.com`
   - Style: small text (`text-xs`), low opacity (`text-white/30` or `text-white/40`), hover state that brightens slightly, consistent with the existing footer aesthetic.
   - Open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.
   - Keep the layout responsive: stack or wrap gracefully on mobile, remain inline on desktop.

## Verification
- TypeScript typecheck passes.
- Preview shows the new footer credit on desktop and mobile.
- Clicking "Deerva" opens `https://www.deerva.com` in a new tab.

## No-publish
No publish requested.
