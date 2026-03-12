import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contactFormImg from "@/assets/contact-section.jpg";
import { useState } from "react";

const ContactFormSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ta kontakt med oss
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Fyll ut skjemaet, så tar vi kontakt for en uforpliktende gjennomgang av hvordan vi kan hjelpe bedriften din.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-8 bg-card rounded-xl shadow-elevated text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Takk for din henvendelse!</h3>
                <p className="mt-2 text-muted-foreground">Vi tar kontakt med deg innen kort tid.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Navn</label>
                    <Input placeholder="Ditt navn" required className="bg-card" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Bedrift</label>
                    <Input placeholder="Bedriftsnavn" className="bg-card" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">E-post</label>
                    <Input type="email" placeholder="din@epost.no" required className="bg-card" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Telefon</label>
                    <Input type="tel" placeholder="+47 000 00 000" className="bg-card" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Melding</label>
                  <Textarea placeholder="Fortell oss litt om bedriften din og hva du trenger hjelp med..." rows={4} className="bg-card" />
                </div>
                <Button variant="hero" size="lg" type="submit" className="w-full sm:w-auto">
                  Send henvendelse
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
