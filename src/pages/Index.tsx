import { Navbar, HeroSection } from "@/components/HeroSection";
import HashScroller from "@/components/HashScroller";
import ProofSection from "@/components/ProofSection";
import DualServiceSection from "@/components/DualServiceSection";
import ProblemSection from "@/components/ProblemSection";
import LostCallsCalculator from "@/components/LostCallsCalculator";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyUsSection from "@/components/WhyUsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
import { FinalCTASection, Footer } from "@/components/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HashScroller />
      <Navbar />
      <HeroSection />
      <DualServiceSection />
      <ProofSection />
      <ProblemSection />
      <LostCallsCalculator />
      <ServicesSection />
      <HowItWorksSection />
      <IndustriesSection />
      <WhyUsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
