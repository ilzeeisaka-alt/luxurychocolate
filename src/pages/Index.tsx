import { lazy, Suspense, useState } from "react";
import DeferredSection from "@/components/DeferredSection";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ShopBanner from "@/components/ShopBanner";
const ClientExamplesSection = lazy(() => import("@/components/ClientExamplesSection"));
import QuickFactsSection from "@/components/QuickFactsSection";
import HowToOrderSection from "@/components/HowToOrderSection";
const TrustSection = lazy(() => import("@/components/TrustSection"));
const ProductsSection = lazy(() => import("@/components/ProductsSection"));
const CakeChocolateSection = lazy(() => import("@/components/CakeChocolateSection"));
const MacaroonsSection = lazy(() => import("@/components/MacaroonsSection"));
const FortuneCookieSection = lazy(() => import("@/components/FortuneCookieSection"));
const StrawberryRosesSection = lazy(() => import("@/components/StrawberryRosesSection"));
const RestaurantChocolateSection = lazy(() => import("@/components/RestaurantChocolateSection"));
const DailyChocolateSection = lazy(() => import("@/components/DailyChocolateSection"));
const BookBoxSection = lazy(() => import("@/components/BookBoxSection"));
const PrintedPaperChocolatesSection = lazy(() => import("@/components/PrintedPaperChocolatesSection"));
const MagnetBoxSection = lazy(() => import("@/components/MagnetBoxSection"));
const CoinsCardsSection = lazy(() => import("@/components/CoinsCardsSection"));
const VipGiftSection = lazy(() => import("@/components/VipGiftSection"));
const SouvenirSection = lazy(() => import("@/components/SouvenirSection"));
const CienastsSection = lazy(() => import("@/components/CienastsSection"));
const TableCardsSection = lazy(() => import("@/components/TableCardsSection"));
const CelebrationCakeSection = lazy(() => import("@/components/CelebrationCakeSection"));
const WeddingChocolateSection = lazy(() => import("@/components/WeddingChocolateSection"));
const CupcakeSection = lazy(() => import("@/components/CupcakeSection"));
import SeoContentSection from "@/components/SeoContentSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import CtaSection from "@/components/CtaSection";
import FreePreviewSection from "@/components/FreePreviewSection";
import UseCasesSection from "@/components/UseCasesSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ShopSection from "@/components/ShopSection";
const OfferModal = lazy(() => import("@/components/OfferModal"));
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.lv;

  useSeo({
    title: "Šokolādes apdruka & Personalizētas šokolādes ar logo",
    description: "Šokolādes apdruka — pilnkrāsu uzdruka tieši uz Beļģu šokolādes virsmas. Personalizēta šokolāde ar logo, korporatīvās dāvanas. Pasūtījumi no 1 gab.",
    path: "/",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="lv" {...t} />
      <DeferredSection anchor="magnets"><Suspense fallback={<div className="min-h-[400px]" />}><MagnetBoxSection /></Suspense></DeferredSection>
      <ShopBanner />
      <SeoContentSection />
      <QuickFactsSection />
      <DeferredSection><Suspense fallback={<div className="min-h-[400px]" />}><ClientExamplesSection /></Suspense></DeferredSection>
      <UseCasesSection onCtaClick={() => setModalOpen(true)} />
      <HowToOrderSection />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} />
      <DeferredSection><Suspense fallback={<div className="min-h-[400px]" />}><TrustSection /></Suspense></DeferredSection>
      <DeferredSection><Suspense fallback={<div className="min-h-[400px]" />}><ProductsSection /></Suspense></DeferredSection>
      <ShopSection onCtaClick={() => setModalOpen(true)} />
      <DeferredSection anchor="makaruni"><Suspense fallback={<div className="min-h-[400px]" />}><MacaroonsSection /></Suspense></DeferredSection>
      <DeferredSection anchor="laimes-cepumi"><Suspense fallback={<div className="min-h-[400px]" />}><FortuneCookieSection /></Suspense></DeferredSection>
      <DeferredSection anchor="zemenes-sokolade"><Suspense fallback={<div className="min-h-[400px]" />}><StrawberryRosesSection /></Suspense></DeferredSection>
      <DeferredSection anchor="vip"><Suspense fallback={<div className="min-h-[400px]" />}><VipGiftSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection anchor="suveniri"><Suspense fallback={<div className="min-h-[400px]" />}><SouvenirSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection anchor="cienasts"><Suspense fallback={<div className="min-h-[400px]" />}><CienastsSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection anchor="galda-kartes"><Suspense fallback={<div className="min-h-[400px]" />}><TableCardsSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection anchor="tortes"><Suspense fallback={<div className="min-h-[400px]" />}><CelebrationCakeSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection anchor="kazu"><Suspense fallback={<div className="min-h-[400px]" />}><WeddingChocolateSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection anchor="kapkeiki"><Suspense fallback={<div className="min-h-[400px]" />}><CupcakeSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection anchor="monetas"><Suspense fallback={<div className="min-h-[400px]" />}><CoinsCardsSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection anchor="ikdienas"><Suspense fallback={<div className="min-h-[400px]" />}><DailyChocolateSection lang="lv" onCtaClick={() => setModalOpen(true)} /></Suspense></DeferredSection>
      <DeferredSection><Suspense fallback={<div className="min-h-[400px]" />}><CakeChocolateSection /></Suspense></DeferredSection>
      <DeferredSection anchor="restoraniem"><Suspense fallback={<div className="min-h-[400px]" />}><RestaurantChocolateSection /></Suspense></DeferredSection>
      <DeferredSection><Suspense fallback={<div className="min-h-[400px]" />}><BookBoxSection /></Suspense></DeferredSection>
      <DeferredSection anchor="sokolade-apdrukata-papira"><Suspense fallback={<div className="min-h-[400px]" />}><PrintedPaperChocolatesSection lang="lv" /></Suspense></DeferredSection>
      <FaqSection />
      <IdeasSection />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} />
      <ContactSection onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      {modalOpen && <Suspense fallback={null}><OfferModal open={modalOpen} onOpenChange={setModalOpen} /></Suspense>}
    </main>
  );
};

export default Index;
