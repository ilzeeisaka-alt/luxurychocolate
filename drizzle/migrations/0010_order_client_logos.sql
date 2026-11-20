CREATE TABLE public.order_client_logos (order_id uuid PRIMARY KEY REFERENCES public.orders(id) ON DELETE CASCADE, storage_path text NOT NULL);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_client_logos TO authenticated;
GRANT ALL ON public.order_client_logos TO service_role;
ALTER TABLE public.order_client_logos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage order client logos" ON public.order_client_logos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));