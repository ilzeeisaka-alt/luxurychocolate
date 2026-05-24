
CREATE TABLE public.content_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  lang text NOT NULL DEFAULT 'lv',
  title text NOT NULL,
  description text,
  markdown text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slug, lang)
);

ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published content pages"
  ON public.content_pages FOR SELECT
  USING (published = true);

CREATE POLICY "Admins manage content pages"
  ON public.content_pages FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER content_pages_updated_at
  BEFORE UPDATE ON public.content_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
