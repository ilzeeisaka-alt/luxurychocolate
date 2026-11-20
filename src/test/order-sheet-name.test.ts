import { describe, expect, it } from "vitest";
import { normalCase, splitContactName } from "../lib/orderSheetName";

describe("Order sheet contact name", () => {
  it("shows an all-caps name and job title in normal letters", () => {
    expect(normalCase("AGNESE REĶE SOCIĀLO TĪKLU ADMINISTRATORE SOCIAL MEDIA  ADMINISTRATOR")).toBe(
      "Agnese Reķe Sociālo Tīklu Administratore Social Media Administrator",
    );
  });
  it("leaves text that already has normal letters unchanged", () => {
    expect(normalCase("ALPS ainavu darbnīca SIA")).toBe("ALPS ainavu darbnīca SIA");
  });
  it("returns an empty string when the order has no name", () => {
    expect(normalCase(null)).toBe("");
    expect(normalCase(undefined)).toBe("");
  });
});

describe("Order sheet contact split", () => {
  it("keeps the first two words as the name in capitals and the rest as a plain title", () => {
    expect(splitContactName("AGNESE REĶE SOCIĀLO TĪKLU ADMINISTRATORE SOCIAL MEDIA  ADMINISTRATOR")).toEqual({
      name: "AGNESE REĶE",
      title: "Sociālo Tīklu Administratore Social Media Administrator",
    });
  });
  it("capitalises a name typed in normal letters", () => {
    expect(splitContactName("Egita Piese Mārketinga biznesa partneris")).toEqual({
      name: "EGITA PIESE",
      title: "Mārketinga biznesa partneris",
    });
  });
  it("keeps an English title as written", () => {
    expect(splitContactName("Anna Celmiņa Strategic Vision")).toEqual({ name: "ANNA CELMIŅA", title: "Strategic Vision" });
  });
  it("has no title when the order stores only a name", () => {
    expect(splitContactName("Airita Alksne ")).toEqual({ name: "AIRITA ALKSNE", title: "" });
    expect(splitContactName(null)).toEqual({ name: "", title: "" });
  });
});
