import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCurrentLang } from "@/i18n/useCurrentLang";

export const imageViewerLabels = (lang: string) => ({
  open: lang === "lv" ? "Palielināt attēlu" : lang === "ru" ? "Увеличить изображение" : lang === "et" ? "Suurenda pilti" : "Enlarge image",
  zoomIn: lang === "lv" ? "Pietuvināt" : lang === "ru" ? "Приблизить" : lang === "et" ? "Suumi sisse" : "Zoom in",
  zoomOut: lang === "lv" ? "Attālināt" : lang === "ru" ? "Отдалить" : lang === "et" ? "Suumi välja" : "Zoom out",
  previous: lang === "lv" ? "Iepriekšējais attēls" : lang === "ru" ? "Предыдущее изображение" : lang === "et" ? "Eelmine pilt" : "Previous image",
  next: lang === "lv" ? "Nākamais attēls" : lang === "ru" ? "Следующее изображение" : lang === "et" ? "Järgmine pilt" : "Next image",
});

interface Props {
  images: string[];
  index: number | null;
  title: string;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export default function ProductImageViewer({ images, index, title, onClose, onChangeIndex }: Props) {
  const lang = useCurrentLang();
  const labels = imageViewerLabels(lang);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => setZoomed(false), [index, images[index ?? 0]]);
  const change = (direction: number) => {
    if (index === null || images.length < 2) return;
    onChangeIndex((index + direction + images.length) % images.length);
  };

  return (
    <Dialog open={index !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        aria-describedby={undefined}
        className="z-[10000] flex h-[92dvh] w-[96vw] max-w-[1400px] flex-col gap-3 p-3 sm:p-5"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); change(1); }
        }}
      >
        <DialogTitle className="pr-8 text-sm leading-snug">{title}</DialogTitle>
        <div className="flex min-h-0 flex-1 overflow-auto bg-muted rounded-md">
          {index !== null && images[index] && (
            <div className={zoomed ? "h-[200%] w-[200%] shrink-0" : "h-full w-full"}>
              <img
                src={images[index]}
                alt={title}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center justify-center gap-3">
          {images.length > 1 && <Button variant="outline" size="icon" onClick={() => change(-1)} aria-label={labels.previous} title={labels.previous}><ChevronLeft /></Button>}
          <Button variant="outline" size="icon" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? labels.zoomOut : labels.zoomIn} title={zoomed ? labels.zoomOut : labels.zoomIn}>
            {zoomed ? <ZoomOut /> : <ZoomIn />}
          </Button>
          {images.length > 1 && <><span className="text-sm text-muted-foreground">{(index ?? 0) + 1} / {images.length}</span><Button variant="outline" size="icon" onClick={() => change(1)} aria-label={labels.next} title={labels.next}><ChevronRight /></Button></>}
        </div>
      </DialogContent>
    </Dialog>
  );
}