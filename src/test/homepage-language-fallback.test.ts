import { describe, expect, it } from "vitest";
import { expandLangs } from "@/i18n/expandLangs";
import { heroContent, quickFacts, seoContent, vipGiftContent } from "@/i18n/content";

describe("homepage language fallbacks", () => {
  it.each(["ta", "km", "mn"] as const)("supplies the missing %s homepage content", (lang) => {
    expect(heroContent[lang]).toEqual(heroContent.en);
    expect(quickFacts[lang]).toEqual(quickFacts.en);
    expect(seoContent[lang]).toEqual(seoContent.en);
    expect(vipGiftContent[lang]).toEqual(vipGiftContent.en);
  });
  it.each(["zh", "ta", "sw"] as const)("fills partial section content for %s", (lang) => {
    expect(expandLangs({ lv: { badge: "LV" }, en: { badge: "EN" } })[lang]).toEqual({ badge: "EN" });
  });
});