import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductImageViewer, { imageViewerLabels } from "@/components/ProductImageViewer";
import type { Lang } from "@/i18n/types";
import gift01 from "@/assets/christmas-gallery/gift-01.webp.asset.json";
import gift02 from "@/assets/christmas-gallery/gift-02.webp.asset.json";
import gift03 from "@/assets/christmas-gallery/gift-03.webp.asset.json";
import gift04 from "@/assets/christmas-gallery/gift-04.webp.asset.json";
import gift05 from "@/assets/christmas-gallery/gift-05.webp.asset.json";
import gift06 from "@/assets/christmas-gallery/gift-06.webp.asset.json";
import gift07 from "@/assets/christmas-gallery/gift-07.webp.asset.json";
import gift08 from "@/assets/christmas-gallery/gift-08.webp.asset.json";
import gift09 from "@/assets/christmas-gallery/gift-09.webp.asset.json";
import gift10 from "@/assets/christmas-gallery/gift-10.webp.asset.json";
import gift11 from "@/assets/christmas-gallery/gift-11.webp.asset.json";
import gift12 from "@/assets/christmas-gallery/gift-12.webp.asset.json";
import gift13 from "@/assets/christmas-gallery/gift-13.webp.asset.json";
import gift14 from "@/assets/christmas-gallery/gift-14.webp.asset.json";
import gift15 from "@/assets/christmas-gallery/gift-15.webp.asset.json";
import gift16 from "@/assets/christmas-gallery/gift-16.webp.asset.json";
import gift17 from "@/assets/christmas-gallery/gift-17.webp.asset.json";
import gift18 from "@/assets/christmas-gallery/gift-18.webp.asset.json";
import gift19 from "@/assets/christmas-gallery/gift-19.webp.asset.json";
import gift20 from "@/assets/christmas-gallery/gift-20.webp.asset.json";

const images = [gift01, gift02, gift03, gift04, gift05, gift06, gift07, gift08, gift09, gift10, gift11, gift12, gift13, gift14, gift15, gift16, gift17, gift18, gift19, gift20].map((asset) => asset.url);
const captions = {
  lv: ["Personalizēta šokolādes dāvana", "Šokolādes adventes kalendārs", "Šokolādes apsveikuma kartīte", "Piecu konfekšu dāvanu kastīte", "Piparkūka ar logo un sarkanu lentīti", "Piparkūka ar logo uz krūzes", "Piparkūkas svētku iepakojumā", "Šokolādes glezna dāvanu kastītē", "Ziemassvētku piparkūkas ar apdruku", "Personalizēts svētku dāvanu komplekts"],
  en: ["Personalized chocolate gift", "Chocolate Advent calendar", "Chocolate greeting card", "Five-chocolate gift box", "Logo gingerbread with a red ribbon", "Logo gingerbread on a mug", "Gingerbread in festive packaging", "Chocolate picture in a gift box", "Printed Christmas gingerbread", "Personalized festive gift set"],
  ru: ["Персонализированный шоколадный подарок", "Шоколадный адвент-календарь", "Шоколадная поздравительная открытка", "Подарочная коробка из пяти конфет", "Пряник с логотипом и красной лентой", "Пряник с логотипом на кружке", "Пряники в праздничной упаковке", "Шоколадная картина в подарочной коробке", "Рождественские пряники с печатью", "Персонализированный праздничный набор"],
  et: ["Personaliseeritud šokolaadikingitus", "Šokolaadi advendikalender", "Šokolaadist õnnitluskaart", "Viie kommi kinkekarp", "Logoga piparkook punase paelaga", "Logoga piparkook kruusil", "Piparkoogid pidulikus pakendis", "Šokolaadipilt kinkekarbis", "Trükiga jõulupiparkoogid", "Personaliseeritud pidulik kinkekomplekt"],
};
const additionalCaptions = {
  lv: ["Šokolādes ar logo un zelta lentīti", "Piparkūku dāvanu komplekts ar sarkanām lentītēm", "Konfekšu adventes kalendārs", "Personalizēta šokolādes glezna ar zilu lentīti", "Šokolādes monētas un svētku figūras", "Sirds formas šokolādes ar apsveikumu", "Šokolāde ar 100 eiro banknotes apdruku", "Korporatīvās Ziemassvētku šokolādes", "Sirds formas šokolādes ar baltām lentītēm", "Sirds formas šokolādes dāvanas pie pudelēm"],
  en: ["Logo chocolates with a gold ribbon", "Gingerbread gift set with red ribbons", "Chocolate Advent calendar gift box", "Personalized chocolate picture with a blue ribbon", "Chocolate coins and festive shapes", "Heart-shaped chocolates with greetings", "Chocolate printed with a 100 euro banknote", "Corporate Christmas chocolates", "Heart-shaped chocolates with white ribbons", "Heart-shaped chocolate gifts tied to bottles"],
  ru: ["Шоколад с логотипом и золотой лентой", "Подарочный набор пряников с красными лентами", "Адвент-календарь с конфетами", "Шоколадная картина с синей лентой", "Шоколадные монеты и праздничные фигурки", "Шоколадные сердца с поздравлением", "Шоколад с печатью банкноты 100 евро", "Корпоративный рождественский шоколад", "Шоколадные сердца с белыми лентами", "Шоколадные сердца для украшения бутылок"],
  et: ["Logoga šokolaadid kuldse paelaga", "Piparkookide kinkekomplekt punaste paeltega", "Kommidega advendikalender", "Personaliseeritud šokolaadipilt sinise paelaga", "Šokolaadimündid ja pidulikud kujundid", "Südamekujulised šokolaadid tervitusega", "100 euro rahatähe trükiga šokolaad", "Ettevõtte jõulušokolaadid", "Südamekujulised šokolaadid valgete paeltega", "Pudelite külge seotavad šokolaadisüdamed"],
};

export default function ChristmasGiftGallery({ lang = "lv" }: { lang?: Lang }) {
  const [index, setIndex] = useState<number | null>(null);
  const titles = [
    ...(captions[lang as keyof typeof captions] ?? captions.en),
    ...(additionalCaptions[lang as keyof typeof additionalCaptions] ?? additionalCaptions.en),
  ];
  const labels = imageViewerLabels(lang);

  return (
    <>
      <div data-christmas-gallery className="grid grid-cols-1 gap-x-6 gap-y-8 mb-16 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image, i) => (
          <figure key={image} className="min-w-0">
            <Button
              variant="ghost"
              className="group block h-auto w-full overflow-hidden rounded-lg p-0 hover:bg-transparent"
              aria-label={`${labels.open}: ${titles[i]}`}
              onClick={() => setIndex(i)}
            >
              <img src={image} alt={titles[i]} loading="lazy" className="aspect-[4/3] w-full object-contain transition-transform duration-500 motion-safe:group-hover:scale-105" />
            </Button>
            <figcaption className="mt-3 text-base font-medium leading-snug text-foreground">{titles[i]}</figcaption>
          </figure>
        ))}
      </div>
      <ProductImageViewer images={images} index={index} title={titles[index ?? 0]} onClose={() => setIndex(null)} onChangeIndex={setIndex} />
    </>
  );
}