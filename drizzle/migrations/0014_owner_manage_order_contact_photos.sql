CREATE POLICY "Owners add own order contact photo"
ON public.order_contact_photos
FOR INSERT
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.orders o
  WHERE o.id = order_contact_photos.order_id AND o.user_id = auth.uid()
));

CREATE POLICY "Owners update own order contact photo"
ON public.order_contact_photos
FOR UPDATE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.orders o
  WHERE o.id = order_contact_photos.order_id AND o.user_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.orders o
  WHERE o.id = order_contact_photos.order_id AND o.user_id = auth.uid()
));

CREATE POLICY "Owners delete own order contact photo"
ON public.order_contact_photos
FOR DELETE
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.orders o
  WHERE o.id = order_contact_photos.order_id AND o.user_id = auth.uid()
));