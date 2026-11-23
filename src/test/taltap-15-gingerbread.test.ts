import { describe, expect, it } from "vitest";

describe("TalTap fifteen-cookie gift bag", () => {
  async function product() {
    const env = import.meta.env;
    const response = await fetch(`${env.VITE_SUPABASE_URL}/rest/v1/products?slug=eq.15-piparkuku-maisins-ar-taltap-logo-piparkukam&select=metadata,product_categories(slug)`, { headers: { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY } });
    expect(response.ok).toBe(true);
    const rows = await response.json();
    expect(rows).toHaveLength(1);
    return rows[0];
  }
  it("contains fifteen gingerbread cookies", async () => {
    expect((await product()).metadata.pieces_per_bag).toBe(15);
  });
  it("uses TalTap branding", async () => {
    expect((await product()).metadata.logo_brand).toBe("TalTap");
  });
  it("has an unprinted ribbon", async () => {
    expect((await product()).metadata.ribbon_has_logo).toBe(false);
  });
  it("has no bag sticker", async () => {
    expect((await product()).metadata.bag_has_sticker).toBe(false);
  });
  it("belongs to Christmas gingerbread", async () => {
    expect((await product()).product_categories.slug).toBe("ziemassvetku-piparkukas");
  });
});