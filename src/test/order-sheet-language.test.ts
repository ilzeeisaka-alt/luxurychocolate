import { describe, expect, it } from "vitest";
import { orderSheetLanguage } from "../lib/orderSheetLanguage";

const products = [{ id: "box", name: "Kaste ar trifelēm", name_i18n: { lv: "Kaste ar trifelēm", en: "Box of truffles", ru: "Коробка трюфелей", de: "Trüffelbox" } }];
describe("Visualization follows purchased product language", () => {
  it("uses English for an English purchased product", () => {
    expect(orderSheetLanguage([{ product_id: "box", product_name: "Box of truffles" }], products)).toBe("en");
  });
  it("uses Russian for a Russian purchased product", () => {
    expect(orderSheetLanguage([{ product_id: "box", product_name: "Коробка трюфелей" }], products)).toBe("ru");
  });
  it("uses other catalog languages rather than the admin UI language", () => {
    expect(orderSheetLanguage([{ product_id: "box", product_name: "Trüffelbox" }], products)).toBe("de");
  });
  it("keeps Latvian source products in Latvian", () => {
    expect(orderSheetLanguage([{ product_id: "box", product_name: "Kaste ar trifelēm" }], products)).toBe("lv");
  });
  it("defaults legacy products without a catalog match to Latvian", () => {
    expect(orderSheetLanguage([{ product_name: "Custom" }], [])).toBe("lv");
  });
});