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
  "FinnAI AS",
  "Svenska Industrihotellet AB",
  "Pescator AB",
  "Negassie Holding AS",
  "OIV7B AS",
  "Øhres Auto AS",
  "NGT AS",
  "Pepzi AS",
  "Fine Negler AS",
  "Lashes By Kasja",
  "Clinica AS",
  "Waypoint Maritime AS",
  "Blindleia Kiropraktor AS",
];

const testimonials = [
  {
    name: "Adiam Negassie",
    role: "Styreleder",
    company: "FinnAI AS",
    text: "Resepsjonisten har gitt oss en helt ny struktur på kundehenvendelser. Vi mister ikke lenger leads, og oppfølgingen skjer raskt og profesjonelt. Dette har direkte påvirket salget vårt positivt. Anbefales på det sterkeste.",
  },
  {
    name: "Jonas Skogam",
    role: "",
    company: "Svenska Industrihotellet AB",
    text: "Vi har fått en langt mer profesjonell håndtering av alle henvendelser etter at vi startet samarbeidet. Resepsjonisten sørger for at både eksisterende og nye kunder blir fulgt opp på en strukturert måte. Det gir oss mer tid til drift og utvikling.",
  },
  {
    name: "Jonas Skogam",
    role: "",
    company: "Pescator AB",
    text: "Rask respons og god oppfølging har vært avgjørende for oss. Resepsjonisten fungerer som en forlengelse av vårt eget team, og kundene våre merker ikke forskjell. Dette har løftet servicenivået vårt betydelig.",
  },
  {
    name: "Adiam Negassie",
    role: "",
    company: "Negassie Holding AS",
    text: "Vi har flere selskaper og henvendelser. Resepsjonisten gir oss kontroll og sørger for at ingenting faller mellom stolene. En effektiv og lønnsom løsning.",
  },
  {
    name: "Tommy Nordengen",
    role: "",
    company: "OIV7B AS",
    text: "Enkel oppstart, profesjonell gjennomføring og tydelig effekt. Vi opplever bedre flyt i hverdagen og mer fornøyde kunder. Resepsjonisten leverer akkurat det de lover.",
  },
  {
    name: "Tommy Nordengen",
    role: "",
    company: "Øhres Auto AS",
    text: "Telefonen blir alltid besvart, og kundene får rask hjelp. Dette har gitt oss flere bookinger og bedre kapasitetsutnyttelse på verkstedet. En investering som raskt betaler seg. Jeg startet Resepsjonisten pga egne behov og konseptet har virkelig levd opp til egne forventninger.",
  },
  {
    name: "Styreleder",
    role: "",
    company: "NGT AS",
    text: "Resepsjonisten har gitt oss bedre struktur og oversikt på alle henvendelser. Oppfølgingen er systematisk, og vi får utnyttet hver kunde bedre. Veldig fornøyd med samarbeidet.",
  },
  {
    name: "Styreleder",
    role: "",
    company: "Pepzi AS",
    text: "Vi ønsket en løsning som både var fleksibel og profesjonell – det fikk vi. Resepsjonisten håndterer kundedialogen effektivt og bidrar til økt konvertering. Anbefales.",
  },
  {
    name: "Jostein Sørstrønen",
    role: "",
    company: "Fine Negler AS",
    text: "Timeboken vår er mye bedre fylt opp etter at vi startet med Resepsjonisten. De følger opp kunder og sørger for at vi ikke mister bookinger. Enkelt, effektivt og veldig verdifullt.",
  },
  {
    name: "Katarzyna Natalia Rzepecka",
    role: "Styreleder",
    company: "Lashes By Kasja",
    text: "Vi har fått en mye mer profesjonell kundedialog og raskere responstid. Resepsjonisten gjør en solid jobb hver eneste dag. Dette merkes godt på kundetilfredsheten.",
  },
  {
    name: "Jay",
    role: "",
    company: "Clinica AS",
    text: "For oss er tilgjengelighet avgjørende. Resepsjonisten sørger for at pasientene alltid får svar, og at henvendelser håndteres riktig. Dette gir trygghet både for oss og kundene våre.",
  },
  {
    name: "Sondre",
    role: "Daglig Leder",
    company: "Waypoint Maritime AS",
    text: "I en bransje hvor timing er kritisk, er rask respons helt avgjørende. Resepsjonisten leverer på dette hver gang. Vi har fått bedre kontroll og mer effektiv drift.",
  },
  {
    name: "Jeremy Pont",
    role: "",
    company: "Blindleia Kiropraktor AS",
    text: "Pasientene våre får rask respons og enkel booking. Resepsjonisten fungerer sømløst sammen med vår drift og gir oss mer tid til å fokusere på behandling. Veldig fornøyd.",
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
  const [perPage, setPerPage] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerPage(w >= 1280 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pageCount = Math.ceil(testimonials.length / perPage);
  const safeCurrent = current % pageCount;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % pageCount);
  }, [pageCount]);
  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + pageCount) % pageCount);
  }, [pageCount]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  const pageItems = testimonials.slice(
    safeCurrent * perPage,
    safeCurrent * perPage + perPage,
  );

  return (
    <div className="relative max-w-6xl mx-auto">
      <div className="relative overflow-hidden min-h-[300px] flex items-stretch">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={safeCurrent}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {pageItems.map((t, i) => (
              <div
                key={`${safeCurrent}-${i}`}
                className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 md:p-7 backdrop-blur-sm flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-white/90 leading-relaxed italic flex-1">
                  "{t.text}"
                </p>
                <div className="mt-5 pt-4 border-t border-white/10">
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-white/60">
                    {[t.role, t.company].filter(Boolean).join(", ")}
                  </p>
                </div>
              </div>
            ))}
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
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > safeCurrent ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === safeCurrent ? "bg-accent w-6" : "bg-white/30 hover:bg-white/50 w-2"
              }`}
              aria-label={`Side ${i + 1}`}
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
    <div className="overflow-hidden relative max-w-full py-2">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[hsl(270_55%_10%)] via-[hsl(270_55%_10%)]/80 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[hsl(270_55%_10%)] via-[hsl(270_55%_10%)]/80 to-transparent z-10" />
      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="group flex-shrink-0 flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-br from-accent/30 via-primary/25 to-accent/15 border border-accent/40 text-white text-sm font-semibold whitespace-nowrap shadow-[0_6px_24px_-6px_hsl(var(--accent)/0.55)] backdrop-blur-sm hover:border-accent hover:from-accent/45 hover:to-primary/35 transition-colors"
          >
            <span
              className="inline-block w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent))]"
              aria-hidden
            />
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
