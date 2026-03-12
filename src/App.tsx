import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SokoladesArLogo from "./pages/SokoladesArLogo.tsx";
import ZiemassvētkuSokolades from "./pages/ZiemassvētkuSokolades.tsx";
import ReklamasSokolade from "./pages/ReklamasSokolade.tsx";
import KlientuDavanas from "./pages/KlientuDavanas.tsx";
import SokoladesKonferencem from "./pages/SokoladesKonferencem.tsx";
import SokoladesDarbiniekiem from "./pages/SokoladesDarbiniekiem.tsx";
import SokoladesPartneriem from "./pages/SokoladesPartneriem.tsx";
import NotFound from "./pages/NotFound.tsx";
import CookieConsent from "./components/CookieConsent.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sokolades-ar-logo" element={<SokoladesArLogo />} />
          <Route path="/ziemassvetku-korporativas-sokolades" element={<ZiemassvētkuSokolades />} />
          <Route path="/reklamas-sokolade" element={<ReklamasSokolade />} />
          <Route path="/sokolades-klientu-davanam" element={<KlientuDavanas />} />
          <Route path="/sokolades-konferencem" element={<SokoladesKonferencem />} />
          <Route path="/sokolades-darbinieku-davanam" element={<SokoladesDarbiniekiem />} />
          <Route path="/sokolades-partneru-davanam" element={<SokoladesPartneriem />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
