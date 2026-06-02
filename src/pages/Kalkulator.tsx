import { Navbar } from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import { Footer } from "@/components/FinalCTASection";

const Kalkulator = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Kalkulator;
