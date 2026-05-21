
ALTER TABLE public.cart_items
  ADD COLUMN IF NOT EXISTS logo_url text,
  ADD COLUMN IF NOT EXISTS logo_filename text,
  ADD COLUMN IF NOT EXISTS notes text;

ALTER TABLE public.cart_items DROP CONSTRAINT IF EXISTS cart_items_user_id_product_id_key;
