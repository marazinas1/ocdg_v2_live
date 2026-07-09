CREATE POLICY "Admins can read property images objects"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'property-images' AND public.is_admin());