import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useSeo } from "@/hooks/useSeo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const vp = { once: true, margin: "-50px" as const };

const ideas = [
  { num: "01", title: "Šokolaad ettevõtte logoga", desc: "Klassikaline ja kõige mõjusam korporatiivkingitus. Teie logo trükitud otse premium Belgia šokolaadile — elegantne, maitsev ja unustamatu.", link: "/et/sokolaad-logoga", linkLabel: "Loe lähemalt →" },
  { num: "02", title: "Šokolaadi kinkekomplektid", desc: "Luksuslikud kinkekarbid pralinee valikutega ja personaliseeritud pakendiga. Sobib aastaloppu tunnustuseks ja partnerite tervitusteks.", link: "/et/kingitused-partneritele", linkLabel: "Partnerite kingitused →" },
  { num: "03", title: "Reklaamšokolaad üritustele", desc: "Väikesed šokolaadid (5–10g) logoga — ideaalsed jagamiseks messidel, konverentsidel ja seminaridel.", link: "/et/konverentsi-sokolaad", linkLabel: "Konverentsi šokolaad →" },
  { num: "04", title: "Jõulu korporatiivne šokolaad", desc: "Pidulik disain logoga elegantsetes pühadepakenditest. Parim aeg klientide ja partnerite tänamiseks.", link: "/et/joulu-sokolaad", linkLabel: "Jõulukollektsioon →" },
  { num: "05", title: "Šokolaad töötajatele", desc: "Tänage oma meeskonda personaliseeritud šokolaadikingitustega. Sobib juubeliteks, jõuludeks ja igapäevaseks tunnustuseks.", link: "/et/kingitused-tootajatele", linkLabel: "Töötajate kingitused →" },
  { num: "06", title: "Premium VIP kliendikingitused", desc: "Kõrgeima taseme šokolaadi kinkekomplektid individuaalse disaini ja luksuspakendiga.", link: "/et/kingitused-klientidele", linkLabel: "Kliendikingitused →" },
];

const faqs = [
  { q: "Milline on parim korporatiivkingitus klientidele?", a: "Personaliseeritud šokolaad ettevõtte logoga on üks tõhusamaid korporatiivkingitusi — universaalselt hinnatud, elegantne ja loob positiivse maitsemälestuse." },
  { q: "Milline on minimaalne tellimus korporatiivkingitusteks?", a: "Minimaalne tellimus on 50 tükki — sobib nii väiksematele üritustele kui ka suurtele kampaaniatele." },
  { q: "Millal peaksin korporatiivkingitusi planeerima?", a: "Soovitame alustada vähemalt 2–3 nädalat enne vajalikku kuupäeva. Jõuluhooajal — vähemalt kuu aega ette." },
  { q: "Kas saan tellida individuaalse disainiga kingitusi?", a: "Jah, pakume nii universaalset logotrükki kui ka individuaalset personaliseerimist igale kingitusele eraldi." },
  { q: "Millised on populaarseimad puhused korporatiivkingitusteks?", a: "Jõulud, aastaloppu tunnustus, konverentsid, lepingute allkirjastamine, ettevõtte aastapäevad ja VIP-külalislahkus." },
];

const EtGiftIdeas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useLocation();

  useSeo({ title: "Korporatiivkingituste ideed klientidele ja partneritele", description: "Parimad korporatiivkingituste ideed — šokolaad logoga, kinkekomplektid, reklaamšokolaad konverentsidele. Ideed klientidele, partneritele ja töötajatele.", path: pathname });

  useEffect(() => {
    const jsonLd = { "@context": "https://schema.org", "@graph": [
      { "@type": "ItemList", name: "Korporatiivkingituste ideed", numberOfItems: ideas.length, itemListElement: ideas.map((idea, i) => ({ "@type": "ListItem", position: i + 1, name: idea.title, description: idea.desc })) },
      { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ]};
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ideas-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.getElementById("ideas-jsonld")?.remove();
    document.head.appendChild(script);
    return () => { document.getElementById("ideas-jsonld")?.remove(); };
  }, [pathname]);

  return (
    <main className="bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/et" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /> Avaleht</Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 text-sm font-medium transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>Saada päring</button>
          </div>
        </div>
      </nav>

      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"><Lightbulb className="w-8 h-8 text-primary" /></span>
            <h1 className="text-3xl sm:text-5xl text-foreground mb-6 leading-tight">Korporatiivkingituste ideed klientidele ja partneritele</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Leidke inspiratsiooni parimatest korporatiivšokolaadi kinkeideedest — igaks puhuks ja eelarveks.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-8">
            {ideas.map((idea, i) => (
              <motion.div key={idea.num} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4, delay: i * 0.05 }} className="bg-card rounded-xl border border-border p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-light text-primary/40 select-none">{idea.num}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl text-foreground mb-3">{idea.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{idea.desc}</p>
                    <Link to={idea.link} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">{idea.linkLabel}</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl sm:text-3xl text-foreground mb-8">Korduma kippuvad küsimused</h2>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-secondary/50 rounded-lg border border-border px-5">
                  <AccordionTrigger className="text-left text-base text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-foreground text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Inspireeritud? Saage pakkumine</h2>
            <p className="text-white/60 mb-8">Saatke meile oma idee ja me valmistame personaalse pakkumise 24 tunni jooksul.</p>
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 font-medium text-base transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>Saada päring</button>
          </motion.div>
        </div>
      </section>

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default EtGiftIdeas;
