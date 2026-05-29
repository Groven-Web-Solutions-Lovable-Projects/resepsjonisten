import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Personvern = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Tilbake til forsiden
        </Link>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Personvernerklæring
          </h1>
          <p className="text-lg font-semibold mb-1">Resepsjonisten AS</p>
          <p className="text-sm text-muted-foreground mb-10">
            Sist oppdatert: 26.05.2026
          </p>

          <p>
            Resepsjonisten AS, org. nr. 936 065 619, adresse Lundekroken 34,
            1396 Billingstad, er behandlingsansvarlig for personopplysninger
            som samles inn gjennom denne nettsiden. Vi tar personvernet ditt på
            alvor og behandler dine opplysninger i tråd med personopplysnings­loven
            og GDPR.
          </p>

          <h2>1. Behandlingsansvarlig</h2>
          <ul>
            <li><strong>Selskap:</strong> Resepsjonisten AS</li>
            <li><strong>Organisasjonsnummer:</strong> 936 065 619</li>
            <li><strong>Forretningsadresse:</strong> Lundekroken 34, 1396 Billingstad</li>
            <li><strong>Postadresse:</strong> Postboks 121, 1312 Slependen</li>
            <li><strong>E-post:</strong> <a href="mailto:post@resepsjonisten.no">post@resepsjonisten.no</a></li>
            <li><strong>Telefon:</strong> <a href="tel:+4797251000">+47 972 51 000</a></li>
          </ul>

          <h2>2. Hvilke personopplysninger vi samler inn</h2>
          <h3>Kontaktskjema («Book gratis demo»)</h3>
          <p>Når du fyller ut skjemaet på vår nettside, samler vi inn:</p>
          <ul>
            <li>Navn</li>
            <li>Bedriftsnavn</li>
            <li>E-postadresse</li>
            <li>Telefonnummer</li>
            <li>Innholdet i meldingen din</li>
          </ul>

          <h3>Nyhetsbrev</h3>
          <p>Når du melder deg på nyhetsbrevet vårt, samler vi inn:</p>
          <ul>
            <li>E-postadresse</li>
          </ul>

          <h3>Teknisk informasjon</h3>
          <p>
            Når du besøker nettsiden vår, kan det automatisk lagres teknisk
            informasjon som IP-adresse, nettlesertype og besøkstidspunkt. Disse
            opplysningene benyttes ikke til å identifisere deg som person.
          </p>

          <h2>3. Formål med behandlingen</h2>
          <p>Vi behandler dine personopplysninger for følgende formål:</p>
          <ul>
            <li>Å besvare henvendelser og tilby demo av tjenestene våre</li>
            <li>Å sende ut nyhetsbrev (kun dersom du har samtykket)</li>
            <li>Å forbedre nettsiden og tjenestene våre</li>
          </ul>

          <h2>4. Rettslig grunnlag</h2>
          <p>Behandlingen skjer på grunnlag av:</p>
          <ul>
            <li><strong>Samtykke</strong> ved påmelding til nyhetsbrev</li>
            <li><strong>Berettiget interesse</strong> ved besvarelse av henvendelser fra kontaktskjema</li>
            <li><strong>Avtale eller forberedelse av avtale</strong> dersom du blir kunde</li>
          </ul>

          <h2>5. Lagringstid</h2>
          <p>Vi lagrer dine personopplysninger kun så lenge det er nødvendig for formålet:</p>
          <ul>
            <li><strong>Kontaktskjema:</strong> inntil 12 måneder etter siste kontakt, med mindre du blir kunde</li>
            <li><strong>Nyhetsbrev:</strong> frem til du melder deg av</li>
            <li><strong>Kundeopplysninger:</strong> så lenge kundeforholdet består, og deretter i henhold til lovpålagte krav (f.eks. bokføringsloven)</li>
          </ul>

          <h2>6. Deling av opplysninger</h2>
          <p>
            Vi deler ikke dine personopplysninger med tredjeparter ut over det
            som er nødvendig for å levere tjenesten. Vi benytter underleverandører
            («databehandlere») til drift av nettsiden, e-postutsending og lignende.
            Disse er bundet av databehandleravtaler som sikrer at dine opplysninger
            behandles forsvarlig.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Nettsiden bruker per i dag ingen cookies for sporing eller analyse.
            Dersom dette endres, vil vi oppdatere denne erklæringen og innhente
            samtykke der det er påkrevd.
          </p>

          <h2>8. Dine rettigheter</h2>
          <p>Du har rett til å:</p>
          <ul>
            <li>Få innsyn i hvilke personopplysninger vi har om deg</li>
            <li>Få rettet uriktige opplysninger</li>
            <li>Få slettet opplysninger («retten til å bli glemt»)</li>
            <li>Begrense eller protestere mot behandlingen</li>
            <li>Motta dine opplysninger i et strukturert format (dataportabilitet)</li>
            <li>Trekke tilbake samtykke når som helst</li>
          </ul>
          <p>
            For å utøve rettighetene dine, ta kontakt med oss på{" "}
            <a href="mailto:post@resepsjonisten.no">post@resepsjonisten.no</a>.
          </p>

          <h2>9. Klage</h2>
          <p>
            Dersom du mener vi behandler dine personopplysninger i strid med
            regelverket, kan du klage til Datatilsynet. Mer informasjon finnes
            på{" "}
            <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">
              www.datatilsynet.no
            </a>.
          </p>

          <h2>10. Endringer</h2>
          <p>
            Vi kan oppdatere denne personvernerklæringen ved behov. Den til
            enhver tid gjeldende versjonen vil være tilgjengelig på nettsiden
            vår.
          </p>
        </article>
      </div>
    </main>
  );
};

export default Personvern;