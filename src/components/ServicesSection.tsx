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
} from "lucide-react";

const services = [
  { icon: Phone, title: "Besvare innkommende telefoner", desc: "Vi svarer profesjonelt på vegne av din bedrift." },
  { icon: ArrowRightLeft, title: "Videresende samtaler", desc: "Viktige samtaler sendes direkte til riktig person." },
  { icon: MessageSquare, title: "Ta imot og formidle beskjeder", desc: "Alle beskjeder leveres raskt og nøyaktig." },
  { icon: Filter, title: "Filtrere henvendelser", desc: "Vi sorterer og prioriterer henvendelsene for deg." },
  { icon: CalendarCheck, title: "Håndtere booking og timebestillinger", desc: "Vi booker avtaler direkte i din kalender." },
  { icon: Package, title: "Håndtere bestillinger", desc: "Bestillinger i større løsninger administreres effektivt." },
  { icon: Clock, title: "AI utenom åpningstid", desc: "Vi er tilgjengelig 24/7, også når kontoret er stengt." },
  { icon: Mail, title: "E-postbesvarelse", desc: "Vi besvarer kundehenvendelser via e-post raskt og profesjonelt." },
  { icon: Smartphone, title: "SMS-håndtering", desc: "Vi sender og mottar SMS på vegne av deg." },
  { icon: Share2, title: "Sosiale medier", desc: "Vi svarer på henvendelser fra Facebook, TikTok og Instagram." },
  { icon: Mic, title: "Lydopptak av samtaler", desc: "Alle samtaler kan tas opp for kvalitet og dokumentasjon." },
];

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

      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-card rounded-xl p-6 shadow-elevated group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <service.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
            <p className="mt-2 text-muted-foreground text-sm">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
