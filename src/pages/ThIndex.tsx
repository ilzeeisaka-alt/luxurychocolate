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

const ThIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const t = heroContent.th;

  useSeo({
    title: "การพิมพ์ช็อคโกแลตและช็อคโกแลตส่วนบุคคลพร้อมโลโก้",
    description: "การพิมพ์ช็อคโกแลต — พิมพ์สีเต็มรูปแบบโดยตรงบนช็อคโกแลตเบลเยียม ช็อคโกแลตส่วนบุคคลพร้อมโลโก้ ของขวัญองค์กร",
    path: "/th",
  });

  return (
    <main className="bg-background pt-14 lg:pt-24">
      <Navbar lang="th" />
      <HeroSection onCtaClick={() => setModalOpen(true)} lang="th" {...t} logoAlt="Luxury Chocolate — ช็อคโกแลตองค์กรพิเศษพร้อมโลโก้" />

      <SeoContentSection lang="th" />
      <QuickFactsSection lang="th" />
      <ClientExamplesSection lang="th" />
      <UseCasesSection onCtaClick={() => setModalOpen(true)} lang="th" />
      <HowToOrderSection lang="th" />
      <FreePreviewSection onCtaClick={() => setModalOpen(true)} lang="th" />
      <TrustSection lang="th" />
      <ProductsSection lang="th" />
      <ShopSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <VipGiftSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <SouvenirSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <CienastsSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <TableCardsSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <CelebrationCakeSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <MagnetBoxSection lang="th" />
      <CoinsCardsSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <BookBoxSection lang="th" />
      <DailyChocolateSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <RestaurantChocolateSection lang="th" />
      <FaqSection lang="th" />
      <IdeasSection lang="th" />
      <RelatedPagesSection />
      <CtaSection onCtaClick={() => setModalOpen(true)} lang="th" />
      <ContactSection lang="th" onCtaClick={() => setModalOpen(true)} />
      <FooterSection />
      <OfferModal open={modalOpen} onOpenChange={setModalOpen} />
    </main>
  );
};

export default ThIndex;
