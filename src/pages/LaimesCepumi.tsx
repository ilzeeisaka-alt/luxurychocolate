import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import fortuneBagged from "@/assets/fortune-cookies/fortune-cookies-bagged.jpg";

const title = "Laimes cepumi ar personalizētu vēstījumu";
const description = "Laimes cepumi ar Jūsu tekstu, logo uz iepakojuma un lentītēm. Dāvanas kāzām, pasākumiem un uzņēmumu klientiem. Apskatiet piedāvājumu un pasūtiet.";
const url = "https://luxurychocolate.lv/laimes-cepumi";

const LaimesCepumi = () => {
  const [offerOpen, setOfferOpen] = useState(false);
  useSeo({ title, description, path: "/laimes-cepumi", keywords: "laimes cepumi, personalizēti laimes cepumi, laimes cepumi ar tekstu, laimes cepumi ar logo, laimes cepumi kāzām, laimes cepumi ar šokolādi, fortune cookies" });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      url,
      name: title,
      description,
      inLanguage: "lv",
      isPartOf: { "@id": "https://luxurychocolate.lv/#website" },
      about: { "@type": "Thing", name: "Personalizēti laimes cepumi" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Sākumlapa", item: "https://luxurychocolate.lv/" },
          { "@type": "ListItem", position: 2, name: "Laimes cepumi", item: url },
        ],
      },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <nav className="container mx-auto px-4 py-5 flex items-center justify-between gap-4" aria-label="Lapas navigācija">
          <Button asChild variant="ghost"><Link to="/"><ArrowLeft /> Sākumlapa</Link></Button>
          <Link to="/" className="text-primary font-medium">Luxury Chocolate</Link>
        </nav>
      </header>
      <main>
        <section className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl text-foreground mb-6">{title}</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mb-8">Laimes cepumi (fortune cookies) ar Jūsu izvēlētu tekstu iekšpusē — neliela dāvana ar personīgu pārsteigumu. Izvēlieties vēlējumu kāzu viesiem, apsveikumu svētkos vai uzņēmuma vēstījumu klientiem un partneriem.</p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Button asChild><Link to="/veikals?category=laimes-cepumi">Apskatīt laimes cepumus <ArrowRight /></Link></Button>
            <Button variant="outline" onClick={() => setOfferOpen(true)}>Pieprasīt piedāvājumu</Button>
          </div>
          <img src={fortuneBagged} alt="Personalizēti laimes cepumi caurspīdīgos maisiņos ar sarkanu satīna lentīti" className="w-full max-h-[560px] object-contain" fetchPriority="high" />
        </section>
        <section className="bg-secondary/50 py-14">
          <div className="container mx-auto max-w-5xl px-4 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl text-foreground mb-4">Laimes cepumi ar Jūsu tekstu un logo uz iepakojuma</h2>
              <p className="text-muted-foreground leading-relaxed">Cepuma iekšpusē var ievietot personalizētu vēstījumu: pateicību, novēlējumu, citātu vai zīmola ziņojumu. Piedāvājumā ir maisiņi ar lentītēm, apdrukātas lentītes un logo uzlīmes uz iepakojuma — katrs variants apskatāms veikalā.</p>
            </div>
            <div>
              <h2 className="text-2xl text-foreground mb-4">Dāvanas kāzām, pasākumiem un uzņēmumiem</h2>
              <p className="text-muted-foreground leading-relaxed">Personalizēti laimes cepumi iederas pie viesu vietām kāzu galdā, konferenču dāvanu komplektos un izstāžu stendos. Tie ir arī pārsteigums restorāna viesiem pie kafijas vai uzņēmuma svētku pasākumā.</p>
            </div>
          </div>
        </section>
        <section className="container mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl text-foreground mb-5">Izvēlieties laimes cepumu variantu</h2>
          <ul className="space-y-4 text-primary mb-10">
            <li><Link className="underline underline-offset-4" to="/veikals/laimes-cepums-12-cm-maisina-ar-lentiti-laimes-c">Laimes cepums 12 cm maisiņā ar lentīti</Link></li>
            <li><Link className="underline underline-offset-4" to="/veikals/laimes-cepumi-maisinos-ar-apdrukatam-lentitem-un-logo-uzlimem-uz-maisina-laimes-c">Laimes cepumi ar apdrukātām lentītēm un logo uzlīmēm</Link></li>
            <li><Link className="underline underline-offset-4" to="/veikals/laimes-cepums-ar-sokoladi-maisina-ar-lentiti-un-personalizetu-kartinu-laimes-c">Laimes cepums ar šokolādi un personalizētu kartīti</Link></li>
            <li><Link className="underline underline-offset-4" to="/veikals/10-laimes-cepumu-kaste-laimes-c">10 laimes cepumu kaste</Link></li>
          </ul>
          <h2 className="text-2xl text-foreground mb-4">Pasūtiet personalizētus laimes cepumus</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">Izvēlieties produktu veikalā vai nosūtiet pieprasījumu ar vēlamo daudzumu, tekstu, logo un pasākuma datumu. Cena un pieejamie izmēri norādīti katra produkta lapā; individuālu iepakojumu saskaņosim piedāvājumā.</p>
          <Button onClick={() => setOfferOpen(true)}>Pieprasīt piedāvājumu <ArrowRight /></Button>
          <div className="mt-10 flex flex-wrap gap-5 text-primary">
            <Link to="/sokolades-izstadem" className="underline underline-offset-4">Saldumi izstādēm</Link>
            <Link to="/sokolades-klientu-davanam" className="underline underline-offset-4">Dāvanas klientiem</Link>
          </div>
        </section>
      </main>
      <FooterSection />
      <OfferModal open={offerOpen} onOpenChange={setOfferOpen} />
    </div>
  );
};

export default LaimesCepumi;