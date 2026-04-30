import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, Sparkles } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import contactImg from "@/assets/contact-section.jpg";

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Skriv inn e-postadressen din" })
  .email({ message: "Ugyldig e-postadresse" })
  .max(255, { message: "E-post er for lang" });

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast({
        title: "Sjekk e-postadressen",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data, source: "landing_page" });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        setSubmitted(true);
        toast({
          title: "Du er allerede påmeldt",
          description: "Denne e-postadressen står allerede på listen vår.",
        });
        return;
      }
      toast({
        title: "Noe gikk galt",
        description: "Kunne ikke melde deg på akkurat nå. Prøv igjen om litt.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Takk for påmeldingen!",
      description: "Du er nå på listen og hører fra oss snart.",
    });
  };

  return (
    <section id="nyhetsbrev" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Bilde */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={contactImg}
                alt="Profesjonell resepsjonist svarer på telefonen"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Innhold + skjema */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Nyhetsbrev
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Tips til bedre <span className="gradient-text">kundedialog</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Korte, praktiske tips om hvordan du håndterer telefonen smartere,
              ikke mister kunder og fremstår mer profesjonell. Maks 1–2 e-poster
              i måneden – meld deg av når du vil.
            </p>

            <div className="mt-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-5 rounded-2xl bg-card border border-border"
                >
                  <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Takk!</p>
                    <p className="text-sm text-muted-foreground">
                      Du er nå påmeldt nyhetsbrevet vårt.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <label
                    htmlFor="newsletter-email"
                    className="text-xs font-semibold text-foreground uppercase tracking-wide block"
                  >
                    Din e-postadresse
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="newsletter-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="din@epost.no"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9 h-12 bg-background"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      variant="hero"
                      disabled={loading}
                      className="h-12 flex-shrink-0"
                    >
                      {loading ? "Melder på…" : "Meld meg på"}
                      {!loading && <Send className="w-4 h-4 ml-1" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Vi sender maks 1–2 e-poster i måneden. Ingen spam.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
