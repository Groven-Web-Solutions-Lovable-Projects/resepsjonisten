import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => (
  <section
    className="relative py-28 overflow-hidden"
    style={{
      background:
        "radial-gradient(120% 100% at 50% 0%, hsl(276 65% 22%) 0%, hsl(270 60% 10%) 60%, hsl(270 70% 5%) 100%)",
    }}
  >
    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.07] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/25 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/40 blur-3xl pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-6 border border-white/15">
          Klar til å starte?
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
          Få en enklere hverdag uten å{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(310 80% 75%) 100%)",
            }}
          >
            ansette en resepsjonist
          </span>
        </h2>
        <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
          La oss vise deg hvordan vi kan håndtere telefonen for bedriften din, slik at du sparer tid, fremstår mer profesjonell og ikke går glipp av viktige henvendelser.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#kontakt">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold text-base px-8 shadow-elevated"
            >
              Book gratis demo
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
          <a href="#priser">
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold text-base px-8"
            >
              Se priser
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 bg-foreground">
    <div className="container mx-auto px-4 text-center">
      <p className="text-background/60 text-sm">
        © {new Date().getFullYear()} Resepsjonisten.no — Din Resepsjonist 24/7
      </p>
    </div>
  </footer>
);

export { FinalCTASection, Footer };
