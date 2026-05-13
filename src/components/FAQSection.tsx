import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Hvordan fungerer viderekobling?", a: "Vi kobler enkelt deres telefonnummer over til oss, enten hele tiden eller kun i bestemte tidsrom. Ved behov kan vi også sette samtaler videre til riktig person hos dere, for eksempel ved faglige spørsmål. Løsningen er fleksibel og tilpasses deres rutiner." },
  { q: "Hvordan kan dere håndtere booking?", a: "Vi får tilgang til deres bookingsystem eller kalender og legger inn avtaler direkte. Vi kan også håndtere ombookinger, avbestillinger og oppfølging. Dette sikrer at timeboken alltid er oppdatert og best mulig utnyttet." },
  { q: "Hvordan vet dere hva dere skal si?", a: "Vi setter oss grundig inn i deres bedrift, tjenester, priser og rutiner. Sammen lager vi en enkel guide for hvordan vi skal håndtere ulike henvendelser. For kunden vil det oppleves som å snakke direkte med deres egen resepsjon." },
  { q: "Hvor raskt kan vi komme i gang?", a: "De fleste kunder er i gang innen 1–3 dager. Oppsettet er enkelt, og vi hjelper dere gjennom hele prosessen. Har dere behov for en rask oppstart, kan vi ofte levere samme dag." },
  { q: "Hva koster det?", a: "Vi tilbyr fleksible prismodeller basert på behov – fastpris, og vi kjører alltid en prøvemåned for å teste ut at vi har beregnet riktig måned pris. Vi er en betydelig rimeligere løsning enn å ansette egen resepsjonist." },
  { q: "Hvilke kanaler håndterer dere?", a: "Vi håndterer telefon, e-post, chat og sosiale medier. Dere velger selv hvilke kanaler dere ønsker at vi skal ta ansvar for. Alt samles og følges opp strukturert." },
  { q: "Hva skjer hvis dere ikke kan svare på noe?", a: "Dersom vi får spørsmål som krever faglig vurdering, setter vi kunden videre til riktig person hos dere eller sender en beskjed internt. Vi sørger alltid for at kunden får svar – enten umiddelbart eller ved oppfølging." },
  { q: "Kan dere tilpasses vår bransje?", a: "Ja – vi jobber allerede med flere ulike bransjer og tilpasser oss deres behov. Vi lærer oss deres systemer, rutiner og kundedialog. Målet er at vi skal fungere som en naturlig del av deres team." },
  { q: "Mister vi kontrollen over kundene våre?", a: "Nei, tvert imot. Dere får bedre oversikt gjennom strukturert oppfølging og logging av alle henvendelser. Vi kan også integreres med deres CRM-system." },
  { q: "Hva skjer ved sykdom eller ferie hos deg som kunde?", a: "Da er vi ekstra verdifulle. Vi sørger for at telefoner blir besvart og kunder fulgt opp, slik at dere ikke mister inntekter. Dere får kontinuitet uansett situasjon." },
  { q: "Kan dere ringe ut til kunder også?", a: "Ja, vi kan følge opp leads, sende påminnelser, bekrefte avtaler og kontakte kunder på deres vegne. Dette øker konverteringen og sørger for at ingen potensielle kunder blir glemt. Vi jobber strukturert og profesjonelt i all dialog." },
  { q: "Kan dere håndtere travle perioder og kampanjer?", a: "Absolutt. Ved kampanjer eller sesongtopper kan vi skalere opp raskt. Vi sørger for at alle henvendelser blir besvart, selv når trykket er høyt." },
  { q: "Kan dere jobbe utenfor vanlig arbeidstid?", a: "Ja, vi kan tilby utvidede åpningstider, inkludert kvelder og helger. Dette gir dere bedre tilgjengelighet og øker sjansen for å fange opp kunder når de faktisk tar kontakt." },
  { q: "Hvordan håndterer dere personvern og sensitive opplysninger?", a: "Vi følger gjeldende regler for personvern og behandler all informasjon konfidensielt. Våre rutiner sikrer trygg håndtering av kundedata. Dette er spesielt viktig for bransjer som helse og finans." },
  { q: "Kan vi teste tjenesten før vi bestemmer oss?", a: "Ja, vi tilbyr ofte en enkel oppstart eller testperiode. Dette gir dere mulighet til å oppleve verdien før dere forplikter dere fullt ut." },
  { q: "Hva hvis vi allerede har en resepsjonist?", a: "Da fungerer vi som et supplement og backup. Vi kan ta toppene, dekke fravær eller håndtere spesifikke oppgaver. Dette gir økt fleksibilitet uten ekstra fast kostnad." },
  { q: "Hvordan får vi oversikt over hva dere gjør?", a: "Vi kan gi dere rapporter og oversikt over alle henvendelser, bookinger og oppfølginger. Dette gir full kontroll og innsikt i kundedialogen." },
  { q: "Kan dere integreres med våre systemer?", a: "Ja, vi kan jobbe i deres eksisterende systemer som CRM, booking- og saksbehandlingssystemer. Dette gjør samarbeidet sømløst og effektivt." },
  { q: "Hva gjør dere annerledes enn en telefonsvarer?", a: "Vi gir personlig service og faktisk oppfølging. Kunder får snakke med et menneske som hjelper dem videre – ikke bare legge igjen en beskjed. Dette gir langt bedre kundeopplevelse og høyere konvertering." },
  { q: "Hva skjer hvis en kunde ikke svarer?", a: "Vi følger opp med nye forsøk via telefon, SMS eller e-post. Målet er at alle henvendelser skal ende i en avklaring. Dette øker verdien av hvert eneste lead." },
  { q: "Kan dere tilpasse dere vår tone og merkevare?", a: "Ja, vi tilpasser kommunikasjonen slik at den matcher deres profil og kundetype. Vi fremstår som en del av deres bedrift – ikke en ekstern aktør." },
  { q: "Hvor mye må vi selv bidra med?", a: "Oppstarten krever noe input fra dere, som tjenester, priser og rutiner. Etter dette tar vi over det meste av håndteringen. Målet er å spare dere tid – ikke skape mer arbeid. Tenk på oss som en resepsjonist som er ansatt hos dere." },
];

const FAQSection = () => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs.map((f, i) => ({ ...f, originalIndex: i }));
    return faqs
      .map((f, i) => ({ ...f, originalIndex: i }))
      .filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <section
    id="faq"
    className="relative py-24 overflow-hidden"
    style={{ background: "hsl(36 40% 96%)" }}
  >
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid lg:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 lg:sticky lg:top-24 self-start"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
            — FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.05] tracking-tight">
            Ofte stilte <span className="gradient-text">spørsmål</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Finner du ikke svaret du leter etter? Ta kontakt med oss – vi svarer gjerne på alt du lurer på.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7"
        >
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
            Spørsmål og svar
          </h3>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Søk i spørsmål..."
              className="pl-10 bg-white/70 border-foreground/15"
            />
          </div>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground py-6">Ingen treff på «{query}».</p>
          ) : (
          <Accordion type="single" collapsible className="border-t border-foreground/15">
            {filtered.map((faq, i) => (
              <AccordionItem
                key={faq.originalIndex}
                value={`item-${i}`}
                className="border-b border-foreground/15 px-0"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-base md:text-lg">
                  <span className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-muted-foreground/60">
                      {String(faq.originalIndex + 1).padStart(2, "0")}
                    </span>
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pl-10 pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          )}
        </motion.div>
      </div>
    </div>
    </section>
  );
};

export default FAQSection;
