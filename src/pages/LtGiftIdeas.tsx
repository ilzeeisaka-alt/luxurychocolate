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
  { num: "01", title: "Šokoladas su įmonės logotipu", desc: "Klasikinė ir galingiausia korporatyvinė dovana. Jūsų logotipas atspausdintas tiesiog ant premium belgiško šokolado — elegantiška, skanu ir neužmirštama.", link: "/lt/sokoladas-su-logotipu", linkLabel: "Sužinoti daugiau →" },
  { num: "02", title: "Šokolado dovanų rinkiniai", desc: "Prabangios dovanų dėžutės su pralinė rinkiniais ir personalizuota pakuote. Puikiai tinka metų pabaigos padėkai ir partnerių sveikinimams.", link: "/lt/dovanos-partneriams", linkLabel: "Dovanos partneriams →" },
  { num: "03", title: "Reklaminis šokoladas renginiams", desc: "Maži šokolado plyteliai (5–10g) su logotipu — idealūs dalinimui parodose, konferencijose ir seminaruose.", link: "/lt/sokoladas-konferencijoms", linkLabel: "Konferencijų šokoladas →" },
  { num: "04", title: "Kalėdinis korporatyvinis šokoladas", desc: "Šventinis dizainas su logotipu elegantiškose šventinėse pakuotėse. Geriausias laikas padėkoti klientams ir partneriams.", link: "/lt/kaledinis-sokoladas", linkLabel: "Kalėdinė kolekcija →" },
  { num: "05", title: "Šokoladas darbuotojams", desc: "Padėkokite komandai personalizuotomis šokolado dovanomis. Tinka jubiliejams, Kalėdoms ir kasdieniam įvertinimui.", link: "/lt/dovanos-darbuotojams", linkLabel: "Dovanos darbuotojams →" },
  { num: "06", title: "Premium VIP klientų dovanos", desc: "Aukščiausio lygio šokolado dovanų rinkiniai su individualiu dizainu ir prabangiu pakavimu.", link: "/lt/dovanos-klientams", linkLabel: "Dovanos klientams →" },
];

const faqs = [
  { q: "Kokia geriausia korporatyvinė dovana klientams?", a: "Personalizuotas šokoladas su įmonės logotipu — vienas efektyviausių korporatyvinių dovanų. Universaliai vertinamas, elegantiškas ir sukuria teigiamą skonio prisiminimą." },
  { q: "Koks minimalus užsakymas korporatyvinėms dovanoms?", a: "Minimalus užsakymas — 50 vnt. Tinka tiek mažesniems renginiams, tiek didelėms kampanijoms." },
  { q: "Kada pradėti planuoti korporatyvines dovanas?", a: "Rekomenduojame pradėti bent 2–3 savaites prieš reikiamą datą. Kalėdų sezonui — bent mėnesį iš anksto." },
  { q: "Ar galiu užsakyti dovanas su individualiu dizainu?", a: "Taip, siūlome tiek universalų logotipo spausdinimą, tiek individualų personalizavimą kiekvienai dovanai." },
  { q: "Kokios populiariausios progos korporatyvinėms dovanoms?", a: "Kalėdos, metų pabaigos padėka, konferencijos, sutarčių pasirašymas, įmonės jubiliejai ir VIP svetingumas." },
];

const LtGiftIdeas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useLocation();

  useSeo({ title: "Korporatyvinių dovanų idėjos klientams ir partneriams", description: "Geriausios korporatyvinių dovanų idėjos — šokoladas su logotipu, dovanų rinkiniai, reklaminis šokoladas konferencijoms. Idėjos klientams, partneriams ir darbuotojams.", path: pathname });

  useEffect(() => {
    const jsonLd = { "@context": "https://schema.org", "@graph": [
      { "@type": "ItemList", name: "Korporatyvinių dovanų idėjos", numberOfItems: ideas.length, itemListElement: ideas.map((idea, i) => ({ "@type": "ListItem", position: i + 1, name: idea.title, description: idea.desc })) },
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
          <Link to="/lt" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /> Pagrindinis</Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 text-sm font-medium transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>Gauti pasiūlymą</button>
          </div>
        </div>
      </nav>

      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"><Lightbulb className="w-8 h-8 text-primary" /></span>
            <h1 className="text-3xl sm:text-5xl text-foreground mb-6 leading-tight">Korporatyvinių dovanų idėjos klientams ir partneriams</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Įsikveipkite geriausiomis korporatyvinių šokolado dovanų idėjomis — kiekvienai progai ir biudžetui.</p>
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
            <h2 className="text-2xl sm:text-3xl text-foreground mb-8">Dažniausiai užduodami klausimai</h2>
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
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Įkvėpti? Gaukite pasiūlymą</h2>
            <p className="text-white/60 mb-8">Atsiųskite mums savo idėją ir mes paruošime personalizuotą pasiūlymą per 24 valandas.</p>
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 font-medium text-base transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>Gauti pasiūlymą</button>
          </motion.div>
        </div>
      </section>

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default LtGiftIdeas;
