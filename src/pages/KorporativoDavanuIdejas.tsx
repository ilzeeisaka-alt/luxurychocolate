import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const vp = { once: true, margin: "-50px" as const };

const ideas = [
  {
    num: "01",
    title: "Šokolādes ar uzņēmuma logo",
    desc: "Klasiskā un visspēcīgākā korporatīvā dāvana. Jūsu logo tiek uzdrukāts tieši uz premium Beļģu šokolādes virsmas — eleganti, garšīgi un neaizmirstami. Ideāli piemērotas klientu tikšanām, konferencēm un VIP viesmīlībai.",
    link: "/sokolades-ar-logo",
    linkLabel: "Uzzināt vairāk →",
  },
  {
    num: "02",
    title: "Šokolādes dāvanu komplekti",
    desc: "Luksus dāvanu kastītes ar praļiņu izlasi un personalizētu iepakojumu. Ideāla izvēle gada beigu pateicībai klientiem, partneru apsveikumiem un īpašiem gadījumiem, kad nepieciešama iespaidīgāka dāvana.",
    link: "/sokolades-partneru-davanam",
    linkLabel: "Skatīt partneru dāvanas →",
  },
  {
    num: "03",
    title: "Reklāmas šokolādes pasākumiem",
    desc: "Nelielas šokolādes tāfelītes (5–10g) ar logo — perfektas izdalīšanai izstādēs, konferencēs un semināros. Viens no efektīvākajiem promo produktiem, kas tiek ne tikai paņemts, bet arī atcerēts.",
    link: "/sokolades-konferencem",
    linkLabel: "Skatīt konferenču risinājumus →",
  },
  {
    num: "04",
    title: "Ziemassvētku korporatīvās šokolādes",
    desc: "Svētku tematisks dizains ar Jūsu logo elegantā svētku iepakojumā. Vislabākais laiks, lai pateiktu paldies klientiem un partneriem — personalizēta Ziemassvētku šokolāde ir dāvana, ko gaida katru gadu.",
    link: "/ziemassvetku-korporativas-sokolades",
    linkLabel: "Skatīt Ziemassvētku kolekciju →",
  },
  {
    num: "05",
    title: "Šokolādes darbiniekiem",
    desc: "Pateicieties savai komandai ar personalizētu šokolādes dāvanu. Piemērota darba jubilejai, Ziemassvētkiem, Team building pasākumiem un ikdienas novērtēšanai — stiprina lojalitāti un komandas garu.",
    link: "/sokolades-darbinieku-davanam",
    linkLabel: "Skatīt darbinieku dāvanas →",
  },
  {
    num: "06",
    title: "Premium dāvanas VIP klientiem",
    desc: "Augstākā līmeņa šokolādes dāvanu komplekti ar individuālu dizainu un luksus iepakojumu. Kad nepieciešams atstāt vislabāko iespaidu — līguma parakstīšanai, VIP viesmīlībai vai ekskluzīviem pasākumiem.",
    link: "/sokolades-klientu-davanam",
    linkLabel: "Skatīt klientu dāvanas →",
  },
];

const faqs = [
  { q: "Kāda ir labākā korporatīvā dāvana klientiem?", a: "Personalizētas šokolādes ar uzņēmuma logo ir viena no efektīvākajām korporatīvajām dāvanām — tā ir universāli novērtēta, eleganta un atstāj pozitīvu garšas atmiņu, kas asociējas ar Jūsu zīmolu." },
  { q: "Cik daudz jāpasūta, lai pasūtītu korporatīvās dāvanas?", a: "Minimālais pasūtījums ir no 50 gab. — tas ir piemērots gan mazākiem pasākumiem, gan lielām korporatīvajām kampaņām." },
  { q: "Kad jāsāk plānot korporatīvās dāvanas?", a: "Iesakām sākt plānot vismaz 2–3 nedēļas pirms nepieciešamā datuma. Ziemassvētku sezonā — vismaz mēnesi iepriekš." },
  { q: "Vai var pasūtīt dāvanas ar individuālu dizainu katram klientam?", a: "Jā, piedāvājam gan universālu logo apdruku visam pasūtījumam, gan individuālu personalizāciju katrai dāvanai atsevišķi." },
  { q: "Kādos gadījumos uzņēmumi visbiežāk dāvina korporatīvās dāvanas?", a: "Populārākie gadījumi: Ziemassvētki, gada beigu pateicība, konferences, līguma parakstīšana, uzņēmuma jubileja, jaunu darbinieku welcome kit un VIP klientu viesmīlība." },
];

