ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS name_i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS description_i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS short_description_i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS ingredients_i18n jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.product_categories
  ADD COLUMN IF NOT EXISTS name_i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS description_i18n jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.content_pages
  ADD COLUMN IF NOT EXISTS title_i18n jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS description_i18n_jsonb jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS markdown_i18n jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_products_name_i18n ON public.products USING GIN (name_i18n);
CREATE INDEX IF NOT EXISTS idx_products_desc_i18n ON public.products USING GIN (description_i18n);