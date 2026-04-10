import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import ilzePhoto from "@/assets/ilze-eisaka.jpg";
import type { Lang } from "@/i18n/types";

const contactContent: Record<Lang, { heading: string; subtitle: string; role: string; cta: string; ctaOffer: string }> = {
  lv: { heading: "Sazinies ar mums", subtitle: "Mēs palīdzēsim izvēlēties ideālo šokolādes dāvanu Jūsu uzņēmumam", role: "Vadītāja", cta: "Rakstīt e-pastu", ctaOffer: "Aizpildīt pieteikumu" },
  en: { heading: "Contact us", subtitle: "We'll help you choose the perfect chocolate gift for your company", role: "Manager", cta: "Send email", ctaOffer: "Submit inquiry" },
  ru: { heading: "Свяжитесь с нами", subtitle: "Мы поможем выбрать идеальный шоколадный подарок для вашей компании", role: "Руководитель", cta: "Написать", ctaOffer: "Заполнить заявку" },
  et: { heading: "Võtke meiega ühendust", subtitle: "Aitame valida ideaalse šokolaadikingi teie ettevõttele", role: "Juhataja", cta: "Saada e-kiri", ctaOffer: "Täida taotlus" },
  lt: { heading: "Susisiekite su mumis", subtitle: "Padėsime pasirinkti idealią šokolado dovaną jūsų įmonei", role: "Vadovė", cta: "Rašyti el. laišką", ctaOffer: "Pildyti užklausą" },
  sv: { heading: "Kontakta oss", subtitle: "Vi hjälper dig välja den perfekta chokladpresenten för ditt företag", role: "Chef", cta: "Skicka e-post", ctaOffer: "Skicka förfrågan" },
  no: { heading: "Kontakt oss", subtitle: "Vi hjelper deg å velge den perfekte sjokoladegaven for din bedrift", role: "Leder", cta: "Send e-post", ctaOffer: "Send forespørsel" },
  fi: { heading: "Ota yhteyttä", subtitle: "Autamme valitsemaan täydellisen suklaalalahjan yrityksellesi", role: "Johtaja", cta: "Lähetä sähköposti", ctaOffer: "Lähetä tiedustelu" },
  da: { heading: "Kontakt os", subtitle: "Vi hjælper dig med at vælge den perfekte chokoladegave til din virksomhed", role: "Leder", cta: "Send e-mail", ctaOffer: "Send forespørgsel" },
  de: { heading: "Kontaktieren Sie uns", subtitle: "Wir helfen Ihnen, das perfekte Schokoladengeschenk für Ihr Unternehmen zu wählen", role: "Geschäftsführerin", cta: "E-Mail senden", ctaOffer: "Anfrage senden" },
  fr: { heading: "Contactez-nous", subtitle: "Nous vous aidons à choisir le cadeau chocolat parfait pour votre entreprise", role: "Directrice", cta: "Envoyer un e-mail", ctaOffer: "Soumettre une demande" },
  it: { heading: "Contattaci", subtitle: "Ti aiutiamo a scegliere il regalo di cioccolato perfetto per la tua azienda", role: "Direttrice", cta: "Invia e-mail", ctaOffer: "Invia richiesta" },
  es: { heading: "Contáctenos", subtitle: "Le ayudamos a elegir el regalo de chocolate perfecto para su empresa", role: "Directora", cta: "Enviar correo", ctaOffer: "Enviar consulta" },
  ar: { heading: "اتصل بنا", subtitle: "سنساعدك في اختيار هدية الشوكولاتة المثالية لشركتك", role: "المديرة", cta: "إرسال بريد إلكتروني", ctaOffer: "إرسال استفسار" },
};

interface ContactSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const ContactSection = ({ lang = "lv", onCtaClick }: ContactSectionProps) => {
  const t = contactContent[lang];

  return (
    <section id="kontakti" className="py-24 bg-card/50">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl text-foreground mb-3">{t.heading}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Photo */}
          <div className="shrink-0">
            <div
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden ring-4 ring-primary/20"
              style={{ boxShadow: "0 0 40px rgba(196,163,90,0.15), 0 8px 32px -8px rgba(0,0,0,0.25)" }}
            >
              <img
                src={ilzePhoto}
                alt="Ilze Eisaka — Luxury Chocolate vadītāja"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center sm:text-left space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">Ilze Eisaka</h3>
              <p className="text-primary font-medium tracking-wide text-sm uppercase">{t.role}</p>
            </div>

            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+37126177853" className="hover:text-primary transition-colors">
                  +371 26 177 853
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@luxurychocolate.lv" className="hover:text-primary transition-colors">
                  info@luxurychocolate.lv
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Kandavas iela 29a, Rīga, LV-1083, {lang === "lv" ? "Latvija" : lang === "ru" ? "Латвия" : lang === "et" ? "Läti" : lang === "lt" ? "Latvija" : lang === "da" ? "Letland" : lang === "sv" ? "Lettland" : lang === "no" ? "Latvia" : lang === "fi" ? "Latvia" : lang === "de" ? "Lettland" : lang === "fr" ? "Lettonie" : lang === "it" ? "Lettonia" : lang === "es" ? "Letonia" : lang === "ar" ? "لاتفيا" : "Latvia"}</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-2">
              <a
                href="mailto:info@luxurychocolate.lv"
                className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-8 py-3 font-medium tracking-wider text-sm uppercase transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
                style={{ boxShadow: "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4)" }}
              >
                {t.cta}
              </a>
              {onCtaClick && (
                <button
                  onClick={onCtaClick}
                  className="inline-flex items-center justify-center rounded-lg border border-primary text-primary px-8 py-3 font-medium tracking-wider text-sm uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground active:scale-[0.97]"
                >
                  {t.ctaOffer}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
