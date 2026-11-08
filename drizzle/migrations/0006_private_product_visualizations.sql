CREATE TABLE public.product_visualizations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 session_token uuid NOT NULL,
 user_id uuid,
 product_id uuid NOT NULL REFERENCES public.products(id),
 product_name text NOT NULL,
 customer_name text NOT NULL,
 customer_email text NOT NULL,
 idea text NOT NULL,
 lang text NOT NULL DEFAULT 'lv',
 status text NOT NULL DEFAULT 'pending',
 image_path text,
 logo_path text,
 email_status text,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_visualizations TO authenticated;
GRANT ALL ON public.product_visualizations TO service_role;
ALTER TABLE public.product_visualizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read visualizations" ON public.product_visualizations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX product_visualizations_session_created ON public.product_visualizations(session_token, created_at DESC);
CREATE INDEX product_visualizations_created ON public.product_visualizations(created_at DESC);
CREATE POLICY "Admins read visualization files" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'product-visualizations' AND public.has_role(auth.uid(), 'admin'));
