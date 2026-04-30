import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PhoneOff, TrendingDown, CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

/** Norsk tallformat: "12 500 kr" – bruker non-breaking space som tusenskille. */
const formatKr = (n: number) => {
  const rounded = Math.max(0, Math.round(n));
  return `${rounded.toLocaleString("nb-NO").replace(/\u00A0/g, " ")} kr`;
};

/** Count-up animasjon med requestAnimationFrame. Animerer fra forrige verdi til ny. */
const useCountUp = (value: number, duration = 600) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = display;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return display;
};

const AnimatedKr = ({ value, className }: { value: number; className?: string }) => {
  const animated = useCountUp(value);
  return <span className={`tabular-nums ${className ?? ""}`}>{formatKr(animated)}</span>;
};

/** Kompakt input med tall + slider. Mobilvennlig.
 *  Bruker lokal string-state så feltet kan tømmes mens brukeren skriver. */
const NumberSlider = ({
  label,
  suffix,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  suffix?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) => {
  const formatted = value.toLocaleString("nb-NO").replace(/\u00A0/g, " ");
  const [text, setText] = useState(formatted);
  const [focused, setFocused] = useState(false);

  // Synk fra ekstern verdi (f.eks. slider) når brukeren ikke aktivt skriver
  useEffect(() => {
    if (!focused) setText(formatted);
  }, [formatted, focused]);

  const commit = (raw: string) => {
    const cleaned = raw.replace(/\s/g, "").replace(/[^\d]/g, "");
    if (cleaned === "") {
      onChange(min);
      setText(min.toLocaleString("nb-NO").replace(/\u00A0/g, " "));
      return;
    }
    const n = Math.min(max, Math.max(min, Number(cleaned)));
    onChange(n);
    setText(n.toLocaleString("nb-NO").replace(/\u00A0/g, " "));
  };

  const handleChange = (raw: string) => {
    // La brukeren skrive fritt; oppdater verdi live hvis det finnes ett tall
    setText(raw);
    const cleaned = raw.replace(/\s/g, "").replace(/[^\d]/g, "");
    if (cleaned === "") return; // ikke tving 0 mens feltet er tomt
    const n = Math.min(max, Math.max(min, Number(cleaned)));
    onChange(n);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            inputMode="numeric"
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={(e) => {
              setFocused(true);
              e.target.select();
            }}
            onBlur={(e) => {
              setFocused(false);
              commit(e.target.value);
            }}
            className="w-24 h-9 rounded-md border border-input bg-background px-2 text-right text-sm font-semibold tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
};

const LostCallsCalculator = () => {
  const [callsPerDay, setCallsPerDay] = useState(20);
  const [revenuePerCall, setRevenuePerCall] = useState(1500);
  const [missedPercent, setMissedPercent] = useState(30);

  const lostPerDay = callsPerDay * revenuePerCall * (missedPercent / 100);
  const lostPerMonth = lostPerDay * 22;
  const lostPerYear = lostPerDay * 250;

  return (
    <section id="tapt-samtale" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold mb-4">
            <TrendingDown className="w-3.5 h-3.5" />
            Hva koster det å ikke svare?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            <span className="gradient-text">Tapt samtale</span>-kalkulator
          </h2>
          <p className="mt-3 text-muted-foreground">
            Se hvor mye virksomheten din potensielt taper på ubesvarte anrop – per dag, måned og år.
          </p>
        </motion.div>

        <div className="mt-10 max-w-5xl mx-auto grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-6"
          >
            <NumberSlider
              label="Antall samtaler per dag"
              value={callsPerDay}
              min={1}
              max={300}
              step={1}
              onChange={setCallsPerDay}
            />
            <div className="border-t border-border" />
            <NumberSlider
              label="Gjennomsnittlig inntekt per samtale"
              suffix="kr"
              value={revenuePerCall}
              min={100}
              max={20000}
              step={100}
              onChange={setRevenuePerCall}
            />
            <div className="border-t border-border" />
            <NumberSlider
              label="Andel ubesvarte samtaler"
              suffix="%"
              value={missedPercent}
              min={0}
              max={100}
              step={1}
              onChange={setMissedPercent}
            />
          </motion.div>

          {/* Resultat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl p-5 sm:p-6 text-primary-foreground flex flex-col"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
            }}
          >
            <div className="flex items-center gap-2 text-sm font-medium opacity-90">
              <PhoneOff className="w-4 h-4" />
              Tapt inntekt
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wide opacity-75">Per dag</div>
                <AnimatedKr
                  value={lostPerDay}
                  className="block text-2xl font-bold"
                />
              </div>
              <div className="border-t border-primary-foreground/20" />
              <div>
                <div className="text-xs uppercase tracking-wide opacity-75 flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" /> Per måned (22 arbeidsdager)
                </div>
                <AnimatedKr
                  value={lostPerMonth}
                  className="block text-2xl font-bold"
                />
              </div>
              <div className="border-t border-primary-foreground/20" />
              <div>
                <div className="text-xs uppercase tracking-wide opacity-75 flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" /> Per år (250 arbeidsdager)
                </div>
                <AnimatedKr
                  value={lostPerYear}
                  className="block text-3xl sm:text-4xl font-extrabold"
                />
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-primary-foreground/20">
              <p className="text-sm opacity-95 mb-3">
                Slutt å tape penger på ubesvarte anrop. Vår AI-resepsjonist svarer kundene dine – døgnet rundt.
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full bg-background text-primary hover:bg-background/90 font-semibold"
              >
                <a href="#kontakt">
                  Book gratis demo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LostCallsCalculator;