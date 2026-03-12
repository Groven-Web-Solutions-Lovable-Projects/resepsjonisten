import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 gradient-primary" />
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/10 blur-3xl" />

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
          Få en enklere hverdag uten å ansette en resepsjonist
        </h2>
        <p className="mt-6 text-primary-foreground/80 text-lg leading-relaxed">
          La oss vise deg hvordan vi kan håndtere telefonen for bedriften din, slik at du sparer tid, fremstår mer profesjonell og ikke går glipp av viktige henvendelser.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base px-8"
          >
            Book gratis demo
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 font-bold text-base px-8"
          >
            Få en uforpliktende gjennomgang
          </Button>
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
