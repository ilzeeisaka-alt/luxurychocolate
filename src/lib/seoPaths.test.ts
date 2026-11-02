import { describe, expect, it } from "vitest";
import { canonicalPath } from "./seoPaths";

describe("Canonical URL resolution", () => {
  it("keeps product URLs self-referencing without display parameters", () => {
    expect(canonicalPath("/veikals/sagatavosana-sokolades-razosanai-davanu-komplekti?lang=en")).toBe("/veikals/sagatavosana-sokolades-razosanai-davanu-komplekti");
  });
  it("resolves old English article links to the existing landing page", () => {
    expect(canonicalPath("/en/christmas-corporate-chocolates")).toBe("/en/christmas-corporate-chocolate");
  });
  it("resolves old Russian promotional chocolate links", () => {
    expect(canonicalPath("/ru/reklamnyi-shokolad")).toBe("/ru/reklamniy-shokolad");
  });
  it("keeps valid Swedish pages canonical to themselves", () => {
    expect(canonicalPath("/sv/choklad-med-logotyp/")).toBe("/sv/choklad-med-logotyp");
  });
});