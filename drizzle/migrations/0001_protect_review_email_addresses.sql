CREATE OR REPLACE FUNCTION public.get_approved_reviews()
RETURNS TABLE (
  id uuid,
  author_name text,
  rating integer,
  title text,
  content text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.id, r.author_name, r.rating, r.title, r.content, r.created_at
  FROM public.reviews AS r
  WHERE r.approved = true
  ORDER BY r.created_at DESC
  LIMIT 100;
$$;

REVOKE ALL ON FUNCTION public.get_approved_reviews() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_approved_reviews() TO anon, authenticated, service_role;

DROP POLICY IF EXISTS "Anyone can read approved reviews" ON public.reviews;