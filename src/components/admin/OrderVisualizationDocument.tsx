import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { orderDesignLogos, primaryProductPhoto, type OrderDesignItem } from "@/lib/orderVisualization";
import seal from "@/assets/order-sheet-seal.png.asset.json";
import brandFooter from "@/assets/order-sheet-brand-footer.png.asset.json";
import ilzePhoto from "@/assets/ilze-eisaka.jpg";
import "./order-sheet.css";
import { normalCase, splitContactName } from "@/lib/orderSheetName";
import { orderSheetLanguage } from "@/lib/orderSheetLanguage";
import { orderSheetText } from "@/i18n/orderSheet";

interface Props {
  order: { order_number: string; customer_name: string | null; customer_email: string; customer_phone: string | null; company_name: string | null; vat_number: string | null; shipping_address: string | null; shipping_city?: string | null; shipping_postal_code?: string | null; shipping_country?: string | null; order_items: OrderDesignItem[] };
  date: string;
  registrationNumber: string;
  eventName: string;
  eventDate: string;
  contactPhoto?: string;
  clientLogo?: string;
  onLanguageChange?: (lang: string) => void;
}

function DocumentImage({ src, alt, className, unavailable }: { src: string; alt: string; className: string; unavailable: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? <p className="text-sm text-muted-foreground">{alt}: {unavailable}</p> : <img src={src} alt={alt} className={className} crossOrigin="anonymous" onError={() => setFailed(true)} />;
}

export default function OrderVisualizationDocument({ order, date, registrationNumber, eventName, eventDate, contactPhoto, clientLogo, onLanguageChange }: Props) {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [logoUrls, setLogoUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState("lv");
  const tx = orderSheetText(language);
  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true); setError(false);
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
          const { data: products, error: productError } = await supabase.from("products").select("id,name,name_i18n").in("id", productIds);
          if (productError) throw productError;
          const lang = orderSheetLanguage(order.order_items.map(item => ({ ...item, product_id: item.product_id || slugIds[item.product_slug ?? ""] })), products ?? []);
          if (active) { setLanguage(lang); onLanguageChange?.(lang); }
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
      } catch { if (active) setError(true); }
      finally { if (active) setLoading(false); }
    }
    void load();
    return () => { active = false; };
  }, [order, onLanguageChange]);

  const contact = splitContactName(order.customer_name);
  const contactName = contact.name || normalCase(order.company_name) || "—";

  return <div className="order-design order-sheet" lang={language} dir={["ar", "he", "fa", "ur"].includes(language) ? "rtl" : "ltr"}>
    {loading && <p role="status">{tx.loading}</p>}{error && <p role="alert" className="text-destructive">{tx.imageUnavailable}</p>}
    {order.order_items.map((item, itemIndex) => <article key={item.id} className="order-design-item order-sheet-page">
      <header className="order-sheet-header">
        <section>
          <h2 className="order-sheet-party-title">{tx.manufacturer}</h2>
          <div className="order-sheet-seller">
            <DocumentImage unavailable={tx.imageUnavailable} src={ilzePhoto} alt="Ilze Eisaka" className="order-sheet-person" />
            <div className="order-sheet-details"><strong>ILZE EISAKA</strong><p className="order-sheet-role">{tx.boardMember}</p><p>Luxury Chocolate SIA</p><p>www.luxurychocolate.lv</p><p>info@luxurychocolate.lv</p><p>+371 26 177 853</p><p>Kandavas iela 29a, Rīga</p><p>LV-1083, Latvija</p><p>{tx.vat}: LV40103921954</p></div>
          </div>
        </section>
        <div className="order-sheet-brand-row">
          <DocumentImage unavailable={tx.imageUnavailable} src={seal.url} alt="Luxury Chocolate" className="order-sheet-seal" />
          {clientLogo && <DocumentImage unavailable={tx.imageUnavailable} key={clientLogo} src={clientLogo} alt={tx.clientMedia} className="order-sheet-payer-logo" />}
        </div>
        <section className="order-sheet-client">
          <h2 className="order-sheet-party-title">{tx.client}</h2>
          <div className="order-sheet-seller order-sheet-seller-client">
          <div className="order-sheet-client-media">
              {contactPhoto && <DocumentImage unavailable={tx.imageUnavailable} key={contactPhoto} src={contactPhoto} alt={tx.client} className="order-sheet-person order-sheet-contact-photo" />}
              {(() => { const logos = [...new Map(order.order_items.flatMap(orderDesignLogos).map(logo => [logo.url, logo])).values()]; return logos.map((logo, index) => logoUrls[logo.url] ? <DocumentImage unavailable={tx.imageUnavailable} key={`${logo.url}-${index}`} src={logoUrls[logo.url]} alt={logo.filename || tx.clientMedia} className="order-sheet-client-logo" /> : null); })()}
            </div>
  <div className="order-sheet-details"><strong>{contactName}</strong>{contact.title && <p className="order-sheet-role">{contact.title}</p>}{order.company_name && <p>{normalCase(order.company_name)}</p>}{registrationNumber && <p>{tx.registration}: {registrationNumber}</p>}{order.vat_number && <p>{tx.vat}: {order.vat_number}</p>}<p>{order.customer_email}</p><p>{order.customer_phone}</p><p>{[order.shipping_address, order.shipping_city, order.shipping_postal_code, order.shipping_country].filter(Boolean).join(", ")}</p></div>
          </div>
        </section>
      </header>
      <div className="order-sheet-title-row">
        {itemIndex === 0 ? <h1 className="order-sheet-title">{tx.visualization}</h1> : <h2 className="order-sheet-title">{tx.visualization}</h2>}
        <div className="order-sheet-dates"><p>{order.order_number}</p><p>{tx.prepared}: <span>{date}</span></p>{eventDate && <p>{tx.eventDate}: <span>{eventDate}</span></p>}</div>
      </div>
      <div><h2 className="order-sheet-product-title">{item.product_name}</h2><p className="order-sheet-product-meta">{tx.quantity}: {item.quantity} {tx.pieces}{(item.width_mm || item.height_mm) ? ` · ${tx.size}: ${item.width_mm ?? "—"} × ${item.height_mm ?? "—"} mm` : ""}</p></div>
      {photos[item.id] ? <DocumentImage unavailable={tx.imageUnavailable} src={photos[item.id]} alt={item.product_name} className="order-sheet-product-image" /> : !loading && <p className="text-sm text-muted-foreground">{tx.imageUnavailable}</p>}
      {orderDesignLogos(item).length > 0 && <section><h3 className="text-center text-sm mb-3">{tx.clientMedia}</h3><div className="order-sheet-uploads">{orderDesignLogos(item).map((logo, index) => <div key={`${logo.url}-${index}`} className="order-sheet-upload">{logoUrls[logo.url] && <DocumentImage unavailable={tx.imageUnavailable} src={logoUrls[logo.url]} alt={logo.filename || tx.clientMedia} className="object-contain" />}<p>{logo.filename}{logo.quantity ? ` · ${logo.quantity} ${tx.pieces}` : ""}</p></div>)}</div></section>}
      {(eventName || item.custom_text || item.notes) && <div className="order-sheet-notes">{eventName && <p><b>{tx.event}:</b> {eventName}</p>}{item.custom_text && <p><b>{tx.inscription}:</b> {item.custom_text}</p>}{item.notes && <p>{item.notes}</p>}</div>}
      <footer className="order-sheet-footer"><DocumentImage unavailable={tx.imageUnavailable} src={brandFooter.url} alt="It's Choco Time · Royal Luxury Chocolate · Handmade from Belgian chocolate · Luxury Chocolate.lv" className="object-contain" /></footer>
    </article>)}
  </div>;
}