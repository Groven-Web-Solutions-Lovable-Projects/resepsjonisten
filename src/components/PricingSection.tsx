import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Clock, Mail, MessageSquare, Share2, Mic, PhoneForwarded, Zap } from "lucide-react";
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
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
    {options.map((opt) => {
      const active = opt.value === value;
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value as T)}
          className={cn(
            "rounded-lg border px-3 py-2 text-sm text-left transition-all",
            active
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border bg-card hover:border-primary/40",
          )}
        >
          <div className="font-semibold text-foreground">{opt.label}</div>
          <div className="text-xs text-muted-foreground">
            {opt.price === 0 ? "Inkludert" : `+${formatKr(opt.price)}/mnd`}
          </div>
        </button>
      );
    })}
  </div>
);

const ToggleRow = ({
  icon: Icon,
  title,
  desc,
  price,
  checked,
  onChange,
}: {
  icon: typeof Mic;
  title: string;
  desc: string;
  price: number;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <div className="font-semibold text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
        <div className="text-xs font-medium text-primary mt-1">+{formatKr(price)}/mnd</div>
      </div>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

const PricingSection = () => {
  const [config, setConfig] = useState<PricingConfig>(defaultConfig);
  const result = useMemo(() => calculatePrice(config), [config]);

  const update = <K extends keyof PricingConfig>(key: K, value: PricingConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  return (
    <section id="priser" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Bygg din egen <span className="gradient-text">pakke</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Velg det du trenger og se prisen oppdatere seg i sanntid. Du betaler bare for det du faktisk bruker.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8 items-start">
          {/* Konfigurator */}
          <div className="lg:col-span-3 space-y-6">
            {/* Åpningstider */}
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <Label className="text-base font-semibold">Åpningstider per dag</Label>
                    <div className="text-xs text-muted-foreground">
                      8 t inkludert, deretter +{formatKr(PRICING.extraHourPrice)}/mnd per time
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground tabular-nums">{config.hours} t</div>
              </div>
              <Slider
                min={PRICING.hoursMin}
                max={PRICING.hoursMax}
                step={1}
                value={[config.hours]}
                onValueChange={([v]) => update("hours", v)}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{PRICING.hoursMin} t</span>
                <span>{PRICING.hoursMax} t</span>
              </div>
            </div>

            {/* E-post */}
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <Label className="text-base font-semibold">{PRICING.email.label}</Label>
              </div>
              <OptionGroup
                value={config.email}
                options={PRICING.email.options}
                onChange={(v) => update("email", v)}
              />
            </div>

            {/* SMS */}
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary-foreground" />
                </div>
                <Label className="text-base font-semibold">{PRICING.sms.label}</Label>
              </div>
              <OptionGroup
                value={config.sms}
                options={PRICING.sms.options}
                onChange={(v) => update("sms", v)}
              />
            </div>

            {/* Sosiale medier */}
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <Label className="text-base font-semibold">{PRICING.social.label}</Label>
                  <div className="text-xs text-muted-foreground">{PRICING.social.helper}</div>
                </div>
              </div>
              <OptionGroup
                value={config.social}
                options={PRICING.social.options}
                onChange={(v) => update("social", v)}
              />
            </div>

            {/* Tilleggsvalg */}
            <div className="grid sm:grid-cols-1 gap-3">
              <ToggleRow
                icon={Mic}
                title={PRICING.recording.label}
                desc="Alle samtaler kan tas opp for kvalitet og dokumentasjon."
                price={PRICING.recording.price}
                checked={config.recording}
                onChange={(v) => update("recording", v)}
              />
              <ToggleRow
                icon={PhoneForwarded}
                title={PRICING.forwarding.label}
                desc="Viktige samtaler sendes direkte til riktig person."
                price={PRICING.forwarding.price}
                checked={config.forwarding}
                onChange={(v) => update("forwarding", v)}
              />
              <ToggleRow
                icon={Zap}
                title={PRICING.ai247.label}
                desc="Vi er tilgjengelig 24/7, også når kontoret er stengt."
                price={PRICING.ai247.price}
                checked={config.ai247}
                onChange={(v) => update("ai247", v)}
              />
            </div>

            {/* Bindingstid */}
            <div className="rounded-xl border border-border bg-background p-6">
              <Label className="text-base font-semibold">Bindingstid</Label>
              <div className="text-xs text-muted-foreground mb-4">Lengre binding gir høyere rabatt</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRICING.contracts.map((c) => {
                  const active = c.months === config.contractMonths;
                  return (
                    <button
                      key={c.months}
                      type="button"
                      onClick={() => update("contractMonths", c.months)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm transition-all",
                        active
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-card hover:border-primary/40",
                      )}
                    >
                      <div className="font-semibold text-foreground">{c.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.discount === 0 ? "Ingen rabatt" : `−${Math.round(c.discount * 100)} %`}
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
            className="lg:col-span-2 lg:sticky lg:top-24 rounded-2xl gradient-primary text-primary-foreground p-6 shadow-glow"
          >
            <div className="flex items-center gap-2 text-sm font-medium opacity-90">
              <Sparkles className="w-4 h-4" /> Din pakke
            </div>

            <ul className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
              {result.lines.map((line) => (
                <li
                  key={line.label}
                  className="flex items-start justify-between gap-3 text-sm border-b border-primary-foreground/15 pb-2 last:border-0"
                >
                  <span className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 opacity-90" />
                    <span className="opacity-95">{line.label}</span>
                  </span>
                  <span className="font-semibold tabular-nums whitespace-nowrap">
                    {formatKr(line.amount)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-1 text-sm">
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

            <div className="mt-5 pt-5 border-t border-primary-foreground/20">
              <div className="text-xs uppercase tracking-wider opacity-80">Din månedspris</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-bold tabular-nums">{formatKr(result.monthly)}</span>
                <span className="text-sm opacity-90">/mnd</span>
              </div>
              <div className="text-xs opacity-80 mt-2">
                Total kontraktsverdi over {result.contractMonths} mnd:{" "}
                <span className="font-semibold">{formatKr(result.contractTotal)}</span>
              </div>
            </div>

            <Button asChild variant="hero-outline" className="mt-6 w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="#kontakt">Book gratis demo</a>
            </Button>
            <p className="text-[11px] opacity-75 text-center mt-3">
              Alle priser er eks. mva. Ingen oppstartskostnad.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;