
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS preparation_days integer,
  ADD COLUMN IF NOT EXISTS delivery_days integer,
  ADD COLUMN IF NOT EXISTS vat_rate numeric(5,2) NOT NULL DEFAULT 21.00,
  ADD COLUMN IF NOT EXISTS prices_include_vat boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.products.price_cents IS 'Price in cents, INCLUDING VAT (gross price). vat_rate is informational.';
COMMENT ON COLUMN public.products.preparation_days IS 'Production / preparation time in business days before dispatch.';
COMMENT ON COLUMN public.products.delivery_days IS 'Estimated shipping time in business days after dispatch.';
