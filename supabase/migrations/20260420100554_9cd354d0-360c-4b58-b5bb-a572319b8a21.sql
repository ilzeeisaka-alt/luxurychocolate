CREATE POLICY "Service role can insert orders"
ON public.orders
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update orders"
ON public.orders
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Service role can insert order items"
ON public.order_items
FOR INSERT
TO service_role
WITH CHECK (true);