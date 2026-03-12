import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useSeo } from "@/hooks/useSeo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const vp = { once: true, margin: "-50px" as const };

const sections = [
  {
    id: "kapec",
    title: "1. Kāpēc uzņēmumi dod korporatīvās dāvanas",
    content: `<p>Korporatīvās dāvanas ir viens no efektīvākajiem veidiem, kā uzņēmums var stiprināt attiecības ar klientiem, partneriem un darbiniekiem. Labi izvēlēta dāvana rada pozitīvu emocionālo asociāciju ar zīmolu un palīdz izcelties konkurentu vidū.</p>
<p>Pētījumi rāda, ka personalizētas dāvanas palielina klientu lojalitāti par 40–60%. Šokolādes ar logo ir īpaši efektīvas, jo tās apvieno garšu, estētiku un zīmola atpazīstamību vienā elegantā produktā.</p>`,
  },
  {
    id: "veidi",
    title: "2. Populārākie korporatīvo dāvanu veidi",
    content: `<p>Biznesa dāvanu tirgū ir daudz iespēju, bet ne visas ir vienlīdz efektīvas:</p>
<h3>Šokolādes ar logo</h3>
<p>Universāla dāvana, kas patīk visiem. <a href="/sokolades-ar-logo" class="text-primary hover:underline">Personalizētas šokolādes ar uzņēmuma logo</a> ir populārākā izvēle konferencēm, klientu tikšanām un svētku dāvanām.</p>
<h3>Reklāmas produkti</h3>
<p>Pildspalvas, krūzes, USB — klasika, bet bieži vien paliek atvilktnē. <a href="/reklamas-sokolade" class="text-primary hover:underline">Reklāmas šokolāde</a> turpretim tiek patērēta un atcerēta.</p>
<h3>Dāvanu komplekti</h3>
<p>Premium dāvanu kastes ar šokolādes pralinēm un personalizētu iepakojumu — ideāli VIP klientiem un partneriem.</p>`,
  },
  {
    id: "klientiem",
    title: "3. Kā izvēlēties dāvanu klientiem",
    content: `<p>Izvēloties <a href="/sokolades-klientu-davanam" class="text-primary hover:underline">dāvanu klientiem</a>, ņemiet vērā:</p>
<h3>Personalizācija</h3>
<p>Dāvana ar uzņēmuma logo vai individuālu dizainu parāda, ka esat ieguldījuši laiku un uzmanību. Šokolāde ar klienta vārdu vai īpašu ziņojumu ir īpaši efektīva.</p>
<h3>Kvalitāte</h3>
<p>Premium Beļģu šokolāde signalizē par Jūsu uzņēmuma augstajiem standartiem. Nekad neizvēlieties lētu alternatīvu — tā var radīt pretēju efektu.</p>
<h3>Piemērotība</h3>
<p>Šokolāde ir universāla — tā der gandrīz jebkurai kultūrai un situācijai, atšķirībā no alkohola vai specifiskiem produktiem.</p>`,
  },
  {
    id: "partneriem",
    title: "4. Kā izvēlēties dāvanu partneriem",
    content: `<p><a href="/sokolades-partneru-davanam" class="text-primary hover:underline">Dāvanas partneriem</a> prasa īpašu pieeju:</p>
<h3>Biznesa etiķete</h3>
<p>Partneriem paredzēta dāvana nedrīkst būt pārāk personīga, bet tai jābūt kvalitatīvai. Šokolādes dāvanu komplekts ar eleganti noformētu iepakojumu ir ideāla izvēle.</p>
<h3>Zīmola prezentācija</h3>
<p>Iepakojums ar Jūsu logo un krāsām pastiprina zīmola atpazīstamību. Partneri novērtēs uzmanību detaļām.</p>
<h3>Īpašie gadījumi</h3>
<p>Līguma parakstīšana, sadarbības jubileja vai jauna projekta uzsākšana — šie ir ideāli brīži, kad dāvana stiprina biznesa attiecības.</p>`,
  },
  {
    id: "konferencem",
    title: "5. Labākās dāvanas konferencēm un pasākumiem",
    content: `<p><a href="/sokolades-konferencem" class="text-primary hover:underline">Šokolādes konferencēm</a> ir iecienīts risinājums, jo:</p>
<h3>Mazas porcijas lielas ietekmes labā</h3>
<p>5–10g šokolādes tāfelītes ar logo ir perfektas izstādēm un semināriem. Tās ir vieglas, elegantes un viegli izdalāmas simtiem dalībnieku.</p>
<h3>Zīmola atpazīstamība</h3>
<p>Katrs dalībnieks paņem līdzi Jūsu logo — tas ir reklāmas produkts, ko cilvēki patiešām novērtē un atceras.</p>
<h3>Praktiska loģistika</h3>
<p>Kompakts izmērs, viegls svars, ilgs derīguma termiņš — šokolādes ar logo ir ērti transportējamas uz jebkuru pasākuma norises vietu.</p>`,
  },
  {
    id: "ziemassvetki",
    title: "6. Ziemassvētku korporatīvās dāvanas",
    content: `<p><a href="/ziemassvetku-korporativas-sokolades" class="text-primary hover:underline">Ziemassvētku korporatīvās šokolādes</a> ir viena no populārākajām sezonālajām dāvanu kategorijām:</p>
<h3>Svētku dizains</h3>
<p>Tematisks noformējums ar Jūsu logo svētku stilā rada siltu un profesionālu iespaidu. Zelta, sudraba un sarkanie toņi ir iecienītākie.</p>
<h3>Labākais laiks pateikt paldies</h3>
<p>Gada nogale ir ideāls brīdis, lai izteiktu pateicību klientiem, partneriem un <a href="/sokolades-darbinieku-davanam" class="text-primary hover:underline">darbiniekiem</a> par veiksmīgu sadarbību.</p>
<h3>Plānošana laicīgi</h3>
<p>Ieteicams sākt Ziemassvētku dāvanu plānošanu vismaz mēnesi iepriekš, lai nodrošinātu labāko dizainu un savlaicīgu piegādi.</p>`,
  },
];

