import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Package, CheckCircle2, Truck, Factory, Clock, XCircle, Bell, BellOff, Search, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  order_number: string;
  status: string;
  customer_email: string;
  total_cents: number;
  currency: string;
  tracking_number: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
  created_at: string;
  paid_at: string | null;
  updated_at: string;
}

const STATUS_FLOW = ["pending", "paid", "in_production", "shipped", "delivered"] as const;

const STATUS_META: Record<string, { label: string; icon: any; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Gaida apmaksu", icon: Clock, variant: "outline" },
  paid: { label: "Apmaksāts", icon: CheckCircle2, variant: "default" },
  in_production: { label: "Ražošanā", icon: Factory, variant: "secondary" },
  shipped: { label: "Nosūtīts", icon: Truck, variant: "secondary" },
  delivered: { label: "Piegādāts", icon: Package, variant: "default" },
  cancelled: { label: "Atcelts", icon: XCircle, variant: "destructive" },
  refunded: { label: "Atmaksāts", icon: XCircle, variant: "destructive" },
};

const formatPrice = (cents: number, currency = "EUR") =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

const OrderTracking = () => {
  const { orderNumber: paramOrderNumber } = useParams<{ orderNumber: string }>();
  const [searchInput, setSearchInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const prevStatusRef = useRef<string | null>(null);

  useSeo({
    title: order
      ? `Pasūtījums ${order.order_number} | Luxury Chocolate`
      : "Pasūtījuma izsekošana | Luxury Chocolate",
    description: "Sekojiet sava pasūtījuma statusam reāllaikā — ražošana, nosūtīšana, piegāde.",
    path: paramOrderNumber ? `/track/${paramOrderNumber}` : "/track",
  });

  // Initial fetch
  const fetchOrder = async (number: string, email?: string) => {
    setLoading(true);
    setError(null);
    let query = supabase
      .from("orders")
      .select("*")
      .eq("order_number", number.trim().toUpperCase())
      .maybeSingle();

    const { data, error: err } = await query;

    if (err || !data) {
      setOrder(null);
      setError("Pasūtījums nav atrasts. Pārbaudi numuru.");
      setLoading(false);
      return;
    }

    // Verify email if order has no user_id-matching session
    const { data: authData } = await supabase.auth.getUser();
    const isOwner = authData?.user && (data as any).user_id === authData.user.id;
    if (!isOwner && email && email.trim().toLowerCase() !== data.customer_email.toLowerCase()) {
      setOrder(null);
      setError("E-pasts neatbilst šim pasūtījumam.");
      setLoading(false);
      return;
    }

    setOrder(data as Order);
    prevStatusRef.current = data.status;
    setLoading(false);
  };

  useEffect(() => {
    if (paramOrderNumber) {
      setSearchInput(paramOrderNumber);
      fetchOrder(paramOrderNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramOrderNumber]);

  // Realtime subscription
  useEffect(() => {
    if (!order?.id) return;

    const channel = supabase
      .channel(`order-${order.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${order.id}`,
        },
        (payload) => {
          const updated = payload.new as Order;
          const prevStatus = prevStatusRef.current;
          setOrder(updated);

          if (prevStatus && prevStatus !== updated.status) {
            const label = STATUS_META[updated.status]?.label || updated.status;
            toast.success(`Statuss mainīts: ${label}`, {
              description: `Pasūtījums ${updated.order_number}`,
            });

            // Browser notification
            if (notificationsEnabled && "Notification" in window && Notification.permission === "granted") {
              new Notification(`Pasūtījums ${updated.order_number}`, {
                body: `Jauns statuss: ${label}`,
                icon: "/favicon.ico",
              });
            }
          }
          prevStatusRef.current = updated.status;
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [order?.id, notificationsEnabled]);

  const requestNotifications = async () => {
    if (!("Notification" in window)) {
      toast.error("Pārlūks neatbalsta paziņojumus");
      return;
    }
    if (Notification.permission === "granted") {
      setNotificationsEnabled(true);
      toast.success("Paziņojumi ieslēgti");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setNotificationsEnabled(true);
      toast.success("Paziņojumi ieslēgti");
    } else {
      toast.error("Paziņojumi noraidīti");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    fetchOrder(searchInput, emailInput);
  };

  const currentStepIndex = order ? STATUS_FLOW.indexOf(order.status as any) : -1;
  const isTerminal = order?.status === "cancelled" || order?.status === "refunded";

  return (
    <main className="min-h-screen bg-background pt-14 lg:pt-24">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Pasūtījuma izsekošana</h1>
        <p className="text-muted-foreground mb-8">
          Seko sava pasūtījuma statusam reāllaikā.
        </p>

        {/* Search form */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Pasūtījuma nr. (ORD-...)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="E-pasts (ja neesi pieteicies)"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Search className="h-4 w-4 mr-2" />Meklēt</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-destructive/50 mb-6">
            <CardContent className="pt-6 text-sm text-destructive">{error}</CardContent>
          </Card>
        )}

        {order && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <CardTitle className="font-mono text-base">{order.order_number}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{order.customer_email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={STATUS_META[order.status]?.variant || "outline"}>
                      {STATUS_META[order.status]?.label || order.status}
                    </Badge>
                    <span className="font-semibold">{formatPrice(order.total_cents, order.currency)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant={notificationsEnabled ? "secondary" : "outline"}
                  size="sm"
                  onClick={requestNotifications}
                  disabled={notificationsEnabled}
                >
                  {notificationsEnabled ? (
                    <><Bell className="h-4 w-4 mr-2" />Paziņojumi ieslēgti</>
                  ) : (
                    <><BellOff className="h-4 w-4 mr-2" />Ieslēgt paziņojumus</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Progress timeline */}
            {!isTerminal && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-border ml-3 space-y-6">
                    {STATUS_FLOW.map((step, idx) => {
                      const meta = STATUS_META[step];
                      const Icon = meta.icon;
                      const isDone = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <li key={step} className="ml-6">
                          <span
                            className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background ${
                              isDone ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-3 w-3" />
                          </span>
                          <h3 className={`font-medium ${isCurrent ? "text-primary" : isDone ? "" : "text-muted-foreground"}`}>
                            {meta.label}
                          </h3>
                          {isCurrent && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Atjaunots: {new Date(order.updated_at).toLocaleString("lv-LV")}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </CardContent>
              </Card>
            )}

            {order.tracking_number && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Sūtījuma izsekošanas numurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={`https://www.venipak.com/tracking/?code=${encodeURIComponent(order.tracking_number)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm hover:text-primary hover:underline"
                  >
                    {order.tracking_number}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">
                    Sekot sūtījumam Venipak vietnē
                  </p>
                </CardContent>
              </Card>
            )}

            {order.shipping_address && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Piegādes adrese</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {order.shipping_address}
                  {order.shipping_city && `, ${order.shipping_city}`}
                  {order.shipping_postal_code && `, ${order.shipping_postal_code}`}
                  {order.shipping_country && `, ${order.shipping_country}`}
                </CardContent>
              </Card>
            )}

            <div className="mt-8 text-sm text-muted-foreground">
              <Link to="/account" className="underline hover:text-foreground">Skatīt visus manus pasūtījumus</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default OrderTracking;
