import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Building2,
  Stethoscope,
  Smile,
  Wrench,
  UtensilsCrossed,
  Scissors,
  Sparkles,
  Sparkle,
  Truck,
  Anchor,
  ShieldCheck,
  Activity,
  Pen,
} from "lucide-react";

const industries = [
  {
    name: "Forsikring",
    icon: ShieldCheck,
    description:
      "Vi håndterer alle innkommende henvendelser raskt og profesjonelt, slik at ingen potensielle kunder faller fra. Våre medarbeidere kvalifiserer leads og sørger for at rådgiverne kun bruker tid på de mest relevante kundene. Vi følger opp forespørsler systematisk og øker konverteringen fra interesse til salg. Resultatet er flere signerte avtaler uten økt bemanning.",
  },
  {
    name: "Kiropraktor",
    icon: Activity,
    description:
      "Vi sørger for at telefonen alltid blir besvart og at timeboken fylles effektivt. Pasienter får rask respons, og vi håndterer både booking, ombooking og oppfølging. Ved sykdom eller travle perioder fungerer vi som en sømløs backup. Dette gir bedre pasientflyt og økt omsetning.",
  },
  {
    name: "Eiendom",
    icon: Building2,
    description:
      "Vi kvalifiserer boligselgere og booker møter direkte inn i meglerens kalender. Alle leads følges opp raskt og strukturert, noe som øker sjansen for oppdrag. I tillegg håndterer vi løpende dialog med leietakere – fra henvendelser og oppfølging til koordinering av enkle saker. Vi sikrer at ingen henvendelser blir liggende ubesvart. Resultatet er flere oppdrag, bedre leietakeroppfølging og mer effektiv bruk av meglers tid.",
  },
  {
    name: "Legesenter",
    icon: Stethoscope,
    description:
      "Vi avlaster resepsjonen ved å håndtere telefon, timebestillinger og enkle henvendelser. Ved spørsmål som gjelder sykdom eller medisinske vurderinger, setter vi raskt over til riktig helsepersonell. Når det gjelder reseptforespørsler, kan vi registrere henvendelsen og sende den videre til legen på e-post, slik at det håndteres når det passer i legens arbeidshverdag. Pasientene får rask respons, samtidig som legene får bedre kontroll på egen tid. Dette gir bedre pasientopplevelse og mer effektiv drift.",
  },
  {
    name: "Tannlege",
    icon: Smile,
    description:
      "Vi fyller timeboken ved å svare raskt på alle henvendelser og følge opp pasienter som ikke har booket. Avbestillinger håndteres effektivt, og timer fylles opp igjen. Vi kan også bidra i kampanjeperioder for å øke pasienttilgangen. Dette gir høyere belegg og bedre lønnsomhet.",
  },
  {
    name: "Bilverksted",
    icon: Wrench,
    description:
      "Vi tar imot alle kundehenvendelser, gir raske svar og booker inn oppdrag. Kundene slipper ventetid, og verkstedet får en jevn strøm av oppdrag. Vi kan også følge opp tilbud og utestående forespørsler. Dette gir høyere kapasitetsutnyttelse og økt omsetning.",
  },
  {
    name: "Restaurant",
    icon: UtensilsCrossed,
    description:
      "Vi håndterer bordbestillinger, telefoner og kundehenvendelser, slik at de ansatte kan fokusere på gjestene. Ingen reservasjoner går tapt, og kundene får rask respons. Vi kan også håndtere større grupper og arrangementer. Dette gir bedre service og høyere bordutnyttelse.",
  },
  {
    name: "Frisør",
    icon: Scissors,
    description:
      "Vi sørger for at timeboken alltid er full ved å håndtere booking og oppfølging, samt at de ansatte kan fokusere på kundene. Avbestillinger fylles raskt opp igjen, og kundene får rask respons. Vi fungerer også som backup ved sykdom eller travle dager. Dette gir økt belegg og bedre flyt i salongen.",
  },
  {
    name: "Skjønnhetssalong",
    icon: Sparkles,
    description:
      "Vi håndterer alle kundehenvendelser og booker behandlinger effektivt, samt at de ansatte kan fokusere på kundene. Vi følger opp kunder som vurderer behandling, og øker sannsynligheten for booking. Kampanjer og tilbud kan følges opp aktivt. Resultatet er flere kunder og høyere omsetning.",
  },
  {
    name: "Rengjøring",
    icon: Sparkle,
    description:
      "Vi tar imot forespørsler, kvalifiserer kunder og booker oppdrag direkte. Alle leads følges opp, slik at dere ikke mister potensielle kunder. Vi kan også håndtere faste avtaler og koordinere oppdrag. Dette gir bedre struktur og mer forutsigbar inntekt.",
  },
  {
    name: "Transport",
    icon: Truck,
    description:
      "Vi håndterer bestillinger, kundehenvendelser og koordinering av oppdrag. Kundene får rask respons og tydelig informasjon. Vi sørger for at kapasiteten utnyttes best mulig gjennom god planlegging. Dette gir mer effektive ruter og økt lønnsomhet.",
  },
  {
    name: "Båt",
    icon: Anchor,
    description:
      "Vi håndterer henvendelser knyttet til service, lagring, salg og utleie, og sørger for rask respons – spesielt viktig i sesongbasert drift. I tillegg booker vi timer til båtførerprøven og koordinerer slik at både elever og instruktører møter opp til riktig tid. Vi følger opp alle forespørsler systematisk, slik at ingen leads går tapt. Dette gir bedre kapasitetsutnyttelse og økt omsetning i høysesong.",
  },
  {
    name: "Tatovør",
    icon: Pen,
    description:
      "Vi sørger for at alle henvendelser blir besvart raskt, enten det gjelder pris, design eller booking. Vi kvalifiserer kunder før de booker, slik at dere bruker tid på de riktige oppdragene. Samtidig er det avgjørende at tatovøren ikke må avbryte behandlingen for å svare telefonen – vi tar all kundedialogen mens dere jobber uforstyrret. Avbestillinger og endringer håndteres effektivt, og timeboken holdes full. Resultatet er bedre flyt i arbeidet, høyere kapasitet og flere betalende kunder.",
  },
];

const PREVIEW_LENGTH = 110;

const IndustryCard = ({
  industry,
  index,
}: {
  industry: (typeof industries)[number];
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const Icon = industry.icon;
  const isLong = industry.description.length > PREVIEW_LENGTH;
  const preview =
    isLong && !open
      ? industry.description.slice(0, PREVIEW_LENGTH).trimEnd() + "…"
      : industry.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl bg-card border border-border p-5 sm:p-6 shadow-sm overflow-hidden flex flex-col"
    >
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/15">
        <Icon className="w-5 h-5" strokeWidth={1.75} />
      </div>
      <p className="mt-5 text-base font-semibold text-foreground">{industry.name}</p>

      <AnimatePresence initial={false}>
        <motion.p
          key={open ? "full" : "preview"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 text-sm text-muted-foreground leading-relaxed"
        >
          {preview}
        </motion.p>
      </AnimatePresence>

      {isLong && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-3 self-start text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          {open ? "Vis mindre" : "Les mer"}
        </button>
      )}
    </motion.div>
  );
};

const IndustriesSection = () => {
  return (
    <section id="bransjer" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-primary-soft" />
      <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            Bransjer vi kan
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Spesialisert på <span className="gradient-text">din bransje</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Vi kjenner rutinene, kundene og forventningene i bransjen din – og leverer en resepsjonist som passer rett inn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-start">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
