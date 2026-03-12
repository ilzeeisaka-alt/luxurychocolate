import { useParams } from "react-router-dom";
import SeoLandingLayout from "@/components/SeoLandingLayout";
import { enPages } from "@/i18n/en";
import { ruPages } from "@/i18n/ru";
import type { Lang } from "@/i18n/types";
import NotFound from "@/pages/NotFound";

interface LangPageProps {
  lang: Lang;
}

const LangPage = ({ lang }: LangPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const pages = lang === "en" ? enPages : ruPages;
  const content = slug ? pages[slug] : undefined;

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
