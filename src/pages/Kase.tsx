import { useCallback, useEffect, useMemo, useState } from "react";
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
import { getStoredRef } from "@/lib/affiliateRef";
import { useCurrentLang } from "@/i18n/useCurrentLang";

const CHECKOUT_TEXT = {
  lv: {
    title: "Kase",
    description: "Pabeidz pasūtījumu ar drošu apmaksu.",
    paymentUnavailable: "Maksājums nav pieejams",
    backToCart: "Atgriezties grozā",
    sessionError: "Neizdevās izveidot maksājuma sesiju",
  },
  ru: {
    title: "Оплата",
    description: "Завершите заказ с безопасной оплатой.",
    paymentUnavailable: "Оплата недоступна",
    backToCart: "Вернуться в корзину",
    sessionError: "Не удалось создать платёжную сессию",
  },
  en: {
    title: "Checkout",
    description: "Complete your order with secure payment.",
    paymentUnavailable: "Payment not available",
    backToCart: "Back to cart",
    sessionError: "Could not create payment session",
  },
};

const getCheckoutText = (lang: string) => CHECKOUT_TEXT[lang as keyof typeof CHECKOUT_TEXT] ?? CHECKOUT_TEXT.en;

const getStripeLocale = (lang: string) => (lang === "ru" || lang === "lv" || lang === "en" ? lang : "auto");

const getCheckoutErrorMessage = async (data: unknown, error: unknown, fallback: string) => {
  const dataError = (data as { error?: string } | null)?.error;
  if (dataError) return dataError;

  const response = (error as { context?: Response } | null)?.context;
  if (response?.clone) {
    try {
      const body = (await response.clone().json()) as { error?: string };
      if (body?.error) return body.error;
    } catch {
      // Fall back to the generic SDK message below.
    }
  }

  return (error as Error | null)?.message || fallback;
};

const Kase = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const lang = useCurrentLang();
  const tx = getCheckoutText(lang);
  const withLang = useCallback((path: string) => {
    if (!lang || lang === "lv") return path;
    return `${path}${path.includes("?") ? "&" : "?"}lang=${lang}`;
  }, [lang]);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useSeo({
    title: `${tx.title} — Luxury Chocolate`,
    description: tx.description,
    path: "/kase",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate(`/auth?redirect=${encodeURIComponent(withLang("/kase"))}${lang !== "lv" ? `&lang=${lang}` : ""}`, { replace: true });
    else if (user) setReady(true);
  }, [authLoading, user, navigate, withLang, lang]);

  const options = useMemo(
    () => ({
      fetchClientSecret: async (): Promise<string> => {
        const shippingId = sessionStorage.getItem("shipping_id") || "pickup";
        const affRef = getStoredRef();
        const { data, error } = await supabase.functions.invoke("create-shop-checkout", {
          body: {
            environment: stripeEnvironment,
            returnUrl: `${window.location.origin}${withLang("/checkout/return?session_id={CHECKOUT_SESSION_ID}")}`,
            shippingId,
            affiliateCode: affRef?.code ?? null,
            lang,
            locale: getStripeLocale(lang),
          },
        });
        if (error || !data?.clientSecret) {
          const msg = await getCheckoutErrorMessage(data, error, tx.sessionError);
          setError(msg);
          throw new Error(msg);
        }
        return data.clientSecret;
      },
    }),
    [lang, tx.sessionError, withLang],
  );

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <h1 className="text-3xl text-foreground mb-6">{tx.title}</h1>
        {!ready ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-sm text-destructive">
            <p className="font-medium mb-2">{tx.paymentUnavailable}</p>
            <p>{error}</p>
            <button
              onClick={() => navigate(withLang("/grozs"))}
              className="mt-4 underline text-primary"
            >
              {tx.backToCart}
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
