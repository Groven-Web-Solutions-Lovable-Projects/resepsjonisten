// Sentralisert prislogikk for Resepsjonisten.no.

export const RECEPTIONIST_TYPES = [
  { value: "ai", label: "AI Resepsjonist", summaryLabel: "AI tjeneste" },
  { value: "fysisk", label: "Fysisk Resepsjonist", summaryLabel: "Fysisk Resepsjonist" },
  { value: "kombi", label: "Kombinasjon", summaryLabel: "Kombi (AI og fysisk resepsjonist)" },
] as const;

export type ReceptionistType = (typeof RECEPTIONIST_TYPES)[number]["value"];

export const SOCIAL_PLATFORMS = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]["value"];

export const PRICING = {
  extraHourPrice: 200,
  baseHours: 8,
  hoursMin: 8,
  hoursMax: 24,
  // Minutter inkludert per måned per resepsjonisttype
  minutes: {
    ai: {
      basePrice: 1490,
      includedMinutes: 100,
      extraPerMinute: 6.5,
      sliderMin: 100,
      sliderMax: 500,
      step: 10,
    },
    fysisk: {
      basePrice: 2990,
      includedMinutes: 150,
      extraPerMinute: 12,
      sliderMin: 150,
      sliderMax: 1000,
      step: 10,
    },
    kombi: {
      basePrice: 3990,
      includedAiMinutes: 100,
      includedFysiskMinutes: 150,
      extraAiPerMinute: 6.5,
      extraFysiskPerMinute: 12,
      aiSliderMin: 100,
      aiSliderMax: 500,
      fysiskSliderMin: 150,
      fysiskSliderMax: 1000,
      step: 10,
    },
  },
  descriptions: {
    receptionist:
      "Velg hvilken type resepsjonist du ønsker. AI Resepsjonist håndterer henvendelser automatisk. Fysisk Resepsjonist gir personlig oppfølging fra et menneske. Kombinasjon bruker AI som førstelinje og menneske ved behov.",
    minutes:
      "Velg hvor mange samtaleminutter du ønsker inkludert per måned. Bruker du mer enn det inkluderte, faktureres ekstra minutter til en fast pris per minutt.",
    hours:
      "Velg hvor mange timer per dag resepsjonisten skal være tilgjengelig. Standard kontortid er 8 timer (f.eks. 08:00–16:00). Pris justeres automatisk etter valgt åpningstid.",
    email:
      "Velg estimert antall e-poster vi skal besvare per måned. Vi leser, vurderer og besvarer henvendelsene profesjonelt slik at kundene dine får raske svar.",
    sms:
      "Velg estimert antall SMS vi skal håndtere per måned – både utgående (bekreftelser, påminnelser) og innkommende meldinger. 25 kr per SMS.",
    social:
      "Velg antall meldinger fra sosiale medier vi skal besvare per måned. Du velger selv hvilke plattformer det gjelder.",
    socialPosts:
      "Vi skriver teksten og publiserer innlegg på dine sosiale medier, gitt at du sender oss bilder. Vi tilpasser bildetekst, hashtags og publiseringstidspunkt. Pris: 29 kr per innlegg, per plattform.",
    recording:
      "Aktiver lydopptak av samtaler for kvalitetssikring og dokumentasjon. Alle opptak håndteres i tråd med GDPR.",
    forwarding:
      "Aktiver muligheten for å overføre viktige samtaler videre til riktig person i din virksomhet.",
    ai247:
      "Aktiver tilgjengelighet døgnet rundt – også på kvelder, netter, helger og helligdager.",
    phoneSubscription:
      "Telefonabonnement som følger med Fysisk Resepsjonist. Inkluderer linje og nødvendig oppsett.",
    aircall:
      "Ønsker du egen bruker i Aircall for å se dine egne statistikker, samt få tilgang til samtalelogg og relevant rapportering? Dette kan legges til som egen lisens etter behov.",
    contract:
      "Lengre bindingstid gir lavere månedspris:\n\n• 3 måneder: ingen rabatt\n• 6 måneder: 5 % rabatt\n• 12 måneder: 10 % rabatt\n• 24 måneder: 15 % rabatt",
  },
  email: {
    label: "E-post per måned",
    options: [
      { value: 0, label: "Ingen", price: 0 },
      { value: 25, label: "0–25 e-poster", price: 750 },
      { value: 50, label: "26–50 e-poster", price: 1500 },
      { value: 75, label: "51–75 e-poster", price: 2250 },
      { value: 100, label: "76–100 e-poster", price: 3000 },
      { value: 125, label: "101–125 e-poster", price: 3750 },
    ],
  },
  sms: {
    label: "SMS per måned",
    options: [
      { value: 0, label: "Ingen", price: 0 },
      { value: 30, label: "0–30 SMS", price: 750 },
      { value: 60, label: "31–60 SMS", price: 1500 },
      { value: 120, label: "61–120 SMS", price: 3000 },
      { value: 240, label: "121–240 SMS", price: 6000 },
    ],
  },
  social: {
    label: "Meldinger på sosiale medier",
    options: [
      { value: 0, label: "Ingen", price: 0 },
      { value: 50, label: "50 meldinger", price: 1200 },
      { value: 100, label: "100 meldinger", price: 2200 },
      { value: 200, label: "200 meldinger", price: 3990 },
    ],
  },
  socialPosts: {
    label: "Innlegg på sosiale medier",
    pricePerPostPerPlatform: 29,
    options: [
      { value: 0, label: "Ingen", price: 0 },
      { value: 4, label: "4 innlegg per måned", price: 0 },
      { value: 8, label: "8 innlegg per måned", price: 0 },
      { value: 12, label: "12 innlegg per måned", price: 0 },
    ],
  },
  recording: { label: "Lydopptak av samtaler", price: 490 },
  forwarding: { label: "Samtaleoverføring", price: 99 },
  ai247: { label: "AI utenom åpningstid (24/7)", price: 1990 },
  phoneSubscription: { label: "Telefonabonnement", price: 250 },
  aircall: { label: "AirCall lisens", price: 750 },
  contracts: [
    { months: 3, label: "3 måneder", discount: 0 },
    { months: 6, label: "6 måneder", discount: 0.05 },
    { months: 12, label: "12 måneder", discount: 0.1 },
    { months: 24, label: "24 måneder", discount: 0.15 },
  ],
} as const;

