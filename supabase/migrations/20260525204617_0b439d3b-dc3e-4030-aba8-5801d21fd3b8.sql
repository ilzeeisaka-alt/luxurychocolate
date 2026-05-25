ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS has_image boolean NOT NULL DEFAULT false;

UPDATE public.products p
SET has_image = EXISTS (SELECT 1 FROM public.product_images i WHERE i.product_id = p.id);

CREATE OR REPLACE FUNCTION public.refresh_product_has_image()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  pid uuid;
BEGIN
  pid := COALESCE(NEW.product_id, OLD.product_id);
  UPDATE public.products
  SET has_image = EXISTS (SELECT 1 FROM public.product_images WHERE product_id = pid)
  WHERE id = pid;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_product_images_has_image ON public.product_images;
CREATE TRIGGER trg_product_images_has_image
AFTER INSERT OR DELETE OR UPDATE OF product_id ON public.product_images
FOR EACH ROW EXECUTE FUNCTION public.refresh_product_has_image();

CREATE INDEX IF NOT EXISTS idx_products_has_image ON public.products(has_image);