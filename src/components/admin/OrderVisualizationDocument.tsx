import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { orderDesignLogos, primaryProductPhoto, type OrderDesignItem } from "@/lib/orderVisualization";
import seal from "@/assets/logo-seal-clean.png";
import heroLogo from "@/assets/logo-hero-gold-center.png";
import chocoTime from "@/assets/its-choco-time-gold.png";
import ilzePhoto from "@/assets/ilze-eisaka.jpg";

interface Props {
  order: { order_number: string; customer_name: string | null; customer_email: string; customer_phone: string | null; company_name: string | null; vat_number: string | null; shipping_address: string | null; shipping_city?: string | null; shipping_postal_code?: string | null; shipping_country?: string | null; order_items: OrderDesignItem[] };
  date: string;
  registrationNumber: string;
  eventName: string;
  eventDate: string;
}

function DocumentImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? <p className="text-sm text-muted-foreground">{alt}: attēlu nevar atvērt.</p> : <img src={src} alt={alt} className={className} crossOrigin="anonymous" onError={() => setFailed(true)} />;
}

export default function OrderVisualizationDocument({ order, date, registrationNumber, eventName, eventDate }: Props) {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [logoUrls, setLogoUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true); setError("");
      try {
        const productIds = [...new Set(order.order_items.flatMap(item => item.product_id ? [item.product_id] : []))];
        const missingSlugs = [...new Set(order.order_items.flatMap(item => !item.product_id && item.product_slug ? [item.product_slug] : []))];
        const slugIds: Record<string, string> = {};
        if (missingSlugs.length) {
          const { data, error } = await supabase.from("products").select("id,slug").in("slug", missingSlugs);
          if (error) throw error;
          data?.forEach(product => { slugIds[product.slug] = product.id; productIds.push(product.id); });
        }
        const nextPhotos: Record<string, string> = {};
        if (productIds.length) {
          const { data, error } = await supabase.from("product_images").select("product_id,url,is_primary,sort_order").in("product_id", productIds);
          if (error) throw error;
          for (const item of order.order_items) {
            const id = item.product_id || slugIds[item.product_slug ?? ""];
            const photo = primaryProductPhoto((data ?? []).filter(image => image.product_id === id));
            if (photo) nextPhotos[item.id] = photo;
          }
        }
        const nextLogos: Record<string, string> = {};
        for (const item of order.order_items) {
          for (const logo of orderDesignLogos(item)) {
            const match = logo.url.match(/\/storage\/v1\/object\/(?:public|sign)\/customer-logos\/([^?]+)/);
            if (match?.[1]) {
              const { data, error } = await supabase.storage.from("customer-logos").createSignedUrl(decodeURIComponent(match[1]), 3600);
              if (error) throw error;
              nextLogos[logo.url] = data.signedUrl;
            } else nextLogos[logo.url] = logo.url;
          }
        }
        if (active) { setPhotos(nextPhotos); setLogoUrls(nextLogos); }
      } catch { if (active) setError("Neizdevās ielādēt visus produktu attēlus vai klienta logo. Atveriet vizualizāciju vēlreiz."); }
      finally { if (active) setLoading(false); }
    }
    void load();
    return () => { active = false; };
  }, [order]);

  return <div className="order-design space-y-8 text-foreground">
    <header className="flex flex-wrap items-center justify-between gap-6 border-b border-border pb-6">
      <div className="flex items-center gap-4"><DocumentImage src={seal} alt="Luxury Chocolate" className="h-20 w-20 object-contain" /><DocumentImage src={chocoTime} alt="It's Choco Time" className="h-20 w-32 object-contain" /></div>
      <div><h1 className="text-2xl font-bold">Pasūtījuma vizualizācija</h1><p className="mt-2 break-all">{order.order_number}</p><p className="text-sm text-muted-foreground">Datums: {date}</p></div>
    </header>
    <div className="grid gap-6 sm:grid-cols-2 text-sm">
      <section><h2 className="font-bold mb-3">Pārdevējs</h2><div className="flex items-start gap-4"><DocumentImage src={ilzePhoto} alt="Ilze Eisaka" className="h-24 w-20 object-cover object-top rounded" /><div className="min-w-0 break-words"><p className="font-semibold">Luxury Chocolate SIA</p><p>Ilze Eisaka</p><p>PVN: LV40103921954</p><p>Kandavas iela 29a, Rīga, LV-1083</p><p>info@luxurychocolate.lv</p><p>+371 26 177 853</p></div></div></section>
      <section className="min-w-0 break-words"><h2 className="font-bold mb-3">Pircējs</h2><p className="font-semibold">{order.company_name || order.customer_name || "—"}</p>{order.company_name && <p>{order.customer_name}</p>}{registrationNumber && <p>Reģ. Nr.: {registrationNumber}</p>}{order.vat_number && <p>PVN: {order.vat_number}</p>}<p>{order.customer_email}</p><p>{order.customer_phone}</p><p>{[order.shipping_address, order.shipping_city, order.shipping_postal_code, order.shipping_country].filter(Boolean).join(", ")}</p>{eventName && <p className="mt-2">Pasākums: {eventName}</p>}{eventDate && <p>Pasākuma datums / laiks: {eventDate}</p>}</section>
    </div>
    {loading && <p role="status">Ielādē attēlus…</p>}{error && <p role="alert" className="text-destructive">{error}</p>}
    {order.order_items.map(item => <section key={item.id} className="order-design-item border-t border-border pt-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4"><h2 className="text-lg font-semibold max-w-full break-words">{item.product_name}</h2><p className="text-sm shrink-0">Daudzums: {item.quantity} gab.</p></div>
      {photos[item.id] ? <DocumentImage src={photos[item.id]} alt={item.product_name} className="w-full max-h-[440px] object-contain" /> : !loading && <p className="text-sm text-muted-foreground">Produktam nav attēla.</p>}
      {(item.width_mm || item.height_mm) && <p className="text-sm mt-3">Izmērs: {item.width_mm ?? "—"} × {item.height_mm ?? "—"} mm</p>}
      {orderDesignLogos(item).length > 0 && <div className="mt-5"><h3 className="font-semibold text-sm mb-3">Klienta logo un foto</h3><div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{orderDesignLogos(item).map((logo, index) => <div key={`${logo.url}-${index}`} className="min-w-0">{logoUrls[logo.url] && <DocumentImage src={logoUrls[logo.url]} alt={logo.filename || "Klienta logo"} className="h-28 w-full object-contain" />}<p className="text-xs break-words mt-2">{logo.filename}{logo.quantity ? ` · ${logo.quantity} gab.` : ""}</p></div>)}</div></div>}
      {item.custom_text && <p className="mt-4 text-sm whitespace-pre-wrap">Uzraksts: {item.custom_text}</p>}{item.notes && <p className="mt-2 text-sm whitespace-pre-wrap">{item.notes}</p>}
    </section>)}
    <footer className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4"><DocumentImage src={heroLogo} alt="Luxury Chocolate zelta logo" className="h-20 w-24 object-contain" /><div className="text-center text-xs"><p>Luxury Chocolate SIA · luxurychocolate.lv</p><p>info@luxurychocolate.lv · +371 26 177 853</p></div><DocumentImage src={chocoTime} alt="It's Choco Time zelta logo" className="h-16 w-28 object-contain" /></footer>
  </div>;
}