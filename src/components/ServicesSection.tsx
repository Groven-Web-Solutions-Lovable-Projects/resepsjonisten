import { motion } from "framer-motion";
import {
  Phone,
  ArrowRightLeft,
  MessageSquare,
  Filter,
  CalendarCheck,
  Package,
  Clock,
  Mail,
  Smartphone,
  Share2,
  Mic,
  Users,
  Sparkles,
} from "lucide-react";

const manualServices = [
  { icon: Phone, title: "Besvare innkommende telefoner", desc: "Vi svarer profesjonelt på vegne av din bedrift." },
  { icon: ArrowRightLeft, title: "Videresende samtaler", desc: "Viktige samtaler sendes direkte til riktig person." },
  { icon: MessageSquare, title: "Ta imot og formidle beskjeder", desc: "Alle beskjeder leveres raskt og nøyaktig." },
  { icon: Filter, title: "Filtrere henvendelser", desc: "Vi sorterer og prioriterer henvendelsene for deg." },
  { icon: CalendarCheck, title: "Håndtere booking og timebestillinger", desc: "Vi booker avtaler direkte i din kalender." },
  { icon: Package, title: "Håndtere bestillinger", desc: "Bestillinger i større løsninger administreres effektivt." },
  { icon: Mail, title: "E-postbesvarelse", desc: "Vi besvarer kundehenvendelser via e-post raskt og profesjonelt." },
  { icon: Smartphone, title: "SMS-håndtering", desc: "Vi sender og mottar SMS på vegne av deg." },
  { icon: Share2, title: "Sosiale medier", desc: "Vi svarer på henvendelser fra Facebook, TikTok og Instagram." },
  { icon: Mic, title: "Lydopptak av samtaler", desc: "Alle samtaler kan tas opp for kvalitet og dokumentasjon." },
];

const aiServices = [
  { icon: Clock, title: "AI utenom åpningstid", desc: "Vi er tilgjengelig 24/7, også når kontoret er stengt." },
  { icon: Phone, title: "Besvare innkommende telefoner", desc: "AI tar telefonen, identifiserer ønsket og svarer kunden umiddelbart." },
  { icon: ArrowRightLeft, title: "Videresende samtaler", desc: "AI vurderer henvendelsen og setter samtalen over til riktig person." },
  { icon: MessageSquare, title: "Ta imot og formidle beskjeder", desc: "AI registrerer beskjeden og sender den videre til deg umiddelbart." },
];

type Service = { icon: typeof Phone; title: string; desc: string };

const ServiceGrid = ({ items, variant }: { items: Service[]; variant: "manual" | "ai" }) => (
  <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((service, i) => (
      <motion.div
        key={service.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
        whileHover={{ y: -5 }}
        className="relative bg-card rounded-xl p-6 shadow-elevated group cursor-default"
      >
        <span
          className={
            variant === "ai"
              ? "absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full gradient-primary text-primary-foreground"
              : "absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full bg-muted text-muted-foreground"
          }
        >
          {variant === "ai" ? "AI" : "Manuell"}
        </span>
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <service.icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground pr-16">{service.title}</h3>
        <p className="mt-2 text-muted-foreground text-sm">{service.desc}</p>
      </motion.div>
    ))}
  </div>
);

const ServicesSection = () => (
  <section id="tjenester" className="py-24 gradient-primary-soft">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Komplett kundeservice — <span className="gradient-text">manuell og AI i ett</span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Resepsjonisten.no dekker alle kanaler — telefon, e-post, SMS og sosiale medier. Vi kombinerer dyktige medarbeidere med smart AI, slik at kundene dine alltid blir møtt profesjonelt, døgnet rundt.
        </p>
      </motion.div>

      <div className="mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <Users className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Manuelle tjenester</h3>
            <p className="text-muted-foreground text-sm">Levert av våre dyktige medarbeidere</p>
          </div>
        </motion.div>
        <ServiceGrid items={manualServices} variant="manual" />
      </div>

      <div className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">AI-tjenester</h3>
            <p className="text-muted-foreground text-sm">Automatisert og tilgjengelig 24/7</p>
          </div>
        </motion.div>
        <ServiceGrid items={aiServices} variant="ai" />
      </div>
    </div>
  </section>
);

export default ServicesSection;
