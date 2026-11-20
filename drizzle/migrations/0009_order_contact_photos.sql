CREATE TABLE public.order_contact_photos (order_id uuid PRIMARY KEY REFERENCES public.orders(id) ON DELETE CASCADE, storage_path text NOT NULL);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.order_contact_photos TO authenticated;
GRANT ALL ON public.order_contact_photos TO service_role;
ALTER TABLE public.order_contact_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage order contact photos" ON public.order_contact_photos FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));