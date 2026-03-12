import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo-transparent.png";
import FooterSection from "@/components/FooterSection";
import OfferModal from "@/components/OfferModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FreePreviewSection from "@/components/FreePreviewSection";
import { useSeo } from "@/hooks/useSeo";

const vp = { once: true, margin: "-50px" as const };

const services = [
  { to: "/ru/shokolad-s-logotipom", emoji: "🍫", title: "Шоколад с логотипом", desc: "Полноцветная печать логотипа на премиум бельгийском шоколаде" },
  { to: "/ru/podarki-klientam", emoji: "💼", title: "Подарки клиентам", desc: "Премиум шоколадные подарки, укрепляющие деловые отношения" },
  { to: "/ru/reklamniy-shokolad", emoji: "🎁", title: "Рекламный шоколад", desc: "Брендированный шоколад для выставок и мероприятий" },
  { to: "/ru/rozhdestvenskij-shokolad", emoji: "🎄", title: "Рождественский шоколад", desc: "Праздничные корпоративные подарки с логотипом" },
  { to: "/ru/shokolad-dlya-konferencij", emoji: "🎤", title: "Шоколад для конференций", desc: "Персонализированный шоколад для мероприятий" },
  { to: "/ru/podarki-sotrudnikam", emoji: "👥", title: "Подарки сотрудникам", desc: "Благодарность команде с персональным шоколадом" },
  { to: "/ru/podarki-partneram", emoji: "🤝", title: "Подарки партнёрам", desc: "Эксклюзивные подарки бизнес-партнёрам" },
  { to: "/ru/idei-korporativnyh-podarkov", emoji: "💡", title: "Идеи подарков", desc: "Вдохновение для корпоративных шоколадных подарков" },
];

const stats = [
  { value: "500+", label: "Выполненных заказов" },
  { value: "10+", label: "Лет опыта" },
  { value: "30+", label: "Стран доставки" },
  { value: "50", label: "Мин. заказ (шт.)" },
];

const RuIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useSeo({
    title: "Шоколад с логотипом компании | Премиум корпоративные подарки",
    description: "Эксклюзивный шоколад с логотипом вашей компании. Премиум корпоративные подарки для клиентов, партнёров и мероприятий. Бельгийский шоколад с персонализированной печатью.",
    path: "/ru",
  });

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="flex flex-col">
        <div className="bg-foreground py-16 sm:py-20 text-center">
          <div className="container mx-auto">
            <div className="flex justify-end mb-4">
              <LanguageSwitcher />
            </div>
            <div className="mx-auto mb-10 w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-white overflow-hidden flex items-center justify-center"
              style={{ boxShadow: "0 0 40px rgba(196,163,90,0.15), 0 0 80px rgba(0,0,0,0.3)" }}
            >
              <img src={logo} alt="Luxury Chocolate — эксклюзивный корпоративный шоколад с логотипом" className="w-[85%] h-[85%] object-contain" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-[1.1] tracking-tight font-normal">
              Шоколад с логотипом
              <br />
              <span className="text-primary">для компаний</span>
            </h1>
            <h2 className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto leading-relaxed tracking-wide font-normal">
              Премиум корпоративные подарки для клиентов и партнёров.
            </h2>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{ boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)", letterSpacing: "0.12em" }}
            >
              Получить предложение
            </button>
          </div>
        </div>
        <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
          <video autoPlay muted loop playsInline preload="none" poster="/video/hero-poster.webp" className="absolute inset-0 w-full h-full object-cover">
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
                <p className="text-3xl sm:text-4xl font-light text-primary mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 className="text-3xl sm:text-4xl text-foreground text-center mb-12">Наши решения</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <Link key={s.to} to={s.to} className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md">
                  <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                  <div>
                    <span className="text-base font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                      {s.title} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="block text-sm text-muted-foreground mt-1">{s.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free preview */}
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="ru" />

      {/* SEO text */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }} className="text-base text-muted-foreground leading-relaxed space-y-4">
            <h2 className="text-2xl sm:text-3xl text-foreground mb-4">Шоколад с логотипом для бизнеса</h2>
            <p>Мы предлагаем премиум бельгийский шоколад с персонализированной полноцветной печатью — идеальные корпоративные подарки для клиентов, партнёров и мероприятий. Наши шоколадные подарки помогают компаниям выделиться и создать позитивное впечатление.</p>
            <p>От небольших промо-шоколадок для конференций до люкс подарочных наборов для VIP-клиентов — мы обеспечиваем полный сервис: дизайн, производство и доставку в более чем 30 стран мира. Минимальный заказ от 50 штук, срок изготовления 3–10 рабочих дней.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground text-center">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.4 }}>
            <h2 className="text-2xl sm:text-3xl text-white mb-4">Готовы заказать?</h2>
            <p className="text-white/60 mb-8">Отправьте нам свой логотип, и мы подготовим персональное предложение в течение 24 часов.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{ boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)", letterSpacing: "0.12em" }}
            >
              Получить предложение
            </button>
          </motion.div>
        </div>
      </section>

      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default RuIndex;
