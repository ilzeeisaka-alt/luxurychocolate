import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductImageViewer, { imageViewerLabels } from "@/components/ProductImageViewer";
import mixMediaPhoto from "@/assets/christmas-gallery/gift-26.webp.asset.json";
import solanoPhoto from "@/assets/christmas-gallery/gift-27.webp.asset.json";
import sweetProspectusPhoto from "@/assets/christmas-gallery/gift-28.webp.asset.json";

const images = [mixMediaPhoto, solanoPhoto, sweetProspectusPhoto].map((photo) => photo.url);

const content = {
  lv: {
    title: "Šokolāde apdrukātā papīrā",
    description: "Šokolādes tāfelītes ar pilnkrāsu apdrukātu papīra iesaiņojumu — Jūsu logo, dizains un vēstījums uz katra iepakojuma.",
    shop: "Skatīt reklāmas šokolādes",
    captions: [
      { title: "Mix Media Group", description: "Šokolāde apdrukātā papīrā ar sarkanu lentīti — korporatīvā Ziemassvētku dāvana." },
      { title: "Solano Industries", description: "Šokolādes tāfelīte apdrukātā papīrā ar uzņēmuma logo un dizainu." },
      { title: "Sweet Prospectus", description: "Šokolāde personalizētā apdrukātā papīrā ar zilu lentīti." },
    ],
  },
  en: {
    title: "Chocolate in printed paper",
    description: "Chocolate bars with a full-color printed paper wrapper — your logo, design and message on every package.",
    shop: "View promotional chocolates",
    captions: [
      { title: "Mix Media Group", description: "Chocolate in printed paper with a red ribbon — a corporate Christmas gift." },
      { title: "Solano Industries", description: "Chocolate bar in printed paper with the company logo and design." },
      { title: "Sweet Prospectus", description: "Chocolate in personalized printed paper with a blue ribbon." },
    ],
  },
  ru: {
    title: "Шоколад в печатной бумаге",
    description: "Шоколадные плитки в полноцветной печатной бумажной обёртке — ваш логотип, дизайн и послание на каждой упаковке.",
    shop: "Смотреть рекламный шоколад",
    captions: [
      { title: "Mix Media Group", description: "Шоколад в печатной бумаге с красной лентой — корпоративный рождественский подарок." },
      { title: "Solano Industries", description: "Шоколадная плитка в печатной бумаге с логотипом и дизайном компании." },
      { title: "Sweet Prospectus", description: "Шоколад в персонализированной печатной бумаге с синей лентой." },
    ],
  },
  et: {
    title: "Šokolaad trükitud paberis",
    description: "Šokolaaditahvlid täisvärvilises trükitud paberpakendis — teie logo, disain ja sõnum igal pakendil.",
    shop: "Vaata reklaamšokolaade",
    captions: [
      { title: "Mix Media Group", description: "Šokolaad trükitud paberis punase paelaga — ettevõtte jõulukingitus." },
      { title: "Solano Industries", description: "Šokolaaditahvel trükitud paberis ettevõtte logo ja disainiga." },
      { title: "Sweet Prospectus", description: "Šokolaad personaliseeritud trükitud paberis sinise paelaga." },
    ],
  },
};

export default function PrintedPaperChocolatesSection({ lang = "lv" }: { lang?: string }) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const t = content[lang as keyof typeof content] ?? content.lv;
  const labels = imageViewerLabels(lang);
  const shopUrl = `/veikals?category=reklamas-sokolades${lang === "lv" ? "" : `&lang=${lang}`}`;

  return (
    <section id="sokolade-apdrukata-papira" aria-labelledby="printed-paper-heading" className="scroll-mt-40 bg-background py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 id="printed-paper-heading" className="mb-4 text-3xl text-foreground sm:text-4xl">{t.title}</h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {images.map((image, index) => (
            <figure key={image} className="min-w-0">
              <Button
                variant="ghost"
                className="group relative block aspect-[4/3] h-auto w-full overflow-hidden rounded-none p-0 hover:bg-transparent focus-visible:ring-primary"
                onClick={() => setImageIndex(index)}
                aria-label={`${labels.open}: ${t.captions[index]?.title}`}
                title={labels.open}
              >
                <img src={image} alt={t.captions[index]?.description} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-primary transition-transform motion-safe:group-hover:scale-110"><ZoomIn size={17} /></span>
              </Button>
              <figcaption className="pt-3">
                <h3 className="mb-1 text-lg font-bold leading-snug text-foreground">{t.captions[index]?.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.captions[index]?.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild className="h-auto whitespace-normal px-6 py-3">
            <Link to={shopUrl}>{t.shop}<ArrowRight className="shrink-0" size={18} /></Link>
          </Button>
        </div>
      </div>
      <ProductImageViewer images={images} index={imageIndex} title={imageIndex === null ? t.title : t.captions[imageIndex]?.title ?? t.title} onClose={() => setImageIndex(null)} onChangeIndex={setImageIndex} />
    </section>
  );
}
