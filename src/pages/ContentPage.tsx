import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";
import { useCurrentLang, pickI18n } from "@/i18n/useCurrentLang";

interface ContentPageProps {
  slug?: string;
}

interface Page {
  slug: string;
  title: string;
  description: string | null;
  markdown: string;
}

const ContentPage = ({ slug: slugProp }: ContentPageProps) => {
  const params = useParams<{ slug: string }>();
  const slug = slugProp ?? params.slug ?? "";
  const [searchParams] = useSearchParams();
  const urlLang = useCurrentLang();
  const lang = searchParams.get("lang") ?? urlLang;

  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useSeo({
    title: page ? `${page.title} | Luxury Chocolate` : "Luxury Chocolate",
    description: page?.description ?? "Personalizēta šokolāde ar logo - Luxury Chocolate SIA",
    path: `/${slug}`,
  });

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    (async () => {
      const { data, error } = await supabase
        .from("content_pages")
        .select("slug,title,description,markdown,title_i18n,description_i18n_jsonb,markdown_i18n")
        .eq("slug", slug)
        .eq("lang", "lv")
        .eq("published", true)
        .maybeSingle();

      if (!active) return;
      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const mI18n = (data.markdown_i18n ?? {}) as Record<string, string>;
      const tI18n = (data.title_i18n ?? {}) as Record<string, string>;
      const dI18n = (data.description_i18n_jsonb ?? {}) as Record<string, string>;

      if (lang === "lv" || mI18n[lang]?.trim()) {
        setPage({
          slug: data.slug,
          title: lang === "lv" ? data.title : (tI18n[lang] || data.title),
          description: lang === "lv" ? data.description : (dI18n[lang] || data.description),
          markdown: lang === "lv" ? data.markdown : (mI18n[lang] || data.markdown),
        });
        setLoading(false);
        return;
      }

      // Show LV immediately, then translate in background
      setPage({
        slug: data.slug,
        title: pickI18n(tI18n, lang, data.title),
        description: pickI18n(dI18n, lang, data.description ?? ""),
        markdown: data.markdown,
      });

      try {
        const { data: tr, error: trErr } = await supabase.functions.invoke("translate-content-page", {
          body: { slug, lang },
        });
        if (!active || trErr || !tr) return;
        setPage({
          slug: data.slug,
          title: tr.title || data.title,
          description: tr.description || data.description,
          markdown: tr.markdown || data.markdown,
        });
      } finally {
        if (active) setLoading(false);
      }
      if (active) setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [slug, lang]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-48 pb-16 max-w-3xl">
        {loading && !page && <div className="text-muted-foreground">Loading…</div>}
        {notFound && !loading && (
          <div className="text-center py-20">
            <h1 className="text-2xl text-foreground mb-4">Page not found</h1>
            <Link to="/" className="text-primary hover:underline">
              Back to home
            </Link>
          </div>
        )}
        {page && (
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground prose-li:text-foreground/90 prose-img:rounded-lg prose-img:mx-auto prose-img:my-8 prose-img:shadow-lg">
            <h1 className="text-4xl mb-8 text-foreground">{page.title}</h1>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => {
                  const src = String(props.src || "");
                  const alt = String(props.alt || "");
                  const isLogo = /logo/i.test(src) || /logo/i.test(alt);
                  return (
                    <img
                      {...props}
                      loading="lazy"
                      className={
                        isLogo
                          ? "max-w-[180px] w-full mx-auto my-8 object-contain"
                          : "w-full max-w-2xl rounded-lg mx-auto my-8 shadow-lg"
                      }
                      alt={alt}
                    />
                  );
                },
                a: ({ node, ...props }) => (
                  <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" />
                ),
              }}
            >
              {page.markdown}
            </ReactMarkdown>
          </article>
        )}
      </main>
      <FooterSection />
    </div>
  );
};

export default ContentPage;
