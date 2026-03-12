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
  { num: "01", title: "Шоколад с логотипом компании", desc: "Классический и самый мощный корпоративный подарок. Ваш логотип напечатан прямо на премиум бельгийском шоколаде — элегантно, вкусно и незабываемо.", link: "/ru/shokolad-s-logotipom", linkLabel: "Узнать больше →" },
  { num: "02", title: "Шоколадные подарочные наборы", desc: "Люкс подарочные коробки с ассорти пралине и персонализированной упаковкой. Идеально для благодарности на конец года и поздравлений партнёров.", link: "/ru/podarki-partneram", linkLabel: "Подарки партнёрам →" },
  { num: "03", title: "Рекламный шоколад для мероприятий", desc: "Маленькие шоколадные плитки (5–10г) с логотипом — идеальны для раздачи на выставках, конференциях и семинарах.", link: "/ru/shokolad-dlya-konferencij", linkLabel: "Шоколад для конференций →" },
  { num: "04", title: "Рождественский корпоративный шоколад", desc: "Праздничный дизайн с логотипом в элегантной праздничной упаковке. Лучшее время поблагодарить клиентов и партнёров.", link: "/ru/rozhdestvenskij-shokolad", linkLabel: "Рождественская коллекция →" },
  { num: "05", title: "Шоколад для сотрудников", desc: "Поблагодарите свою команду персонализированными шоколадными подарками. Для юбилеев, Рождества, тимбилдинга и повседневной благодарности.", link: "/ru/podarki-sotrudnikam", linkLabel: "Подарки сотрудникам →" },
  { num: "06", title: "Премиум подарки VIP-клиентам", desc: "Подарочные наборы высшего уровня с индивидуальным дизайном и люкс упаковкой. Для подписания контрактов и VIP-гостеприимства.", link: "/ru/podarki-klientam", linkLabel: "Подарки клиентам →" },
];

const faqs = [
  { q: "Какой лучший корпоративный подарок для клиентов?", a: "Персонализированный шоколад с логотипом компании — один из самых эффективных корпоративных подарков. Универсально ценится, элегантен и создаёт позитивное вкусовое воспоминание." },
  { q: "Какой минимальный заказ?", a: "Минимальный заказ от 50 штук — подходит как для небольших мероприятий, так и для масштабных кампаний." },
  { q: "Когда начинать планировать корпоративные подарки?", a: "Рекомендуем начинать за 2–3 недели до нужной даты. Для рождественского сезона — минимум за месяц." },
  { q: "Можно заказать подарки с индивидуальным дизайном?", a: "Да, мы предлагаем как универсальную печать логотипа, так и индивидуальную персонализацию каждого подарка." },
  { q: "Для каких поводов заказывают корпоративные подарки?", a: "Рождество, благодарность на конец года, конференции, подписание контрактов, юбилеи компании, welcome-наборы и VIP-гостеприимство." },
];

const RuGiftIdeas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { pathname } = useLocation();

  useSeo({ title: "Идеи корпоративных подарков для клиентов и партнёров", description: "Лучшие идеи корпоративных подарков — шоколад с логотипом, подарочные наборы, рекламный шоколад для конференций. Идеи для клиентов, партнёров и сотрудников.", path: pathname });

  useEffect(() => {
    const jsonLd = { "@context": "https://schema.org", "@graph": [
      { "@type": "ItemList", name: "Идеи корпоративных подарков", numberOfItems: ideas.length, itemListElement: ideas.map((idea, i) => ({ "@type": "ListItem", position: i + 1, name: idea.title, description: idea.desc })) },
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
          <Link to="/ru" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /> Главная</Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2 text-sm font-medium transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>Получить предложение</button>
          </div>
        </div>
      </nav>

      <section className="py-20 sm:py-28 bg-secondary/50">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"><Lightbulb className="w-8 h-8 text-primary" /></span>
            <h1 className="text-3xl sm:text-5xl text-foreground mb-6 leading-tight">Идеи корпоративных подарков для клиентов и партнёров</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Вдохновитесь лучшими идеями корпоративных шоколадных подарков — для любого повода и бюджета.</p>
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
            <h2 className="text-2xl sm:text-3xl text-foreground mb-8">Часто задаваемые вопросы</h2>
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
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Вдохновились? Получите предложение</h2>
            <p className="text-white/60 mb-8">Отправьте нам свою идею, и мы подготовим персональное предложение в течение 24 часов.</p>
            <button onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3.5 font-medium text-base transition-all active:scale-[0.98]" style={{ boxShadow: "var(--shadow-button)" }}>Получить предложение</button>
          </motion.div>
        </div>
      </section>

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default RuGiftIdeas;
