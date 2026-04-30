import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

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
  {
    icon: MapPin,
    label: "Besøksadresse",
    value: ADDRESS,
    href: MAP_LINK,
    external: true,
  },
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
        </motion.div>

        {/* Kart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 rounded-2xl overflow-hidden border border-border shadow-elevated bg-card min-h-[360px]"
        >
          <iframe
            src={MAP_EMBED_SRC}
            title={`Kart som viser ${ADDRESS}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="w-full h-full min-h-[360px] border-0"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactInfoSection;