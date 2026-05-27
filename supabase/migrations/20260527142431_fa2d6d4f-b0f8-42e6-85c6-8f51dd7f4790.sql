ALTER TABLE public.cart_items ADD COLUMN IF NOT EXISTS logos jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS logos jsonb NOT NULL DEFAULT '[]'::jsonb;