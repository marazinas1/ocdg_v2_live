
CREATE OR REPLACE FUNCTION public.list_property_bucket_paths(_slug text)
RETURNS TABLE(name text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, storage
AS $$
BEGIN
  -- Admin-only. Anon and non-admin authenticated users get nothing.
  IF NOT public.is_admin(auth.uid()) THEN
    RETURN;
  END IF;

  -- Strict slug validation — the value is interpolated into a LIKE pattern,
  -- so % and _ are wildcards. Rejecting anything outside [a-z0-9-] means we
  -- never need to escape and can never enumerate outside a single slug.
  IF _slug IS NULL OR _slug !~ '^[a-z0-9][a-z0-9-]*$' THEN
    RAISE EXCEPTION 'invalid slug: %', _slug;
  END IF;

  RETURN QUERY
    SELECT o.name
    FROM storage.objects o
    WHERE o.bucket_id = 'property-images'
      AND o.name LIKE _slug || '/%';
END;
$$;

REVOKE ALL ON FUNCTION public.list_property_bucket_paths(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.list_property_bucket_paths(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.list_property_bucket_paths(text) TO authenticated;
