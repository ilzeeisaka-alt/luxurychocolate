CREATE TABLE public.product_price_proposals (
 id uuid PRIMARY KEY,
 product_id uuid NOT NULL REFERENCES public.products(id),
 product_name text NOT NULL,
 product_slug text NOT NULL,
 current_price_cents integer NOT NULL,
 proposed_price_cents integer NOT NULL CHECK (proposed_price_cents > 0),
 currency text NOT NULL DEFAULT 'EUR',
 quantity integer NOT NULL CHECK (quantity > 0),
 customer_name text NOT NULL,
 customer_email text NOT NULL,
 message text NOT NULL DEFAULT '',
 lang text NOT NULL DEFAULT 'lv',
 email_status text NOT NULL DEFAULT 'pending',
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_price_proposals TO authenticated;
GRANT ALL ON public.product_price_proposals TO service_role;
ALTER TABLE public.product_price_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Administrators read price proposals" ON public.product_price_proposals FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX product_price_proposals_created_idx ON public.product_price_proposals(created_at DESC);
CREATE INDEX product_price_proposals_email_idx ON public.product_price_proposals(customer_email, created_at DESC);