import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSeo } from "@/hooks/useSeo";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminAffiliates from "@/components/admin/AdminAffiliates";
import { toast } from "sonner";
import { Loader2, Package, Search, ShieldAlert, ShoppingBag, Users } from "lucide-react";

type OrderStatus =
  | "pending"
  | "paid"
  | "in_production"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Gaida apmaksu",
  paid: "Apmaksāts",
  in_production: "Ražošanā",
  shipped: "Nosūtīts",
  delivered: "Piegādāts",
  cancelled: "Atcelts",
  refunded: "Atmaksāts",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
  paid: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  in_production: "bg-purple-500/15 text-purple-700 border-purple-500/30",
  shipped: "bg-indigo-500/15 text-indigo-700 border-indigo-500/30",
  delivered: "bg-green-500/15 text-green-700 border-green-500/30",
  cancelled: "bg-red-500/15 text-red-700 border-red-500/30",
  refunded: "bg-gray-500/15 text-gray-700 border-gray-500/30",
};

interface OrderItem {
  id: string;
  product_name: string;
  shape: string | null;
  width_mm: number | null;
  height_mm: number | null;
  chocolate_type: string | null;
  quantity: number;
  unit_price_cents: number;
  total_price_cents: number;
  logo_url: string | null;
  custom_text: string | null;
  notes: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;
  currency: string;
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
  notes: string | null;
  admin_notes: string | null;
  tracking_number: string | null;
  created_at: string;
  paid_at: string | null;
  order_items: OrderItem[];
}

