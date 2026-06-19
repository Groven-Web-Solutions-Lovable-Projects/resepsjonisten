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
  startupCost: 3990,
  // Åpningstider per ukedag
  openingHours: {
    weekdayAllowedStart: 8, // 08:00
    weekdayAllowedEnd: 17, // 17:00
    weekdayTimeOptions: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] as const,
    saturday: { price: 990, start: 9, end: 15, label: "Lørdag 09–15" },
  },
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
      "Velg åpningstider per ukedag innenfor 08:00–17:00. Inntil 8 timer per dag er inkludert. Lørdag kan legges til (09–15) for 990 kr/mnd. Søndag og 24/7 leveres på forespørsel – ta kontakt.",
    saturday:
      "Lørdagsåpent leveres innenfor 09:00–15:00 og koster 990 kr/mnd.",
    sunday:
      "Søndagsåpent leveres kun på forespørsel. Ta kontakt for et tilpasset tilbud.",
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
    appointmentBooking:
      "Vi håndterer timebestilling, avbestilling og utsettelse i dine systemer. 490 kr per bookingsystem.",
    crmUpdate:
      "Vi oppdaterer kunde- og prospektdata i ditt CRM etter samtaler og henvendelser. 39 kr per oppdatering – velg estimert antall per måned.",
    aiSms:
      "Vår AI besvarer innkommende SMS automatisk på vegne av deg. 15 kr per SMS – velg estimert antall per måned.",
    aiEmail:
      "Vår AI besvarer innkommende e-post automatisk på vegne av deg. 15 kr per e-post – velg estimert antall per måned.",
    outboundBooking:
      "Vi ringer ut for å booke møter med dine leads eller kunder. 790 kr per time – velg estimert antall timer per måned.",
    adminTasks:
      "Vi tar hånd om enkle administrative oppgaver som datainnlegging, oppfølging og rutinearbeid. 790 kr per time – velg estimert antall timer per måned.",
    leadPackage:
      "Grunnpakke for oppfølging av leads i kundens systemer. Vi følger opp når kunden mottar leads.",
    vacationCover:
      "Vi dekker telefonen din ved ferie og sykefravær. 1990 kr/mnd inkluderer 60 minutter, deretter 16 kr per minutt.",
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
  ai247: { label: "AI utenom åpningstid (24/7)", price: 1990, aiPrice: 990 },
  leadPackage: { label: "Grunnpakke Lead", price: 3990 },
  phoneSubscription: { label: "Telefonabonnement", price: 250 },
  aircall: { label: "AirCall lisens", price: 750 },
  appointmentBooking: {
    label: "Timebestilling/avbestilling og utsettelse",
    pricePerUnit: 490,
    unitLabel: "system",
    unitLabelPlural: "systemer",
    sliderMin: 1,
    sliderMax: 10,
    step: 1,
  },
  crmUpdate: {
    label: "CRM-oppdatering",
    pricePerUnit: 39,
    unitLabel: "oppdatering",
    unitLabelPlural: "oppdateringer",
    sliderMin: 0,
    sliderMax: 200,
    step: 5,
  },
  aiSms: {
    label: "AI besvarer SMS",
    pricePerUnit: 15,
    unitLabel: "SMS",
    unitLabelPlural: "SMS",
    sliderMin: 0,
    sliderMax: 300,
    step: 10,
  },
  aiEmail: {
    label: "AI besvarer e-post",
    pricePerUnit: 15,
    unitLabel: "e-post",
    unitLabelPlural: "e-poster",
    sliderMin: 0,
    sliderMax: 300,
    step: 10,
  },
  outboundBooking: {
    label: "Utgående møtebooking",
    pricePerUnit: 790,
    unitLabel: "time",
    unitLabelPlural: "timer",
    sliderMin: 0,
    sliderMax: 40,
    step: 1,
  },
  adminTasks: {
    label: "Enkle administrative oppgaver",
    pricePerUnit: 790,
    unitLabel: "time",
    unitLabelPlural: "timer",
    sliderMin: 0,
    sliderMax: 40,
    step: 1,
  },
  vacationCover: {
    label: "Ferie- og sykefraværsdekning",
    basePrice: 1990,
    includedMinutes: 60,
    extraPerMinute: 16,
    sliderMin: 60,
    sliderMax: 600,
    step: 10,
  },
  contracts: [
    { months: 3, label: "3 måneder", discount: 0 },
    { months: 6, label: "6 måneder", discount: 0.05 },
    { months: 12, label: "12 måneder", discount: 0.1 },
    { months: 24, label: "24 måneder", discount: 0.15 },
  ],
} as const;

export type PricingConfig = {
  receptionistType: ReceptionistType;
  /** Åpningstider man–fre. Tider i hele timer (8 = 08:00). */
  weekdayHours: Record<Weekday, { start: number; end: number }>;
  /** Lørdagsåpent 09–15 (+990 kr/mnd) */
  saturday: boolean;
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
  leadPackage: boolean;
  appointmentBookingSystems: number;
  crmUpdates: number;
  aiSmsCount: number;
  aiEmailCount: number;
  outboundBookingHours: number;
  adminTaskHours: number;
  vacationCover: boolean;
  vacationMinutes: number;
  contractMonths: number;
};

export const WEEKDAYS = [
  { value: "mon", label: "Mandag", short: "Man" },
  { value: "tue", label: "Tirsdag", short: "Tir" },
  { value: "wed", label: "Onsdag", short: "Ons" },
  { value: "thu", label: "Torsdag", short: "Tor" },
  { value: "fri", label: "Fredag", short: "Fre" },
] as const;

