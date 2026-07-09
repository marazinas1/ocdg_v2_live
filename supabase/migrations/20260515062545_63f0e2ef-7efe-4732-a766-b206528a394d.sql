
DROP POLICY "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (phone IS NULL OR char_length(phone) <= 40)
  AND (interest IS NULL OR char_length(interest) <= 100)
  AND (message IS NULL OR char_length(message) <= 5000)
  AND (source IS NULL OR char_length(source) <= 200)
);
