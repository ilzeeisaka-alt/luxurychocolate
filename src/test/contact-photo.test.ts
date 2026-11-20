import { describe, expect, it } from "vitest";
import { isContactPhotoType } from "@/lib/contactPhoto";

describe("Contact photo validation", () => {
  it("accepts supported photographs", () => {
    expect(isContactPhotoType("image/jpeg")).toBe(true);
    expect(isContactPhotoType("image/png")).toBe(true);
    expect(isContactPhotoType("image/webp")).toBe(true);
  });
  it("rejects active SVG documents and non-images", () => {
    expect(isContactPhotoType("image/svg+xml")).toBe(false);
    expect(isContactPhotoType("text/html")).toBe(false);
  });
});