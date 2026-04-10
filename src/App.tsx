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
const SokoladesIzstadem = lazy(() => import("./pages/SokoladesIzstadem.tsx"));
const SokoladesDarbiniekiem = lazy(() => import("./pages/SokoladesDarbiniekiem.tsx"));
const SokoladesPartneriem = lazy(() => import("./pages/SokoladesPartneriem.tsx"));
const KorporativoDavanuCelvedis = lazy(() => import("./pages/KorporativoDavanuCelvedis.tsx"));
const KorporativoDavanuIdejas = lazy(() => import("./pages/KorporativoDavanuIdejas.tsx"));
const SokoladesGramata = lazy(() => import("./pages/SokoladesGramata.tsx"));
const SokoladePieKafijas = lazy(() => import("./pages/SokoladePieKafijas.tsx"));
const SokoladeVizitkarte = lazy(() => import("./pages/SokoladeVizitkarte.tsx"));
const EnIndex = lazy(() => import("./pages/EnIndex.tsx"));
const RuIndex = lazy(() => import("./pages/RuIndex.tsx"));
const EtIndex = lazy(() => import("./pages/EtIndex.tsx"));
const LtIndex = lazy(() => import("./pages/LtIndex.tsx"));
const SvIndex = lazy(() => import("./pages/SvIndex.tsx"));
const NoIndex = lazy(() => import("./pages/NoIndex.tsx"));
const FiIndex = lazy(() => import("./pages/FiIndex.tsx"));
const EnGiftIdeas = lazy(() => import("./pages/EnGiftIdeas.tsx"));
const RuGiftIdeas = lazy(() => import("./pages/RuGiftIdeas.tsx"));
const EtGiftIdeas = lazy(() => import("./pages/EtGiftIdeas.tsx"));
const LtGiftIdeas = lazy(() => import("./pages/LtGiftIdeas.tsx"));
const LangPage = lazy(() => import("./pages/LangPage.tsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.tsx"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage.tsx"));
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
            <Route path="/sokolades-izstadem" element={<SokoladesIzstadem />} />
            <Route path="/sokolades-darbinieku-davanam" element={<SokoladesDarbiniekiem />} />
            <Route path="/sokolades-partneru-davanam" element={<SokoladesPartneriem />} />
            <Route path="/korporativo-davanu-idejas" element={<KorporativoDavanuIdejas />} />
            <Route path="/korporativo-davanu-celvedis" element={<KorporativoDavanuCelvedis />} />
            <Route path="/sokolades-gramata" element={<SokoladesGramata />} />
            <Route path="/sokolade-pie-kafijas" element={<SokoladePieKafijas />} />
            <Route path="/sokolade-vizitkarte" element={<SokoladeVizitkarte />} />
            {/* EN routes */}
            <Route path="/en" element={<EnIndex />} />
            <Route path="/en/corporate-gift-ideas" element={<EnGiftIdeas />} />
            <Route path="/en/blog" element={<BlogPage lang="en" />} />
            <Route path="/en/blog/:slug" element={<BlogPostPage lang="en" />} />
            <Route path="/en/:slug" element={<LangPage lang="en" />} />
            {/* RU routes */}
            <Route path="/ru" element={<RuIndex />} />
            <Route path="/ru/idei-korporativnyh-podarkov" element={<RuGiftIdeas />} />
            <Route path="/ru/blog" element={<BlogPage lang="ru" />} />
            <Route path="/ru/blog/:slug" element={<BlogPostPage lang="ru" />} />
            <Route path="/ru/:slug" element={<LangPage lang="ru" />} />
            {/* ET routes */}
            <Route path="/et" element={<EtIndex />} />
            <Route path="/et/korporatiiv-kingituste-ideed" element={<EtGiftIdeas />} />
            <Route path="/et/blogi" element={<BlogPage lang="et" />} />
            <Route path="/et/blogi/:slug" element={<BlogPostPage lang="et" />} />
            <Route path="/et/:slug" element={<LangPage lang="et" />} />
            {/* LT routes */}
            <Route path="/lt" element={<LtIndex />} />
            <Route path="/lt/korporatyviniu-dovanu-idejos" element={<LtGiftIdeas />} />
            <Route path="/lt/blogas" element={<BlogPage lang="lt" />} />
            <Route path="/lt/blogas/:slug" element={<BlogPostPage lang="lt" />} />
            <Route path="/lt/:slug" element={<LangPage lang="lt" />} />
            {/* SV routes */}
            <Route path="/sv" element={<SvIndex />} />
            <Route path="/sv/blogg" element={<BlogPage lang="sv" />} />
            <Route path="/sv/blogg/:slug" element={<BlogPostPage lang="sv" />} />
            {/* NO routes */}
            <Route path="/no" element={<NoIndex />} />
            <Route path="/no/blogg" element={<BlogPage lang="no" />} />
            <Route path="/no/blogg/:slug" element={<BlogPostPage lang="no" />} />
            {/* FI routes */}
            <Route path="/fi" element={<FiIndex />} />
            <Route path="/fi/blogi" element={<BlogPage lang="fi" />} />
            <Route path="/fi/blogi/:slug" element={<BlogPostPage lang="fi" />} />
            {/* DA routes */}
            <Route path="/da" element={<LangPage lang="da" />} />
            <Route path="/da/blog" element={<BlogPage lang="da" />} />
            <Route path="/da/blog/:slug" element={<BlogPostPage lang="da" />} />
            {/* LV blog */}
            <Route path="/blogs" element={<BlogPage lang="lv" />} />
            <Route path="/blogs/:slug" element={<BlogPostPage lang="lv" />} />
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
