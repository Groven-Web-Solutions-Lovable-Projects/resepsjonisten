import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Star, Phone, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";
import CallUsButton, { PHONE_NUMBER } from "@/components/CallUsButton";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero-receptionist.jpg";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";

const avatars = [avatar1, avatar2, avatar3, avatar4];

const navLinks = [
  { href: "#tjenester", label: "Tjenester" },
  { href: "#bransjer", label: "Bransjer" },
  { href: "#hvordan", label: "Slik fungerer det" },
  { href: "#priser", label: "Priser" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm"
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
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold">
              <a href={`tel:${PHONE_NUMBER}`} aria-label="Ring oss">
                <Phone className="w-4 h-4" />
                Ring oss
              </a>
            </Button>
            <a href="#kontakt">
              <Button variant="hero" size="sm">
                <Sparkles className="w-4 h-4" />
                Book gratis demo
              </Button>
            </a>
          </div>
        </div>

        {/* Mobile + tablet */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold"
          >
            <a href={`tel:${PHONE_NUMBER}`} aria-label="Ring oss">
              <Phone className="w-4 h-4" />
              Ring oss
            </a>
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Meny"
          >
            {open ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-center justify-between gap-3 px-4 py-4 rounded-xl bg-secondary/40 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all"
                >
                  <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {l.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
              <a href="#kontakt" onClick={() => setOpen(false)} className="mt-3">
                <Button variant="hero" size="lg" className="w-full">
                  <Sparkles className="w-4 h-4" />
                  Book gratis demo
                </Button>
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
            <a href="#kontakt"><Button variant="hero" size="xl">Book gratis demo</Button></a>
            <CallUsButton />
          </motion.div>
          <motion.div variants={fadeUp} className="mt-12 flex items-center gap-5">
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="Kunde" className="w-10 h-10 rounded-full border-2 border-background object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
                <span className="ml-1 text-sm font-bold text-foreground">5.0</span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                <span className="text-foreground font-bold">10 000+</span> besvarte kundesamtaler
              </p>
            </div>
          </motion.div>
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
