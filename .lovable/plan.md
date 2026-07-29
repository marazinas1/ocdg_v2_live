Part 1 only. Part 2 (vision aerial standardization across the existing 20 properties) is deferred — no existing property will be touched.

## Create "2537 West Ave" (unpublished)

**Record** — insert into `properties`:
- slug `2537-west-ave`, title `2537 West Ave`
- status `coming_soon`, **published = false**, `has_page = true`
- **price left empty** (you fill it in later via admin, then publish)
- listed_date = today; Ocean City, NJ; map embed query for 2537 West Avenue
- sqft 2,380 (1,190 first + 1,190 second, per the CD set); specs include elevator, garage, roof deck, off-street parking
- Bedroom / bathroom counts read directly off the rendered First and Second floor plan sheets rather than the PDF text layer. If a count can't be confirmed cleanly, that field stays NULL for you to fill in.
- Copy (headline, tagline, description, highlights, luxury features, vision text, location features) written by me in the existing OCDG voice from the drawings — Halliday Architects, elevator, roof deck, coastal detailing. No pricing language, no "hurricane-rated".

**Images** — 16 renders from the Dropbox folder, resized to 2400px long edge, JPEG q80–82, uploaded to `property-images/2537-west-ave/{category}/{uuid}.jpg`:

| Category | Source |
|---|---|
| hero | View 02 Front view |
| card | View 03 Front view (800px) |
| vision | **View 01 Aerial view** |
| exterior | Views 01–06 |
| interior | 6 interior renders (living, dining, master bed, JR master bed, JR master bath, bedroom 04) |
| floor_plan | Ground / First / Second 3D plans, one tab per level |

The new property's Vision image uses the aerial render, as you asked — that part applies to this listing only.

**Verification** — confirm `property_images` row count matches uploaded storage objects, then load `/developments/2537-west-ave` as admin and check hero, galleries, floor-plan tabs and Vision all render. Since it's unpublished, it stays invisible to the public until you publish it.

## Technical notes
- Data-only: inserts into `properties` and `property_images`, plus storage uploads. No schema migration, no code changes.
- Downloads and image processing happen in the sandbox; nothing large enters the repo. The PDF is not added to the site.
