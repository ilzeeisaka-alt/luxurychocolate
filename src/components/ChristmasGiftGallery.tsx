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

const images = [gift01, gift02, gift03, gift04, gift05, gift06, gift07, gift08, gift09, gift10].map((asset) => asset.url);
const captions = {
  lv: ["Personalizēta šokolādes dāvana", "Šokolādes adventes kalendārs", "Šokolādes apsveikuma kartīte", "Piecu konfekšu dāvanu kastīte", "Piparkūka ar logo un sarkanu lentīti", "Piparkūka ar logo uz krūzes", "Piparkūkas svētku iepakojumā", "Šokolādes glezna dāvanu kastītē", "Ziemassvētku piparkūkas ar apdruku", "Personalizēts svētku dāvanu komplekts"],
  en: ["Personalized chocolate gift", "Chocolate Advent calendar", "Chocolate greeting card", "Five-chocolate gift box", "Logo gingerbread with a red ribbon", "Logo gingerbread on a mug", "Gingerbread in festive packaging", "Chocolate picture in a gift box", "Printed Christmas gingerbread", "Personalized festive gift set"],
  ru: ["Персонализированный шоколадный подарок", "Шоколадный адвент-календарь", "Шоколадная поздравительная открытка", "Подарочная коробка из пяти конфет", "Пряник с логотипом и красной лентой", "Пряник с логотипом на кружке", "Пряники в праздничной упаковке", "Шоколадная картина в подарочной коробке", "Рождественские пряники с печатью", "Персонализированный праздничный набор"],
  et: ["Personaliseeritud šokolaadikingitus", "Šokolaadi advendikalender", "Šokolaadist õnnitluskaart", "Viie kommi kinkekarp", "Logoga piparkook punase paelaga", "Logoga piparkook kruusil", "Piparkoogid pidulikus pakendis", "Šokolaadipilt kinkekarbis", "Trükiga jõulupiparkoogid", "Personaliseeritud pidulik kinkekomplekt"],
};

export default function ChristmasGiftGallery({ lang = "lv" }: { lang?: Lang }) {
  const [index, setIndex] = useState<number | null>(null);
  const titles = captions[lang as keyof typeof captions] ?? captions.en;
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