import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, Loader2, Package, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSeo } from "@/hooks/useSeo";
import PostCheckoutRegister from "@/components/PostCheckoutRegister";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price_cents: number;
  total_price_cents: number;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  currency: string;
  total_cents: number;
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  customer_email: string;
  paid_at: string | null;
  created_at: string;
  order_items: OrderItem[];
}

const formatPrice = (cents: number, currency = "EUR") =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

const STATUS_LABELS: Record<string, string> = {
  pending: "Gaida apstiprinājumu",
  paid: "Apmaksāts",
  in_production: "Ražošanā",
  shipped: "Nosūtīts",
  delivered: "Piegādāts",
  cancelled: "Atcelts",
  refunded: "Atmaksāts",
};

const CheckoutReturn = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = params.get("session_id");
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);

  useSeo({
    title: "Paldies par pasūtījumu — Luxury Chocolate",
    description: "Tavs pasūtījums saņemts un tiek apstrādāts.",
    path: "/checkout/return",
  });

  // Clear local cart cache once we land here (webhook also clears DB cart on paid).
  useEffect(() => {
    if (user) {
      supabase.from("cart_items").delete().eq("user_id", user.id).then(() => {});
    }
  }, [user]);

  // Poll for the order until webhook has processed it (max ~20s).
  useEffect(() => {
    if (authLoading || !user || !sessionId) return;
    let cancelled = false;

    const fetchOrder = async () => {
      const { data } = await supabase
        .from("orders")
        .select(
          "id, order_number, status, currency, total_cents, subtotal_cents, shipping_cents, tax_cents, customer_email, paid_at, created_at, order_items(id, product_name, quantity, unit_price_cents, total_price_cents)",
        )
        .eq("stripe_session_id", sessionId)
        .maybeSingle();

      if (cancelled) return;

      if (data) {
        setOrder(data as Order);
        setLoading(false);
        // Auto-redirect to beautiful Paldies page once payment confirmed
        if (data.status !== "pending" && data.status !== "cancelled") {
          const qs = new URLSearchParams();
          if (data.order_number) qs.set("order", data.order_number);
          if (data.customer_email) qs.set("email", data.customer_email);
          navigate(`/paldies?${qs.toString()}`, { replace: true });
          return;
        }
        if (data.status === "pending" && attempts < 10) {
          setTimeout(() => setAttempts((a) => a + 1), 2000);
        }
      } else if (attempts < 10) {
        setTimeout(() => setAttempts((a) => a + 1), 2000);
      } else {
        setLoading(false);
      }
    };

    fetchOrder();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user, sessionId, attempts, navigate]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-28 pb-16 max-w-2xl text-center">
          <XCircle className="mx-auto text-destructive mb-4" size={48} />
          <h1 className="text-2xl font-semibold mb-2">Sesijas informācija nav atrasta</h1>
          <Button asChild className="mt-4">
            <Link to="/veikals">Atgriezties uz veikalu</Link>
          </Button>
        </main>
        <FooterSection />
      </div>
    );
  }

  const isPaid = order && order.status !== "pending" && order.status !== "cancelled";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-2xl">
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="mx-auto animate-spin text-primary mb-4" size={48} />
            <p className="text-muted-foreground">Pārbaudām maksājuma statusu…</p>
          </div>
        ) : !order ? (
          <div className="rounded-lg border border-border bg-card p-10 text-center space-y-4">
            <Clock className="mx-auto text-primary" size={56} />
            <h1 className="text-2xl font-semibold">Maksājums tiek apstrādāts</h1>
            <p className="text-muted-foreground">
              Apstiprinājums vēl nav saņemts. Tas parasti aizņem dažas sekundes.
              Pārbaudi savu e-pastu vai sava konta pasūtījumu sarakstu pēc brīža.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button asChild>
                <Link to="/account">Mani pasūtījumi</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/veikals">Atpakaļ uz veikalu</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              {isPaid ? (
                <CheckCircle2 className="mx-auto text-primary mb-4" size={56} />
              ) : (
                <Clock className="mx-auto text-primary mb-4" size={56} />
              )}
              <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
                {isPaid ? "Paldies par pasūtījumu!" : "Pasūtījums saņemts"}
              </h1>
              <p className="text-muted-foreground">
                {isPaid
                  ? "Maksājums saņemts. Apstiprinājums nosūtīts uz "
                  : "Mēs apstrādājam maksājumu. Apstiprinājumu nosūtīsim uz "}
                <span className="text-foreground font-medium">{order.customer_email}</span>.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm">
                <Package className="w-4 h-4 text-primary" />
                <span className="font-mono">{order.order_number}</span>
                <span className="text-muted-foreground">•</span>
                <span>{STATUS_LABELS[order.status] ?? order.status}</span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="font-semibold mb-4">Pasūtījuma kopsavilkums</h2>
              <div className="divide-y divide-border">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex justify-between py-3 text-sm">
                    <div>
                      <div className="font-medium">{item.product_name}</div>
                      <div className="text-muted-foreground text-xs mt-0.5">
                        {item.quantity} × {formatPrice(item.unit_price_cents, order.currency)}
                      </div>
                    </div>
                    <div className="font-medium">
                      {formatPrice(item.total_price_cents, order.currency)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Starpsumma</span>
                  <span>{formatPrice(order.subtotal_cents, order.currency)}</span>
                </div>
                {order.shipping_cents > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Piegāde</span>
                    <span>{formatPrice(order.shipping_cents, order.currency)}</span>
                  </div>
                )}
                {order.tax_cents > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>PVN</span>
                    <span>{formatPrice(order.tax_cents, order.currency)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
                  <span>Kopā</span>
                  <span className="text-primary">
                    {formatPrice(order.total_cents, order.currency)}
                  </span>
                </div>
              </div>
            </div>


            {user?.is_anonymous && (
              <PostCheckoutRegister defaultEmail={order.customer_email} />
            )}



            <div className="rounded-lg border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
              <p className="mb-2">
                <strong className="text-foreground">Kas notiks tālāk?</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>24 stundu laikā saņemsi logo skici (ja attiecināms).</li>
                <li>Ražošana parasti aizņem 3 darba dienas.</li>
                <li>Pasūtījuma statusu vari sekot līdzi sava konta sadaļā.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/account">Apskatīt manus pasūtījumus</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/veikals">Turpināt iepirkties</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default CheckoutReturn;
