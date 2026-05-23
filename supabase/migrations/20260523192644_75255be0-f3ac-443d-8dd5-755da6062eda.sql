
-- 1. Hide reviewer email from public/authenticated reads (admins don't query this column)
REVOKE SELECT (author_email) ON public.reviews FROM anon, authenticated;

-- 2. Drop broad listing policies on public buckets (direct public URLs still work via bucket.public flag)
DROP POLICY IF EXISTS "Logos are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;

-- 3. Constrain client-logos uploads: cap file size + allowed mime types at bucket level
UPDATE storage.buckets
   SET file_size_limit = 5242880,
       allowed_mime_types = ARRAY['image/png','image/jpeg','image/jpg','image/webp','image/svg+xml','image/gif','application/pdf']
 WHERE id = 'client-logos';

-- 4. Tighten newsletter INSERT policy (replace WITH CHECK true with format/length validation)
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (source IS NULL OR length(source) <= 100)
    AND (lang IS NULL OR length(lang) <= 10)
  );
