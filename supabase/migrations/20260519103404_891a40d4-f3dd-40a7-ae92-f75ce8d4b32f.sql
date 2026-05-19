
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  author_name TEXT NOT NULL,
  author_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved reviews"
ON public.reviews FOR SELECT
USING (approved = true);

CREATE POLICY "Admins can read all reviews"
ON public.reviews FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can submit a review"
ON public.reviews FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(author_name)) BETWEEN 1 AND 100
  AND length(trim(content)) BETWEEN 3 AND 2000
  AND rating BETWEEN 1 AND 5
  AND (auth.uid() IS NULL OR auth.uid() = user_id OR user_id IS NULL)
);

CREATE POLICY "Admins can update reviews"
ON public.reviews FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete reviews"
ON public.reviews FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_reviews_approved_created ON public.reviews(approved, created_at DESC);
