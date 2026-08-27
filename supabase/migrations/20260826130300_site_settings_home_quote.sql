ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS home_quote TEXT,
  ADD COLUMN IF NOT EXISTS home_quote_attribution TEXT;