import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mic, PhoneForwarded, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  calculatePrice,
  defaultConfig,
  formatKr,
  type PricingConfig,
} from "@/lib/pricing";

type NumberOption = { value: number; label: string; price: number };

const formatOption = (o: NumberOption) =>
  `${o.label}${o.price > 0 ? ` · +${formatKr(o.price)}/mnd` : " · inkludert"}`;

const SelectField = ({
  label,
  value,
  options,
  onChange,
  helper,
}: {
  label: string;
  value: number;
  options: readonly NumberOption[];
  onChange: (v: number) => void;
  helper?: string;
}) => (
  <div className="space-y-1.5">
    <div className="flex items-baseline justify-between gap-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      {helper && <span className="text-xs text-muted-foreground">{helper}</span>}
    </div>
    <Select value={String(value)} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger className="h-11">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={String(o.value)}>
            {formatOption(o)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const InlineToggle = ({
  icon: Icon,
  title,
  price,
  checked,
  onChange,
}: {
  icon: typeof Mic;
  title: string;
  price: number;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label
    className={cn(
      "flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-2.5 cursor-pointer transition-colors",
      checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
    )}
  >
    <div className="flex items-center gap-2.5 min-w-0">
      <Icon className="w-4 h-4 text-primary shrink-0" />
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground truncate">{title}</div>
        <div className="text-xs text-muted-foreground">+{formatKr(price)}/mnd</div>
      </div>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </label>
);

const PricingSection = () => {
  const [config, setConfig] = useState<PricingConfig>(defaultConfig);
  const result = useMemo(() => calculatePrice(config), [config]);

  const update = <K extends keyof PricingConfig>(key: K, value: PricingConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

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
          <div className="lg:col-span-3 rounded-2xl border border-border bg-background p-5 sm:p-6 space-y-5">
            {/* Åpningstider – slider */}
            <div>
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <Label className="text-sm font-medium text-foreground">Åpningstider per dag</Label>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {config.hours} t {config.hours > PRICING.baseHours && (
                    <span className="text-xs font-normal text-muted-foreground">
                      · +{formatKr((config.hours - PRICING.baseHours) * PRICING.extraHourPrice)}/mnd
                    </span>
                  )}
                </span>
              </div>
              <Slider
                min={PRICING.hoursMin}
                max={PRICING.hoursMax}
                step={1}
                value={[config.hours]}
                onValueChange={([v]) => update("hours", v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                <span>{PRICING.hoursMin} t</span>
                <span>{PRICING.hoursMax} t</span>
              </div>
            </div>

            {/* Dropdowns – 2 kolonner på sm+ */}
            <div className="grid sm:grid-cols-2 gap-4">
              <SelectField
                label={PRICING.email.label}
                value={config.email}
                options={PRICING.email.options}
                onChange={(v) => update("email", v)}
              />
              <SelectField
                label={PRICING.sms.label}
                value={config.sms}
                options={PRICING.sms.options}
                onChange={(v) => update("sms", v)}
              />
              <SelectField
                label={PRICING.social.label}
                helper={PRICING.social.helper}
                value={config.social}
                options={PRICING.social.options}
                onChange={(v) => update("social", v)}
              />
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">Bindingstid</Label>
                <Select
                  value={String(config.contractMonths)}
                  onValueChange={(v) => update("contractMonths", Number(v))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRICING.contracts.map((c) => (
                      <SelectItem key={c.months} value={String(c.months)}>
                        {c.label} {c.discount > 0 ? `· −${Math.round(c.discount * 100)} % rabatt` : "· ingen rabatt"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tilleggsvalg */}
            <div>
              <Label className="text-sm font-medium text-foreground">Tilleggstjenester</Label>
              <div className="mt-2 grid sm:grid-cols-3 gap-2">
                <InlineToggle
                  icon={Mic}
                  title="Lydopptak"
                  price={PRICING.recording.price}
                  checked={config.recording}
                  onChange={(v) => update("recording", v)}
                />
                <InlineToggle
                  icon={PhoneForwarded}
                  title="Samtaleoverføring"
                  price={PRICING.forwarding.price}
                  checked={config.forwarding}
                  onChange={(v) => update("forwarding", v)}
                />
                <InlineToggle
                  icon={Zap}
                  title="AI 24/7"
                  price={PRICING.ai247.price}
                  checked={config.ai247}
                  onChange={(v) => update("ai247", v)}
                />
              </div>
            </div>
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
                <li
                  key={line.label}
                  className="flex items-start justify-between gap-3"
                >
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
              className="mt-5 w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href="#kontakt">Book gratis demo</a>
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