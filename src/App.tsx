import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsent from "./components/CookieConsent.tsx";

// Lazy-loaded pages — each gets its own JS chunk
const Index = lazy(() => import("./pages/Index.tsx"));
const SokoladesArLogo = lazy(() => import("./pages/SokoladesArLogo.tsx"));
const ZiemassvētkuSokolades = lazy(() => import("./pages/ZiemassvētkuSokolades.tsx"));
const ReklamasSokolade = lazy(() => import("./pages/ReklamasSokolade.tsx"));
const KlientuDavanas = lazy(() => import("./pages/KlientuDavanas.tsx"));
const SokoladesKonferencem = lazy(() => import("./pages/SokoladesKonferencem.tsx"));
const SokoladesDarbiniekiem = lazy(() => import("./pages/SokoladesDarbiniekiem.tsx"));
const SokoladesPartneriem = lazy(() => import("./pages/SokoladesPartneriem.tsx"));
const KorporativoDavanuCelvedis = lazy(() => import("./pages/KorporativoDavanuCelvedis.tsx"));
const KorporativoDavanuIdejas = lazy(() => import("./pages/KorporativoDavanuIdejas.tsx"));
const EnIndex = lazy(() => import("./pages/EnIndex.tsx"));
const RuIndex = lazy(() => import("./pages/RuIndex.tsx"));
const EtIndex = lazy(() => import("./pages/EtIndex.tsx"));
const LtIndex = lazy(() => import("./pages/LtIndex.tsx"));
const EnGiftIdeas = lazy(() => import("./pages/EnGiftIdeas.tsx"));
const RuGiftIdeas = lazy(() => import("./pages/RuGiftIdeas.tsx"));
const EtGiftIdeas = lazy(() => import("./pages/EtGiftIdeas.tsx"));
const LtGiftIdeas = lazy(() => import("./pages/LtGiftIdeas.tsx"));
const LangPage = lazy(() => import("./pages/LangPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            {/* LV routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sokolades-ar-logo" element={<SokoladesArLogo />} />
            <Route path="/ziemassvetku-korporativas-sokolades" element={<ZiemassvētkuSokolades />} />
            <Route path="/reklamas-sokolade" element={<ReklamasSokolade />} />
            <Route path="/sokolades-klientu-davanam" element={<KlientuDavanas />} />
            <Route path="/sokolades-konferencem" element={<SokoladesKonferencem />} />
            <Route path="/sokolades-darbinieku-davanam" element={<SokoladesDarbiniekiem />} />
            <Route path="/sokolades-partneru-davanam" element={<SokoladesPartneriem />} />
            <Route path="/korporativo-davanu-idejas" element={<KorporativoDavanuIdejas />} />
            <Route path="/korporativo-davanu-celvedis" element={<KorporativoDavanuCelvedis />} />
            {/* EN routes */}
            <Route path="/en" element={<EnIndex />} />
            <Route path="/en/corporate-gift-ideas" element={<EnGiftIdeas />} />
            <Route path="/en/:slug" element={<LangPage lang="en" />} />
            {/* RU routes */}
            <Route path="/ru" element={<RuIndex />} />
            <Route path="/ru/idei-korporativnyh-podarkov" element={<RuGiftIdeas />} />
            <Route path="/ru/:slug" element={<LangPage lang="ru" />} />
            {/* ET routes */}
            <Route path="/et" element={<EtIndex />} />
            <Route path="/et/korporatiiv-kingituste-ideed" element={<EtGiftIdeas />} />
            <Route path="/et/:slug" element={<LangPage lang="et" />} />
            {/* LT routes */}
            <Route path="/lt" element={<LtIndex />} />
            <Route path="/lt/korporatyviniu-dovanu-idejos" element={<LtGiftIdeas />} />
            <Route path="/lt/:slug" element={<LangPage lang="lt" />} />
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <CookieConsent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
