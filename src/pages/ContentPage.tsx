import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";

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
    supabase
      .from("content_pages")
      .select("slug,title,description,markdown")
      .eq("slug", slug)
      .eq("lang", "lv")
      .eq("published", true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data) setNotFound(true);
        else setPage(data as Page);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-3xl">
        {loading && <div className="text-muted-foreground">Ielādē…</div>}
        {notFound && !loading && (
          <div className="text-center py-20">
            <h1 className="text-2xl text-foreground mb-4">Lapa nav atrasta</h1>
            <Link to="/" className="text-primary hover:underline">
              Atgriezties uz sākumlapu
            </Link>
          </div>
        )}
        {page && !loading && (
          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary prose-strong:text-foreground prose-li:text-foreground/90">
            <h1 className="text-4xl mb-8 text-foreground">{page.title}</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.markdown}</ReactMarkdown>
          </article>
        )}
      </main>
      <FooterSection lang="lv" />
    </div>
  );
};

export default ContentPage;
