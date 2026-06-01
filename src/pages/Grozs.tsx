import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AffiliateCodeInput from "@/components/AffiliateCodeInput";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSeo } from "@/hooks/useSeo";
import { useToast } from "@/hooks/use-toast";
import { getStoredRef, type StoredRef } from "@/lib/affiliateRef";

interface LogoRef { url: string; filename: string; quantity?: number }
interface CartLine {
  id: string;
  quantity: number;
  logo_url: string | null;
  logo_filename: string | null;
  logos: LogoRef[];
  product: {
    id: string;
    slug: string;
    name: string;
    price_cents: number;
    currency: string;
    in_stock: boolean;
    image_url: string | null;
  };
}

type ProductFromCart = Omit<CartLine["product"], "image_url">;

interface CartQueryRow {
  id: string;
  quantity: number;
  logo_url: string | null;
  logo_filename: string | null;
  logos: LogoRef[] | null;
  product: ProductFromCart | null;
}

interface ProductImageRow {
  product_id: string;
  url: string;
}

const formatPrice = (cents: number, currency = "EUR") =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

const SHIPPING_OPTIONS = [
  { id: "pickup", label: "Izņemt uz vietas — Kandavas iela 29A, Rīga", cents: 0 },
  { id: "venipak_pakomats", label: "Venipak pakomāts", cents: 1000 },
  { id: "courier_riga", label: "Mūsu piegāde Rīgā", cents: 3000 },
  { id: "venipak_lv", label: "Venipak Latvija", cents: 5500 },
  { id: "venipak_baltic", label: "Venipak Baltija", cents: 6000 },
  { id: "venipak_scandi", label: "Venipak Skandināvija", cents: 8000 },
  { id: "venipak_eu", label: "Venipak Eiropa", cents: 10000 },
  { id: "venipak_world", label: "Venipak Pasaule", cents: 20000 },
] as const;

