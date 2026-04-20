import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { ArrowLeft, Upload, ShoppingCart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { getStripe, stripeEnvironment } from "@/lib/stripe";
import {
  CAKE_TIERS,
  type CakeShape,
  type ChocolateType,
  calcAreaCm2,
  formatEUR,
  getTierForSize,
} from "@/lib/cakePricing";

const SHAPES: { id: CakeShape; label: string }[] = [
  { id: "round", label: "Apaļa" },
  { id: "square", label: "Kvadrāta" },
  { id: "oval", label: "Ovāla" },
  { id: "rectangle", label: "Taisnstūra" },
];

const CHOCOLATES: { id: ChocolateType; label: string }[] = [
  { id: "milk", label: "Piena" },
  { id: "dark", label: "Tumšā" },
  { id: "white", label: "Baltā" },
];

const KukuSokoladesVeikals = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [shape, setShape] = useState<CakeShape>("round");
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(6);
  const [quantity, setQuantity] = useState(20);
  const [chocolate, setChocolate] = useState<ChocolateType>("milk");
  const [customText, setCustomText] = useState("");
  const [notes, setNotes] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [creatingSession, setCreatingSession] = useState(false);

  // Sync width=height for shapes that have one dimension
  useEffect(() => {
    if (shape === "round" || shape === "square") setHeight(width);
  }, [shape, width]);

  const tier = useMemo(() => getTierForSize(width, height), [width, height]);
  const area = useMemo(() => calcAreaCm2(shape, width, height), [shape, width, height]);
  const totalCents = tier.unitPriceCents * quantity;

  useEffect(() => {
    document.title = "Kūku šokolādes veikals — Luxury Chocolate";
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      toast({ title: "Logo pārāk liels", description: "Maks. 10 MB", variant: "destructive" });
      return;
    }
    setLogoFile(f);
  };

  const uploadLogo = async (): Promise<{ url: string; filename: string } | null> => {
    if (!logoFile || !user) return null;
    setUploading(true);
    try {
      const ext = logoFile.name.split(".").pop() || "png";
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("customer-logos")
        .upload(path, logoFile, { upsert: false });
      if (error) throw error;
      return { url: path, filename: logoFile.name };
    } catch (err) {
      toast({
        title: "Logo augšupielāde neizdevās",
        description: (err as Error).message,
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleCheckout = async () => {
    if (quantity < 1) {
      toast({ title: "Min. 1 gab.", variant: "destructive" });
      return;
    }
    setCreatingSession(true);
    try {
      let logoMeta: { url: string; filename: string } | null = null;
      if (logoFile && user) {
        logoMeta = await uploadLogo();
      }

      const metadata: Record<string, string> = {
        shape,
        width_mm: String(width * 10),
        height_mm: String(height * 10),
        area_cm2: area.toFixed(2),
        chocolate_type: chocolate,
        tier: tier.id,
      };
      if (customText) metadata.custom_text = customText.slice(0, 200);
      if (notes) metadata.notes = notes.slice(0, 500);
      if (logoMeta) {
        metadata.logo_url = logoMeta.url;
        metadata.logo_filename = logoMeta.filename;
      }

      const { data, error } = await supabase.functions.invoke("create-cake-checkout", {
        body: {
          priceId: tier.priceId,
          quantity,
          customerEmail: user?.email,
          userId: user?.id,
          environment: stripeEnvironment,
          returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
          metadata,
        },
      });

      if (error || !data?.clientSecret) {
        throw new Error(error?.message || "Neizdevās izveidot maksājuma sesiju");
      }
      setClientSecret(data.clientSecret);
      setCheckoutOpen(true);
    } catch (err) {
      toast({
        title: "Kļūda",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setCreatingSession(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PaymentTestModeBanner />

      <header className="border-b border-border bg-foreground text-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm hover:opacity-80">
            <ArrowLeft size={16} /> Atpakaļ uz sākumu
          </Link>
          <Link to={user ? "/account" : "/auth"} className="text-sm underline">
            {user ? "Mans konts" : "Pieslēgties"}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Kūku šokolādes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pielāgo formu, izmēru un daudzumu. Augšupielādē savu logo un samaksā uzreiz —
            ražošana 3 dienās, piegāde pa visu Eiropu.
          </p>
        </div>

        {checkoutOpen && clientSecret ? (
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => {
                setCheckoutOpen(false);
                setClientSecret(null);
              }}
              className="mb-4"
            >
              <ArrowLeft size={16} /> Atgriezties pie konfigurācijas
            </Button>
            <div className="rounded-lg border border-border bg-card p-2">
              <EmbeddedCheckoutProvider
                stripe={getStripe()}
                options={{ fetchClientSecret: async () => clientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Configurator */}
            <div className="space-y-6">
              {/* Shape */}
              <section className="space-y-3">
                <Label className="text-base font-semibold">Forma</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setShape(s.id)}
                      className={`px-3 py-3 rounded-md border text-sm font-medium transition-colors ${
                        shape === s.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-muted border-border"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Size */}
              <section className="space-y-3">
                <Label className="text-base font-semibold">Izmērs</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      {shape === "round" ? "Diametrs" : "Platums"} (cm)
                    </Label>
                    <Input
                      type="number"
                      min={3}
                      max={12}
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value) || 3)}
                    />
                  </div>
                  {shape !== "round" && shape !== "square" && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Augstums (cm)</Label>
                      <Input
                        type="number"
                        min={3}
                        max={12}
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value) || 3)}
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Laukums ~{area.toFixed(1)} cm² • Cenu līmenis: <strong>{tier.label}</strong>
                </p>
              </section>

              {/* Chocolate type */}
              <section className="space-y-3">
                <Label className="text-base font-semibold">Šokolādes tips</Label>
                <div className="grid grid-cols-3 gap-2">
                  {CHOCOLATES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setChocolate(c.id)}
                      className={`px-3 py-3 rounded-md border text-sm font-medium transition-colors ${
                        chocolate === c.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-muted border-border"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Quantity */}
              <section className="space-y-3">
                <Label className="text-base font-semibold">Daudzums (gab.)</Label>
                <Input
                  type="number"
                  min={1}
                  max={10000}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                />
              </section>

              {/* Logo upload */}
              <section className="space-y-3">
                <Label className="text-base font-semibold">Logo (neobligāti)</Label>
                {!user && (
                  <p className="text-xs text-muted-foreground">
                    <Link to="/auth" className="underline">Pieslēdzies</Link>, lai augšupielādētu logo
                    un saglabātu pasūtījumu vēsturē.
                  </p>
                )}
                <label className="flex items-center gap-3 px-4 py-3 rounded-md border border-dashed border-border hover:bg-muted cursor-pointer transition-colors">
                  <Upload size={18} />
                  <span className="text-sm">
                    {logoFile ? logoFile.name : "Izvēlies failu (PNG, SVG, PDF — līdz 10 MB)"}
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,application/pdf"
                    className="hidden"
                    onChange={handleLogoChange}
                    disabled={!user}
                  />
                </label>
              </section>

              {/* Custom text */}
              <section className="space-y-3">
                <Label htmlFor="customText" className="text-base font-semibold">
                  Teksts uz šokolādes (neobligāti)
                </Label>
                <Input
                  id="customText"
                  maxLength={50}
                  placeholder="Piem. uzņēmuma nosaukums"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                />
              </section>

              {/* Notes */}
              <section className="space-y-3">
                <Label htmlFor="notes" className="text-base font-semibold">
                  Piezīmes pasūtījumam
                </Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Krāsas, iepakojums, piegādes datums..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </section>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-4 rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Pasūtījuma kopsavilkums</h2>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Forma</dt>
                  <dd>{SHAPES.find((s) => s.id === shape)?.label}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Izmērs</dt>
                  <dd>
                    {shape === "round" || shape === "square"
                      ? `${width} cm`
                      : `${width}×${height} cm`}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Šokolāde</dt>
                  <dd>{CHOCOLATES.find((c) => c.id === chocolate)?.label}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Cenu līmenis</dt>
                  <dd>{tier.label}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Cena par gab.</dt>
                  <dd>{formatEUR(tier.unitPriceCents)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Daudzums</dt>
                  <dd>{quantity}</dd>
                </div>
              </dl>

              <div className="border-t border-border pt-4 flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Kopā</span>
                <span className="text-2xl font-bold">{formatEUR(totalCents)}</span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={creatingSession || uploading}
                className="w-full"
                size="lg"
              >
                {creatingSession || uploading ? (
                  <>
                    <Loader2 className="animate-spin" /> Sagatavoju...
                  </>
                ) : (
                  <>
                    <ShoppingCart /> Pirkt tagad
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Ražošana 3 dienās • Piegāde pa visu Eiropu • Min. 1 gab.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default KukuSokoladesVeikals;