const KorporativoDavanuIdejas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useLocation();

  useSeo({
    title: "Korporatīvo dāvanu idejas klientiem un partneriem",
    description: "Labākās korporatīvo dāvanu idejas uzņēmumiem — šokolādes ar logo, dāvanu komplekti, reklāmas šokolādes konferencēm. Idejas klientiem, partneriem un darbiniekiem.",
    path: pathname,
  });

  useEffect(() => {
    const BASE_URL = "https://luxurychocolate.lv";
    const fullUrl = `${BASE_URL}${pathname}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": fullUrl,
          name: "Korporatīvo dāvanu idejas klientiem un partneriem — Luxury Chocolate",
          description: "Labākās korporatīvo dāvanu idejas uzņēmumiem — šokolādes ar logo, dāvanu komplekti, reklāmas šokolādes konferencēm.",
          url: fullUrl,
          isPartOf: { "@id": `${BASE_URL}/#website` },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Sākumlapa", item: BASE_URL },
              { "@type": "ListItem", position: 2, name: "Korporatīvo dāvanu idejas", item: fullUrl },
            ],
          },
        },
        {
          "@type": "ItemList",
          name: "Korporatīvo dāvanu idejas",
          numberOfItems: ideas.length,
          itemListElement: ideas.map((idea, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: idea.title,
            description: idea.desc,
          })),
        },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    };

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
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Sākumlapa
          </Link>
          <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 text-sm font-medium transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>
            Saņemt piedāvājumu
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Lightbulb className="w-8 h-8 text-primary" />
            </span>
            <h1 className="text-3xl sm:text-5xl text-foreground mb-6 leading-tight">
              Korporatīvo dāvanu idejas klientiem un partneriem
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Iedvesmojieties no labākajām korporatīvo šokolādes dāvanu idejām — katrai situācijai un budžetam.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro text */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <p className="text-base text-muted-foreground leading-relaxed">
              Korporatīvās dāvanas ir svarīgs biznesa attiecību elements. Pareizi izvēlēta dāvana klientam vai partnerim
              parāda uzmanību, profesionalitāti un rūpes. Šokolādes dāvanas ar uzņēmuma logo ir viena no populārākajām un
              efektīvākajām izvēlēm — tās ir universāli novērtētas, eleganti izskatās un atstāj pozitīvu garšas atmiņu.
              Šeit ir mūsu labākās idejas katrai situācijai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ideas */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-8">
            {ideas.map((idea, i) => (
              <motion.div
                key={idea.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card rounded-xl border border-border p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-light text-primary/40 select-none">{idea.num}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl text-foreground mb-3">{idea.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{idea.desc}</p>
                    <Link to={idea.link} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      {idea.linkLabel}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background" aria-labelledby="ideas-faq-heading">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 id="ideas-faq-heading" className="text-2xl sm:text-3xl text-foreground mb-8">Biežāk uzdotie jautājumi</h2>
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

      {/* CTA */}
      <section className="py-20 bg-foreground text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Iedvesmojāties? Saņemiet piedāvājumu</h2>
            <p className="text-white/60 mb-8">Nosūtiet mums savu ideju, un mēs sagatavosim personalizētu piedāvājumu 24 stundu laikā.</p>
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

      {/* Related */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl sm:text-3xl text-foreground mb-6">Skatiet arī</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { to: "/sokolades-ar-logo", label: "Šokolādes ar logo", desc: "Personalizēta apdruka ar Jūsu uzņēmuma logo" },
                { to: "/reklamas-sokolade", label: "Reklāmas šokolāde", desc: "Promo šokolāde izstādēm un pasākumiem" },
                { to: "/sokolades-klientu-davanam", label: "Klientu dāvanas", desc: "Premium dāvanas klientiem un partneriem" },
                { to: "/sokolades-partneru-davanam", label: "Partneru dāvanas", desc: "Ekskluzīvas dāvanas biznesa partneriem" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md">
                  <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors">{link.label}</span>
                  <span className="block text-sm text-muted-foreground mt-1">{link.desc}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <p className="sr-only">
        Atslēgvārdi: korporatīvās dāvanas idejas, biznesa dāvanu idejas, dāvanas klientiem, corporate gift ideas,
        korporatīvās šokolādes dāvanas, dāvanu idejas uzņēmumiem, business gift ideas.
      </p>

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default KorporativoDavanuIdejas;