const Grozs = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<CartLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [shippingId, setShippingId] = useState<string>(() =>
    sessionStorage.getItem("shipping_id") || "pickup"
  );
  const [affRef, setAffRef] = useState<StoredRef | null>(() => getStoredRef());

  useSeo({
    title: "Grozs — Luxury Chocolate",
    description: "Tavs šokolādes grozs. Pārskati produktus un dodies uz kasi.",
    path: "/grozs",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth?redirect=/grozs", { replace: true });
  }, [authLoading, user, navigate]);

  const shipping = SHIPPING_OPTIONS.find((o) => o.id === shippingId) ?? SHIPPING_OPTIONS[0];

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, quantity, logo_url, logo_filename, logos, product:products(id, slug, name, price_cents, currency, in_stock)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Kļūda", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    const rows = ((data ?? []) as unknown as CartQueryRow[]).filter(
      (r): r is CartQueryRow & { product: ProductFromCart } => Boolean(r.product),
    );
    const productIds = rows.map((r) => r.product.id);
    const imageMap = new Map<string, string>();
    if (productIds.length) {
      const { data: imgs } = await supabase
        .from("product_images")
        .select("product_id, url, is_primary, sort_order")
        .in("product_id", productIds)
        .order("is_primary", { ascending: false })
        .order("sort_order", { ascending: true });
      ((imgs ?? []) as ProductImageRow[]).forEach((i) => {
        if (!imageMap.has(i.product_id)) imageMap.set(i.product_id, i.url);
      });
    }
    setItems(
      rows.map((r) => {
        const logos: LogoRef[] = Array.isArray(r.logos) && r.logos.length > 0
          ? r.logos
          : (r.logo_url ? [{ url: r.logo_url, filename: r.logo_filename ?? "", quantity: r.quantity }] : []);
        return {
          id: r.id,
          quantity: r.quantity,
          logo_url: r.logo_url,
          logo_filename: r.logo_filename,
          logos,
          product: { ...r.product, image_url: imageMap.get(r.product.id) ?? null },
        };
      }),
    );
    setLoading(false);
  }, [toast, user]);

  useEffect(() => {
    if (user) load();
  }, [load, user]);

  const updateQty = async (id: string, qty: number) => {
    if (qty < 1) return;
    setBusyId(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
    await supabase.from("cart_items").update({ quantity: qty }).eq("id", id);
    window.dispatchEvent(new Event("cart-updated"));
    setBusyId(null);
  };

  const remove = async (id: string) => {
    setBusyId(id);
    await supabase.from("cart_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    window.dispatchEvent(new Event("cart-updated"));
    setBusyId(null);
  };

  const subtotal = items.reduce((s, i) => s + i.product.price_cents * i.quantity, 0);
  const currency = items[0]?.product.currency ?? "EUR";
  const total = subtotal + shipping.cents;
  const isBelowPaymentMinimum = total > 0 && total < 50;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        <Link
          to="/veikals"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Turpināt iepirkties
        </Link>

        <h1 className="text-3xl sm:text-4xl text-foreground mb-8 flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-primary" />
          Tavs grozs
        </h1>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 bg-card rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <p className="text-lg text-muted-foreground mb-4">Grozs ir tukšs</p>
            <Link
              to="/veikals"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 h-11 text-sm font-medium uppercase tracking-wide hover:brightness-110 transition-all"
            >
              Doties uz veikalu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-card rounded-xl p-4 border border-border/50"
                >
                  <Link
                    to={`/veikals/${item.product.slug}`}
                    className="w-24 h-24 shrink-0 bg-muted rounded-lg overflow-hidden"
                  >
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        —
                      </div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/veikals/${item.product.slug}`}
                      className="text-sm font-medium text-foreground hover:text-primary line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-primary mt-1">
                      {formatPrice(item.product.price_cents, item.product.currency)}
                    </p>
                    {item.logos.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.logos.map((l, idx) => {
                          const isImg = /\.(png|jpe?g|gif|svg|webp|bmp)$/i.test(l.filename);
                          return (
                            <a
                              key={idx}
                              href={l.url}
                              target="_blank"
                              rel="noreferrer"
                              title={l.filename}
                              className="group flex items-center gap-1.5 max-w-[180px] rounded-md border border-border bg-background px-1.5 py-1 hover:border-primary transition-colors"
                            >
                              {isImg ? (
                                <img src={l.url} alt={l.filename} className="w-8 h-8 object-contain rounded" />
                              ) : (
                                <span className="w-8 h-8 flex items-center justify-center rounded bg-muted text-[10px] uppercase text-muted-foreground">
                                  {l.filename.split('.').pop()?.slice(0, 4) || 'file'}
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground truncate group-hover:text-foreground">
                                {l.filename}
                                {l.quantity && l.quantity > 1 ? ` ×${l.quantity}` : ""}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          type="button"
                          disabled={busyId === item.id || item.quantity <= 1}
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted disabled:opacity-30"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          disabled={busyId === item.id}
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        disabled={busyId === item.id}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                        aria-label="Noņemt"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium text-foreground shrink-0">
                    {formatPrice(item.product.price_cents * item.quantity, item.product.currency)}
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-card rounded-xl p-6 border border-border h-fit lg:sticky lg:top-24">
              <h2 className="text-lg text-foreground mb-4">Pasūtījuma kopsavilkums</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Piegāde</label>
                <div className="space-y-1.5">
                  {SHIPPING_OPTIONS.map((o) => (
                    <label
                      key={o.id}
                      className={`flex items-start gap-2 p-2 rounded-md border cursor-pointer text-xs transition-colors ${
                        shippingId === o.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={o.id}
                        checked={shippingId === o.id}
                        onChange={() => {
                          setShippingId(o.id);
                          sessionStorage.setItem("shipping_id", o.id);
                        }}
                        className="mt-0.5"
                      />
                      <span className="flex-1 flex justify-between gap-2">
                        <span>{o.label}</span>
                        <span className="font-medium whitespace-nowrap">
                          {o.cents === 0 ? "Bezmaksas" : formatPrice(o.cents, currency)}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Starpsumma ({items.reduce((s, i) => s + i.quantity, 0)} preces)</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Piegāde</span>
                  <span>{shipping.cents === 0 ? "Bezmaksas" : formatPrice(shipping.cents, currency)}</span>
                </div>
                <div className="flex justify-between text-base font-medium text-foreground pt-3 border-t border-border">
                  <span>Kopā</span>
                  <span className="text-primary">{formatPrice(total, currency)}</span>
                </div>
                <p className="text-xs text-muted-foreground">PVN iekļauts</p>
                {isBelowPaymentMinimum && (
                  <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                    Kartes maksājuma minimums ir €0.50. Pievieno vēl preces vai izvēlies piegādi.
                  </p>
                )}
              </div>
              <button
                type="button"
                disabled={isBelowPaymentMinimum}
                onClick={() => {
                  if (isBelowPaymentMinimum) {
                    toast({
                      title: "Maksājums nav pieejams",
                      description: "Kartes maksājuma minimums ir €0.50.",
                      variant: "destructive",
                    });
                    return;
                  }
                  navigate("/rekins");
                }}
                className="w-full mt-6 bg-primary text-primary-foreground rounded-lg h-12 text-sm font-medium uppercase tracking-wide hover:brightness-110 active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-50"
              >
                Apskatīt rēķinu un apmaksāt
              </button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Pirms apmaksas tiks parādīts rēķins, ko vari saglabāt PDF formātā vai izdrukāt.
              </p>
              <button
                type="button"
                onClick={() => navigate("/kase")}
                disabled={isBelowPaymentMinimum}
                className="w-full mt-3 bg-card border border-border text-muted-foreground rounded-lg h-10 text-xs font-medium hover:bg-muted transition-all disabled:opacity-50"
              >
                Izlaist rēķinu un doties tieši uz apmaksu
              </button>
            </aside>
          </div>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default Grozs;