export type PricingConfig = {
  receptionistType: ReceptionistType;
  hours: number;
  /** Inkluderte AI-minutter per måned (brukt av "ai" og "kombi") */
  aiMinutes: number;
  /** Inkluderte fysiske minutter per måned (brukt av "fysisk" og "kombi") */
  fysiskMinutes: number;
  email: number;
  sms: number;
  social: number;
  socialPlatforms: SocialPlatform[];
  socialPosts: number;
  socialPostsPlatforms: SocialPlatform[];
  recording: boolean;
  forwarding: boolean;
  ai247: boolean;
  aircall: boolean;
  contractMonths: number;
};

export type LineItem = { label: string; amount: number };

export type PricingResult = {
  lines: LineItem[];
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  monthly: number;
  contractMonths: number;
  contractTotal: number;
};

export const defaultConfig: PricingConfig = {
  receptionistType: "ai",
  hours: PRICING.baseHours,
  aiMinutes: PRICING.minutes.ai.includedMinutes,
  fysiskMinutes: PRICING.minutes.fysisk.includedMinutes,
  email: 0,
  sms: 0,
  social: 0,
  socialPlatforms: [],
  socialPosts: 0,
  socialPostsPlatforms: [],
  recording: false,
  forwarding: false,
  ai247: false,
  aircall: false,
  contractMonths: 3,
};

