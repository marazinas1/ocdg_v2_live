# Fix: visits are not being recorded in Analytics

## What I verified

- The live site at oceancitydevelopment.com **does** contain the tracking code and the correct endpoint URL, so the deploy is fine.
- The `page_views` table has exactly **1 row** (today, desktop/direct) — your phone visit is missing.
- Backend request logs for the tracking function show **only `OPTIONS` preflight requests (8 of them, all 200) and zero `POST` requests**. So the browser asks permission to send the ping, gets a green light, and then never sends the actual data.

## Root cause

The tracker sends the ping with `navigator.sendBeacon` using a JSON blob (`Content-Type: application/json`). That content type forces the browser into a CORS preflight, and beacons that require a preflight are silently dropped by browsers after the preflight — the beacon still reports "queued: true", so our `fetch` fallback never runs. Result: preflight in the logs, no data ever recorded.

## The fix

1. **Frontend (`src/hooks/usePageTracking.ts`)**
   - Send the beacon as `text/plain` (a "simple" request that needs no preflight), which is the standard way to make `sendBeacon` work cross-origin.
   - Keep the `fetch(..., { keepalive: true })` fallback, also with `text/plain`, for browsers where `sendBeacon` is unavailable or returns false.
   - Track on first load as well as on route change (unchanged behaviour otherwise), still skipping `/admin/*`.

2. **Backend (`supabase/functions/track-view/index.ts`)**
   - Parse the body from raw text (`JSON.parse(await req.text())`) instead of relying on the JSON content type, so both the beacon and the fallback are accepted.
   - No change to the origin allowlist, bot filter, hashing or privacy behaviour.
   - Redeploy the function.

3. **Verification**
   - Send a simulated real-browser POST with a mobile user agent and a production `Origin`, then confirm a new row appears in `page_views` with `device = mobile`.
   - Confirm the backend logs now show `POST` requests with status 204 (not only `OPTIONS`).
   - Delete the verification row so your real numbers stay clean.

## Note

Data collection only starts counting real visitors **after this fix is published**. Visits made before that are permanently lost — analytics cannot be backfilled.
