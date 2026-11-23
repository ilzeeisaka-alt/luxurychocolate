import { describe, expect, it } from "vitest";
import { contactAddress, contactRegistrationNumber, contactWebsite, orderDesignLogos, orderHeaderLogo, primaryProductPhoto, type OrderDesignItem } from "../lib/orderVisualization";

const item: OrderDesignItem = { id: "line-1", product_name: "Trifeles", quantity: 12, logo_url: "/old.png", logos: null };
describe("Order visualization data", () => {
  it("automatically uses the saved client logo for every order sheet", () => {
    expect(orderHeaderLogo("/taltap.png", [item], { "/old.png": "/signed-upload.png" })).toBe("/taltap.png");
  });
  it("uses the client's resolved uploaded logo when an order has no saved company logo", () => {
    expect(orderHeaderLogo("", [item], { "/old.png": "/signed-upload.png" })).toBe("/signed-upload.png");
    expect(orderHeaderLogo("", [item], {})).toBeUndefined();
  });
  it("fills the missing Latvian registration number from the client's VAT number", () => {
    expect(contactRegistrationNumber("", "LV40003771232")).toBe("40003771232");
    expect(contactRegistrationNumber("12345678901", "LV40003771232")).toBe("12345678901");
    expect(contactRegistrationNumber("", "DE123456789")).toBeUndefined();
    expect(contactRegistrationNumber("", "LV123")).toBeUndefined();
  });
  it("derives the client's company website from its email, not a public mailbox service", () => {
    expect(contactWebsite("agnese@alps.archi")).toBe("www.alps.archi");
    expect(contactWebsite("someone@gmail.com")).toBeUndefined();
    expect(contactWebsite("not-an-email")).toBeUndefined();
  });
  it("formats both contacts with street and city above postal code and country", () => {
    expect(contactAddress("Kandavas iela 29a", "Rīga", "LV-1083", "LV")).toEqual({ address: "Kandavas iela 29a, Rīga", locality: "LV-1083, Latvija" });
    expect(contactAddress("Sporta iela 2-k1, Rīga, LV-1013")).toEqual({ address: "Sporta iela 2-k1, Rīga", locality: "LV-1013, Latvija" });
    expect(contactAddress("Sporta iela 2-k1", "Rīga", "LV-1013", "Latvia")).toEqual({ address: "Sporta iela 2-k1, Rīga", locality: "LV-1013, Latvija" });
    expect(contactAddress(null)).toEqual({ address: "", locality: "" });
    expect(contactAddress("1 Main Street", "London", "SW1A 1AA", "United Kingdom")).toEqual({ address: "1 Main Street, London", locality: "SW1A 1AA, United Kingdom" });
  });
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