export function calculatePrice(c: PricingConfig): PricingResult {
  const recType = RECEPTIONIST_TYPES.find((t) => t.value === c.receptionistType) ?? RECEPTIONIST_TYPES[0];
  const lines: LineItem[] = [];

  if (c.receptionistType === "ai") {
    const m = PRICING.minutes.ai;
    lines.push({
      label: `${recType.summaryLabel} (${m.includedMinutes} min inkl.)`,
      amount: m.basePrice,
    });
    const extra = Math.max(0, c.aiMinutes - m.includedMinutes);
    if (extra > 0) {
      lines.push({
        label: `Ekstra AI-minutter (+${extra} min × ${m.extraPerMinute} kr)`,
        amount: Math.round(extra * m.extraPerMinute),
      });
    }
  } else if (c.receptionistType === "fysisk") {
    const m = PRICING.minutes.fysisk;
    lines.push({
      label: `${recType.summaryLabel} (${m.includedMinutes} min inkl.)`,
      amount: m.basePrice,
    });
    const extra = Math.max(0, c.fysiskMinutes - m.includedMinutes);
    if (extra > 0) {
      lines.push({
        label: `Ekstra fysiske minutter (+${extra} min × ${m.extraPerMinute} kr)`,
        amount: Math.round(extra * m.extraPerMinute),
      });
    }
    lines.push({ label: PRICING.phoneSubscription.label, amount: PRICING.phoneSubscription.price });
  } else {
    const m = PRICING.minutes.kombi;
    lines.push({
      label: `${recType.summaryLabel} (${m.includedFysiskMinutes} min fysisk + ${m.includedAiMinutes} min AI inkl.)`,
      amount: m.basePrice,
    });
    const extraAi = Math.max(0, c.aiMinutes - m.includedAiMinutes);
    if (extraAi > 0) {
      lines.push({
        label: `Ekstra AI-minutter (+${extraAi} min × ${m.extraAiPerMinute} kr)`,
        amount: Math.round(extraAi * m.extraAiPerMinute),
      });
    }
    const extraFysisk = Math.max(0, c.fysiskMinutes - m.includedFysiskMinutes);
    if (extraFysisk > 0) {
      lines.push({
        label: `Ekstra fysiske minutter (+${extraFysisk} min × ${m.extraFysiskPerMinute} kr)`,
        amount: Math.round(extraFysisk * m.extraFysiskPerMinute),
      });
    }
    lines.push({ label: PRICING.phoneSubscription.label, amount: PRICING.phoneSubscription.price });
  }

  const extraHours = Math.max(0, c.hours - PRICING.baseHours);
  if (extraHours > 0) {
    lines.push({
      label: `Utvidede åpningstider (+${extraHours} t/dag)`,
      amount: extraHours * PRICING.extraHourPrice,
    });
  }

  const email = PRICING.email.options.find((o) => o.value === c.email);
  if (email && email.price > 0) lines.push({ label: `E-post – ${email.label}`, amount: email.price });

  const sms = PRICING.sms.options.find((o) => o.value === c.sms);
  if (sms && sms.price > 0) lines.push({ label: `SMS – ${sms.label}`, amount: sms.price });

  const social = PRICING.social.options.find((o) => o.value === c.social);
  if (social && social.price > 0)
    lines.push({ label: `Meldinger sosiale medier – ${social.label}`, amount: social.price });

  const socialPosts = PRICING.socialPosts.options.find((o) => o.value === c.socialPosts);
  if (socialPosts && c.socialPosts > 0) {
    const platformCount = Math.max(1, c.socialPostsPlatforms.length);
    const amount = c.socialPosts * PRICING.socialPosts.pricePerPostPerPlatform * platformCount;
    const platformText = platformCount === 1 ? "1 plattform" : `${platformCount} plattformer`;
    lines.push({
      label: `Innlegg sosiale medier – ${socialPosts.label} × ${platformText}`,
      amount,
    });
  }

  if (c.recording) lines.push({ label: PRICING.recording.label, amount: PRICING.recording.price });
  if (c.forwarding) lines.push({ label: PRICING.forwarding.label, amount: PRICING.forwarding.price });
  if (c.ai247) lines.push({ label: PRICING.ai247.label, amount: PRICING.ai247.price });
  if (c.aircall) lines.push({ label: PRICING.aircall.label, amount: PRICING.aircall.price });

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const contract =
    PRICING.contracts.find((p) => p.months === c.contractMonths) ?? PRICING.contracts[2];
  const discountRate = contract.discount;
  const discountAmount = Math.round(subtotal * discountRate);
  const monthly = subtotal - discountAmount;

  return {
    lines,
    subtotal,
    discountRate,
    discountAmount,
    monthly,
    contractMonths: contract.months,
    contractTotal: monthly * contract.months,
  };
}

export const formatKr = (n: number) =>
  new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(n) + " kr";
