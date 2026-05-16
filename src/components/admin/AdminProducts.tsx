import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Pencil, Search, Eye, EyeOff, Star, StarOff } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  price_cents: number;
  currency: string;
  short_description: string | null;
  description: string | null;
  ingredients: string | null;
  weight_grams: number | null;
  preparation_days: number | null;
  delivery_days: number | null;
  category_id: string | null;
  in_stock: boolean;
  published: boolean;
  featured: boolean;
  stock_quantity: number | null;
  image_url?: string | null;
}

const PAGE_SIZE = 30;

const formatPrice = (cents: number, currency: string) =>
  new Intl.NumberFormat("lv-LV", { style: "currency", currency }).format(cents / 100);

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from("products")
      .select(
        "id, slug, name, price_cents, currency, short_description, description, ingredients, weight_grams, preparation_days, delivery_days, category_id, in_stock, published, featured, stock_quantity",
        { count: "exact" },
      )
      .order("updated_at", { ascending: false });
    if (search) q = q.ilike("name", `%${search}%`);
    if (categoryFilter !== "all") q = q.eq("category_id", categoryFilter);
    if (statusFilter === "published") q = q.eq("published", true);
    else if (statusFilter === "hidden") q = q.eq("published", false);
    else if (statusFilter === "featured") q = q.eq("featured", true);
    else if (statusFilter === "out") q = q.eq("in_stock", false);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const { data, count, error } = await q.range(from, to);
    if (error) {
      toast.error("Neizdevās ielādēt: " + error.message);
      setLoading(false);
      return;
    }
    const ids = (data ?? []).map((p) => p.id);
    const imgMap = new Map<string, string>();
    if (ids.length) {
      const { data: imgs } = await supabase
        .from("product_images")
        .select("product_id, url, is_primary, sort_order")
        .in("product_id", ids)
        .order("is_primary", { ascending: false })
        .order("sort_order", { ascending: true });
      (imgs ?? []).forEach((i) => {
        if (!imgMap.has(i.product_id)) imgMap.set(i.product_id, i.url);
      });
    }
    setProducts((data ?? []).map((p) => ({ ...p, image_url: imgMap.get(p.id) ?? null })));
    setTotal(count ?? 0);
    setLoading(false);
  };

  const loadCategories = async () => {
    const { data } = await supabase
      .from("product_categories")
      .select("id, name, slug")
      .order("name");
    setCategories(data ?? []);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, categoryFilter, statusFilter]);

  const togglePublished = async (p: Product) => {
    const next = !p.published;
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, published: next } : x)));
    const { error } = await supabase.from("products").update({ published: next }).eq("id", p.id);
    if (error) {
      toast.error("Neizdevās: " + error.message);
      load();
    } else toast.success(next ? "Publicēts" : "Paslēpts");
  };

  const toggleFeatured = async (p: Product) => {
    const next = !p.featured;
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, featured: next } : x)));
    const { error } = await supabase.from("products").update({ featured: next }).eq("id", p.id);
    if (error) {
      toast.error("Neizdevās: " + error.message);
      load();
    }
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from("products")
      .update({
        name: editing.name,
        slug: editing.slug,
        price_cents: editing.price_cents,
        short_description: editing.short_description,
        description: editing.description,
        ingredients: editing.ingredients,
        weight_grams: editing.weight_grams,
        preparation_days: editing.preparation_days,
        delivery_days: editing.delivery_days,
        category_id: editing.category_id,
        in_stock: editing.in_stock,
        published: editing.published,
        featured: editing.featured,
        stock_quantity: editing.stock_quantity,
      })
      .eq("id", editing.id);
    setSaving(false);
    if (error) {
      toast.error("Neizdevās saglabāt: " + error.message);
    } else {
      toast.success("Saglabāts");
      setEditing(null);
      load();
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Meklēt produktus..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={(v) => { setPage(1); setCategoryFilter(v); }}>
            <SelectTrigger><SelectValue placeholder="Visas kategorijas" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Visas kategorijas</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => { setPage(1); setStatusFilter(v); }}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Visi statusi</SelectItem>
              <SelectItem value="published">Tikai publicētie</SelectItem>
              <SelectItem value="hidden">Tikai paslēptie</SelectItem>
              <SelectItem value="featured">Izceltie</SelectItem>
              <SelectItem value="out">Nav noliktavā</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Kopā: {total} produkti · Lapa {page}/{totalPages}
      </p>

      {loading ? (
        <div className="text-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /></div>
      ) : (
        <div className="grid gap-2">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <div className="w-14 h-14 shrink-0 bg-muted rounded overflow-hidden">
                {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {p.slug} · {formatPrice(p.price_cents, p.currency)}
                  {!p.in_stock && " · Nav noliktavā"}
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => toggleFeatured(p)} title={p.featured ? "Izceltais" : "Izcelt"}>
                {p.featured ? <Star className="w-4 h-4 text-primary fill-primary" /> : <StarOff className="w-4 h-4 text-muted-foreground" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => togglePublished(p)} title={p.published ? "Publicēts" : "Paslēpts"}>
                {p.published ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(p)}>
                <Pencil className="w-4 h-4 mr-1" /> Rediģēt
              </Button>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Iepriekšējā</Button>
          <span className="text-sm px-3 py-2">{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Nākamā →</Button>
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Rediģēt produktu</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Nosaukums</Label>
                  <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                </div>
                <div>
                  <Label>Cena (centos, ar PVN)</Label>
                  <Input type="number" value={editing.price_cents} onChange={(e) => setEditing({ ...editing, price_cents: parseInt(e.target.value, 10) || 0 })} />
                  <p className="text-xs text-muted-foreground mt-1">= {formatPrice(editing.price_cents, editing.currency)}</p>
                </div>
                <div>
                  <Label>Kategorija</Label>
                  <Select value={editing.category_id ?? "none"} onValueChange={(v) => setEditing({ ...editing, category_id: v === "none" ? null : v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— bez kategorijas —</SelectItem>
                      {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Svars (g)</Label>
                  <Input type="number" value={editing.weight_grams ?? ""} onChange={(e) => setEditing({ ...editing, weight_grams: e.target.value ? parseInt(e.target.value, 10) : null })} />
                </div>
                <div>
                  <Label>Krājumi</Label>
                  <Input type="number" value={editing.stock_quantity ?? ""} onChange={(e) => setEditing({ ...editing, stock_quantity: e.target.value ? parseInt(e.target.value, 10) : null })} />
                </div>
                <div>
                  <Label>Sagatavošana (d.)</Label>
                  <Input type="number" value={editing.preparation_days ?? ""} onChange={(e) => setEditing({ ...editing, preparation_days: e.target.value ? parseInt(e.target.value, 10) : null })} />
                </div>
                <div>
                  <Label>Piegāde (d.)</Label>
                  <Input type="number" value={editing.delivery_days ?? ""} onChange={(e) => setEditing({ ...editing, delivery_days: e.target.value ? parseInt(e.target.value, 10) : null })} />
                </div>
              </div>
              <div>
                <Label>Īss apraksts</Label>
                <Textarea rows={2} value={editing.short_description ?? ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} />
              </div>
              <div>
                <Label>Apraksts</Label>
                <Textarea rows={6} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div>
                <Label>Sastāvs</Label>
                <Textarea rows={2} value={editing.ingredients ?? ""} onChange={(e) => setEditing({ ...editing, ingredients: e.target.value })} />
              </div>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
                  <Label>Publicēts</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editing.in_stock} onCheckedChange={(v) => setEditing({ ...editing, in_stock: v })} />
                  <Label>Pieejams</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v })} />
                  <Label>Izcelts</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Atcelt</Button>
            <Button onClick={saveEdit} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Saglabāt"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
