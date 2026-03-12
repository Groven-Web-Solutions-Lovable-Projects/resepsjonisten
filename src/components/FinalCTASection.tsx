import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import contactImg from "@/assets/contact-section.jpg";

const FinalCTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 gradient-primary" />
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/10 blur-3xl" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center lg:text-left max-w-xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
            Få en enklere hverdag uten å ansette en resepsjonist
          </h2>
          <p className="mt-6 text-primary-foreground/80 text-lg leading-relaxed">
            La oss vise deg hvordan vi kan håndtere telefonen for bedriften din, slik at du sparer tid, fremstår mer profesjonell og ikke går glipp av viktige henvendelser.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base px-8"
            >
              Book gratis demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <img src={contactImg} alt="Profesjonell resepsjonist" className="rounded-2xl shadow-elevated w-full h-auto object-cover" />
        </motion.div>
      </div>
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
