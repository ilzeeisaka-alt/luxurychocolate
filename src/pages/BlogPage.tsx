import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/i18n/types";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const blogStrings: Record<Lang, { title: string; subtitle: string; readMore: string; noPostsYet: string; loading: string }> = {
  lv: { title: "Blogs", subtitle: "Jaunākās ziņas un padomi par korporatīvajām šokolādēm", readMore: "Lasīt vairāk", noPostsYet: "Pagaidām nav publicētu rakstu.", loading: "Ielādē..." },
  en: { title: "Blog", subtitle: "Latest news and tips about corporate chocolates", readMore: "Read more", noPostsYet: "No published posts yet.", loading: "Loading..." },
  ru: { title: "Блог", subtitle: "Последние новости и советы о корпоративном шоколаде", readMore: "Читать далее", noPostsYet: "Пока нет опубликованных статей.", loading: "Загрузка..." },
  et: { title: "Blogi", subtitle: "Viimased uudised ja nõuanded korporatiivse šokolaadi kohta", readMore: "Loe edasi", noPostsYet: "Avaldatud postitusi pole veel.", loading: "Laen..." },
  lt: { title: "Blogas", subtitle: "Naujienos ir patarimai apie korporatyvinį šokoladą", readMore: "Skaityti daugiau", noPostsYet: "Kol kas nėra paskelbtų įrašų.", loading: "Kraunama..." },
  sv: { title: "Blogg", subtitle: "Senaste nyheter och tips om företagschoklad", readMore: "Läs mer", noPostsYet: "Inga publicerade inlägg ännu.", loading: "Laddar..." },
  no: { title: "Blogg", subtitle: "Siste nyheter og tips om bedriftssjokolade", readMore: "Les mer", noPostsYet: "Ingen publiserte innlegg ennå.", loading: "Laster..." },
  fi: { title: "Blogi", subtitle: "Uusimmat uutiset ja vinkit yrityslahja suklaasta", readMore: "Lue lisää", noPostsYet: "Ei vielä julkaistuja artikkeleita.", loading: "Ladataan..." },
  da: { title: "Blog", subtitle: "Seneste nyheder og tips om firmachokolade", readMore: "Læs mere", noPostsYet: "Ingen publicerede indlæg endnu.", loading: "Indlæser..." },
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
};

interface BlogPageProps {
  lang?: Lang;
}

const BlogPage = ({ lang = "lv" }: BlogPageProps) => {
  const strings = blogStrings[lang];
  const basePath = blogBasePaths[lang];

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts", lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image, published_at")
        .eq("lang", lang)
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar lang={lang} />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{strings.title}</h1>
            <p className="text-muted-foreground text-lg">{strings.subtitle}</p>
          </header>

          {isLoading ? (
            <p className="text-center text-muted-foreground">{strings.loading}</p>
          ) : !posts || posts.length === 0 ? (
            <p className="text-center text-muted-foreground">{strings.noPostsYet}</p>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`${basePath}/${post.slug}`}
                  className="block group rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-2">
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString(lang === "lv" ? "lv-LV" : lang === "en" ? "en-US" : lang === "ru" ? "ru-RU" : lang, { year: "numeric", month: "long", day: "numeric" })
                          : ""}
                      </p>
                      <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                      <span className="inline-block mt-3 text-primary text-sm font-medium">
                        {strings.readMore} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default BlogPage;
