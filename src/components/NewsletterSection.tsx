import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, Sparkles } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      // 23505 = unique_violation (allerede påmeldt)
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
    <section id="nyhetsbrev" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16"
          style={{
            background:
              "linear-gradient(135deg, hsl(276 52% 28%) 0%, hsl(310 60% 45%) 100%)",
          }}
        >
          {/* Dekor */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-4 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                Nyhetsbrev
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Få tips til bedre kundedialog – rett i innboksen
              </h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                Korte, praktiske tips om hvordan du håndterer telefonen smartere,
                ikke mister kunder og fremstår mer profesjonell. Ingen spam –
                meld deg av når du vil.
              </p>
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">Takk!</h3>
                  <p className="text-white/80 text-sm mt-1">
                    Du er nå påmeldt nyhetsbrevet vårt.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 space-y-3"
                >
                  <label
                    htmlFor="newsletter-email"
                    className="text-sm font-semibold text-white block"
                  >
                    Din e-postadresse
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="din@epost.no"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 bg-white/95 border-0 text-foreground placeholder:text-muted-foreground h-11"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
                  >
                    {loading ? "Melder deg på…" : "Meld meg på"}
                    {!loading && <Send className="w-4 h-4 ml-1" />}
                  </Button>
                  <p className="text-xs text-white/60 text-center">
                    Vi sender maks 1–2 e-poster i måneden.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;