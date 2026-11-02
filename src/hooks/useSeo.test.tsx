import { renderHook, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import { useSeo } from "./useSeo";

afterEach(cleanup);

describe("Page language and search URL alignment", () => {
  for (const [path, lang] of [
    ["/lt/sokoladas-konferencijoms", "lt"],
    ["/ru/podarki-sotrudnikam", "ru"],
    ["/et/kingitused-klientidele", "et"],
    ["/en/christmas-corporate-chocolate", "en"],
    ["/veikals?lang=en", "en"],
    ["/", "lv"],
  ]) {
    it(`sets ${lang} for ${path}`, () => {
      document.documentElement.lang = "lv";
      renderHook(() => useSeo({ title: "Chocolate", description: "Belgian chocolate", path }), {
        wrapper: ({ children }: { children: ReactNode }) => <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>,
      });
      expect(document.documentElement.lang).toBe(lang);
      const alternate = document.querySelector(`link[hreflang="${lang}"]`);
      if (alternate) expect(alternate.getAttribute("href")).toBe(document.querySelector('link[rel="canonical"]')?.getAttribute("href"));
    });
  }
});