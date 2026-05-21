import { useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ShoppingCart, Upload, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ProductLogoModal from "@/components/ProductLogoModal";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formatPrice = (cents: number, currency = "EUR") =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

const VeikalsProduct = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [pendingLogo, setPendingLogo] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["product-detail", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data: product, error } = await supabase
        .from("products")
        .select("*, product_categories(slug, name)")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!product) return null;
      const { data: images } = await supabase
        .from("product_images")
        .select("url, alt_text, is_primary, sort_order")
        .eq("product_id", product.id)
        .order("is_primary", { ascending: false })
        .order("sort_order", { ascending: true });
      return { product, images: images ?? [] };
    },
  });

  useSeo({
    title: data?.product?.name ?? "Produkts",
    description:
      data?.product?.short_description ??
      data?.product?.description?.slice(0, 160) ??
      "Premium šokolāde ar Jūsu logo.",
    path: `/veikals/${slug ?? ""}`,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-square bg-card rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-card rounded animate-pulse w-3/4" />
              <div className="h-6 bg-card rounded animate-pulse w-1/3" />
              <div className="h-24 bg-card rounded animate-pulse" />
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  if (!data?.product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-28 pb-16 text-center">
          <h1 className="text-3xl text-foreground mb-4">Produkts nav atrasts</h1>
          <Link to="/veikals" className="text-primary hover:underline">
            ← Atpakaļ uz veikalu
          </Link>
        </main>
        <FooterSection />
      </div>
    );
  }

  const { product, images } = data;
  const mainImage = images[activeImg]?.url;

  const handleAddToCart = async () => {
    if (!user) {
      const redirectPath = `/veikals/${slug ?? ""}`;
      toast({
        title: "Nepieciešama autentifikācija",
        description: "Lūdzu pieslēdzieties, lai pievienotu grozam.",
      });
      navigate(`/auth?redirect=${encodeURIComponent(redirectPath)}`);
      return;
    }
    setAdding(true);
    try {
      const { data: existing, error: fetchError } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .is("logo_url", null)
        .maybeSingle();
      if (fetchError) throw fetchError;

      if (existing) {
        const { error: updateError } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + qty })
          .eq("id", existing.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: qty,
        });
        if (insertError) throw insertError;
      }
      toast({ title: "Pievienots grozam", description: product.name });
      window.dispatchEvent(new Event("cart-updated"));
    } catch (e) {
      toast({
        title: "Kļūda",
        description: (e as Error).message || "Neizdevās pievienot grozam.",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-16">
        <Link
          to="/veikals"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Atpakaļ uz veikalu
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-square bg-card rounded-xl overflow-hidden mb-4">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={images[activeImg]?.alt_text || product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Bez attēla
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.slice(0, 10).map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      "aspect-square bg-card rounded-md overflow-hidden border-2 transition-colors",
                      activeImg === i ? "border-primary" : "border-transparent hover:border-border"
                    )}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.product_categories && (
              <Link
                to={`/veikals?category=${product.product_categories.slug}`}
                className="inline-block text-xs uppercase tracking-[0.15em] text-primary mb-3 hover:underline"
              >
                {product.product_categories.name}
              </Link>
            )}
            <h1 className="text-3xl sm:text-4xl text-foreground mb-4">{product.name}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-medium text-primary">
                {formatPrice(product.price_cents, product.currency)}
              </span>
              {product.prices_include_vat && (
                <span className="text-xs text-muted-foreground">ar PVN</span>
              )}
            </div>

            {product.short_description && (
              <p className="text-muted-foreground mb-6 leading-relaxed">{product.short_description}</p>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Check className="w-4 h-4 text-primary" />
              <span>
                {product.in_stock ? "Pieejams" : "Izgatavojam pēc pasūtījuma"}
                {product.preparation_days
                  ? ` · sagatavošana ${product.preparation_days} d.`
                  : ""}
                {product.delivery_days ? ` · piegāde ${product.delivery_days} d.` : ""}
              </span>
            </div>

            {/* Qty + add */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 text-lg hover:bg-card transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-14 h-11 bg-transparent text-center text-sm focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-11 text-lg hover:bg-card transition-colors"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg h-11 px-6 text-sm font-medium tracking-wide uppercase transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
              >
                <ShoppingCart className="w-4 h-4" />
                {adding ? "Pievieno..." : "Pievienot grozam"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="w-full inline-flex items-center justify-center gap-2 border border-primary text-primary rounded-lg h-11 px-6 text-sm font-medium tracking-wide transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Upload className="w-4 h-4" />
              Augšupielādēt logo / individuāls pasūtījums
            </button>
            <input
              ref={logoInputRef}
              type="file"
              accept=".png,.gif,.jpg,.jpeg,.svg,.webp,.pdf,.cdr,.eps,.ai,.tiff,.tif,.bmp,.psd,.heic,.heif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setPendingLogo(file);
                setOfferOpen(true);
                if (logoInputRef.current) logoInputRef.current.value = '';
              }}
            />


            {product.description && (
              <div className="mt-10 pt-8 border-t border-border">
                <h2 className="text-lg text-foreground mb-3">Apraksts</h2>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            )}

            {product.ingredients && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-foreground mb-2">Sastāvs</h3>
                <p className="text-sm text-muted-foreground">{product.ingredients}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterSection />
      <ProductLogoModal
        open={offerOpen}
        onOpenChange={(v) => { setOfferOpen(v); if (!v) setPendingLogo(null); }}
        productId={product.id}
        productName={product.name}
        initialFile={pendingLogo}
      />

    </div>
  );
};

export default VeikalsProduct;
