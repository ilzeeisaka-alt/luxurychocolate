import { describe, expect, it } from "vitest";
import { normalCase } from "../lib/orderSheetName";

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
