import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Bronsje",
    price: "1 990",
    desc: "For bedrifter som trenger hjelp med grunnleggende telefonhåndtering",
    minutes: "60–80 minutter per måned",
    features: ["Besvare telefon", "Videresende samtaler", "Ta imot og formidle beskjeder"],
    popular: false,
  },
  {
    name: "Sølv",
    price: "4 990",
    desc: "For bedrifter som i tillegg trenger booking",
    minutes: "200–300 minutter per måned",
    features: ["Alt i Bronsje", "Booking og timebestilling"],
    popular: true,
  },
  {
    name: "Gull",
    price: "9 990",
    desc: "For bedrifter med større behov for oppfølging",
    minutes: "300–500 minutter per måned",
    features: ["Alt i Sølv", "Utvidet booking", "Bestillinger"],
    popular: false,
  },
  {
    name: "Diamant",
    price: null,
    desc: "For bedrifter som ønsker en skreddersydd løsning",
    minutes: "Tilpasset volum",
    features: ["Alt i Gull", "Tilpasset oppsett", "Skreddersydd rapportering"],
    popular: false,
  },
];

const PricingSection = () => (
  <section id="priser" className="py-24 bg-card">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Velg pakken som passer <span className="gradient-text">bedriften din</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Vi tilbyr fleksible abonnementsløsninger basert på hvor mye hjelp du trenger. Alle pakkene er laget for å gi deg en enklere hverdag.
        </p>
      </motion.div>

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl p-6 flex flex-col ${
              plan.popular
                ? "gradient-primary text-primary-foreground shadow-glow scale-105"
                : "bg-background border border-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
                <Star className="w-3 h-3" /> Mest populær
              </div>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className={`mt-2 text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              {plan.desc}
            </p>
            <div className="mt-4">
              {plan.price ? (
                <div>
                  <span className="text-3xl font-bold">Fra {plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}> kr/mnd</span>
                </div>
              ) : (
                <span className="text-2xl font-bold">Pris etter avtale</span>
              )}
            </div>
            <p className={`mt-2 text-xs font-medium ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {plan.minutes}
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm">
                  <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? "hero-outline" : "hero"}
              className={`mt-6 w-full ${plan.popular ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}`}
            >
              {plan.price ? "Kom i gang" : "Kontakt oss"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
