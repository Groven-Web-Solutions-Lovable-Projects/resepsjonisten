// Sentralisert prislogikk for Resepsjonisten.no.
// All justering av priser, valg og rabatter gjøres her.

export const PRICING = {
  basePrice: 2990,
  extraHourPrice: 200,
  baseHours: 8,
  hoursMin: 8,
  hoursMax: 24,
  descriptions: {
    hours:
      "Velg hvor mange timer per dag AI-resepsjonisten skal være tilgjengelig for å besvare anrop. Standard kontortid er 8 timer (f.eks. 08:00–16:00). Ønsker du utvidet tilgjengelighet, kan du øke antall timer. Pris justeres automatisk etter valgt åpningstid.",
    email:
      "Velg estimert antall e-poster vi skal besvare på vegne av deg per måned. Vi leser, vurderer og besvarer henvendelsene profesjonelt slik at kundene dine får raske svar. Velger du 0, er e-postbesvarelse ikke inkludert.",
    sms:
      "Velg estimert antall SMS vi skal håndtere per måned – både utgående (f.eks. bekreftelser, påminnelser) og innkommende meldinger fra dine kunder. Velger du 0, er SMS-håndtering ikke inkludert.",
    social:
      "Velg antall meldinger fra Facebook, TikTok og Instagram vi skal besvare per måned. Vi sørger for at kundehenvendelser i sosiale medier blir besvart raskt og profesjonelt – uansett kanal. Antallet gjelder samlet på tvers av alle plattformer.",
    recording:
      "Aktiver lydopptak av samtaler for kvalitetssikring, opplæring og dokumentasjon. Alle opptak håndteres i tråd med GDPR, og kunder informeres ved samtalens start. Nyttig for virksomheter som vil dokumentere avtaler eller forbedre kundeservicen over tid.",
    forwarding:
      "Aktiver muligheten for å overføre viktige samtaler videre til riktig person i din virksomhet. Vi vurderer henvendelsen og setter samtalen direkte over til deg eller en kollega når det er nødvendig – så ingen viktige saker faller mellom to stoler.",
    ai247:
      "Aktiver tilgjengelighet døgnet rundt – også på kvelder, netter, helger og helligdager. Vår AI-resepsjonist tar imot anrop og henvendelser når kontoret ditt er stengt, slik at du aldri går glipp av en kunde. Anbefalt for virksomheter med kunder som forventer rask respons utenom vanlig arbeidstid.",
    contract:
      "Velg avtaleperioden som passer din virksomhet best. Lengre bindingstid gir lavere månedspris:\n\n• 1 måned: ingen binding, full fleksibilitet\n• 6 måneder: 5 % rabatt\n• 12 måneder: 10 % rabatt (vår mest populære)\n• 24 måneder: 15 % rabatt – beste pris",
  },
  email: {
    label: "E-post per måned",
    options: [
      { value: 0, label: "Ingen", price: 0 },
      { value: 50, label: "50 e-poster", price: 1500 },
      { value: 120, label: "120 e-poster", price: 4000 },
    ],
  },
  sms: {
    label: "SMS per måned",
    options: [
      { value: 0, label: "Ingen", price: 0 },
      { value: 100, label: "100 SMS", price: 990 },
      { value: 200, label: "200 SMS", price: 1800 },
      { value: 500, label: "500 SMS", price: 3990 },
    ],
  },
  social: {
    label: "Sosiale medier per måned",
    helper: "Facebook, TikTok og Instagram samlet",
    options: [
      { value: 0, label: "Ingen", price: 0 },
      { value: 50, label: "50 meldinger", price: 1200 },
      { value: 100, label: "100 meldinger", price: 2200 },
      { value: 200, label: "200 meldinger", price: 3990 },
    ],
  },
  recording: { label: "Lydopptak av samtaler", price: 490 },
  forwarding: { label: "Samtaleoverføring", price: 290 },
  ai247: { label: "AI utenom åpningstid (24/7)", price: 1990 },
  contracts: [
    { months: 1, label: "1 måned", discount: 0 },
    { months: 6, label: "6 måneder", discount: 0.05 },
    { months: 12, label: "12 måneder", discount: 0.1 },
    { months: 24, label: "24 måneder", discount: 0.15 },
  ],
} as const;

export type PricingConfig = {
  hours: number;
  email: number;
  sms: number;
  social: number;
  recording: boolean;
  forwarding: boolean;
  ai247: boolean;
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
  hours: PRICING.baseHours,
  email: 0,
  sms: 0,
  social: 0,
  recording: false,
  forwarding: false,
  ai247: false,
  contractMonths: 12,
};

export function calculatePrice(c: PricingConfig): PricingResult {
  const lines: LineItem[] = [
    { label: "Grunnpris (AI-telefonbesvarelse)", amount: PRICING.basePrice },
  ];

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
    lines.push({ label: `Sosiale medier – ${social.label}`, amount: social.price });

  if (c.recording) lines.push({ label: PRICING.recording.label, amount: PRICING.recording.price });
  if (c.forwarding) lines.push({ label: PRICING.forwarding.label, amount: PRICING.forwarding.price });
  if (c.ai247) lines.push({ label: PRICING.ai247.label, amount: PRICING.ai247.price });

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