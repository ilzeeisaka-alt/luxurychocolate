CREATE TABLE public.order_item_mockups (order_item_id uuid PRIMARY KEY REFERENCES public.order_items(id) ON DELETE CASCADE, order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE, storage_path text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_item_mockups TO authenticated;
GRANT ALL ON public.order_item_mockups TO service_role;
ALTER TABLE public.order_item_mockups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage order mockups" ON public.order_item_mockups FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Owners view own order mockups" ON public.order_item_mockups FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));
CREATE POLICY "Owners view own order mockup file" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'customer-logos' AND EXISTS (SELECT 1 FROM public.order_item_mockups m JOIN public.orders o ON o.id = m.order_id WHERE m.storage_path = objects.name AND o.user_id = auth.uid()));