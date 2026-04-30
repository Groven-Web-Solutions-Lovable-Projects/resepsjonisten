import { Navbar, HeroSection } from "@/components/HeroSection";
import ProofSection from "@/components/ProofSection";
import ProblemSection from "@/components/ProblemSection";
import LostCallsCalculator from "@/components/LostCallsCalculator";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyUsSection from "@/components/WhyUsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import { FinalCTASection, Footer } from "@/components/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
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
      <Footer />
    </div>
  );
};

export default Index;
