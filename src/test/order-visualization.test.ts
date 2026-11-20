import { describe, expect, it } from "vitest";
import { orderDesignLogos, primaryProductPhoto, type OrderDesignItem } from "../lib/orderVisualization";

const item: OrderDesignItem = { id: "line-1", product_name: "Trifeles", quantity: 12, logo_url: "/old.png", logos: null };
describe("Order visualization data", () => {
  it("keeps all purchased-line logos and their assigned quantities", () => {
    expect(orderDesignLogos({ ...item, logos: [{ url: "/a.png", filename: "A", quantity: 5 }, { url: "/b.png", filename: "B", quantity: 7 }] })).toEqual([{ url: "/a.png", filename: "A", quantity: 5 }, { url: "/b.png", filename: "B", quantity: 7 }]);
  });
  it("supports orders containing the legacy single logo", () => {
    expect(orderDesignLogos(item)).toEqual([{ url: "/old.png", filename: "", quantity: 12 }]);
  });
  it("uses the purchased product primary photo instead of another gallery photo", () => {
    expect(primaryProductPhoto([{ url: "/secondary.png", is_primary: false, sort_order: 0 }, { url: "/main.png", is_primary: true, sort_order: 2 }])).toBe("/main.png");
  });
  it("does not invent a photo for products without photos", () => {
    expect(primaryProductPhoto([])).toBeNull();
  });
});