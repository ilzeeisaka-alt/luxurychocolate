import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  q: string;
  a: string;
}

interface SeoLandingPageProps {
  emoji: string;
  title: string;
  metaDescription: string;
  intro: string;
  benefits: string[];
  body: string;
  cta: string;
  keywords: string[];
  faqs?: FaqItem[];
}

const vp = { once: true, margin: "-50px" as const };

const SeoLandingLayout = ({
  emoji,
  title,
  metaDescription,
  intro,
  benefits,
  body,
  cta,
  keywords,
  faqs,
}: SeoLandingPageProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useLocation();

  useSeo({
    title,
    description: metaDescription,
    path: pathname,
  });

  useEffect(() => {
    const BASE_URL = "https://luxurychocolate.lv";
    const fullUrl = `${BASE_URL}${pathname}`;
    const fullTitle = `${title} — Luxury Chocolate`;

    const jsonLd: Record<string, unknown>[] = [
      {
        "@type": "WebPage",
        "@id": fullUrl,
        "name": fullTitle,
        "description": metaDescription,
        "url": fullUrl,
        "isPartOf": { "@id": `${BASE_URL}/#website` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Sākumlapa", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": title, "item": fullUrl },
          ],
        },
      },
      {
        "@type": "Product",
        "name": title,
        "description": intro,
        "brand": { "@type": "Brand", "name": "Luxury Chocolate" },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "EUR",
          "eligibleQuantity": { "@type": "QuantitativeValue", "minValue": 50, "unitText": "gab." },
        },
        "material": "Premium Beļģu šokolāde",
      },
    ];

    if (faqs && faqs.length > 0) {
      jsonLd.push({
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "seo-landing-jsonld";
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd });

    const existing = document.getElementById("seo-landing-jsonld");
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      document.getElementById("seo-landing-jsonld")?.remove();
    };
  }, [pathname, title, metaDescription, intro, faqs]);

  return (
    <main className="bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Sākumlapa
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 text-sm font-medium transition-all active:scale-[0.98]"
            style={{ boxShadow: "var(--shadow-button)" }}
          >
            Saņemt piedāvājumu
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-5xl mb-6 block" aria-hidden="true">{emoji}</span>
            <h1 className="text-3xl sm:text-5xl text-foreground mb-6 leading-tight">{title}</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{intro}</p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl text-foreground mb-8">Kāpēc izvēlēties mūs</h2>
            <ul className="space-y-3" role="list">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-primary mt-0.5">✔</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="text-base text-muted-foreground leading-relaxed space-y-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4 }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </section>

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 bg-background" aria-labelledby="landing-faq-heading">
          <div className="container mx-auto max-w-3xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4 }}
            >
              <h2 id="landing-faq-heading" className="text-2xl sm:text-3xl text-foreground mb-8">
                Biežāk uzdotie jautājumi
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-secondary/50 rounded-lg border border-border px-5"
                  >
                    <AccordionTrigger className="text-left text-base text-foreground hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-20 bg-background text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl text-foreground mb-4">{cta}</h2>
            <p className="text-muted-foreground mb-8">Minimālais pasūtījums no 50 gab. Izgatavošana 3–10 darba dienas.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 font-medium text-base transition-all active:scale-[0.98]"
              style={{ boxShadow: "var(--shadow-button)" }}
            >
              Saņemt piedāvājumu
            </button>
          </motion.div>
        </div>
      </section>

      {/* Related pages */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl text-foreground mb-6">Skatiet arī</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { to: "/sokolades-ar-logo", label: "Šokolādes ar logo", desc: "Personalizēta apdruka ar Jūsu uzņēmuma logo" },
                { to: "/ziemassvetku-korporativas-sokolades", label: "Ziemassvētku šokolādes", desc: "Svētku korporatīvās dāvanas ar logo" },
                { to: "/reklamas-sokolade", label: "Reklāmas šokolāde", desc: "Promo šokolāde izstādēm un pasākumiem" },
                { to: "/sokolades-klientu-davanam", label: "Klientu dāvanas", desc: "Premium dāvanas klientiem un partneriem" },
              ]
                .filter((link) => link.to !== pathname)
                .map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1">{link.desc}</span>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Keywords sr-only */}
      <p className="sr-only">
        Atslēgvārdi: {keywords.join(", ")}.
      </p>

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default SeoLandingLayout;
