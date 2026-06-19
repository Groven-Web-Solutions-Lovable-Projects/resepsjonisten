import { useMemo, useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mic,
  PhoneForwarded,
  Zap,
  Clock,
  Info,
  Mail,
  MessageSquare,
  MessagesSquare,
  Send,
  UserCog,
  PhoneCall,
  Timer,
  AlertTriangle,
  CalendarDays,
  MessageCircle,
  Calendar,
  Database,
  Bot,
  CalendarPlus,
  ClipboardList,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  PRICING,
  RECEPTIONIST_TYPES,
  SOCIAL_PLATFORMS,
  WEEKDAYS,
  formatHour,
  calculatePrice,
  defaultConfig,
  formatKr,
  type PricingConfig,
  type SocialPlatform,
  type Weekday,
} from "@/lib/pricing";
import { useCalculatorSnapshot } from "@/contexts/CalculatorContext";

const InfoTip = ({ title, text }: { title: string; text: string }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        type="button"
        aria-label={`Mer informasjon om ${title}`}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Info className="w-4 h-4" />
      </button>
    </PopoverTrigger>
    <PopoverContent
      side="top"
      align="start"
      className="w-72 sm:w-80 text-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="font-semibold text-foreground mb-1">{title}</div>
      <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">{text}</p>
    </PopoverContent>
  </Popover>
);

type NumberOption = { value: number; label: string; price: number };

const optionRowLabel = (o: NumberOption) =>
  o.value === 0 ? o.label : `${o.label} · +${formatKr(o.price)}/mnd`;

/** Slider for inkluderte minutter per måned */
const MinutesSlider = ({
  title,
  value,
  min,
  max,
  step,
  included,
  extraPerMinute,
  basePrice,
  basePriceLabel,
  onChange,
}: {
  title: string;
  value: number;
  min: number;
  max: number;
  step: number;
  included: number;
  extraPerMinute: number;
  basePrice: number;
  basePriceLabel?: string;
  onChange: (v: number) => void;
}) => {
  const extra = Math.max(0, value - included);
  const extraCost = Math.round(extra * extraPerMinute);
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-primary" />
          <Label className="text-sm font-medium text-foreground">{title}</Label>
          <InfoTip title={title} text={PRICING.descriptions.minutes} />
        </div>
        <div className="text-right">
          <div className="text-base font-semibold text-foreground tabular-nums">{value} min</div>
          <div className="text-xs text-muted-foreground">
            {extra > 0
              ? `+${formatKr(extraCost)}/mnd (${extra} ekstra)`
              : `Inkludert ${basePriceLabel ?? `for ${formatKr(basePrice)}/mnd`}`}
          </div>
        </div>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
        <span>{included} min (inkludert)</span>
        <span>{max} min</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        Ekstra minutter: {extraPerMinute.toString().replace(".", ",")} kr per minutt
      </div>
    </div>
  );
};

/** Toggle-tjeneste (på/av) */
const ToggleService = ({
  icon: Icon,
  title,
  desc,
  info,
  price,
  priceText,
  checked,
  onChange,
  disabled,
}: {
  icon: typeof Mic;
  title: string;
  desc: string;
  info?: string;
  price: number;
  priceText?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <div
    className={cn(
      "flex items-center justify-between gap-4 rounded-lg border bg-background p-3 transition-colors",
      checked ? "border-success bg-success/10" : "border-border hover:border-primary/40",
      disabled && "opacity-90",
    )}
  >
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
          checked ? "bg-success" : "bg-muted",
        )}
      >
        <Icon className={cn("w-4 h-4", checked ? "text-success-foreground" : "text-muted-foreground")} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <div className="text-sm font-medium text-foreground">{title}</div>
          {info && <InfoTip title={title} text={info} />}
        </div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
    <div className="flex items-center gap-3 shrink-0">
      <span className="text-sm font-semibold text-foreground tabular-nums hidden sm:inline">
        {priceText ?? `+${formatKr(price)}`}
      </span>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={title} disabled={disabled} />
    </div>
  </div>
);

