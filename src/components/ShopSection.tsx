import { useState, useRef, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ExternalLink, Upload, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/i18n/types";

const shopUrls: Record<Lang, string> = {
  lv: "https://www.luxurychocolatesia.lv/interneta-veikals-produkti/",
  en: "https://www.luxurychocolatesia.lv/online-shop-products/",
  ru: "https://www.luxurychocolatesia.lv/internet-magazin-produkti/",
  et: "https://www.luxurychocolatesia.lv/e-pood/",
  lt: "https://www.luxurychocolatesia.lv/internetine-parduotuve/",
};

const shopContent: Record<
  Lang,
  {
    heading: string;
    subtitle: string;
    cta: string;
    badge1: string;
    badge2: string;
    badge3: string;
    uploadBtn: string;
    uploadSuccess: string;
    uploadError: string;
    uploadFallbackInfo: string;
  }
> = {
  lv: {
    heading: "Interneta veikals",
    subtitle: "Izvēlieties no mūsu plašā sortimenta un pasūtiet šokolādes ar savu logo tiešsaistē.",
    cta: "Pasūtīt tagad ar savu logo",
    badge1: "🍫 Premium šokolādes",
    badge2: "🎁 Dāvanu kastes",
    badge3: "🏷️ Ar Jūsu logo",
    uploadBtn: "Augšupielādē savu logo vai foto",
    uploadSuccess: "Fails veiksmīgi augšupielādēts un nosūtīts!",
    uploadError: "Neizdevās pabeigt augšupielādi.",
    uploadFallbackInfo: "Fails saglabāts. Primārais e-pasts nebija pieejams, izmantots rezerves maršruts.",
  },
  en: {
    heading: "Online shop",
    subtitle: "Choose from our wide selection and order chocolates with your logo online.",
    cta: "Order now with your logo",
    badge1: "🍫 Premium chocolates",
    badge2: "🎁 Gift boxes",
    badge3: "🏷️ With your logo",
    uploadBtn: "Upload your logo or photo",
    uploadSuccess: "File uploaded and sent successfully!",
    uploadError: "Upload could not be completed.",
    uploadFallbackInfo: "File saved. Primary email route was unavailable, fallback route was used.",
  },
  ru: {
    heading: "Интернет-магазин",
    subtitle: "Выберите из нашего широкого ассортимента и закажите шоколад с вашим логотипом онлайн.",
    cta: "Заказать с вашим логотипом",
    badge1: "🍫 Премиум шоколад",
    badge2: "🎁 Подарочные наборы",
    badge3: "🏷️ С вашим логотипом",
    uploadBtn: "Загрузите ваш логотип или фото",
    uploadSuccess: "Файл успешно загружен и отправлен!",
    uploadError: "Не удалось завершить загрузку.",
    uploadFallbackInfo: "Файл сохранён. Основной маршрут e-mail недоступен, использован резервный.",
  },
  et: {
    heading: "E-pood",
    subtitle: "Valige meie laiast valikust ja tellige šokolaadid oma logoga veebist.",
    cta: "Telli nüüd oma logoga",
    badge1: "🍫 Premium šokolaadid",
    badge2: "🎁 Kinkekarbid",
    badge3: "🏷️ Teie logoga",
    uploadBtn: "Laadige üles oma logo või foto",
    uploadSuccess: "Fail edukalt üles laaditud ja saadetud!",
    uploadError: "Üleslaadimist ei saanud lõpule viia.",
    uploadFallbackInfo: "Fail salvestati. Peamine e-posti marsruut polnud saadaval, kasutati varukanalit.",
  },
  lt: {
    heading: "Internetinė parduotuvė",
    subtitle: "Pasirinkite iš mūsų plataus asortimento ir užsakykite šokoladą su savo logotipu internetu.",
    cta: "Užsakyti su savo logotipu",
    badge1: "🍫 Premium šokoladai",
    badge2: "🎁 Dovanų rinkiniai",
    badge3: "🏷️ Su jūsų logotipu",
    uploadBtn: "Įkelkite savo logotipą ar nuotrauką",
    uploadSuccess: "Failas sėkmingai įkeltas ir išsiųstas!",
    uploadError: "Nepavyko užbaigti įkėlimo.",
    uploadFallbackInfo: "Failas išsaugotas. Pagrindinis el. pašto maršrutas nepasiekiamas, naudotas atsarginis.",
  },
};

interface ShopSectionProps {
  lang?: Lang;
}

const ShopSection = ({ lang = "lv" }: ShopSectionProps) => {
  const t = shopContent[lang];
  const url = shopUrls[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `shop/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("client-logos")
        .upload(path, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("client-logos")
        .getPublicUrl(path);

      const { data, error: emailError } = await supabase.functions.invoke("send-logo-email", {
        body: {
          name: "Veikala klients",
          company: "-",
          email: "-",
          logoUrl: urlData.publicUrl,
          shopUpload: true,
          fileName: file.name,
          fileType: file.type || "unknown",
          fileSize: file.size,
        },
      });

      if (emailError) throw emailError;

      setUploaded(true);
      if (data?.fallbackUsed) {
        toast.warning(t.uploadFallbackInfo);
      } else {
        toast.success(t.uploadSuccess);
      }

      setTimeout(() => setUploaded(false), 4000);
    } catch (error) {
      console.error("Logo upload/email error:", error);
      toast.error(t.uploadError);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <section className="py-20 bg-primary/5" aria-labelledby="shop-heading">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <ShoppingBag className="w-7 h-7 text-primary" />
          </span>

          <h2 id="shop-heading" className="text-3xl sm:text-4xl text-foreground mb-4">
            {t.heading}
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            {t.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground mb-10">
            <span>{t.badge1}</span>
            <span>{t.badge2}</span>
            <span>{t.badge3}</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-lg bg-primary text-primary-foreground px-10 py-4 font-medium tracking-wider text-base uppercase transition-all duration-300 active:scale-[0.97] hover:brightness-110"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(196,163,90,0.3), 0 4px 20px -4px rgba(196,163,90,0.4), 0 8px 32px -8px rgba(0,0,0,0.3)",
                letterSpacing: "0.12em",
              }}
            >
              {t.cta}
              <ExternalLink size={18} />
            </a>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 justify-center rounded-lg border border-primary text-primary px-8 py-3.5 font-medium tracking-wide text-sm transition-all duration-200 active:scale-[0.98] hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
            >
              {uploaded ? <Check size={18} /> : <Upload size={18} />}
              {uploading ? "..." : t.uploadBtn}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSection;
