import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductImageViewer, { imageViewerLabels } from "@/components/ProductImageViewer";
import { gingerbreadContent, gingerbreadPhotoCaptions } from "@/i18n/gingerbread";
import logoPhoto from "@/assets/gingerbread/gingerbread-logo.webp.asset.json";
import coffeePhoto from "@/assets/gingerbread/gingerbread-coffee.webp.asset.json";
import ribbonPhoto from "@/assets/gingerbread/gingerbread-ribbon-gifts.webp.asset.json";
import starPhoto from "@/assets/gingerbread/gingerbread-star.webp.asset.json";
import treePhoto from "@/assets/gingerbread/gingerbread-tree.webp.asset.json";
import tablePhoto from "@/assets/gingerbread/gingerbread-table-gifts.webp.asset.json";
import wrappedPhoto from "@/assets/gingerbread/gingerbread-wrapped.webp.asset.json";

const images = [logoPhoto, coffeePhoto, ribbonPhoto, starPhoto, treePhoto, tablePhoto, wrappedPhoto].map((photo) => photo.url);

export default function GingerbreadSection({ lang = "lv", showHeading = true }: { lang?: string; showHeading?: boolean }) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const t = gingerbreadContent(lang);
  const captions = gingerbreadPhotoCaptions(lang);
  const labels = imageViewerLabels(lang);
  const shopUrl = `/veikals?category=ziemassvetku-piparkukas${lang === "lv" ? "" : `&lang=${lang}`}`;

  return (
    <section
      id="piparkukas"
      aria-labelledby={showHeading ? "gingerbread-heading" : undefined}
      className={showHeading ? "scroll-mt-40 bg-background py-20 sm:py-24" : "scroll-mt-40 bg-background pb-20 pt-10 sm:pb-24 sm:pt-14"}
    >
      {showHeading && (
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 id="gingerbread-heading" className="mb-4 text-3xl text-foreground sm:text-4xl">{t.title}</h2>
          <p className="text-muted-foreground">{t.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <figure key={image} className="min-w-0">
            <Button
              variant="ghost"
              className="group relative block aspect-[4/3] h-auto w-full overflow-hidden rounded-none p-0 hover:bg-transparent focus-visible:ring-primary"
              onClick={() => setImageIndex(index)}
              aria-label={`${labels.open}: ${captions[index]?.title}`}
              title={labels.open}
            >
              <img src={image} alt={captions[index]?.description} loading="lazy" decoding="async" className="h-full w-full object-contain transition-transform duration-500 motion-safe:group-hover:scale-105" />
              <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-primary transition-transform motion-safe:group-hover:scale-110"><ZoomIn size={17} /></span>
            </Button>
            <figcaption className="pt-5">
              <h3 className="mb-2 text-lg font-bold leading-snug text-foreground">{captions[index]?.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{captions[index]?.description}</p>
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
      <ProductImageViewer images={images} index={imageIndex} title={imageIndex === null ? t.title : captions[imageIndex]?.title ?? t.title} onClose={() => setImageIndex(null)} onChangeIndex={setImageIndex} />
    </section>
  );
}