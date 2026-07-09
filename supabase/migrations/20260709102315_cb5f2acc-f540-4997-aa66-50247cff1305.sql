-- ============================================================
-- Roles
-- ============================================================
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- SECURITY DEFINER admin check — prevents RLS recursion and search-path hijacking
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'admin'
  )
$$;

-- Only admins can read user_roles. No INSERT/UPDATE/DELETE policies => writes
-- require service_role (backend SQL editor only).
CREATE POLICY "Admins can read roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_admin());

-- ============================================================
-- Shared updated_at trigger function
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================
-- properties
-- ============================================================
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  unit TEXT,
  headline TEXT,
  tagline TEXT,
  description TEXT,
  price TEXT,
  status TEXT NOT NULL DEFAULT 'coming_soon'
    CHECK (status IN ('coming_soon','active','under_contract','sold')),
  bedrooms INT,
  full_baths INT,
  half_baths INT,
  total_rooms INT,
  sqft INT,
  location_neighborhood TEXT,
  location_city TEXT DEFAULT 'Ocean City',
  location_state TEXT DEFAULT 'NJ',
  location_highlight TEXT,
  specs JSONB NOT NULL DEFAULT '[]'::jsonb,
  floor_plans JSONB NOT NULL DEFAULT '[]'::jsonb,
  luxury_features JSONB NOT NULL DEFAULT '[]'::jsonb,
  location_features JSONB NOT NULL DEFAULT '[]'::jsonb,
  listed_date DATE,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.properties TO authenticated;
GRANT SELECT ON public.properties TO anon;
GRANT ALL ON public.properties TO service_role;

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_properties_slug ON public.properties (slug);
CREATE INDEX idx_properties_status ON public.properties (status);
CREATE INDEX idx_properties_published ON public.properties (published);
CREATE INDEX idx_properties_published_sort ON public.properties (published, sort_order);

CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Public read: only published rows
CREATE POLICY "Public can view published properties"
ON public.properties
FOR SELECT
TO anon, authenticated
USING (published = true);

-- Admin full read
CREATE POLICY "Admins can view all properties"
ON public.properties
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can insert properties"
ON public.properties
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update properties"
ON public.properties
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete properties"
ON public.properties
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================
-- property_images
-- ============================================================
CREATE TABLE public.property_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  category TEXT NOT NULL
    CHECK (category IN ('hero','card','exterior','exterior_closeup','interior','floor_plan')),
  floor_plan_id TEXT,
  storage_path TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.property_images TO authenticated;
GRANT SELECT ON public.property_images TO anon;
GRANT ALL ON public.property_images TO service_role;

ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_property_images_property ON public.property_images (property_id);
CREATE INDEX idx_property_images_property_category ON public.property_images (property_id, category);

CREATE POLICY "Public can view images of published properties"
ON public.property_images
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.properties p
    WHERE p.id = property_images.property_id AND p.published = true
  )
);

CREATE POLICY "Admins can view all property images"
ON public.property_images
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can insert property images"
ON public.property_images
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
  AND EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id)
);

CREATE POLICY "Admins can update property images"
ON public.property_images
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (
  public.is_admin()
  AND EXISTS (SELECT 1 FROM public.properties p WHERE p.id = property_id)
);

CREATE POLICY "Admins can delete property images"
ON public.property_images
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================
-- Storage policies for property-images bucket
-- (bucket itself is created via the storage tool)
-- ============================================================
CREATE POLICY "Admins can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images' AND public.is_admin());

CREATE POLICY "Admins can update property images objects"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'property-images' AND public.is_admin())
WITH CHECK (bucket_id = 'property-images' AND public.is_admin());

CREATE POLICY "Admins can delete property images objects"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'property-images' AND public.is_admin());