/** Kvantitets-tjeneste: av/på + slider for antall enheter, pris per enhet */
const QuantityService = ({
  icon: Icon,
  title,
  desc,
  info,
  value,
  pricePerUnit,
  unitLabel,
  unitLabelPlural,
  min,
  max,
  step,
  onChange,
}: {
  icon: typeof Mic;
  title: string;
  desc: string;
  info?: string;
  value: number;
  pricePerUnit: number;
  unitLabel: string;
  unitLabelPlural: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) => {
  const active = value > 0;
  const amount = value * pricePerUnit;
  const unit = value === 1 ? unitLabel : unitLabelPlural;
  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-3 transition-colors",
        active ? "border-success bg-success/10" : "border-border hover:border-primary/40",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              active ? "bg-success" : "bg-muted",
            )}
          >
            <Icon className={cn("w-4 h-4", active ? "text-success-foreground" : "text-muted-foreground")} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-medium text-foreground">{title}</div>
              {info && <InfoTip title={title} text={info} />}
            </div>
            <div className="text-xs text-muted-foreground">
              {active ? `${value} ${unit} × ${pricePerUnit} kr · +${formatKr(amount)}/mnd` : desc}
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <Switch
            checked={active}
            onCheckedChange={(v) => onChange(v ? Math.max(step, min || step) : 0)}
            aria-label={title}
          />
        </div>
      </div>
      {active && (
        <div className="mt-3 pl-12">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs text-muted-foreground">Antall per måned</span>
            <span className="text-sm font-semibold text-foreground tabular-nums">
              {value} {unit}
            </span>
          </div>
          <div className="border border-border rounded-lg p-3 bg-background">
            <Slider
              min={Math.max(step, min || step)}
              max={max}
              step={step}
              value={[value]}
              onValueChange={([v]) => onChange(v)}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
              <span>{Math.max(step, min || step)}</span>
              <span>{max}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Tiered tjeneste (dropdown med nivåer) — med valgfrie plattform-checkboxes */
const TieredService = ({
  icon: Icon,
  title,
  info,
  value,
  options,
  onChange,
  platforms,
  selectedPlatforms,
  onPlatformsChange,
  currentSubtitle,
  optionLabel,
}: {
  icon: typeof Mail;
  title: string;
  info?: string;
  value: number;
  options: readonly NumberOption[];
  onChange: (v: number) => void;
  platforms?: readonly { value: SocialPlatform; label: string }[];
  selectedPlatforms?: SocialPlatform[];
  onPlatformsChange?: (v: SocialPlatform[]) => void;
  currentSubtitle?: string;
  optionLabel?: (o: NumberOption) => string;
}) => {
  const active = value > 0;
  const current = options.find((o) => o.value === value) ?? options[0];

  const togglePlatform = (p: SocialPlatform) => {
    if (!onPlatformsChange || !selectedPlatforms) return;
    onPlatformsChange(
      selectedPlatforms.includes(p)
        ? selectedPlatforms.filter((x) => x !== p)
        : [...selectedPlatforms, p],
    );
  };

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-3 transition-colors",
        active ? "border-success bg-success/10" : "border-border hover:border-primary/40",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
              active ? "bg-success" : "bg-muted",
            )}
          >
            <Icon className={cn("w-4 h-4", active ? "text-success-foreground" : "text-muted-foreground")} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-medium text-foreground">{title}</div>
              {info && <InfoTip title={title} text={info} />}
            </div>
            <div className="text-xs text-muted-foreground">
              {active
                ? currentSubtitle ?? `${current.label} · +${formatKr(current.price)}/mnd`
                : "Ikke inkludert"}
            </div>
          </div>
        </div>
        <div className="shrink-0 w-[150px] sm:w-[180px]">
          <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue>{current.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={String(o.value)}>
                  {optionLabel ? optionLabel(o) : optionRowLabel(o)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {active && platforms && selectedPlatforms && onPlatformsChange && (
        <div className="mt-3 pl-12">
          <div className="text-xs text-muted-foreground mb-1.5">Velg plattformer:</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {platforms.map((p) => (
              <label
                key={p.value}
                className="flex items-center gap-2 text-sm text-foreground cursor-pointer"
              >
                <Checkbox
                  checked={selectedPlatforms.includes(p.value)}
                  onCheckedChange={() => togglePlatform(p.value)}
                />
                {p.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PricingSection = () => {
  const [config, setConfig] = useState<PricingConfig>(defaultConfig);
  const [weekendsOpen, setWeekendsOpen] = useState(false);
  const result = useMemo(
    () => calculatePrice({ ...config, saturday: weekendsOpen ? config.saturday : false }),
    [config, weekendsOpen],
  );
  const { setSnapshot } = useCalculatorSnapshot();
  const [sameForAll, setSameForAll] = useState(true);

  const update = <K extends keyof PricingConfig>(key: K, value: PricingConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  // AI Resepsjonist: AI 24/7 låst på, helgevalg ikke tilgjengelig
  useEffect(() => {
    if (config.receptionistType === "ai") {
      setWeekendsOpen(false);
      setConfig((c) =>
        c.ai247 && !c.saturday ? c : { ...c, ai247: true, saturday: false },
      );
    }
  }, [config.receptionistType]);

  const extraHours = Math.max(0, result.maxWeekdayHours - PRICING.baseHours);

  const allowedStart = PRICING.openingHours.weekdayAllowedStart;
  const allowedEnd = PRICING.openingHours.weekdayAllowedEnd;
  const startOptions = PRICING.openingHours.weekdayTimeOptions.filter((h) => h < allowedEnd);
  const endOptions = PRICING.openingHours.weekdayTimeOptions.filter((h) => h > allowedStart);

  const setDayHours = (day: Weekday, patch: Partial<{ start: number; end: number }>) => {
    setConfig((c) => ({
      ...c,
      weekdayHours: { ...c.weekdayHours, [day]: { ...c.weekdayHours[day], ...patch } },
    }));
  };

  const setAllWeekdays = (patch: Partial<{ start: number; end: number }>) => {
    setConfig((c) => {
      const next = { ...c.weekdayHours };
      for (const d of WEEKDAYS) next[d.value] = { ...next[d.value], ...patch };
      return { ...c, weekdayHours: next };
    });
  };

  const monHours = config.weekdayHours.mon;

  const captureSnapshot = () => {
    const recType = RECEPTIONIST_TYPES.find((t) => t.value === config.receptionistType)!;
    const contract = PRICING.contracts.find((p) => p.months === result.contractMonths);
    const weekdayText = WEEKDAYS.map(
      (d) => `  ${d.short}: ${formatHour(config.weekdayHours[d.value].start)}–${formatHour(config.weekdayHours[d.value].end)}`,
    ).join("\n");
    const summary = [
      `Oppstartskostnad og implementering: ${formatKr(result.startupCost)} (engangssum)`,
      "",
      `Resepsjonist-type: ${recType.label}`,
      `Åpningstider man–fre:`,
      weekdayText,
      config.saturday ? `Lørdag: 09:00–15:00 (+990 kr/mnd)` : null,
      result.weekdayOutOfRange ? `OBS: Valgte tider utenfor 08–17 – ta direkte kontakt.` : null,
      "",
      "Valgte tjenester:",
      ...result.lines.map((l) => `${l.label}: ${formatKr(l.amount)}`),
      config.social > 0 && config.socialPlatforms.length > 0
        ? `  → Meldinger plattformer: ${config.socialPlatforms.join(", ")}`
        : null,
      config.socialPosts > 0 && config.socialPostsPlatforms.length > 0
        ? `  → Innlegg plattformer: ${config.socialPostsPlatforms.join(", ")}`
        : null,
      "",
      `Subtotal: ${formatKr(result.subtotal)}/mnd`,
      result.discountRate > 0
        ? `Bindingsrabatt: −${Math.round(result.discountRate * 100)} % (−${formatKr(result.discountAmount)})`
        : null,
      `Månedspris: ${formatKr(result.monthly)}/mnd`,
      `Bindingstid: ${contract?.label ?? `${result.contractMonths} mnd`}`,
      `Total over ${result.contractMonths} mnd: ${formatKr(result.contractTotal)}`,
    ]
      .filter(Boolean)
      .join("\n");

    setSnapshot({
      source: "pricing",
      summary,
      data: {
        config,
        receptionistTypeLabel: recType.label,
        result: {
          lines: result.lines,
          subtotal: result.subtotal,
          discountRate: result.discountRate,
          discountAmount: result.discountAmount,
          monthly: result.monthly,
          contractMonths: result.contractMonths,
          contractTotal: result.contractTotal,
        },
      },
      capturedAt: "",
    });
  };

  return (
    <section id="priser" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Bygg din egen <span className="gradient-text">pakke</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Velg det du trenger og se prisen i sanntid. Du betaler bare for det du faktisk bruker.
          </p>
        </motion.div>

        <div className="mt-10 max-w-5xl mx-auto grid lg:grid-cols-5 gap-6 items-start">
          {/* Konfigurator */}
          <div className="lg:col-span-3 rounded-2xl border border-border bg-background p-5 sm:p-6 space-y-6">
            {/* Type resepsjonist */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <UserCog className="w-4 h-4 text-primary" />
                <Label className="text-sm font-medium text-foreground">Type resepsjonist</Label>
                <InfoTip title="Type resepsjonist" text={PRICING.descriptions.receptionist} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {RECEPTIONIST_TYPES.map((t) => {
                  const active = config.receptionistType === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => update("receptionistType", t.value)}
                      className={cn(
                        "rounded-lg border px-2 py-2.5 text-xs sm:text-sm font-medium transition-colors text-center",
                        active
                          ? "border-transparent gradient-primary text-primary-foreground shadow-glow"
                          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
                      )}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="border-t border-border" />

            {/* Inkluderte minutter per måned */}
            <section>
              {config.receptionistType === "ai" && (
                <MinutesSlider
                  title="Inkluderte AI-minutter per måned"
                  value={config.aiMinutes}
                  min={PRICING.minutes.ai.sliderMin}
                  max={PRICING.minutes.ai.sliderMax}
                  step={PRICING.minutes.ai.step}
                  included={PRICING.minutes.ai.includedMinutes}
                  extraPerMinute={PRICING.minutes.ai.extraPerMinute}
                  basePrice={PRICING.minutes.ai.basePrice}
                  onChange={(v) => update("aiMinutes", v)}
                />
              )}
              {config.receptionistType === "fysisk" && (
                <MinutesSlider
                  title="Inkluderte minutter per måned"
                  value={config.fysiskMinutes}
                  min={PRICING.minutes.fysisk.sliderMin}
                  max={PRICING.minutes.fysisk.sliderMax}
                  step={PRICING.minutes.fysisk.step}
                  included={PRICING.minutes.fysisk.includedMinutes}
                  extraPerMinute={PRICING.minutes.fysisk.extraPerMinute}
                  basePrice={PRICING.minutes.fysisk.basePrice}
                  onChange={(v) => update("fysiskMinutes", v)}
                />
              )}
              {config.receptionistType === "kombi" && (
                <div className="space-y-5">
                  <MinutesSlider
                    title="Inkluderte fysiske minutter per måned"
                    value={config.fysiskMinutes}
                    min={PRICING.minutes.kombi.fysiskSliderMin}
                    max={PRICING.minutes.kombi.fysiskSliderMax}
                    step={PRICING.minutes.kombi.step}
                    included={PRICING.minutes.kombi.includedFysiskMinutes}
                    extraPerMinute={PRICING.minutes.kombi.extraFysiskPerMinute}
                    basePrice={PRICING.minutes.kombi.basePrice}
                    basePriceLabel="i kombi-pakken"
                    onChange={(v) => update("fysiskMinutes", v)}
                  />
                  <MinutesSlider
                    title="Inkluderte AI-minutter per måned"
                    value={config.aiMinutes}
                    min={PRICING.minutes.kombi.aiSliderMin}
                    max={PRICING.minutes.kombi.aiSliderMax}
                    step={PRICING.minutes.kombi.step}
                    included={PRICING.minutes.kombi.includedAiMinutes}
                    extraPerMinute={PRICING.minutes.kombi.extraAiPerMinute}
                    basePrice={PRICING.minutes.kombi.basePrice}
                    basePriceLabel="i kombi-pakken"
                    onChange={(v) => update("aiMinutes", v)}
                  />
                </div>
              )}
            </section>

            <div className="border-t border-border" />

            {/* Åpningstider */}
            <section>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-medium text-foreground">Åpningstider per dag</Label>
                  <InfoTip title="Åpningstider per dag" text={PRICING.descriptions.hours} />
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-foreground tabular-nums">
                    {result.maxWeekdayHours} t/dag (maks)
                  </div>
                  {extraHours > 0 && !result.weekdayOutOfRange && (
                    <div className="text-xs text-muted-foreground">
                      +{formatKr(extraHours * PRICING.extraHourPrice)}/mnd
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3 mb-3">
                <div className="text-sm text-foreground">
                  Bruk samme åpningstid mandag–fredag
                </div>
                <Switch
                  checked={sameForAll}
                  onCheckedChange={(v) => {
                    setSameForAll(v);
                    if (v) setAllWeekdays({ start: monHours.start, end: monHours.end });
                  }}
                  aria-label="Bruk samme åpningstid mandag til fredag"
                />
              </div>

              {sameForAll ? (
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <Select
                    value={String(monHours.start)}
                    onValueChange={(v) => setAllWeekdays({ start: Number(v) })}
                  >
                    <SelectTrigger className="h-10"><SelectValue>{formatHour(monHours.start)}</SelectValue></SelectTrigger>
                    <SelectContent>
                      {startOptions.map((h) => (
                        <SelectItem key={h} value={String(h)}>{formatHour(h)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground">–</span>
                  <Select
                    value={String(monHours.end)}
                    onValueChange={(v) => setAllWeekdays({ end: Number(v) })}
                  >
                    <SelectTrigger className="h-10"><SelectValue>{formatHour(monHours.end)}</SelectValue></SelectTrigger>
                    <SelectContent>
                      {endOptions.filter((h) => h > monHours.start).map((h) => (
                        <SelectItem key={h} value={String(h)}>{formatHour(h)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="space-y-2">
                  {WEEKDAYS.map((d) => {
                    const dh = config.weekdayHours[d.value];
                    return (
                      <div key={d.value} className="grid grid-cols-[80px_1fr_auto_1fr] items-center gap-2">
                        <div className="text-sm text-foreground">{d.label}</div>
                        <Select value={String(dh.start)} onValueChange={(v) => setDayHours(d.value, { start: Number(v) })}>
                          <SelectTrigger className="h-10"><SelectValue>{formatHour(dh.start)}</SelectValue></SelectTrigger>
                          <SelectContent>
                            {startOptions.map((h) => (
                              <SelectItem key={h} value={String(h)}>{formatHour(h)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-muted-foreground">–</span>
                        <Select value={String(dh.end)} onValueChange={(v) => setDayHours(d.value, { end: Number(v) })}>
                          <SelectTrigger className="h-10"><SelectValue>{formatHour(dh.end)}</SelectValue></SelectTrigger>
                          <SelectContent>
                            {endOptions.filter((h) => h > dh.start).map((h) => (
                              <SelectItem key={h} value={String(h)}>{formatHour(h)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-2">
                Innenfor 08:00–17:00 er inntil 8 t/dag inkludert. Utvidet åpningstid (opptil 9 t) koster
                {" "}{formatKr(PRICING.extraHourPrice)}/t/mnd.
              </p>

              {/* Helgeåpent */}
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                <Checkbox
                  id="helgeapent"
                  checked={weekendsOpen}
                  onCheckedChange={(v) => setWeekendsOpen(!!v)}
                  className="mt-0.5"
                />
                <label htmlFor="helgeapent" className="text-sm text-foreground cursor-pointer leading-snug">
                  Har du også åpent i helger?
                </label>
              </div>

              {weekendsOpen && (
                <>
                  {/* Lørdag */}
                  <div className="mt-3">
                    <ToggleService
                      icon={CalendarDays}
                      title="Lørdagsåpent (09:00–15:00)"
                      desc="Vi svarer kundene dine også på lørdager"
                      info={PRICING.descriptions.saturday}
                      price={PRICING.openingHours.saturday.price}
                      checked={config.saturday}
                      onChange={(v) => update("saturday", v)}
                    />
                  </div>

                  {/* Søndag / 24-7 info */}
                  <div className="mt-3 rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                    <div className="font-medium text-foreground mb-1">Søndag og 24/7</div>
                    <p className="leading-relaxed">
                      Søndagsåpent og full 24/7-tilgjengelighet leveres kun på forespørsel.
                      Ta kontakt så finner vi en løsning som passer deg.
                    </p>
                    <Button asChild variant="link" className="h-auto p-0 mt-1">
                      <a href="#kontakt">Ta kontakt →</a>
                    </Button>
                  </div>
                </>
              )}

              {/* Out-of-range warning */}
              {result.weekdayOutOfRange && (
                <div className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-1">
                        Ønsket åpningstid er utenfor 08:00–17:00
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Tider utenfor dette intervallet leveres på forespørsel. Ta direkte kontakt
                        så lager vi et tilpasset tilbud.
                      </p>
                      <Button asChild variant="link" className="h-auto p-0 mt-1 text-destructive">
                        <a href="#kontakt">Ta kontakt →</a>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <div className="border-t border-border" />

            {/* Tjenester */}
            <section>
              <Label className="text-sm font-medium text-foreground">Tjenester</Label>
              <div className="mt-2 space-y-2">
                <TieredService
                  icon={Mail}
                  title={PRICING.email.label}
                  info={PRICING.descriptions.email}
                  value={config.email}
                  options={PRICING.email.options}
                  onChange={(v) => update("email", v)}
                />
                <TieredService
                  icon={MessageSquare}
                  title={PRICING.sms.label}
                  info={PRICING.descriptions.sms}
                  value={config.sms}
                  options={PRICING.sms.options}
                  onChange={(v) => update("sms", v)}
                />
                <TieredService
                  icon={MessagesSquare}
                  title={PRICING.social.label}
                  info={PRICING.descriptions.social}
                  value={config.social}
                  options={PRICING.social.options}
                  onChange={(v) => update("social", v)}
                  platforms={SOCIAL_PLATFORMS}
                  selectedPlatforms={config.socialPlatforms}
                  onPlatformsChange={(v) => update("socialPlatforms", v)}
                />
                <TieredService
                  icon={Send}
                  title={PRICING.socialPosts.label}
                  info={PRICING.descriptions.socialPosts}
                  value={config.socialPosts}
                  options={PRICING.socialPosts.options}
                  onChange={(v) => update("socialPosts", v)}
                  platforms={SOCIAL_PLATFORMS}
                  selectedPlatforms={config.socialPostsPlatforms}
                  onPlatformsChange={(v) => update("socialPostsPlatforms", v)}
                  optionLabel={(o) =>
                    o.value === 0
                      ? o.label
                      : `${o.label} · ${formatKr(o.value * PRICING.socialPosts.pricePerPostPerPlatform)} per plattform/mnd`
                  }
                  currentSubtitle={(() => {
                    const platformCount = Math.max(1, config.socialPostsPlatforms.length);
                    const amount =
                      config.socialPosts * PRICING.socialPosts.pricePerPostPerPlatform * platformCount;
                    const platformText =
                      platformCount === 1 ? "1 plattform" : `${platformCount} plattformer`;
                    return `${config.socialPosts} innlegg × ${platformText} · +${formatKr(amount)}/mnd`;
                  })()}
                />
                <ToggleService
                  icon={Mic}
                  title="Lydopptak av samtaler"
                  desc="For kvalitetssikring og dokumentasjon"
                  info={PRICING.descriptions.recording}
                  price={PRICING.recording.price}
                  checked={config.recording}
                  onChange={(v) => update("recording", v)}
                />
                <ToggleService
                  icon={PhoneForwarded}
                  title="Samtaleoverføring"
                  desc="Send viktige samtaler videre til riktig person"
                  info={PRICING.descriptions.forwarding}
                  price={PRICING.forwarding.price}
                  checked={config.forwarding}
                  onChange={(v) => update("forwarding", v)}
                />
                <ToggleService
                  icon={Zap}
                  title="AI utenom åpningstid (24/7)"
                  desc="Vi svarer kundene dine døgnet rundt"
                  info={PRICING.descriptions.ai247}
                  price={PRICING.ai247.price}
                  checked={config.ai247}
                  onChange={(v) => update("ai247", v)}
                />
                <ToggleService
                  icon={PhoneCall}
                  title="AirCall lisens"
                  desc="Egen bruker med statistikk og samtalelogg"
                  info={PRICING.descriptions.aircall}
                  price={PRICING.aircall.price}
                  checked={config.aircall}
                  onChange={(v) => update("aircall", v)}
                />
                <QuantityService
                  icon={Calendar}
                  title={PRICING.appointmentBooking.label}
                  desc={`${PRICING.appointmentBooking.pricePerUnit} kr per system`}
                  info={PRICING.descriptions.appointmentBooking}
                  value={config.appointmentBookingSystems}
                  pricePerUnit={PRICING.appointmentBooking.pricePerUnit}
                  unitLabel={PRICING.appointmentBooking.unitLabel}
                  unitLabelPlural={PRICING.appointmentBooking.unitLabelPlural}
                  min={PRICING.appointmentBooking.sliderMin}
                  max={PRICING.appointmentBooking.sliderMax}
                  step={PRICING.appointmentBooking.step}
                  onChange={(v) => update("appointmentBookingSystems", v)}
                />
                <QuantityService
                  icon={Database}
                  title={PRICING.crmUpdate.label}
                  desc={`${PRICING.crmUpdate.pricePerUnit} kr per ${PRICING.crmUpdate.unitLabel}`}
                  info={PRICING.descriptions.crmUpdate}
                  value={config.crmUpdates}
                  pricePerUnit={PRICING.crmUpdate.pricePerUnit}
                  unitLabel={PRICING.crmUpdate.unitLabel}
                  unitLabelPlural={PRICING.crmUpdate.unitLabelPlural}
                  min={PRICING.crmUpdate.sliderMin}
                  max={PRICING.crmUpdate.sliderMax}
                  step={PRICING.crmUpdate.step}
                  onChange={(v) => update("crmUpdates", v)}
                />
                <QuantityService
                  icon={Bot}
                  title={PRICING.aiSms.label}
                  desc={`${PRICING.aiSms.pricePerUnit} kr per SMS`}
                  info={PRICING.descriptions.aiSms}
                  value={config.aiSmsCount}
                  pricePerUnit={PRICING.aiSms.pricePerUnit}
                  unitLabel={PRICING.aiSms.unitLabel}
                  unitLabelPlural={PRICING.aiSms.unitLabelPlural}
                  min={PRICING.aiSms.sliderMin}
                  max={PRICING.aiSms.sliderMax}
                  step={PRICING.aiSms.step}
                  onChange={(v) => update("aiSmsCount", v)}
                />
                <QuantityService
                  icon={Bot}
                  title={PRICING.aiEmail.label}
                  desc={`${PRICING.aiEmail.pricePerUnit} kr per e-post`}
                  info={PRICING.descriptions.aiEmail}
                  value={config.aiEmailCount}
                  pricePerUnit={PRICING.aiEmail.pricePerUnit}
                  unitLabel={PRICING.aiEmail.unitLabel}
                  unitLabelPlural={PRICING.aiEmail.unitLabelPlural}
                  min={PRICING.aiEmail.sliderMin}
                  max={PRICING.aiEmail.sliderMax}
                  step={PRICING.aiEmail.step}
                  onChange={(v) => update("aiEmailCount", v)}
                />
                <QuantityService
                  icon={CalendarPlus}
                  title={PRICING.outboundBooking.label}
                  desc={`${PRICING.outboundBooking.pricePerUnit} kr per time`}
                  info={PRICING.descriptions.outboundBooking}
                  value={config.outboundBookingHours}
                  pricePerUnit={PRICING.outboundBooking.pricePerUnit}
                  unitLabel={PRICING.outboundBooking.unitLabel}
                  unitLabelPlural={PRICING.outboundBooking.unitLabelPlural}
                  min={PRICING.outboundBooking.sliderMin}
                  max={PRICING.outboundBooking.sliderMax}
                  step={PRICING.outboundBooking.step}
                  onChange={(v) => update("outboundBookingHours", v)}
                />
                <QuantityService
                  icon={ClipboardList}
                  title={PRICING.adminTasks.label}
                  desc={`${PRICING.adminTasks.pricePerUnit} kr per time`}
                  info={PRICING.descriptions.adminTasks}
                  value={config.adminTaskHours}
                  pricePerUnit={PRICING.adminTasks.pricePerUnit}
                  unitLabel={PRICING.adminTasks.unitLabel}
                  unitLabelPlural={PRICING.adminTasks.unitLabelPlural}
                  min={PRICING.adminTasks.sliderMin}
                  max={PRICING.adminTasks.sliderMax}
                  step={PRICING.adminTasks.step}
                  onChange={(v) => update("adminTaskHours", v)}
                />
                <div
                  className={cn(
                    "rounded-lg border bg-background p-3 transition-colors",
                    config.vacationCover ? "border-success bg-success/10" : "border-border hover:border-primary/40",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          config.vacationCover ? "bg-success" : "bg-muted",
                        )}
                      >
                        <Plane className={cn("w-4 h-4", config.vacationCover ? "text-success-foreground" : "text-muted-foreground")} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <div className="text-sm font-medium text-foreground">{PRICING.vacationCover.label}</div>
                          <InfoTip title={PRICING.vacationCover.label} text={PRICING.descriptions.vacationCover} />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {config.vacationCover
                            ? `${formatKr(PRICING.vacationCover.basePrice)}/mnd inkl. ${PRICING.vacationCover.includedMinutes} min`
                            : `Inkluderer ${PRICING.vacationCover.includedMinutes} min, deretter ${PRICING.vacationCover.extraPerMinute} kr/min`}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Switch
                        checked={config.vacationCover}
                        onCheckedChange={(v) => update("vacationCover", v)}
                        aria-label={PRICING.vacationCover.label}
                      />
                    </div>
                  </div>
                  {config.vacationCover && (
                    <div className="mt-3 pl-12">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-xs text-muted-foreground">Forventet bruk per måned</span>
                        <span className="text-sm font-semibold text-foreground tabular-nums">
                          {config.vacationMinutes} min
                        </span>
                      </div>
                      <Slider
                        min={PRICING.vacationCover.sliderMin}
                        max={PRICING.vacationCover.sliderMax}
                        step={PRICING.vacationCover.step}
                        value={[config.vacationMinutes]}
                        onValueChange={([v]) => update("vacationMinutes", v)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                        <span>{PRICING.vacationCover.includedMinutes} min (inkludert)</span>
                        <span>{PRICING.vacationCover.sliderMax} min</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Ekstra minutter: {PRICING.vacationCover.extraPerMinute} kr per minutt
                      </div>
                    </div>
                  )}
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <div className="text-sm font-medium text-foreground">Livechat på nettsiden</div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Leveres kun på forespørsel. Ta kontakt så finner vi en løsning som passer deg.
                  </p>
                  <Button asChild variant="link" className="h-auto p-0 mt-1 text-xs">
                    <a href="#kontakt">Ta kontakt →</a>
                  </Button>
                </div>
              </div>
            </section>

            <div className="border-t border-border" />

            {/* Bindingstid */}
            <section>
              <div className="flex items-center gap-1.5 mb-2">
                <Label className="text-sm font-medium text-foreground">Bindingstid</Label>
                <InfoTip title="Bindingstid" text={PRICING.descriptions.contract} />
              </div>
              <Select
                value={String(config.contractMonths)}
                onValueChange={(v) => update("contractMonths", Number(v))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue>
                    {(() => {
                      const c = PRICING.contracts.find((x) => x.months === config.contractMonths)!;
                      return (
                        <span className="flex items-center gap-2">
                          <span className="font-medium">{c.label}</span>
                          {c.discount > 0 && (
                            <span className="text-xs text-muted-foreground">
                              −{Math.round(c.discount * 100)} % rabatt
                            </span>
                          )}
                        </span>
                      );
                    })()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {PRICING.contracts.map((c) => (
                    <SelectItem key={c.months} value={String(c.months)}>
                      {c.label}
                      {c.discount > 0 ? ` · −${Math.round(c.discount * 100)} % rabatt` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>
          </div>

          {/* Oppsummering */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-24 rounded-2xl gradient-primary text-primary-foreground p-6 shadow-glow"
          >
            <div className="flex items-center gap-2 text-sm font-medium opacity-90">
              <Sparkles className="w-4 h-4" /> Din pakke
            </div>

            <div className="mt-3 flex items-start justify-between gap-3 text-sm border-b border-primary-foreground/20 pb-3">
              <span className="opacity-95">Oppstartskostnad og implementering</span>
              <span className="font-semibold tabular-nums whitespace-nowrap">{formatKr(result.startupCost)} engangssum</span>
            </div>

            <ul className="mt-3 space-y-1.5 text-sm">
              {result.lines.map((line) => (
                <li key={line.label} className="flex items-start justify-between gap-3">
                  <span className="opacity-95">{line.label}</span>
                  <span className="font-semibold tabular-nums whitespace-nowrap">
                    {formatKr(line.amount)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-primary-foreground/20 space-y-1 text-sm">
              <div className="flex justify-between opacity-90">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatKr(result.subtotal)}/mnd</span>
              </div>
              {result.discountRate > 0 && (
                <div className="flex justify-between opacity-90">
                  <span>Bindingsrabatt ({Math.round(result.discountRate * 100)} %)</span>
                  <span className="tabular-nums">−{formatKr(result.discountAmount)}/mnd</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-primary-foreground/20">
              <div className="text-xs uppercase tracking-wider opacity-80">Din månedspris</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold tabular-nums">{formatKr(result.monthly)}</span>
                <span className="text-sm opacity-90">/mnd</span>
              </div>
              <div className="text-xs opacity-80 mt-1.5">
                Total over {result.contractMonths} mnd:{" "}
                <span className="font-semibold">{formatKr(result.contractTotal)}</span>
              </div>
            </div>

            <Button
              asChild
              variant="hero-outline"
              size="xl"
              className="mt-5 w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href="#kontakt" onClick={captureSnapshot}>
                Book gratis demo
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="mt-2 w-full bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="tel:+4797251000" aria-label="Ring oss">
                Ring oss
              </a>
            </Button>
            <p className="text-[11px] opacity-75 text-center mt-2">
              Eks. mva. Oppstartskostnad {formatKr(result.startupCost)} engangssum.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
