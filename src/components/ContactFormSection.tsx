import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Gift, CheckCircle, Clock, Sparkles } from "lucide-react";
import contactFormImg from "@/assets/contact-section.jpg";
import { useState } from "react";

const perks = [
  { icon: Clock, text: "30 min uforpliktende gjennomgang" },
  { icon: Sparkles, text: "Tilpasset løsning for din bedrift" },
  { icon: CheckCircle, text: "Helt gratis — ingen forpliktelser" },
];

const ContactFormSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Demo highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
            <Gift className="h-4 w-4" />
            <span className="text-sm font-semibold">100% gratis — ingen forpliktelser</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Book din <span className="gradient-text">gratis demo</span> i dag
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Se hvordan vi kan håndtere telefonene dine — helt uten risiko. Vi setter opp alt og viser deg løsningen live.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {perks.map((perk) => (
              <div key={perk.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <perk.icon className="h-4 w-4 text-primary" />
                <span>{perk.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={contactFormImg}
              alt="Profesjonell resepsjonist klar til å hjelpe"
              className="rounded-2xl shadow-elevated w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-card rounded-xl shadow-elevated text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Takk for din henvendelse!</h3>
                <p className="mt-2 text-muted-foreground">Vi tar kontakt med deg innen kort tid for å sette opp din gratis demo.</p>
              </motion.div>
            ) : (
              <div className="bg-card rounded-2xl p-8 shadow-elevated">
                <h3 className="text-2xl font-bold text-foreground mb-1">Book gratis demo</h3>
                <p className="text-muted-foreground mb-6">Fyll ut skjemaet — vi kontakter deg innen 24 timer.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Navn</label>
                      <Input placeholder="Ditt navn" required className="bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Bedrift</label>
                      <Input placeholder="Bedriftsnavn" className="bg-background" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">E-post</label>
                      <Input type="email" placeholder="din@epost.no" required className="bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Telefon</label>
                      <Input type="tel" placeholder="+47 000 00 000" className="bg-background" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Melding</label>
                    <Textarea placeholder="Fortell oss litt om bedriften din og hva du trenger hjelp med..." rows={4} className="bg-background" />
                  </div>
                  <Button variant="hero" size="xl" type="submit" className="w-full">
                    Book gratis demo nå
                  </Button>
                  <Button asChild variant="outline" size="xl" className="w-full border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold">
                    <a href="tel:+4700000000" aria-label="Ring oss">
                      Ring oss
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Ingen bindingstid · Svar innen 24 timer</p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
