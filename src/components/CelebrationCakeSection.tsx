import { motion } from "framer-motion";
import { useState } from "react";
import { Cake } from "lucide-react";
import type { Lang } from "@/i18n/types";
import Lightbox from "@/components/Lightbox";

import img1 from "@/assets/cake-1.jpg";
import img2 from "@/assets/cake-2.jpg";

const images = [img1, img2];

const _NEW = ["de","fr","it","es","ar","nl","pl","cs","pt","el","tr","hu","ro","bg","hr","sk","sl","uk","sr","bs","mk","sq","is"] as const;
type OldLang9 = "lv" | "en" | "ru" | "et" | "lt" | "sv" | "no" | "fi" | "da";
const _addLangs = <T,>(base: Record<OldLang9, T>): Record<Lang, T> => {
  const r: any = { ...base };
  for (const l of _NEW) r[l] = base.en;
  return r;
};

const content: Record<Lang, {
  badge: string;
  heading: string;
  subtitle: string;
  items: { title: string; description: string; alt: string }[];
  ctaButton: string;
}> = _addLangs({
  lv: {
    badge: "Jubileju tortes",
    heading: "Šokolādes plāksnes lielām tortēm",
    subtitle: "Personalizētas šokolādes plāksnes ar logo un dizainu jubileju tortēm — iespaidīgs akcents korporatīviem pasākumiem un svinībām.",
    items: [
      { title: "Dobeles Dzirnavnieks jubilejas torte", description: "Liela svinīga torte ar personalizētu šokolādes plāksni — Dobele logo un laimes rata dizains jubilejas pasākumam.", alt: "Sarkana jubilejas torte ar Dobeles Dzirnavnieks logo šokolādes plāksni un ogām" },
      { title: "SWH Group 30 gadu jubileja", description: "Eleganta jubilejas torte ar individuālām šokolādes plāksnēm katram viesim — SWH Group 30 gadu svinības.", alt: "SWH Group 30 gadu jubilejas torte ar logo šokolādes plāksnēm un ogām greznam pasākumam" },
    ],
    ctaButton: "Pasūtīt tortes šokolādi",
  },
  en: {
    badge: "Celebration Cakes",
    heading: "Chocolate plaques for celebration cakes",
    subtitle: "Personalized chocolate plaques with logo and design for anniversary cakes — an impressive accent for corporate events and celebrations.",
    items: [
      { title: "Dobeles Dzirnavnieks anniversary cake", description: "Large celebration cake with a personalized chocolate plaque — Dobele logo and fortune wheel design for an anniversary event.", alt: "Red anniversary cake with Dobeles Dzirnavnieks logo chocolate plaque and berries" },
      { title: "SWH Group 30th anniversary", description: "Elegant anniversary cake with individual chocolate plaques for each guest — SWH Group 30th anniversary celebration.", alt: "SWH Group 30th anniversary cake with logo chocolate plaques and berries at a gala event" },
    ],
    ctaButton: "Order cake chocolates",
  },
  ru: {
    badge: "Юбилейные торты",
    heading: "Шоколадные таблички для праздничных тортов",
    subtitle: "Персонализированные шоколадные таблички с логотипом для юбилейных тортов — впечатляющий акцент для корпоративных мероприятий.",
    items: [
      { title: "Торт Dobeles Dzirnavnieks", description: "Большой праздничный торт с персонализированной шоколадной табличкой — логотип Dobele для юбилейного мероприятия.", alt: "Красный юбилейный торт с шоколадной табличкой Dobeles Dzirnavnieks и ягодами" },
      { title: "30-летие SWH Group", description: "Элегантный юбилейный торт с индивидуальными шоколадными табличками для каждого гостя.", alt: "Юбилейный торт SWH Group с шоколадными табличками на гала-мероприятии" },
    ],
    ctaButton: "Заказать шоколад для тортов",
  },
  et: {
    badge: "Juubelitordid",
    heading: "Šokolaadiplaadid pidustortidele",
    subtitle: "Personaliseeritud šokolaadiplaadid logoga juubelitortidele — muljetavaldav aktsent ettevõtete üritustele.",
    items: [
      { title: "Dobeles Dzirnavnieks juubelitort", description: "Suur pidulik tort personaliseeritud šokolaadiplaadiga — Dobele logo juubelisündmusele.", alt: "Punane juubelitort Dobeles Dzirnavnieks logo šokolaadiplaadiga" },
      { title: "SWH Group 30. aastapäev", description: "Elegantne juubelitort individuaalsete šokolaadiplaatidega igale külalisele.", alt: "SWH Group 30. aastapäeva tort šokolaadiplaatidega galaüritusel" },
    ],
    ctaButton: "Telli tordišokolaadid",
  },
  lt: {
    badge: "Jubiliejiniai tortai",
    heading: "Šokolado plokštelės šventiniams tortams",
    subtitle: "Personalizuotos šokolado plokštelės su logotipu jubiliejiniams tortams — įspūdingas akcentas korporatyviniams renginiams.",
    items: [
      { title: "Dobeles Dzirnavnieks jubiliejinis tortas", description: "Didelis šventinis tortas su personalizuota šokolado plokštele — Dobele logotipas jubiliejiniam renginiui.", alt: "Raudonas jubiliejinis tortas su Dobeles Dzirnavnieks logo šokolado plokštele" },
      { title: "SWH Group 30-metis", description: "Elegantiškas jubiliejinis tortas su individualiomis šokolado plokštelėmis kiekvienam svečiui.", alt: "SWH Group 30-mečio tortas su šokolado plokštelėmis gala renginyje" },
    ],
    ctaButton: "Užsakyti torto šokoladus",
  },
  sv: {
    badge: "Jubileumstårtor",
    heading: "Chokladplattor för festtårtor",
    subtitle: "Personliga chokladplattor med logotyp för jubileumstårtor — ett imponerande inslag vid företagsevenemang.",
    items: [
      { title: "Dobeles Dzirnavnieks jubileumstårta", description: "Stor festtårta med personlig chokladplatta — Dobele-logotyp för jubileumsevent.", alt: "Röd jubileumstårta med Dobeles Dzirnavnieks logo chokladplatta" },
      { title: "SWH Group 30-årsjubileum", description: "Elegant jubileumstårta med individuella chokladplattor för varje gäst.", alt: "SWH Group 30-årsjubileumstårta med chokladplattor på galaevent" },
    ],
    ctaButton: "Beställ tårtchoklad",
  },
  no: {
    badge: "Jubileumskaker",
    heading: "Sjokoladeflak for festkaker",
    subtitle: "Personlige sjokoladeflak med logo for jubileumskaker — et imponerende innslag ved bedriftsarrangementer.",
    items: [
      { title: "Dobeles Dzirnavnieks jubileumskake", description: "Stor festkake med personlig sjokoladeflak — Dobele-logo for jubileumsarrangement.", alt: "Rød jubileumskake med Dobeles Dzirnavnieks logo sjokoladeflak" },
      { title: "SWH Group 30-årsjubileum", description: "Elegant jubileumskake med individuelle sjokoladeflak for hver gjest.", alt: "SWH Group 30-årsjubileumskake med sjokoladeflak på galaarrangement" },
    ],
    ctaButton: "Bestill kakesjokolade",
  },
  fi: {
    badge: "Juhlatortut",
    heading: "Suklaalevyt juhlatorttuihin",
    subtitle: "Personoidut suklaalevyt logolla juhlatorttuihin — vaikuttava aksentti yritystapahtumiin ja juhliin.",
    items: [
      { title: "Dobeles Dzirnavnieks juhlatorttu", description: "Suuri juhlatorttu personoidulla suklaalevyllä — Dobele-logo juhlatilaisuuteen.", alt: "Punainen juhlatorttu Dobeles Dzirnavnieks logo suklaalevyllä" },
      { title: "SWH Group 30-vuotisjuhla", description: "Tyylikäs juhlatorttu henkilökohtaisilla suklaalevyillä jokaiselle vieraalle.", alt: "SWH Group 30-vuotisjuhlatorttu suklaalevyillä gaala-tapahtumassa" },
    ],
    ctaButton: "Tilaa torttusuklaat",
  },
  da: {
    badge: "Jubilæumskager",
    heading: "Chokoladeplader til festkager",
    subtitle: "Personlige chokoladeplader med logo til jubilæumskager — et imponerende indslag til firmaevents og fejringer.",
    items: [
      { title: "Dobeles Dzirnavnieks jubilæumskage", description: "Stor festkage med personlig chokoladeplade — Dobele-logo til jubilæumsarrangement.", alt: "Rød jubilæumskage med Dobeles Dzirnavnieks logo chokoladeplade" },
      { title: "SWH Group 30-års jubilæum", description: "Elegant jubilæumskage med individuelle chokoladeplader til hver gæst.", alt: "SWH Group 30-års jubilæumskage med chokoladeplader til galaevent" },
    ],
    ctaButton: "Bestil kagechokolade",
  },
});

interface CelebrationCakeSectionProps {
  lang?: Lang;
  onCtaClick?: () => void;
}

const CelebrationCakeSection = ({ lang = "lv", onCtaClick }: CelebrationCakeSectionProps) => {
  const t = content[lang];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <motion.section
        id="tortes"
        className="py-24"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-primary font-medium mb-3">
              <Cake className="w-4 h-4" />
              {t.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4">
              {t.heading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {t.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                <div
                  className="photo-card relative block bg-card rounded-xl overflow-hidden cursor-pointer group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative photo-vignette">
                    <img
                      src={images[i]}
                      alt={item.alt}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-[1.1]"
                    />
                    <div className="absolute inset-0 rounded-t-xl ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/30 transition-all duration-500 z-[3] pointer-events-none" />
                  </div>
                  <div className="p-5 relative z-[3] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {onCtaClick && (
            <div className="text-center">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Cake className="w-4 h-4" />
                {t.ctaButton}
              </button>
            </div>
          )}
        </div>
      </motion.section>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
        title={lightboxIndex !== null ? t.items[lightboxIndex]?.title : undefined}
        description={lightboxIndex !== null ? t.items[lightboxIndex]?.description : undefined}
      />
    </>
  );
};

export default CelebrationCakeSection;
