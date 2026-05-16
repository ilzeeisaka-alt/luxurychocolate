import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSeo } from "@/hooks/useSeo";
import { getStripe, stripeEnvironment } from "@/lib/stripe";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

const Kase = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useSeo({
    title: "Kase — Luxury Chocolate",
    description: "Pabeidz pasūtījumu ar drošu apmaksu.",
    path: "/kase",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/kase", { replace: true });
    else if (user) setReady(true);
  }, [authLoading, user, navigate]);

  const options = useMemo(
    () => ({
      fetchClientSecret: async (): Promise<string> => {
        const { data, error } = await supabase.functions.invoke("create-shop-checkout", {
          body: {
            environment: stripeEnvironment,
            returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
          },
        });
        if (error || !data?.clientSecret) {
          const msg = (data as any)?.error || error?.message || "Neizdevās izveidot maksājuma sesiju";
          setError(msg);
          throw new Error(msg);
        }
        return data.clientSecret;
      },
    }),
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <h1 className="text-3xl text-foreground mb-6">Kase</h1>
        {!ready ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-sm text-destructive">
            <p className="font-medium mb-2">Maksājums nav pieejams</p>
            <p>{error}</p>
            <button
              onClick={() => navigate("/grozs")}
              className="mt-4 underline text-primary"
            >
              Atgriezties grozā
            </button>
          </div>
        ) : (
          <div id="checkout" className="bg-card rounded-xl border border-border overflow-hidden">
            <EmbeddedCheckoutProvider stripe={getStripe()} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default Kase;
