import { act, cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { buyerDraftKey } from "../lib/repeatCustomer";

const auth = vi.hoisted(() => ({ user: null as { id: string } | null, loading: true }));
vi.mock("@/hooks/useAuth", () => ({ useAuth: () => auth }));
vi.mock("@/hooks/useSeo", () => ({ useSeo: () => {} }));
vi.mock("@/hooks/use-toast", () => {
  const toast = () => {};
  return { useToast: () => ({ toast }) };
});
vi.mock("@/components/Navbar", () => ({ default: () => null }));
vi.mock("@/components/FooterSection", () => ({ default: () => null }));
vi.mock("@/components/AffiliateCodeInput", () => ({ default: () => null }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { from: () => ({ select: () => ({ eq: () => ({ order: async () => ({ data: [], error: null }) }) }) }) } }));
import Grozs from "../pages/Grozs";

afterEach(() => { cleanup(); localStorage.clear(); auth.user = null; auth.loading = true; });

it("restores an authenticated buyer's 25% discount before writing the cart draft", async () => {
  const draft = { agencyOn: true, agencyPct: 25, eventName: "Saved event", eventDate: "2026-12-20T10:00", deliveryAddress: "Venue 1" };
  localStorage.setItem(buyerDraftKey("buyer"), JSON.stringify(draft));
  const view = render(<MemoryRouter><Grozs /></MemoryRouter>);
  auth.user = { id: "buyer" }; auth.loading = false;
  await act(async () => { view.rerender(<MemoryRouter><Grozs /></MemoryRouter>); });
  expect(JSON.parse(localStorage.getItem(buyerDraftKey("buyer")) || "{}")).toEqual(draft);
});

it("restores the next account's own discount instead of saving the previous account's choice", async () => {
  localStorage.setItem(buyerDraftKey("first"), JSON.stringify({ agencyOn: true, agencyPct: 25 }));
  localStorage.setItem(buyerDraftKey("second"), JSON.stringify({ agencyOn: false, agencyPct: 10 }));
  auth.user = { id: "first" }; auth.loading = false;
  const view = render(<MemoryRouter><Grozs /></MemoryRouter>);
  auth.user = { id: "second" };
  await act(async () => { view.rerender(<MemoryRouter><Grozs /></MemoryRouter>); });
  expect(JSON.parse(localStorage.getItem(buyerDraftKey("second")) || "{}")).toEqual({ agencyOn: false, agencyPct: 10 });
});