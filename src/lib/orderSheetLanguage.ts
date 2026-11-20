type ProductNames = { id: string; name: string; name_i18n: unknown };

/** Infer the document language from the purchased name, not the administrator's UI. */
export function orderSheetLanguage(items: { product_id?: string | null; product_name: string }[], products: ProductNames[]) {
  const votes = new Map<string, number>();
  const normalize = (value: string) => value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
  for (const item of items) {
    const product = products.find(product => product.id === item.product_id);
    if (!product) continue;
    const name = normalize(item.product_name);
    if (name === normalize(product.name)) { votes.set("lv", (votes.get("lv") ?? 0) + 1); continue; }
    if (!product.name_i18n || typeof product.name_i18n !== "object") continue;
    for (const [lang, translation] of Object.entries(product.name_i18n)) {
      if (typeof translation === "string" && normalize(translation) === name) {
        votes.set(lang, (votes.get(lang) ?? 0) + 1);
        break;
      }
    }
  }
  return [...votes].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "lv";
}