ALTER TABLE public.products ADD COLUMN IF NOT EXISTS source_external_id text;
CREATE UNIQUE INDEX IF NOT EXISTS products_source_external_id_key ON public.products(source_external_id) WHERE source_external_id IS NOT NULL;
ALTER TABLE public.product_categories ADD COLUMN IF NOT EXISTS image_url text;