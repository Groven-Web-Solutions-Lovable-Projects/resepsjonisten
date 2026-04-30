import { motion } from "framer-motion";
import { Phone, Mail, ArrowUpRight, Navigation, Building2, FileText } from "lucide-react";

const ADDRESS = "Høvikveien 2A, 1363 Høvik";
const PHONE = "+47 972 51 000";
const PHONE_TEL = "+4797251000";
const EMAIL = "kontakt@resepsjonisten.no";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=" +
  encodeURIComponent(ADDRESS) +
  "&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(ADDRESS);

const items = [
  {
    icon: Phone,
    label: "Telefon",
    value: PHONE,
    href: `tel:${PHONE_TEL}`,
  },
  {
    icon: Mail,
    label: "E-post",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
];

const companyDetails = [
  { label: "Firmanavn", value: "Resepsjonisten AS" },
  { label: "Organisasjonsnummer", value: "936 065 619" },
  { label: "Selskapsform", value: "Aksjeselskap (AS)" },
  { label: "MVA-registrert", value: "Ja" },
  { label: "Forretningsadresse", value: "Lundekroken 34, 1396 Billingstad" },
];

const ContactInfoSection = () => (
  <section id="kontakt-oss" className="py-24 bg-secondary/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          Kontakt oss
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Slik når du <span className="gradient-text">oss</span>
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Ring, send en e-post eller stikk innom kontoret vårt på Høvik. Vi
          svarer alltid innen kort tid.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {/* Kontaktkort */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-4"
        >
          {items.map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elevated transition-all"
            >
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  {label}
                </p>
                <p className="mt-0.5 text-base font-bold text-foreground group-hover:text-primary transition-colors break-words">
                  {value}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
            </a>
          ))}

          {/* Firmainformasjon */}
          <div className="p-5 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                  Firmainformasjon
                </p>
                <p className="text-base font-bold text-foreground">
                  Offisielle opplysninger
                </p>
              </div>
            </div>
            <dl className="space-y-2.5">
              {companyDetails.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 text-sm border-b border-border/60 pb-2 last:border-0 last:pb-0"
                >
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-semibold text-foreground text-right">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href="https://virksomhet.brreg.no/nb/oppslag/enheter/936065619"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
            >
              Se i Brønnøysundregistrene
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Kart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 rounded-2xl overflow-hidden border border-border shadow-elevated bg-card flex flex-col"
        >
          {/* Header-stripe */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                Her har vi kontor
              </p>
              <p className="text-sm font-bold text-foreground truncate">
                Resepsjonisten.no · {ADDRESS}
              </p>
            </div>
          </div>

          {/* Kart */}
          <div className="relative flex-1 min-h-[340px]">
            <iframe
              src={MAP_EMBED_SRC}
              title={`Kart som viser ${ADDRESS}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>

          {/* Footer-CTA */}
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 px-5 py-4 border-t border-border bg-card hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Navigation className="w-4 h-4 text-primary" />
              Få veibeskrivelse
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
              Åpne i Google Maps
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactInfoSection;