import { useMemo, useState } from "react";
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
  calculatePrice,
  defaultConfig,
  formatKr,
  type PricingConfig,
  type SocialPlatform,
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
}: {
  icon: typeof Mic;
  title: string;
  desc: string;
  info?: string;
  price: number;
  priceText?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div
    className={cn(
      "flex items-center justify-between gap-4 rounded-lg border bg-background p-3 transition-colors",
      checked ? "border-success bg-success/10" : "border-border hover:border-primary/40",
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
      <Switch checked={checked} onCheckedChange={onChange} aria-label={title} />
    </div>
  </div>
);

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
              {active ? `${current.label} · +${formatKr(current.price)}/mnd` : "Ikke inkludert"}
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
                  {optionRowLabel(o)}
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
  const result = useMemo(() => calculatePrice(config), [config]);
  const { setSnapshot } = useCalculatorSnapshot();

  const update = <K extends keyof PricingConfig>(key: K, value: PricingConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const extraHours = Math.max(0, config.hours - PRICING.baseHours);

  const captureSnapshot = () => {
    const recType = RECEPTIONIST_TYPES.find((t) => t.value === config.receptionistType)!;
    const summary = [
      `Resepsjonist-type: ${recType.label}`,
      `Pakke: ${formatKr(result.monthly)}/mnd (${result.contractMonths} mnd binding)`,
      `Åpningstider: ${config.hours} t/dag`,
      ...result.lines.map((l) => `${l.label}: ${formatKr(l.amount)}`),
      config.social > 0 && config.socialPlatforms.length > 0
        ? `Meldinger – plattformer: ${config.socialPlatforms.join(", ")}`
        : null,
      config.socialPosts > 0 && config.socialPostsPlatforms.length > 0
        ? `Innlegg – plattformer: ${config.socialPostsPlatforms.join(", ")}`
        : null,
      result.discountRate > 0
        ? `Bindingsrabatt: −${Math.round(result.discountRate * 100)} %`
        : null,
      `Total over ${result.contractMonths} mnd: ${formatKr(result.contractTotal)}`,
    ]
      .filter(Boolean)
      .join("\n");

    setSnapshot({
      source: "pricing",
      summary,
      data: {
        config,
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
                          ? "border-primary bg-primary/10 text-foreground"
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

            {/* Åpningstider */}
            <section>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-medium text-foreground">Åpningstider per dag</Label>
                  <InfoTip title="Åpningstider per dag" text={PRICING.descriptions.hours} />
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-foreground tabular-nums">{config.hours} timer</div>
                  {extraHours > 0 && (
                    <div className="text-xs text-muted-foreground">
                      +{formatKr(extraHours * PRICING.extraHourPrice)}/mnd
                    </div>
                  )}
                </div>
              </div>
              <Slider
                min={PRICING.hoursMin}
                max={PRICING.hoursMax}
                step={1}
                value={[config.hours]}
                onValueChange={([v]) => update("hours", v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                <span>8 t (inkludert)</span>
                <span>24 t</span>
              </div>
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
                  price={0}
                  priceText="Pris på forespørsel"
                  checked={config.aircall}
                  onChange={(v) => update("aircall", v)}
                />
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
              Eks. mva. Ingen oppstartskostnad.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
