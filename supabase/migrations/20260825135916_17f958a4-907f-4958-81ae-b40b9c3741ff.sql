CREATE TABLE public.offer_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text,
  size text,
  packaging text,
  purpose text,
  quantity text,
  message text,
  logo_url text,
  email_status text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.offer_requests TO anon, authenticated;
GRANT SELECT ON public.offer_requests TO authenticated;
GRANT ALL ON public.offer_requests TO service_role;

ALTER TABLE public.offer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit offer requests"
ON public.offer_requests FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view offer requests"
ON public.offer_requests FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));