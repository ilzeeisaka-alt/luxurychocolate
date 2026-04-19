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
import MagnetBoxSection from "@/components/MagnetBoxSection";
import CoinsCardsSection from "@/components/CoinsCardsSection";
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
import TableCardsSection from "@/components/TableCardsSection";
import CelebrationCakeSection from "@/components/CelebrationCakeSection";
import OfferModal from "@/components/OfferModal";
import { useSeo } from "@/hooks/useSeo";
import { heroContent } from "@/i18n/content";

const IsIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.is;

  useSeo({
    title: "Súkkulaði með merki & Fyrirtækjagjafir",
    description: "Premium fyrirtækjagjafir og sérsniðið súkkulaði með merki. Belgískt súkkulaði, hröð framleiðsla.",
    path: "/is",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="is" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="is" {...t} logoAlt="Luxury Chocolate — einstakt fyrirtækjasúkkulaði með merki" />
      <SeoContentSection lang="is" />
      <QuickFactsSection lang="is" />
      <ClientExamplesSection lang="is" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="is" />
      <HowToOrderSection lang="is" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="is" />
      <TrustSection lang="is" />
      <ProductsSection lang="is" />
      <ShopSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="is" />
      <CoinsCardsSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="is" />
      <DailyChocolateSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="is" />
      <FaqSection lang="is" />
      <IdeasSection lang="is" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="is" />
      <ContactSection lang="is" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default IsIndex;
