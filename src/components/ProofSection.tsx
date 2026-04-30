import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { PhoneCall, Timer, Clock, Smile, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type Stat = {
  icon: typeof PhoneCall;
  value: number;
  prefix?: string;
  suffix?: string;
  display?: (n: number) => string;
  label: string;
};

const stats: Stat[] = [
  {
    icon: PhoneCall,
    value: 10000,
    suffix: "+",
    display: (n) => `${Math.round(n).toLocaleString("nb-NO").replace(/\u00A0/g, " ")}`,
    label: "Kundesamtaler besvart",
  },
  { icon: Timer, value: 10, prefix: "<", suffix: "sek", label: "Gj.snittlig responstid" },
  { icon: Clock, value: 24, suffix: "/7", label: "Tilgjengelighet" },
  { icon: Smile, value: 98, suffix: "%", label: "Fornøyde kunder" },
];

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

const useCountUp = (target: number, start: boolean, duration = 1800) => {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, target, duration]);
  return val;
};

const StatCard = ({ stat, index, start }: { stat: Stat; index: number; start: boolean }) => {
  const Icon = stat.icon;
  const animated = useCountUp(stat.value, start);
  const text = stat.display
    ? stat.display(animated)
    : Math.round(animated).toLocaleString("nb-NO").replace(/\u00A0/g, " ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-6 border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden"
    >
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)" }}
      />
      <div className="relative">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-white mb-5">
          <Icon className="w-4 h-4" strokeWidth={1.75} />
        </div>
        <div className="flex items-baseline gap-1">
          {stat.prefix && <span className="text-xl font-light text-white/60 tabular-nums">{stat.prefix}</span>}
          <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums leading-none tracking-tight">
            {text}
          </span>
          {stat.suffix && <span className="text-lg font-semibold text-white/70 tabular-nums">{stat.suffix}</span>}
        </div>
        <p className="mt-3 text-sm font-medium text-white/70">{stat.label}</p>
      </div>
    </motion.div>
  );
};

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
    <div className="relative max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-white/[0.06] border border-white/10 p-8 md:p-10 min-h-[260px] flex items-center backdrop-blur-sm">
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
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-base md:text-lg text-white/90 leading-relaxed italic">"{t.text}"</p>
            <div className="mt-6">
              <p className="font-bold text-white">{t.name}</p>
              <p className="text-sm text-white/60">{t.role}, {t.company}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Forrige referanse"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-accent w-6" : "bg-white/30 hover:bg-white/50 w-2"
              }`}
              aria-label={`Referanse ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Neste referanse"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const CompanyMarquee = () => {
  const doubled = [...companies, ...companies];
  return (
    <div className="overflow-hidden relative max-w-full">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[hsl(270_55%_10%)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[hsl(270_55%_10%)] to-transparent z-10" />
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white/80 text-sm font-semibold whitespace-nowrap"
          >
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ProofSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="resultater"
      className="relative py-24 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, hsl(276 60% 18%) 0%, hsl(270 55% 10%) 55%, hsl(270 60% 6%) 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            Betrodd av bedrifter
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Tall som{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(310 80% 75%) 100%)" }}
            >
              taler for seg selv
            </span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} start={inView} />
          ))}
        </div>

        {/* Bedrifts-marquee */}
        <CompanyMarquee />

        {/* Testimonials */}
        <div className="mt-16">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
