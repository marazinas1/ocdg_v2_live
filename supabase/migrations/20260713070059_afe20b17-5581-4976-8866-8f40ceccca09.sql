
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS highlights jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS vision_headline text,
  ADD COLUMN IF NOT EXISTS vision_floors jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS vision_caption_eyebrow text,
  ADD COLUMN IF NOT EXISTS vision_caption_title text,
  ADD COLUMN IF NOT EXISTS map_embed_query text,
  ADD COLUMN IF NOT EXISTS location_heading text;

ALTER TABLE public.property_images DROP CONSTRAINT IF EXISTS property_images_category_check;
ALTER TABLE public.property_images ADD CONSTRAINT property_images_category_check
  CHECK (category = ANY (ARRAY['hero'::text,'card'::text,'exterior'::text,'exterior_closeup'::text,'interior'::text,'floor_plan'::text,'vision'::text]));
