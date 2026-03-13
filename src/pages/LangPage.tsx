import { useParams } from "react-router-dom";
import SeoLandingLayout from "@/components/SeoLandingLayout";
import { enPages } from "@/i18n/en";
import { ruPages } from "@/i18n/ru";
import { etPages } from "@/i18n/et";
import { ltPages } from "@/i18n/lt";
import type { Lang } from "@/i18n/types";
import NotFound from "@/pages/NotFound";

interface LangPageProps {
  lang: Lang;
}

const pagesByLang: Record<string, Record<string, import("@/i18n/types").PageContent>> = {
  en: enPages,
  ru: ruPages,
  et: etPages,
  lt: ltPages,
};

const LangPage = ({ lang }: LangPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const pages = pagesByLang[lang];
  const content = slug && pages ? pages[slug] : undefined;

  if (!content) return <NotFound />;

  return (
    <SeoLandingLayout
      emoji={content.emoji}
      title={content.title}
      metaDescription={content.metaDescription}
      intro={content.intro}
      benefits={content.benefits}
      body={content.body}
      cta={content.cta}
      keywords={content.keywords}
      faqs={content.faqs}
      lang={lang}
    />
  );
};

export default LangPage;
