
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TABLE public.abandoned_cart_reminders (
  user_id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stage1_sent_at timestamptz,
  stage2_sent_at timestamptz,
  last_cart_updated_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.abandoned_cart_reminders TO service_role;

ALTER TABLE public.abandoned_cart_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages abandoned cart reminders"
  ON public.abandoned_cart_reminders
  FOR ALL
  USING (false)
  WITH CHECK (false);

CREATE TRIGGER update_abandoned_cart_reminders_updated_at
  BEFORE UPDATE ON public.abandoned_cart_reminders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
