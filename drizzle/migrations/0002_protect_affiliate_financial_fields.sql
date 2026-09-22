CREATE OR REPLACE FUNCTION public.protect_affiliate_financial_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.status := 'active';
    NEW.commission_rate := 10.00;
    NEW.customer_discount_rate := 5.00;
    NEW.balance_cents := 0;
    NEW.total_earned_cents := 0;
    NEW.total_paid_cents := 0;
  ELSE
    NEW.user_id := OLD.user_id;
    NEW.code := OLD.code;
    NEW.status := OLD.status;
    NEW.commission_rate := OLD.commission_rate;
    NEW.customer_discount_rate := OLD.customer_discount_rate;
    NEW.balance_cents := OLD.balance_cents;
    NEW.total_earned_cents := OLD.total_earned_cents;
    NEW.total_paid_cents := OLD.total_paid_cents;
    NEW.created_at := OLD.created_at;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_affiliate_financial_fields() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.protect_affiliate_financial_fields() TO service_role;

DROP TRIGGER IF EXISTS protect_affiliate_financial_fields_trigger ON public.affiliates;
CREATE TRIGGER protect_affiliate_financial_fields_trigger
BEFORE INSERT OR UPDATE ON public.affiliates
FOR EACH ROW
EXECUTE FUNCTION public.protect_affiliate_financial_fields();