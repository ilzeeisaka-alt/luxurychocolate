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
const DaIndex = lazy(() => import("./pages/DaIndex.tsx"));
const DeIndex = lazy(() => import("./pages/DeIndex.tsx"));
const FrIndex = lazy(() => import("./pages/FrIndex.tsx"));
const ItIndex = lazy(() => import("./pages/ItIndex.tsx"));
const EsIndex = lazy(() => import("./pages/EsIndex.tsx"));
const ArIndex = lazy(() => import("./pages/ArIndex.tsx"));
const NlIndex = lazy(() => import("./pages/NlIndex.tsx"));
const PlIndex = lazy(() => import("./pages/PlIndex.tsx"));
const CsIndex = lazy(() => import("./pages/CsIndex.tsx"));
const PtIndex = lazy(() => import("./pages/PtIndex.tsx"));
const ElIndex = lazy(() => import("./pages/ElIndex.tsx"));
const TrIndex = lazy(() => import("./pages/TrIndex.tsx"));
const HuIndex = lazy(() => import("./pages/HuIndex.tsx"));
const RoIndex = lazy(() => import("./pages/RoIndex.tsx"));
const BgIndex = lazy(() => import("./pages/BgIndex.tsx"));
const HrIndex = lazy(() => import("./pages/HrIndex.tsx"));
const SkIndex = lazy(() => import("./pages/SkIndex.tsx"));
const SlIndex = lazy(() => import("./pages/SlIndex.tsx"));
const UkIndex = lazy(() => import("./pages/UkIndex.tsx"));
const SrIndex = lazy(() => import("./pages/SrIndex.tsx"));
const BsIndex = lazy(() => import("./pages/BsIndex.tsx"));
const MkIndex = lazy(() => import("./pages/MkIndex.tsx"));
const SqIndex = lazy(() => import("./pages/SqIndex.tsx"));
const IsIndex = lazy(() => import("./pages/IsIndex.tsx"));
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
            <Route path="/da" element={<DaIndex />} />
            <Route path="/da/blog" element={<BlogPage lang="da" />} />
            <Route path="/da/blog/:slug" element={<BlogPostPage lang="da" />} />
            {/* DE routes */}
            <Route path="/de" element={<DeIndex />} />
            <Route path="/de/blog" element={<BlogPage lang="de" />} />
            <Route path="/de/blog/:slug" element={<BlogPostPage lang="de" />} />
            {/* FR routes */}
            <Route path="/fr" element={<FrIndex />} />
            <Route path="/fr/blog" element={<BlogPage lang="fr" />} />
            <Route path="/fr/blog/:slug" element={<BlogPostPage lang="fr" />} />
            {/* IT routes */}
            <Route path="/it" element={<ItIndex />} />
            <Route path="/it/blog" element={<BlogPage lang="it" />} />
            <Route path="/it/blog/:slug" element={<BlogPostPage lang="it" />} />
            {/* ES routes */}
            <Route path="/es" element={<EsIndex />} />
            <Route path="/es/blog" element={<BlogPage lang="es" />} />
            <Route path="/es/blog/:slug" element={<BlogPostPage lang="es" />} />
            {/* AR routes */}
            <Route path="/ar" element={<ArIndex />} />
            <Route path="/ar/blog" element={<BlogPage lang="ar" />} />
            <Route path="/ar/blog/:slug" element={<BlogPostPage lang="ar" />} />
            {/* NL routes */}
            <Route path="/nl" element={<NlIndex />} />
            <Route path="/nl/blog" element={<BlogPage lang="nl" />} />
            <Route path="/nl/blog/:slug" element={<BlogPostPage lang="nl" />} />
            {/* PL routes */}
            <Route path="/pl" element={<PlIndex />} />
            <Route path="/pl/blog" element={<BlogPage lang="pl" />} />
            <Route path="/pl/blog/:slug" element={<BlogPostPage lang="pl" />} />
            {/* CS routes */}
            <Route path="/cs" element={<CsIndex />} />
            <Route path="/cs/blog" element={<BlogPage lang="cs" />} />
            <Route path="/cs/blog/:slug" element={<BlogPostPage lang="cs" />} />
            {/* PT routes */}
            <Route path="/pt" element={<PtIndex />} />
            <Route path="/pt/blog" element={<BlogPage lang="pt" />} />
            <Route path="/pt/blog/:slug" element={<BlogPostPage lang="pt" />} />
            {/* EL routes */}
            <Route path="/el" element={<ElIndex />} />
            <Route path="/el/blog" element={<BlogPage lang="el" />} />
            <Route path="/el/blog/:slug" element={<BlogPostPage lang="el" />} />
            {/* TR routes */}
            <Route path="/tr" element={<TrIndex />} />
            <Route path="/tr/blog" element={<BlogPage lang="tr" />} />
            <Route path="/tr/blog/:slug" element={<BlogPostPage lang="tr" />} />
            {/* HU routes */}
            <Route path="/hu" element={<HuIndex />} />
            <Route path="/hu/blog" element={<BlogPage lang="hu" />} />
            <Route path="/hu/blog/:slug" element={<BlogPostPage lang="hu" />} />
            {/* RO routes */}
            <Route path="/ro" element={<RoIndex />} />
            <Route path="/ro/blog" element={<BlogPage lang="ro" />} />
            <Route path="/ro/blog/:slug" element={<BlogPostPage lang="ro" />} />
            {/* BG routes */}
            <Route path="/bg" element={<BgIndex />} />
            <Route path="/bg/blog" element={<BlogPage lang="bg" />} />
            <Route path="/bg/blog/:slug" element={<BlogPostPage lang="bg" />} />
            {/* HR routes */}
            <Route path="/hr" element={<HrIndex />} />
            <Route path="/hr/blog" element={<BlogPage lang="hr" />} />
            <Route path="/hr/blog/:slug" element={<BlogPostPage lang="hr" />} />
            {/* SK routes */}
            <Route path="/sk" element={<SkIndex />} />
            <Route path="/sk/blog" element={<BlogPage lang="sk" />} />
            <Route path="/sk/blog/:slug" element={<BlogPostPage lang="sk" />} />
            {/* SL routes */}
            <Route path="/sl" element={<SlIndex />} />
            <Route path="/sl/blog" element={<BlogPage lang="sl" />} />
            <Route path="/sl/blog/:slug" element={<BlogPostPage lang="sl" />} />
            {/* UK routes */}
            <Route path="/uk" element={<UkIndex />} />
            <Route path="/uk/blog" element={<BlogPage lang="uk" />} />
            <Route path="/uk/blog/:slug" element={<BlogPostPage lang="uk" />} />
            {/* SR routes */}
            <Route path="/sr" element={<SrIndex />} />
            <Route path="/sr/blog" element={<BlogPage lang="sr" />} />
            <Route path="/sr/blog/:slug" element={<BlogPostPage lang="sr" />} />
            {/* BS routes */}
            <Route path="/bs" element={<BsIndex />} />
            <Route path="/bs/blog" element={<BlogPage lang="bs" />} />
            <Route path="/bs/blog/:slug" element={<BlogPostPage lang="bs" />} />
            {/* MK routes */}
            <Route path="/mk" element={<MkIndex />} />
            <Route path="/mk/blog" element={<BlogPage lang="mk" />} />
            <Route path="/mk/blog/:slug" element={<BlogPostPage lang="mk" />} />
            {/* SQ routes */}
            <Route path="/sq" element={<SqIndex />} />
            <Route path="/sq/blog" element={<BlogPage lang="sq" />} />
            <Route path="/sq/blog/:slug" element={<BlogPostPage lang="sq" />} />
            {/* IS routes */}
            <Route path="/is" element={<IsIndex />} />
            <Route path="/is/blog" element={<BlogPage lang="is" />} />
            <Route path="/is/blog/:slug" element={<BlogPostPage lang="is" />} />
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
