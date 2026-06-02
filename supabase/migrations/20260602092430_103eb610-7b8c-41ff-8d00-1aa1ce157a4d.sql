ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 100;
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON public.products(sort_order);