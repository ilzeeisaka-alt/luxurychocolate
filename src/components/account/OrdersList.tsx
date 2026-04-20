import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  paid_at: string | null;
  created_at: string;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_postal_code: string | null;
  shipping_country: string | null;
  order_items: OrderItem[];
}

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Gaida apmaksu", variant: "outline" },
  paid: { label: "Apmaksāts", variant: "default" },
  in_production: { label: "Ražošanā", variant: "secondary" },
  shipped: { label: "Nosūtīts", variant: "secondary" },
  delivered: { label: "Piegādāts", variant: "default" },
  cancelled: { label: "Atcelts", variant: "destructive" },
  refunded: { label: "Atmaksāts", variant: "destructive" },
};

const formatPrice = (cents: number, currency = "EUR") =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("lv-LV", { year: "numeric", month: "long", day: "numeric" });

interface OrdersListProps {
  userId: string;
}

const OrdersList = ({ userId }: OrdersListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data as Order[]);
      }
      setLoading(false);
    })();
  }, [userId]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="py-12 text-center">
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="py-12 text-center">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Vēl nav neviena pasūtījuma.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Tavi pasūtījumi parādīsies šeit pēc apmaksas.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {orders.map((order) => {
        const statusInfo = STATUS_LABELS[order.status] || { label: order.status, variant: "outline" as const };
        const isOpen = expanded.has(order.id);

        return (
          <Card key={order.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-mono">{order.order_number}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(order.paid_at || order.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                  <span className="font-semibold">{formatPrice(order.total_cents, order.currency)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggle(order.id)}
                className="w-full justify-between -mt-2"
              >
                <span>
                  {order.order_items.length} {order.order_items.length === 1 ? "produkts" : "produkti"}
                </span>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {isOpen && (
                <div className="mt-4 space-y-4 pt-4 border-t">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {item.logo_url && (
                        <img
                          src={item.logo_url}
                          alt="Logo"
                          className="w-16 h-16 object-contain bg-muted rounded border"
                        />
                      )}
                      <div className="flex-1 text-sm">
                        <div className="font-medium">{item.product_name}</div>
                        <div className="text-muted-foreground mt-1 space-y-0.5">
                          {item.shape && <div>Forma: {item.shape}</div>}
                          {item.width_mm && item.height_mm && (
                            <div>Izmērs: {item.width_mm}×{item.height_mm} mm</div>
                          )}
                          {item.chocolate_type && <div>Šokolāde: {item.chocolate_type}</div>}
                          {item.custom_text && <div>Teksts: "{item.custom_text}"</div>}
                          <div>
                            Daudzums: {item.quantity} × {formatPrice(item.unit_price_cents, order.currency)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm font-medium whitespace-nowrap">
                        {formatPrice(item.total_price_cents, order.currency)}
                      </div>
                    </div>
                  ))}

                  <div className="pt-3 border-t space-y-1 text-sm">
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
                    <div className="flex justify-between font-semibold pt-1">
                      <span>Kopā</span>
                      <span>{formatPrice(order.total_cents, order.currency)}</span>
                    </div>
                  </div>

                  {order.shipping_address && (
                    <div className="pt-3 border-t text-sm">
                      <div className="text-muted-foreground mb-1">Piegādes adrese:</div>
                      <div>
                        {order.shipping_address}
                        {order.shipping_city && `, ${order.shipping_city}`}
                        {order.shipping_postal_code && `, ${order.shipping_postal_code}`}
                        {order.shipping_country && `, ${order.shipping_country}`}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default OrdersList;
