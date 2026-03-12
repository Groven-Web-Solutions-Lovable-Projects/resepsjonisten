import { Navbar, HeroSection } from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import DemoFormSection from "@/components/DemoFormSection";
import { FinalCTASection, Footer } from "@/components/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <ServicesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <WhyChooseSection />
      <PricingSection />
      <FAQSection />
      <DemoFormSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
