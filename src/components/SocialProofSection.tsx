import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const companies = [
  "Øhres Auto AS",
  "Negassie Holding AS",
  "NGT AS",
  "Pescator AB",
  "Svenska Industrihotellet AB",
  "OIV7B AS",
  "Pepzi AS",
  "FinnAI AS",
];

const testimonials = [
  {
    name: "Morten Eriksen",
    company: "Øhres Auto AS",
    text: "Etter at vi begynte å bruke Resepsjonisten har vi ikke mistet en eneste kundehenvendelse. Fantastisk service og profesjonelt team!",
    role: "Daglig leder",
  },
  {
    name: "Sara Lindström",
    company: "Pescator AB",
    text: "Vi trengte en løsning for å håndtere telefoner mens vi var opptatt med kunder. Resepsjonisten løste dette perfekt – anbefales varmt.",
    role: "Kontorsjef",
  },
  {
    name: "Ahmed Negassie",
    company: "Negassie Holding AS",
    text: "Profesjonell og pålitelig. Våre kunder tror de snakker med vår egen resepsjonist. Det har gjort en stor forskjell for omdømmet vårt.",
    role: "CEO",
  },
  {
    name: "Kristine Haugen",
    company: "NGT AS",
    text: "Enkel oppstart og utmerket kundebehandling. Vi sparer tid hver eneste dag takket være Resepsjonisten.",
    role: "Administrasjonssjef",
  },
];

/* ─── Infinite marquee for companies ─── */
const CompanyMarquee = () => {
  // Double the list for seamless loop
  const doubled = [...companies, ...companies];

  return (
    <div className="mt-12 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card to-transparent z-10" />

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex-shrink-0 px-8 py-4 rounded-xl bg-secondary/60 border border-border/50 text-secondary-foreground text-sm font-semibold tracking-wide whitespace-nowrap"
          >
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Testimonial Carousel ─── */
const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
          Hva kundene våre <span className="gradient-text">sier</span>
        </h3>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-secondary/30 border border-border/50 p-8 md:p-12 min-h-[280px] flex items-center">
          <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/15" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed italic">
                "{t.text}"
              </p>

              <div className="mt-8">
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            aria-label="Forrige referanse"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Referanse ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
            aria-label="Neste referanse"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const SocialProofSection = () => (
  <section className="py-20 bg-card">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Betrodd av bedrifter som ønsker bedre tilgjengelighet
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Vi hjelper bedrifter med å håndtere innkommende telefoner profesjonelt, slik at ingen viktige henvendelser går tapt.
        </p>
      </motion.div>

      <CompanyMarquee />
      <TestimonialCarousel />
    </div>
  </section>
);

export default SocialProofSection;
