import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, Mail, MessageSquare, Share2, Mic, PhoneForwarded, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  PRICING,
  calculatePrice,
  defaultConfig,
  formatKr,
  type PricingConfig,
} from "@/lib/pricing";

type OptionGroupProps<T extends number> = {
  value: T;
  options: readonly { value: number; label: string; price: number }[];
  onChange: (v: T) => void;
};

const OptionGroup = <T extends number>({ value, options, onChange }: OptionGroupProps<T>) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
    {options.map((opt) => {
      const active = opt.value === value;
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value as T)}
          className={cn(
            "rounded-md border px-2.5 py-1.5 text-xs text-left transition-all",
            active
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border bg-card hover:border-primary/40",
          )}
        >
          <div className="font-semibold text-foreground leading-tight">{opt.label}</div>
          <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
            {opt.price === 0 ? "Inkl." : `+${formatKr(opt.price)}`}
          </div>
        </button>
      );
    })}
  </div>
);

const ToggleRow = ({
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
  <label className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 cursor-pointer hover:border-primary/40 transition-colors">
    <div className="flex items-center gap-2.5 min-w-0">
      <Icon className="w-4 h-4 text-primary shrink-0" />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">{title}</div>
        <div className="text-[11px] text-muted-foreground">+{formatKr(price)}/mnd</div>
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
    <section id="priser" className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Bygg din egen <span className="gradient-text">pakke</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Velg det du trenger og se prisen oppdatere seg i sanntid. Du betaler bare for det du faktisk bruker.
          </p>
        </motion.div>

        <div className="mt-8 grid lg:grid-cols-5 gap-6 items-start">
          {/* Konfigurator */}
          <div className="lg:col-span-3 space-y-3">
            {/* Åpningstider */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">Åpningstider per dag</Label>
                </div>
                <div className="text-base font-bold text-foreground tabular-nums">{config.hours} t</div>
              </div>
              <Slider
                min={PRICING.hoursMin}
                max={PRICING.hoursMax}
                step={1}
                value={[config.hours]}
                onValueChange={([v]) => update("hours", v)}
              />
              <div className="text-[11px] text-muted-foreground mt-1.5">
                8 t inkludert, deretter +{formatKr(PRICING.extraHourPrice)}/mnd per time
              </div>
            </div>

            {/* E-post */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-primary" />
                <Label className="text-sm font-semibold">{PRICING.email.label}</Label>
              </div>
              <OptionGroup
                value={config.email}
                options={PRICING.email.options}
                onChange={(v) => update("email", v)}
              />
            </div>

            {/* SMS */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <Label className="text-sm font-semibold">{PRICING.sms.label}</Label>
              </div>
              <OptionGroup
                value={config.sms}
                options={PRICING.sms.options}
                onChange={(v) => update("sms", v)}
              />
            </div>

            {/* Sosiale medier */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold">{PRICING.social.label}</Label>
                </div>
                <span className="text-[11px] text-muted-foreground">{PRICING.social.helper}</span>
              </div>
              <OptionGroup
                value={config.social}
                options={PRICING.social.options}
                onChange={(v) => update("social", v)}
              />
            </div>

            {/* Tilleggsvalg */}
            <div className="grid sm:grid-cols-3 gap-2">
              <ToggleRow
                icon={Mic}
                title={PRICING.recording.label}
                price={PRICING.recording.price}
                checked={config.recording}
                onChange={(v) => update("recording", v)}
              />
              <ToggleRow
                icon={PhoneForwarded}
                title={PRICING.forwarding.label}
                price={PRICING.forwarding.price}
                checked={config.forwarding}
                onChange={(v) => update("forwarding", v)}
              />
              <ToggleRow
                icon={Zap}
                title="AI 24/7"
                price={PRICING.ai247.price}
                checked={config.ai247}
                onChange={(v) => update("ai247", v)}
              />
            </div>

            {/* Bindingstid */}
            <div className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Label className="text-sm font-semibold">Bindingstid</Label>
                <span className="text-[11px] text-muted-foreground">Lengre binding = høyere rabatt</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {PRICING.contracts.map((c) => {
                  const active = c.months === config.contractMonths;
                  return (
                    <button
                      key={c.months}
                      type="button"
                      onClick={() => update("contractMonths", c.months)}
                      className={cn(
                        "rounded-md border px-2 py-1.5 text-xs transition-all",
                        active
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-card hover:border-primary/40",
                      )}
                    >
                      <div className="font-semibold text-foreground leading-tight">{c.label}</div>
                      <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        {c.discount === 0 ? "0 %" : `−${Math.round(c.discount * 100)} %`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Oppsummering */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-24 rounded-xl gradient-primary text-primary-foreground p-5 shadow-glow"
          >
            <div className="flex items-center gap-2 text-xs font-medium opacity-90">
              <Sparkles className="w-3.5 h-3.5" /> Din pakke
            </div>

            <ul className="mt-3 space-y-1 max-h-48 overflow-y-auto pr-1">
              {result.lines.map((line) => (
                <li
                  key={line.label}
                  className="flex items-start justify-between gap-3 text-xs"
                >
                  <span className="opacity-95 truncate">{line.label}</span>
                  <span className="font-semibold tabular-nums whitespace-nowrap">
                    {formatKr(line.amount)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-3 pt-3 border-t border-primary-foreground/20 space-y-0.5 text-xs">
              <div className="flex justify-between opacity-90">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatKr(result.subtotal)}/mnd</span>
              </div>
              {result.discountRate > 0 && (
                <div className="flex justify-between opacity-90">
                  <span>Rabatt ({Math.round(result.discountRate * 100)} %)</span>
                  <span className="tabular-nums">−{formatKr(result.discountAmount)}/mnd</span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-primary-foreground/20">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] uppercase tracking-wider opacity-80">Månedspris</span>
                <div>
                  <span className="text-2xl font-bold tabular-nums">{formatKr(result.monthly)}</span>
                  <span className="text-xs opacity-90">/mnd</span>
                </div>
              </div>
              <div className="text-[11px] opacity-80 mt-1 text-right">
                Total {result.contractMonths} mnd: <span className="font-semibold">{formatKr(result.contractTotal)}</span>
              </div>
            </div>

            <Button asChild variant="hero-outline" className="mt-4 w-full h-10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="#kontakt">Book gratis demo</a>
            </Button>
            <p className="text-[10px] opacity-75 text-center mt-2">
              Eks. mva. Ingen oppstartskostnad.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;