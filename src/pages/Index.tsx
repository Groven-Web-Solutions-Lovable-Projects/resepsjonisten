import { Navbar, HeroSection } from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import ResultsSection from "@/components/ResultsSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import IndustriesSection from "@/components/IndustriesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import LostCallsCalculator from "@/components/LostCallsCalculator";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactFormSection from "@/components/ContactFormSection";
import NewsletterSection from "@/components/NewsletterSection";
import { FinalCTASection, Footer } from "@/components/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ResultsSection />
      <SocialProofSection />
      <ProblemSection />
      <ServicesSection />
      <IndustriesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <WhyChooseSection />
      <LostCallsCalculator />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <ContactFormSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
