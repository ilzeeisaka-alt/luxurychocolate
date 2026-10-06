CREATE TABLE public.tmp_product_en (id uuid primary key, n text, s text, d text);
GRANT ALL ON public.tmp_product_en TO service_role;
ALTER TABLE public.tmp_product_en ENABLE ROW LEVEL SECURITY;