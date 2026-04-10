import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/i18n/types";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const postStrings: Record<Lang, { backToBlog: string; notFound: string; loading: string }> = {
  lv: { backToBlog: "← Atpakaļ uz blogu", notFound: "Raksts nav atrasts.", loading: "Ielādē..." },
  en: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  ru: { backToBlog: "← Назад в блог", notFound: "Статья не найдена.", loading: "Загрузка..." },
  et: { backToBlog: "← Tagasi blogisse", notFound: "Postitust ei leitud.", loading: "Laen..." },
  lt: { backToBlog: "← Grįžti į blogą", notFound: "Įrašas nerastas.", loading: "Kraunama..." },
  sv: { backToBlog: "← Tillbaka till bloggen", notFound: "Inlägget hittades inte.", loading: "Laddar..." },
  no: { backToBlog: "← Tilbake til bloggen", notFound: "Innlegget ble ikke funnet.", loading: "Laster..." },
  fi: { backToBlog: "← Takaisin blogiin", notFound: "Artikkelia ei löytynyt.", loading: "Ladataan..." },
  da: { backToBlog: "← Tilbage til bloggen", notFound: "Indlægget blev ikke fundet.", loading: "Indlæser..." },
  de: { backToBlog: "← Zurück zum Blog", notFound: "Beitrag nicht gefunden.", loading: "Laden..." },
  fr: { backToBlog: "← Retour au blog", notFound: "Article non trouvé.", loading: "Chargement..." },
  it: { backToBlog: "← Torna al blog", notFound: "Articolo non trovato.", loading: "Caricamento..." },
  es: { backToBlog: "← Volver al blog", notFound: "Publicación no encontrada.", loading: "Cargando..." },
  ar: { backToBlog: "← العودة إلى المدونة", notFound: "المقال غير موجود.", loading: "جاري التحميل..." },
  nl: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  pl: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  cs: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  pt: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  el: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  tr: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  hu: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  ro: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  bg: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  hr: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  sk: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  sl: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  uk: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  sr: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  bs: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  mk: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  sq: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
  is: { backToBlog: "← Back to blog", notFound: "Post not found.", loading: "Loading..." },
};

const blogBasePaths: Record<Lang, string> = {
  lv: "/blogs",
  en: "/en/blog",
  ru: "/ru/blog",
  et: "/et/blogi",
  lt: "/lt/blogas",
  sv: "/sv/blogg",
  no: "/no/blogg",
  fi: "/fi/blogi",
  da: "/da/blog",
  de: "/de/blog",
  fr: "/fr/blog",
  it: "/it/blog",
  es: "/es/blog",
  ar: "/ar/blog",
  nl: "/nl/blog",
  pl: "/pl/blog",
  cs: "/cs/blog",
  pt: "/pt/blog",
  el: "/el/blog",
  tr: "/tr/blog",
  hu: "/hu/blog",
  ro: "/ro/blog",
  bg: "/bg/blog",
  hr: "/hr/blog",
  sk: "/sk/blog",
  sl: "/sl/blog",
  uk: "/uk/blog",
  sr: "/sr/blog",
  bs: "/bs/blog",
  mk: "/mk/blog",
  sq: "/sq/blog",
  is: "/is/blog",
};

interface BlogPostPageProps {
  lang?: Lang;
}

const BlogPostPage = ({ lang = "lv" }: BlogPostPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const strings = postStrings[lang];
  const basePath = blogBasePaths[lang];

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", lang, slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("lang", lang)
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to={basePath} className="inline-block text-primary text-sm font-medium mb-6 hover:underline">
            {strings.backToBlog}
          </Link>

          {isLoading ? (
            <p className="text-center text-muted-foreground">{strings.loading}</p>
          ) : !post ? (
            <p className="text-center text-muted-foreground">{strings.notFound}</p>
          ) : (
            <article>
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
                />
              )}
              <p className="text-sm text-muted-foreground mb-3">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString(lang === "lv" ? "lv-LV" : lang === "en" ? "en-US" : lang === "ru" ? "ru-RU" : lang, { year: "numeric", month: "long", day: "numeric" })
                  : ""}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>
              <div
                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogPostPage;