const faqs = [
  { q: "Kāds ir minimālais pasūtījums korporatīvajām šokolādēm?", a: "Minimālais pasūtījums ir no 50 gabali. Tas piemērots gan nelieliem pasākumiem, gan lielām korporatīvām kampaņām." },
  { q: "Cik ilgi aizņem personalizētu šokolāžu izgatavošana?", a: "Standarta izgatavošanas laiks ir 3–10 darba dienas no dizaina apstiprināšanas brīža. Steidzamiem pasūtījumiem iespējama ātrāka izpilde." },
  { q: "Vai iespējams pasūtīt dažādus dizainus vienā pasūtījumā?", a: "Jā, mēs piedāvājam gan universālu dizainu visam pasūtījumam, gan individuālu personalizāciju katrai dāvanai atsevišķi." },
  { q: "Kāda šokolāde tiek izmantota?", a: "Mēs izmantojam tikai premium Beļģu šokolādi — piena, tumšo un balto. Visas izejvielas ir sertificētas un augstākās kvalitātes." },
  { q: "Vai piegādājat ārpus Latvijas?", a: "Jā, mēs piegādājam korporatīvās šokolādes uz vairāk nekā 30 valstīm visā pasaulē." },
  { q: "Kāds ir labākais laiks pasūtīt Ziemassvētku dāvanas?", a: "Ieteicam sākt plānošanu vismaz 4 nedēļas pirms Ziemassvētkiem, lai nodrošinātu labāko dizainu un savlaicīgu piegādi." },
];

const toc = sections.map((s) => ({ id: s.id, label: s.title }));

const KorporativoDavanuCelvedis = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useLocation();

  useSeo({
    title: "Kā izvēlēties korporatīvās dāvanas klientiem un partneriem | Ceļvedis",
    description: "Pilns ceļvedis par korporatīvo dāvanu izvēli — šokolādes ar logo, dāvanas klientiem, partneriem, darbiniekiem un konferencēm. Padomi, idejas un biznesa etiķete.",
    path: pathname,
  });

  useEffect(() => {
    const BASE_URL = "https://luxurychocolate.lv";
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": "Kā izvēlēties korporatīvās dāvanas klientiem un partneriem",
          "description": "Pilns ceļvedis par korporatīvo dāvanu izvēli uzņēmumiem.",
          "author": { "@type": "Organization", "name": "Luxury Chocolate" },
          "publisher": { "@type": "Organization", "name": "Luxury Chocolate", "url": BASE_URL },
          "url": `${BASE_URL}${pathname}`,
          "inLanguage": "lv",
          "mainEntityOfPage": `${BASE_URL}${pathname}`,
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Sākums", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "Korporatīvo dāvanu ceļvedis", "item": `${BASE_URL}${pathname}` },
          ],
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "guide-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.getElementById("guide-jsonld")?.remove();
    document.head.appendChild(script);
    return () => { document.getElementById("guide-jsonld")?.remove(); };
  }, [pathname]);

  return (
    <main className="bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Sākums
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 text-sm font-medium transition-all active:scale-[0.98]"
              style={{ boxShadow: "var(--shadow-button)" }}
            >
              Saņemt piedāvājumu
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
            </span>
            <h1 className="text-3xl sm:text-5xl text-foreground mb-6 leading-tight">
              Kā izvēlēties korporatīvās dāvanas klientiem un partneriem
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Pilns ceļvedis ar padomiem, idejām un biznesa etiķeti — lai Jūsu dāvana atstātu iespaidu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-10 bg-background border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.3 }}
            aria-label="Satura rādītājs"
          >
            <h2 className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4">Satura rādītājs</h2>
            <ol className="space-y-1.5 list-none p-0">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        </div>
      </section>

      {/* Guide Sections */}
      {sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={i % 2 === 0 ? "py-14 bg-secondary/50" : "py-14 bg-background"}
        >
          <div className="container mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <h2 className="text-2xl sm:text-3xl text-foreground mb-6">{section.title}</h2>
              <div
                className="prose-custom text-base text-muted-foreground leading-relaxed space-y-4 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </motion.div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="py-16 bg-background" aria-labelledby="guide-faq-heading">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 id="guide-faq-heading" className="text-2xl sm:text-3xl text-foreground mb-8">
              Biežāk uzdotie jautājumi
            </h2>
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
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Gatavi pasūtīt korporatīvās dāvanas?</h2>
            <p className="text-white/60 mb-8">Nosūtiet mums savu ideju un mēs sagatavosim personalizētu piedāvājumu 24 stundu laikā.</p>
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

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default KorporativoDavanuCelvedis;
