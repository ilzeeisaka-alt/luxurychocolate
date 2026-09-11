import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";
import { useCurrentLang, pickI18n } from "@/i18n/useCurrentLang";

interface CatRow {
  id: string;
  slug: string;
  name: string;
  name_i18n: Record<string, unknown> | null;
  sort_order: number | null;
  parent_id: string | null;
}

interface ProdRow {
  id: string;
  slug: string;
  name: string;
  name_i18n: Record<string, unknown> | null;
  category_id: string | null;
}

const Katalogs = () => {
  const lang = useCurrentLang();
  const suffix = lang !== "lv" ? `?lang=${lang}` : "";

  useSeo({
    title: "Pilns produktu katalogs",
    description:
      "Visas šokolādes kategorijas un produkti vienā lapā — personalizēta šokolāde ar logo, dāvanu kastes, monētas un saldumi.",
    path: "/katalogs",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["full-catalog"],
    queryFn: async () => {
      const { data: cats, error: catErr } = await supabase
        .from("product_categories")
        .select("id, slug, name, name_i18n, sort_order, parent_id")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });
      if (catErr) throw catErr;

      const products: ProdRow[] = [];
      const step = 1000;
      for (let from = 0; from < 5000; from += step) {
        const { data: page, error } = await supabase
          .from("products")
          .select("id, slug, name, name_i18n, category_id")
          .eq("published", true)
          .order("name", { ascending: true })
          .range(from, from + step - 1);
        if (error) throw error;
        products.push(...((page ?? []) as ProdRow[]));
        if (!page || page.length < step) break;
      }
      return { cats: (cats ?? []) as CatRow[], products };
    },
  });

  const cats = data?.cats ?? [];
  const products = data?.products ?? [];

  const byCategory = new Map<string, ProdRow[]>();
  for (const p of products) {
    const key = p.category_id ?? "__none__";
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key)!.push(p);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-44 md:pt-48 pb-16">
        <h1 className="text-3xl sm:text-4xl text-foreground mb-3">Pilns produktu katalogs</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Visas kategorijas un visi produkti vienā lapā. Izvēlies kategoriju vai produktu, lai skatītu detaļas.
        </p>

        {isLoading && <p className="text-muted-foreground">Ielādē katalogu…</p>}

        <nav aria-label="Kategorijas" className="mb-12 flex flex-wrap gap-2">
          {cats.map((c) => (
            <Link
              key={c.id}
              to={`/veikals?category=${c.slug}${lang !== "lv" ? `&lang=${lang}` : ""}`}
              className="text-sm border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              {pickI18n(c.name_i18n, lang, c.name)}
            </Link>
          ))}
        </nav>

        <div className="space-y-12">
          {cats.map((c) => {
            const list = byCategory.get(c.id) ?? [];
            if (list.length === 0) return null;
            return (
              <section key={c.id}>
                <h2 className="text-xl text-foreground mb-4">
                  <Link
                    to={`/veikals?category=${c.slug}${lang !== "lv" ? `&lang=${lang}` : ""}`}
                    className="hover:text-primary transition-colors"
                  >
                    {pickI18n(c.name_i18n, lang, c.name)}
                  </Link>
                  <span className="ml-2 text-sm text-muted-foreground">({list.length})</span>
                </h2>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1.5">
                  {list.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/veikals/${p.slug}${suffix}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {pickI18n(p.name_i18n, lang, p.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          {(byCategory.get("__none__") ?? []).length > 0 && (
            <section>
              <h2 className="text-xl text-foreground mb-4">Citi produkti</h2>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1.5">
                {(byCategory.get("__none__") ?? []).map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/veikals/${p.slug}${suffix}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {pickI18n(p.name_i18n, lang, p.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Katalogs;
