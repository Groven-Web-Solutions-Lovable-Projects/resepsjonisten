import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Clock, CheckCircle, Phone, Mail, MapPin, Send } from "lucide-react";
import logo from "@/assets/logo.png";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const perks = [
  { icon: Clock, text: "30 min uforpliktende gjennomgang" },
  { icon: Sparkles, text: "Tilpasset løsning for din bedrift" },
  { icon: CheckCircle, text: "Helt gratis — ingen forpliktelser" },
];

const FinalCTASection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="kontakt"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 100% at 50% 0%, hsl(276 65% 22%) 0%, hsl(270 60% 10%) 60%, hsl(270 70% 5%) 100%)",
      }}
    >
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
        <div className="grid lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          {/* Venstre: Tekst */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 text-white"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-6 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              Klar til å starte?
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Book din{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(310 80% 75%) 100%)",
                }}
              >
                gratis demo
              </span>
            </h2>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              Se hvordan vi kan håndtere telefonene dine — helt uten risiko. Vi
              setter opp alt og viser deg løsningen live.
            </p>

            <ul className="mt-8 space-y-3">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-white/85">
                  <span className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            {/* Sekundær kontakt */}
            <div className="mt-10 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-3 text-sm">
              <a
                href="tel:+4797251000"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-accent" />
                +47 972 51 000
              </a>
              <a
                href="mailto:kontakt@resepsjonisten.no"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-accent" />
                kontakt@resepsjonisten.no
              </a>
            </div>
          </motion.div>

          {/* Høyre: Skjema */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-elevated">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Takk for din henvendelse!
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Vi tar kontakt med deg innen kort tid for å sette opp din
                  gratis demo.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-elevated">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  Book gratis demo
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Fyll ut skjemaet — vi kontakter deg innen 24 timer.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">
                        Navn
                      </label>
                      <Input placeholder="Ditt navn" required className="bg-background" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">
                        Bedrift
                      </label>
                      <Input placeholder="Bedriftsnavn" className="bg-background" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">
                        E-post
                      </label>
                      <Input type="email" placeholder="din@epost.no" required className="bg-background" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">
                        Telefon
                      </label>
                      <Input type="tel" placeholder="+47 000 00 000" className="bg-background" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block uppercase tracking-wide">
                      Melding
                    </label>
                    <Textarea
                      placeholder="Fortell oss litt om bedriften din og hva du trenger hjelp med..."
                      rows={3}
                      className="bg-background"
                    />
                  </div>
                  <Button variant="hero" size="xl" type="submit" className="w-full">
                    <Sparkles className="w-4 h-4" />
                    Book gratis demo nå
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Ingen bindingstid · Svar innen 24 timer
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── Footer med kontaktinfo, hurtiglenker, kart og nyhetsbrev ─── */

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Skriv inn e-postadressen din" })
  .email({ message: "Ugyldig e-postadresse" })
  .max(255, { message: "E-post er for lang" });

const ADDRESS = "Høvikveien 2A, 1363 Høvik";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);

const quickLinks = [
  { label: "Tjenester", href: "#tjenester" },
  { label: "Bransjer", href: "#bransjer" },
  { label: "Slik fungerer det", href: "#hvordan" },
  { label: "Hva taper du?", href: "#tapt-samtale" },
  { label: "Priser", href: "#priser" },
  { label: "FAQ", href: "#faq" },
];

const NewsletterInline = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
      .insert({ email: parsed.data, source: "footer" });
    setLoading(false);
    if (error && error.code !== "23505") {
      toast({
        title: "Noe gikk galt",
        description: "Kunne ikke melde deg på akkurat nå.",
        variant: "destructive",
      });
      return;
    }
    setDone(true);
    toast({ title: "Takk!", description: "Du er nå påmeldt nyhetsbrevet." });
  };

  if (done) {
    return (
      <p className="text-sm text-background/70">
        ✓ Du er påmeldt. Takk for tilliten!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        required
        placeholder="din@epost.no"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-background/10 border-background/20 text-background placeholder:text-background/40 h-10"
      />
      <Button
        type="submit"
        size="sm"
        disabled={loading}
        className="bg-background text-foreground hover:bg-background/90 h-10 flex-shrink-0"
      >
        {loading ? "..." : <Send className="w-4 h-4" />}
      </Button>
    </form>
  );
};

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-14">
      <div className="grid gap-10 lg:grid-cols-4">
        {/* Logo + tagline + nyhetsbrev */}
        <div className="space-y-4 lg:col-span-2">
          <img
            src={logo}
            alt="Resepsjonisten logo"
            className="h-9 brightness-0 invert"
          />
          <p className="text-sm text-background/60 leading-relaxed max-w-sm">
            Din eksterne resepsjonist 24/7. Vi tar telefonen, booker timer og
            sørger for at ingen henvendelser går tapt.
          </p>
          <div className="pt-3 max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-background/50 mb-2">
              Få tips på e-post
            </p>
            <NewsletterInline />
          </div>
        </div>

        {/* Hurtiglenker */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-background/50 mb-4">
            Hurtiglenker
          </p>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-background/50 mb-4">
            Kontakt
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="tel:+4797251000"
                className="flex items-center gap-2 text-background/80 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4 text-background/50" />
                +47 972 51 000
              </a>
            </li>
            <li>
              <a
                href="mailto:kontakt@resepsjonisten.no"
                className="flex items-center gap-2 text-background/80 hover:text-background transition-colors"
              >
                <Mail className="w-4 h-4 text-background/50" />
                kontakt@resepsjonisten.no
              </a>
            </li>
            <li>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-background/80 hover:text-background transition-colors"
              >
                <MapPin className="w-4 h-4 text-background/50 mt-0.5 flex-shrink-0" />
                <span>{ADDRESS}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/50">
        <p>
          © {new Date().getFullYear()} Resepsjonisten AS · Org.nr 936 065 619 ·
          MVA-registrert
        </p>
        <a
          href="https://virksomhet.brreg.no/nb/oppslag/enheter/936065619"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-background transition-colors"
        >
          Brønnøysundregistrene
        </a>
      </div>
    </div>
  </footer>
);

export { FinalCTASection, Footer };
