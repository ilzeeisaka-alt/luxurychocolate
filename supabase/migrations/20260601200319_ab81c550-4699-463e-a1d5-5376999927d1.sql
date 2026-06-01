
-- Affiliate partners table
CREATE TABLE public.affiliates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active', -- active | suspended
  commission_rate NUMERIC(5,2) NOT NULL DEFAULT 10.00, -- percent
  customer_discount_rate NUMERIC(5,2) NOT NULL DEFAULT 5.00, -- percent off for customer using code
  balance_cents INTEGER NOT NULL DEFAULT 0, -- approved & unpaid
  total_earned_cents INTEGER NOT NULL DEFAULT 0,
  total_paid_cents INTEGER NOT NULL DEFAULT 0,
  payout_method TEXT,
  payout_details TEXT, -- bank account / IBAN
  full_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.affiliates TO authenticated;
GRANT SELECT ON public.affiliates TO anon; -- needed to validate code at checkout (only via SECURITY DEFINER fn, see below)
GRANT ALL ON public.affiliates TO service_role;

ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own affiliate"
ON public.affiliates FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins view all affiliates"
ON public.affiliates FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users create own affiliate"
ON public.affiliates FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own affiliate (limited)"
ON public.affiliates FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins update all affiliates"
ON public.affiliates FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER affiliates_updated_at
BEFORE UPDATE ON public.affiliates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Index for code lookup
CREATE INDEX idx_affiliates_code ON public.affiliates(LOWER(code));

-- Referrals (one per order)
CREATE TABLE public.affiliate_referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  order_id UUID UNIQUE,
  order_number TEXT,
  customer_email TEXT,
  order_total_cents INTEGER NOT NULL DEFAULT 0,
  commission_cents INTEGER NOT NULL DEFAULT 0,
  commission_rate NUMERIC(5,2) NOT NULL,
  source TEXT NOT NULL DEFAULT 'link', -- link | code
  status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | paid | rejected
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.affiliate_referrals TO authenticated;
GRANT ALL ON public.affiliate_referrals TO service_role;

ALTER TABLE public.affiliate_referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates view own referrals"
ON public.affiliate_referrals FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.affiliates a WHERE a.id = affiliate_referrals.affiliate_id AND a.user_id = auth.uid()));

CREATE POLICY "Admins view all referrals"
ON public.affiliate_referrals FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update referrals"
ON public.affiliate_referrals FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER affiliate_referrals_updated_at
BEFORE UPDATE ON public.affiliate_referrals
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_aff_referrals_affiliate ON public.affiliate_referrals(affiliate_id);
CREATE INDEX idx_aff_referrals_status ON public.affiliate_referrals(status);

-- Payouts
CREATE TABLE public.affiliate_payouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'requested', -- requested | paid | rejected
  payout_method TEXT,
  payout_details TEXT,
  admin_notes TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.affiliate_payouts TO authenticated;
GRANT ALL ON public.affiliate_payouts TO service_role;

ALTER TABLE public.affiliate_payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Affiliates view own payouts"
ON public.affiliate_payouts FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.affiliates a WHERE a.id = affiliate_payouts.affiliate_id AND a.user_id = auth.uid()));

CREATE POLICY "Affiliates request own payouts"
ON public.affiliate_payouts FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.affiliates a WHERE a.id = affiliate_payouts.affiliate_id AND a.user_id = auth.uid()));

CREATE POLICY "Admins view all payouts"
ON public.affiliate_payouts FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update payouts"
ON public.affiliate_payouts FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER affiliate_payouts_updated_at
BEFORE UPDATE ON public.affiliate_payouts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add affiliate columns to orders for tracking
ALTER TABLE public.orders
  ADD COLUMN affiliate_id UUID,
  ADD COLUMN affiliate_code TEXT,
  ADD COLUMN affiliate_discount_cents INTEGER NOT NULL DEFAULT 0;

CREATE INDEX idx_orders_affiliate ON public.orders(affiliate_id);

-- Public function to validate affiliate code (returns minimal info, no PII)
CREATE OR REPLACE FUNCTION public.validate_affiliate_code(_code TEXT)
RETURNS TABLE(id UUID, code TEXT, discount_rate NUMERIC, valid BOOLEAN)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT a.id, a.code, a.customer_discount_rate, TRUE
  FROM public.affiliates a
  WHERE LOWER(a.code) = LOWER(TRIM(_code))
    AND a.status = 'active'
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.validate_affiliate_code(TEXT) TO anon, authenticated;

-- Tighten: remove the broad anon SELECT on affiliates (we use SECURITY DEFINER fn instead)
REVOKE SELECT ON public.affiliates FROM anon;