export type Weekday = (typeof WEEKDAYS)[number]["value"];

export const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;

export type LineItem = { label: string; amount: number };

export type PricingResult = {
  lines: LineItem[];
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  monthly: number;
  contractMonths: number;
  contractTotal: number;
  startupCost: number;
  /** True hvis en ukedag har valgt tid utenfor 08–17 */
  weekdayOutOfRange: boolean;
  /** Maks lengde på en hverdag (timer) – brukt til prisberegning */
  maxWeekdayHours: number;
};

export const defaultConfig: PricingConfig = {
  receptionistType: "ai",
  weekdayHours: {
    mon: { start: 8, end: 16 },
    tue: { start: 8, end: 16 },
    wed: { start: 8, end: 16 },
    thu: { start: 8, end: 16 },
    fri: { start: 8, end: 16 },
  },
  saturday: false,
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
  ai247: true,
  aircall: false,
  appointmentBookingSystems: 0,
  crmUpdates: 0,
  aiSmsCount: 0,
  aiEmailCount: 0,
  outboundBookingHours: 0,
  adminTaskHours: 0,
  vacationCover: false,
  vacationMinutes: PRICING.vacationCover.includedMinutes,
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

  // Åpningstider man–fre
  const allowedStart = PRICING.openingHours.weekdayAllowedStart;
  const allowedEnd = PRICING.openingHours.weekdayAllowedEnd;
  let weekdayOutOfRange = false;
  let maxWeekdayHours: number = PRICING.baseHours;
  for (const d of WEEKDAYS) {
    const { start, end } = c.weekdayHours[d.value];
    if (start < allowedStart || end > allowedEnd || end <= start) {
      weekdayOutOfRange = true;
      continue;
    }
    const dur = end - start;
    if (dur > maxWeekdayHours) maxWeekdayHours = dur;
  }
  const extraHours = Math.max(0, maxWeekdayHours - PRICING.baseHours);
  if (extraHours > 0 && !weekdayOutOfRange) {
    lines.push({
      label: `Utvidede åpningstider (+${extraHours} t/dag)`,
      amount: extraHours * PRICING.extraHourPrice,
    });
  }
  if (c.saturday) {
    const s = PRICING.openingHours.saturday;
    lines.push({ label: s.label, amount: s.price });
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
  if (c.ai247) {
    const price = c.receptionistType === "ai" ? PRICING.ai247.aiPrice : PRICING.ai247.price;
    lines.push({ label: PRICING.ai247.label, amount: price });
  }
  if (c.aircall) lines.push({ label: PRICING.aircall.label, amount: PRICING.aircall.price });
  if (c.appointmentBookingSystems > 0) {
    const p = PRICING.appointmentBooking;
    lines.push({
      label: `${p.label} (${c.appointmentBookingSystems} ${c.appointmentBookingSystems === 1 ? p.unitLabel : p.unitLabelPlural} × ${p.pricePerUnit} kr)`,
      amount: c.appointmentBookingSystems * p.pricePerUnit,
    });
  }

  if (c.crmUpdates > 0) {
    const p = PRICING.crmUpdate;
    lines.push({
      label: `${p.label} (${c.crmUpdates} ${c.crmUpdates === 1 ? p.unitLabel : p.unitLabelPlural} × ${p.pricePerUnit} kr)`,
      amount: c.crmUpdates * p.pricePerUnit,
    });
  }
  if (c.aiSmsCount > 0) {
    const p = PRICING.aiSms;
    lines.push({
      label: `${p.label} (${c.aiSmsCount} ${p.unitLabelPlural} × ${p.pricePerUnit} kr)`,
      amount: c.aiSmsCount * p.pricePerUnit,
    });
  }
  if (c.aiEmailCount > 0) {
    const p = PRICING.aiEmail;
    lines.push({
      label: `${p.label} (${c.aiEmailCount} ${c.aiEmailCount === 1 ? p.unitLabel : p.unitLabelPlural} × ${p.pricePerUnit} kr)`,
      amount: c.aiEmailCount * p.pricePerUnit,
    });
  }
  if (c.outboundBookingHours > 0) {
    const p = PRICING.outboundBooking;
    lines.push({
      label: `${p.label} (${c.outboundBookingHours} ${c.outboundBookingHours === 1 ? p.unitLabel : p.unitLabelPlural} × ${p.pricePerUnit} kr)`,
      amount: c.outboundBookingHours * p.pricePerUnit,
    });
  }
  if (c.adminTaskHours > 0) {
    const p = PRICING.adminTasks;
    lines.push({
      label: `${p.label} (${c.adminTaskHours} ${c.adminTaskHours === 1 ? p.unitLabel : p.unitLabelPlural} × ${p.pricePerUnit} kr)`,
      amount: c.adminTaskHours * p.pricePerUnit,
    });
  }
  if (c.vacationCover) {
    const p = PRICING.vacationCover;
    lines.push({
      label: `${p.label} (${p.includedMinutes} min inkl.)`,
      amount: p.basePrice,
    });
    const extra = Math.max(0, c.vacationMinutes - p.includedMinutes);
    if (extra > 0) {
      lines.push({
        label: `Ekstra minutter ferie/sykefravær (+${extra} min × ${p.extraPerMinute} kr)`,
        amount: extra * p.extraPerMinute,
      });
    }
  }

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
    contractTotal: monthly * contract.months + PRICING.startupCost,
    startupCost: PRICING.startupCost,
    weekdayOutOfRange,
    maxWeekdayHours,
  };
}

export const formatKr = (n: number) =>
  new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(n) + " kr";
