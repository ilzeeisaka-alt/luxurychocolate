import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SeoContentSection from "@/components/SeoContentSection";
import QuickFactsSection from "@/components/QuickFactsSection";
import ClientExamplesSection from "@/components/ClientExamplesSection";
import UseCasesSection from "@/components/UseCasesSection";
import HowToOrderSection from "@/components/HowToOrderSection";
import FreePreviewSection from "@/components/FreePreviewSection";
import TrustSection from "@/components/TrustSection";
import ProductsSection from "@/components/ProductsSection";
import BookBoxSection from "@/components/BookBoxSection";
import FaqSection from "@/components/FaqSection";
import IdeasSection from "@/components/IdeasSection";
import RelatedPagesSection from "@/components/RelatedPagesSection";
import CtaSection from "@/components/CtaSection";
import FooterSection from "@/components/FooterSection";
import ContactSection from "@/components/ContactSection";
import ShopSection from "@/components/ShopSection";
import RestaurantChocolateSection from "@/components/RestaurantChocolateSection";
import DailyChocolateSection from "@/components/DailyChocolateSection";
import VipGiftSection from "@/components/VipGiftSection";
import SouvenirSection from "@/components/SouvenirSection";
import CienastsSection from "@/components/CienastsSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const LtIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.lt;

  useSeo({
    title: "Šokoladas su logotipu & Korporatyvinės dovanos",
    description: "Premium korporatyvinės dovanos ir personalizuotas šokoladas su logotipu. Ekskliuzyvūs dovanų rinkiniai įmonėms. Belgiškas šokoladas, greitas gamyba, užsakymai nuo 1 vnt.",
    path: "/lt",
  });

  return (
    <main className="bg-background pt-14">
      <Navbar lang="lt" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="lt" {...t} logoAlt="Luxury Chocolate — eksklusivininis korporatyvinis šokoladas su logotipu" />

      <SeoContentSection lang="lt" />
      <QuickFactsSection lang="lt" />
      <ClientExamplesSection lang="lt" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="lt" />
      <HowToOrderSection lang="lt" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="lt" />
      <TrustSection lang="lt" />
      <ProductsSection lang="lt" />
      <ShopSection lang="lt" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="lt" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="lt" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="lt" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="lt" />
      <DailyChocolateSection lang="lt" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="lt" />
      <FaqSection lang="lt" />
      <IdeasSection lang="lt" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="lt" />
      <ContactSection lang="lt" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default LtIndex;
