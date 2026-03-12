import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero-receptionist.jpg";

const navLinks = [
  { href: "#tjenester", label: "Tjenester" },
  { href: "#hvordan", label: "Hvordan det fungerer" },
  { href: "#priser", label: "Priser" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <img src={logo} alt="Resepsjonisten logo" className="h-10" />

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#kontakt">
            <Button variant="hero" size="sm">Book gratis demo</Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="Meny"
        >
          {open ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  {l.label}
                </a>
              ))}
              <a href="#kontakt" onClick={() => setOpen(false)}>
                <Button variant="hero" size="default" className="w-full mt-2">Book gratis demo</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pt-20 md:pb-0">
    <div className="absolute inset-0 gradient-primary-soft" />
    <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
    <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
    
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-xl">
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Mist aldri en viktig{" "}
            <span className="gradient-text">kundehenvendelse</span> igjen
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Vi fungerer som resepsjonisten for bedriften din og svarer telefonen på dine vegne. Vi tar imot beskjeder, videresender samtaler og håndterer booking, slik at du kan fokusere på jobben din uten å bli avbrutt.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <Button variant="hero" size="lg">Book gratis demo</Button>
            <a href="#hvordan"><Button variant="hero-outline" size="lg">Les mer</Button></a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-muted-foreground">
            Rask oppstart · Ingen ansettelse nødvendig · Profesjonell kundebehandling
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-elevated">
            <img src={heroImg} alt="Profesjonell resepsjonist" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-elevated"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground text-lg">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">24/7 tilgjengelig</p>
                <p className="text-xs text-muted-foreground">Alltid bemannet</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export { Navbar, HeroSection };
