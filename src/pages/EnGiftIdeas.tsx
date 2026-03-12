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
  { num: "01", title: "Chocolate with Company Logo", desc: "The classic and most powerful corporate gift. Your logo printed directly on premium Belgian chocolate — elegant, delicious, and unforgettable.", link: "/en/chocolate-with-logo", linkLabel: "Learn more →" },
  { num: "02", title: "Chocolate Gift Sets", desc: "Luxury gift boxes with praline assortments and personalized packaging. Perfect for year-end appreciation and partner greetings.", link: "/en/partner-gifts", linkLabel: "View partner gifts →" },
  { num: "03", title: "Promotional Chocolate for Events", desc: "Small chocolate bars (5–10g) with logo — perfect for distribution at exhibitions, conferences, and seminars.", link: "/en/conference-chocolate", linkLabel: "View conference options →" },
  { num: "04", title: "Christmas Corporate Chocolate", desc: "Festive themed design with your logo in elegant holiday packaging. The best time to thank clients and partners.", link: "/en/christmas-corporate-chocolate", linkLabel: "View Christmas collection →" },
  { num: "05", title: "Chocolate for Employees", desc: "Thank your team with personalized chocolate gifts. Perfect for anniversaries, Christmas, team building, and everyday recognition.", link: "/en/employee-gifts", linkLabel: "View employee gifts →" },
  { num: "06", title: "Premium VIP Client Gifts", desc: "Top-level chocolate gift sets with individual design and luxury packaging. For contract signings, VIP hospitality, and exclusive events.", link: "/en/client-gifts", linkLabel: "View client gifts →" },
];

const faqs = [
  { q: "What is the best corporate gift for clients?", a: "Personalized chocolate with your company logo is one of the most effective corporate gifts — universally appreciated, elegant, and creates a positive taste memory associated with your brand." },
  { q: "What is the minimum order for corporate gifts?", a: "The minimum order is 50 pieces — suitable for both small events and large corporate campaigns." },
  { q: "When should I start planning corporate gifts?", a: "We recommend starting at least 2–3 weeks before the needed date. For the Christmas season — at least a month in advance." },
  { q: "Can I order gifts with individual design for each client?", a: "Yes, we offer both universal logo printing for the entire order and individual personalization for each gift separately." },
  { q: "What are the most popular occasions for corporate gifts?", a: "Christmas, year-end appreciation, conferences, contract signings, company anniversaries, new employee welcome kits, and VIP client hospitality." },
];

const EnGiftIdeas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useLocation();

  useSeo({ title: "Corporate Gift Ideas for Clients and Partners", description: "Best corporate gift ideas for businesses — chocolate with logo, gift sets, promotional chocolate for conferences. Ideas for clients, partners, and employees.", path: pathname });

  useEffect(() => {
    const BASE_URL = "https://luxurychocolate.lv";
    const jsonLd = { "@context": "https://schema.org", "@graph": [
      { "@type": "ItemList", name: "Corporate Gift Ideas", numberOfItems: ideas.length, itemListElement: ideas.map((idea, i) => ({ "@type": "ListItem", position: i + 1, name: idea.title, description: idea.desc })) },
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
          <Link to="/en" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /> Homepage</Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 text-sm font-medium transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>Get a quote</button>
          </div>
        </div>
      </nav>

      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"><Lightbulb className="w-8 h-8 text-primary" /></span>
            <h1 className="text-3xl sm:text-5xl text-foreground mb-6 leading-tight">Corporate Gift Ideas for Clients and Partners</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Get inspired by the best corporate chocolate gift ideas — for every occasion and budget.</p>
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
            <h2 className="text-2xl sm:text-3xl text-foreground mb-8">Frequently Asked Questions</h2>
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
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Inspired? Get a quote</h2>
            <p className="text-white/60 mb-8">Send us your idea and we'll prepare a personalized offer within 24 hours.</p>
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 font-medium text-base transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>Get a quote</button>
          </motion.div>
        </div>
      </section>

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default EnGiftIdeas;
