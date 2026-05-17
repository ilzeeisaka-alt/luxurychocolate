import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { supabase } from "@/integrations/supabase/client";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 24;

interface CategoryRow {
  id: string;
  slug: string;
  name: string;
  product_count: number;
}

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  price_cents: number;
  currency: string;
  short_description: string | null;
  category_id: string | null;
  image_url: string | null;
}

const formatPrice = (cents: number, currency = "EUR") =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

const Veikals = () => {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "";
  const search = params.get("q") ?? "";
  const page = Math.max(1, parseInt(params.get("page") ?? "1", 10) || 1);
  const sort = params.get("sort") ?? "newest";
  const [searchInput, setSearchInput] = useState(search);

  useSeo({
    title: "Šokolādes veikals",
    description:
      "Pasūti premium šokolādes ar savu logo, dāvanu kastes, makarūnus un saldumus tiešsaistē. Bezmaksas skice 24h laikā.",
    path: "/veikals",
  });

  useEffect(() => setSearchInput(search), [search]);

  const update = (next: Record<string, string | null>) => {
    const merged = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => {
      if (v === null || v === "") merged.delete(k);
      else merged.set(k, v);
    });
    if (!("page" in next)) merged.delete("page");
    setParams(merged, { replace: false });
  };

  // Categories with counts
  const { data: categories = [] } = useQuery<CategoryRow[]>({
    queryKey: ["catalog-categories"],
    queryFn: async () => {
      const { data: cats } = await supabase
        .from("product_categories")
        .select("id, slug, name, sort_order")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });
      const { data: prods } = await supabase
        .from("products")
        .select("category_id")
        .eq("published", true)
        .not("category_id", "is", null)
        .limit(1000);
      const counts = new Map<string, number>();
      (prods ?? []).forEach((p) => {
        if (p.category_id) counts.set(p.category_id, (counts.get(p.category_id) ?? 0) + 1);
      });
      return (cats ?? [])
        .map((c) => ({ ...c, product_count: counts.get(c.id) ?? 0 }))
        .filter((c) => c.product_count > 0)
        .sort((a, b) => b.product_count - a.product_count);
    },
  });

  const currentCategoryId = useMemo(
    () => categories.find((c) => c.slug === category)?.id ?? null,
    [categories, category]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["catalog-products", currentCategoryId, search, page, sort, category],
    enabled: !category || currentCategoryId !== null || categories.length === 0,
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select("id, slug, name, price_cents, currency, short_description, category_id", { count: "exact" })
        .eq("published", true);

      if (currentCategoryId) q = q.eq("category_id", currentCategoryId);
      if (search) q = q.ilike("name", `%${search}%`);

      switch (sort) {
        case "price-asc":
          q = q.order("price_cents", { ascending: true });
          break;
        case "price-desc":
          q = q.order("price_cents", { ascending: false });
          break;
        case "name":
          q = q.order("name", { ascending: true });
          break;
        default:
          q = q.order("created_at", { ascending: false });
      }

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data: prods, count } = await q.range(from, to);

      const ids = (prods ?? []).map((p) => p.id);
      let images = new Map<string, string>();
      if (ids.length) {
        const { data: imgs } = await supabase
          .from("product_images")
          .select("product_id, url, is_primary, sort_order")
          .in("product_id", ids)
          .order("is_primary", { ascending: false })
          .order("sort_order", { ascending: true });
        (imgs ?? []).forEach((i) => {
          if (!images.has(i.product_id)) images.set(i.product_id, i.url);
        });
      }

      const items: ProductRow[] = (prods ?? []).map((p) => ({
        ...p,
        image_url: images.get(p.id) ?? null,
      }));

      return { items, total: count ?? 0 };
    },
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Katalogs</p>
          <h1 className="text-4xl sm:text-5xl text-foreground mb-3">Šokolādes veikals</h1>
          <p className="text-muted-foreground max-w-2xl">
            {total > 0 ? `${total} produkti` : "Pasūti premium šokolādes ar savu logo."} — bezmaksas skice 24h laikā,
            ražošana no 3 dienām.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                update({ q: searchInput });
              }}
              className="relative mb-6"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Meklēt produktus..."
                className="w-full bg-card border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </form>

            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Kategorijas</p>
            <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
              <button
                type="button"
                onClick={() => update({ category: null })}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  !category
                    ? "bg-primary/15 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                )}
              >
                Visi produkti
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => update({ category: c.slug })}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between gap-2",
                    category === c.slug
                      ? "bg-primary/15 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-card"
                  )}
                >
                  <span className="truncate">{c.name}</span>
                  <span className="text-xs opacity-60">{c.product_count}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Grid */}
          <section className="flex-1 min-w-0">
            {/* Active filters + sort */}
            <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                {category && (
                  <button
                    type="button"
                    onClick={() => update({ category: null })}
                    className="inline-flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {categories.find((c) => c.slug === category)?.name ?? category}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {search && (
                  <button
                    type="button"
                    onClick={() => update({ q: null })}
                    className="inline-flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    "{search}"
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <select
                value={sort}
                onChange={(e) => update({ sort: e.target.value })}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="newest">Jaunākie</option>
                <option value="price-asc">Cena ↑</option>
                <option value="price-desc">Cena ↓</option>
                <option value="name">Nosaukums</option>
              </select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-card rounded-xl animate-pulse" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg mb-2">Nekas netika atrasts</p>
                <p className="text-sm">Mēģiniet citu kategoriju vai meklēšanas vārdu.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((p) => (
                    <Link
                      key={p.id}
                      to={`/veikals/${p.slug}`}
                      className="group block bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-300"
                    >
                      <div className="aspect-square bg-muted overflow-hidden">
                        {p.image_url ? (
                          <img
                            src={p.image_url}
                            alt={p.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            Bez attēla
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm text-foreground line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-base font-medium text-primary">
                          {formatPrice(p.price_cents, p.currency)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => update({ page: String(page - 1) })}
                      className="p-2 rounded-md border border-border disabled:opacity-30 hover:bg-card transition-colors"
                      aria-label="Iepriekšējā lapa"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-muted-foreground px-4">
                      {page} / {totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => update({ page: String(page + 1) })}
                      className="p-2 rounded-md border border-border disabled:opacity-30 hover:bg-card transition-colors"
                      aria-label="Nākamā lapa"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Veikals;