const formatPrice = (cents: number, currency: string) =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("lv-LV", { dateStyle: "short", timeStyle: "short" });

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [adminNotesDraft, setAdminNotesDraft] = useState<Record<string, string>>({});
  const [trackingDraft, setTrackingDraft] = useState<Record<string, string>>({});
  const [emailingId, setEmailingId] = useState<string | null>(null);

  useSeo({
    title: "Admin — Pasūtījumi | Luxury Chocolate",
    description: "Pasūtījumu pārvaldība administratoriem.",
    path: "/admin",
  });

  // Auth gate
  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [user, authLoading, navigate]);

  // Check admin role
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) {
        console.error(error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    })();
  }, [user]);

  // Load orders
  const loadOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast.error("Neizdevās ielādēt pasūtījumus: " + error.message);
    } else {
      setOrders((data as unknown as Order[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) loadOrders();
  }, [isAdmin]);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    setSavingId(orderId);
    const trackingNumber = trackingDraft[orderId];
    const updates: { status: OrderStatus; tracking_number?: string } = { status };
    if (status === "shipped" && trackingNumber) {
      updates.tracking_number = trackingNumber;
    }
    const { error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", orderId);
    setSavingId(null);
    if (error) {
      toast.error("Neizdevās atjaunināt: " + error.message);
      return;
    }
    toast.success("Statuss atjaunināts");
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status, ...(updates.tracking_number ? { tracking_number: updates.tracking_number } : {}) }
          : o,
      ),
    );

    // Auto-notify customer via email
    setEmailingId(orderId);
    const { data, error: emailErr } = await supabase.functions.invoke(
      "send-order-status-email",
      { body: { orderId, status, trackingNumber } },
    );
    setEmailingId(null);
    if (emailErr || (data as any)?.error) {
      toast.error("Statuss atjaunināts, bet e-pasts nenosūtīts");
    } else if (!(data as any)?.skipped) {
      toast.success("Klientam nosūtīts paziņojums");
    }
  };

  const sendStatusEmail = async (orderId: string, status: OrderStatus) => {
    setEmailingId(orderId);
    const trackingNumber = trackingDraft[orderId];
    const { data, error } = await supabase.functions.invoke(
      "send-order-status-email",
      { body: { orderId, status, trackingNumber } },
    );
    setEmailingId(null);
    if (error || (data as any)?.error) {
      toast.error("Neizdevās nosūtīt e-pastu");
      return;
    }
    if ((data as any)?.skipped) {
      toast.info("Šim statusam e-pasts netiek sūtīts");
      return;
    }
    // If shipped + tracking provided, persist it
    if (status === "shipped" && trackingNumber) {
      await supabase
        .from("orders")
        .update({ tracking_number: trackingNumber })
        .eq("id", orderId);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, tracking_number: trackingNumber } : o,
        ),
      );
    }
    toast.success("E-pasts klientam nosūtīts");
  };

  const saveAdminNotes = async (orderId: string) => {
    const value = adminNotesDraft[orderId] ?? "";
    setSavingId(orderId);
    const { error } = await supabase
      .from("orders")
      .update({ admin_notes: value })
      .eq("id", orderId);
    setSavingId(null);
    if (error) {
      toast.error("Neizdevās saglabāt piezīmes");
    } else {
      toast.success("Piezīmes saglabātas");
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, admin_notes: value } : o)),
      );
    }
  };

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (search) {
        const s = search.toLowerCase();
        if (
          !o.order_number.toLowerCase().includes(s) &&
          !o.customer_email.toLowerCase().includes(s) &&
          !(o.customer_name?.toLowerCase().includes(s))
        ) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, search]);

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background pt-14 lg:pt-24">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Piekļuve liegta</h1>
          <p className="text-muted-foreground">
            Šī lapa ir pieejama tikai administratoriem.
          </p>
          <Button className="mt-6" onClick={() => navigate("/account")}>
            Uz manu kontu
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-14 lg:pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
          <Package className="h-7 w-7 text-primary" />
          Admin panelis
        </h1>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingBag className="w-4 h-4" /> Pasūtījumi
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" /> Produkti
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="orders">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-muted-foreground">
              Kopā: {orders.length} • Filtrēti: {filtered.length}
            </p>
          </div>
          <Button variant="outline" onClick={loadOrders} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Atjaunināt"}
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Meklēt pēc nr., e-pasta vai vārda..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Visi statusi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Visi statusi</SelectItem>
                {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Pasūtījumu nav.
            </CardContent>
          </Card>
        ) : (
          <Accordion type="multiple" className="space-y-3">
            {filtered.map((order) => (
              <AccordionItem
                key={order.id}
                value={order.id}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/40">
                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
                    <div className="flex items-center gap-3 min-w-0">
                      <Badge
                        variant="outline"
                        className={STATUS_COLORS[order.status]}
                      >
                        {STATUS_LABELS[order.status]}
                      </Badge>
                      <div className="min-w-0">
                        <div className="font-mono text-sm font-semibold truncate">
                          {order.order_number}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {order.customer_name || order.customer_email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground hidden sm:inline">
                        {formatDate(order.created_at)}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(order.total_cents, order.currency)}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="mb-4 flex flex-wrap justify-end gap-2">
                    <a
                      href={`/admin/rekins/${order.id}?type=proforma`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
                    >
                      📄 Priekšapmaksas rēķins
                    </a>
                    <a
                      href={`/admin/rekins/${order.id}?type=invoice`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted"
                    >
                      🧾 Rēķins-Pavadzīme
                    </a>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: customer + items */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Klients</h4>
                        <div className="text-sm space-y-1 text-muted-foreground">
                          <div>{order.customer_name || "—"}</div>
                          <div>
                            <a
                              href={`mailto:${order.customer_email}`}
                              className="text-primary hover:underline"
                            >
                              {order.customer_email}
                            </a>
                          </div>
                          {order.customer_phone && (
                            <div>
                              <a
                                href={`tel:${order.customer_phone}`}
                                className="text-primary hover:underline"
                              >
                                {order.customer_phone}
                              </a>
                            </div>
                          )}
                          {order.shipping_address && (
                            <div className="pt-2">
                              {order.shipping_address}
                              {order.shipping_city && `, ${order.shipping_city}`}
                              {order.shipping_postal_code &&
                                `, ${order.shipping_postal_code}`}
                              {order.shipping_country &&
                                `, ${order.shipping_country}`}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Produkti</h4>
                        {order.order_items?.map((item) => (
                          <div
                            key={item.id}
                            className="border border-border rounded p-3 mb-2 text-sm"
                          >
                            <div className="font-medium">{item.product_name}</div>
                            <div className="text-muted-foreground text-xs mt-1 space-y-0.5">
                              {item.shape && <div>Forma: {item.shape}</div>}
                              {item.width_mm && item.height_mm && (
                                <div>
                                  Izmērs: {item.width_mm}×{item.height_mm} mm
                                </div>
                              )}
                              {item.chocolate_type && (
                                <div>Šokolāde: {item.chocolate_type}</div>
                              )}
                              {item.custom_text && (
                                <div>Teksts: "{item.custom_text}"</div>
                              )}
                              <div>
                                {item.quantity} ×{" "}
                                {formatPrice(item.unit_price_cents, order.currency)}{" "}
                                ={" "}
                                <strong>
                                  {formatPrice(
                                    item.total_price_cents,
                                    order.currency,
                                  )}
                                </strong>
                              </div>
                            </div>
                            {item.logo_url && (
                              <div className="mt-2">
                                <a
                                  href={item.logo_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block"
                                >
                                  <img
                                    src={item.logo_url}
                                    alt="Klienta logo"
                                    className="max-h-24 rounded border border-border bg-white p-1"
                                  />
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">
                            Klienta piezīmes
                          </h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {order.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right: status + admin notes + totals */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Statuss</h4>
                        <Select
                          value={order.status}
                          onValueChange={(v) =>
                            updateStatus(order.id, v as OrderStatus)
                          }
                          disabled={savingId === order.id}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(Object.keys(STATUS_LABELS) as OrderStatus[]).map(
                              (s) => (
                                <SelectItem key={s} value={s}>
                                  {STATUS_LABELS[s]}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>

                        {order.status === "shipped" && (
                          <div className="mt-3">
                            <label className="text-xs text-muted-foreground block mb-1">
                              Izsekošanas numurs (neobligāts)
                            </label>
                            <Input
                              placeholder="Piem. LV123456789LV"
                              value={
                                trackingDraft[order.id] ??
                                order.tracking_number ??
                                ""
                              }
                              onChange={(e) =>
                                setTrackingDraft((p) => ({
                                  ...p,
                                  [order.id]: e.target.value,
                                }))
                              }
                            />
                          </div>
                        )}

                        <Button
                          size="sm"
                          variant="secondary"
                          className="mt-3 w-full"
                          onClick={() => sendStatusEmail(order.id, order.status)}
                          disabled={emailingId === order.id}
                        >
                          {emailingId === order.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "📧 Atkārtoti nosūtīt e-pastu"
                          )}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          E-pasts tiek nosūtīts automātiski, mainot statusu. Šeit vari nosūtīt to atkārtoti.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">
                          Iekšējās piezīmes
                        </h4>
                        <Textarea
                          rows={4}
                          placeholder="Tikai administratoriem..."
                          value={
                            adminNotesDraft[order.id] ?? order.admin_notes ?? ""
                          }
                          onChange={(e) =>
                            setAdminNotesDraft((p) => ({
                              ...p,
                              [order.id]: e.target.value,
                            }))
                          }
                        />
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => saveAdminNotes(order.id)}
                          disabled={savingId === order.id}
                        >
                          {savingId === order.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Saglabāt piezīmes"
                          )}
                        </Button>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Summas</h4>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Starpsumma</span>
                            <span>
                              {formatPrice(order.subtotal_cents, order.currency)}
                            </span>
                          </div>
                          {order.shipping_cents > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                              <span>Piegāde</span>
                              <span>
                                {formatPrice(
                                  order.shipping_cents,
                                  order.currency,
                                )}
                              </span>
                            </div>
                          )}
                          {order.tax_cents > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                              <span>PVN</span>
                              <span>
                                {formatPrice(order.tax_cents, order.currency)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between font-semibold pt-2 border-t border-border">
                            <span>Kopā</span>
                            <span>
                              {formatPrice(order.total_cents, order.currency)}
                            </span>
                          </div>
                        </div>
                        {order.paid_at && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Apmaksāts: {formatDate(order.paid_at)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
