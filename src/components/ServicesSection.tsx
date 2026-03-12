import { motion } from "framer-motion";
import { Phone, ArrowRightLeft, MessageSquare, Filter, CalendarCheck, Package } from "lucide-react";
import servicesImg from "@/assets/services-section.jpg";

const services = [
  { icon: Phone, title: "Besvare innkommende telefoner", desc: "Vi svarer profesjonelt på vegne av din bedrift." },
  { icon: ArrowRightLeft, title: "Videresende samtaler", desc: "Viktige samtaler sendes direkte til riktig person." },
  { icon: MessageSquare, title: "Ta imot og formidle beskjeder", desc: "Alle beskjeder leveres raskt og nøyaktig." },
  { icon: Filter, title: "Filtrere henvendelser", desc: "Vi sorterer og prioriterer henvendelsene for deg." },
  { icon: CalendarCheck, title: "Håndtere booking og timebestillinger", desc: "Vi booker avtaler direkte i din kalender." },
  { icon: Package, title: "Håndtere bestillinger", desc: "Bestillinger i større løsninger administreres effektivt." },
];

const ServicesSection = () => (
  <section id="tjenester" className="py-24 gradient-primary-soft">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Våre tjenester</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Vi tar telefonen for deg — <span className="gradient-text">profesjonelt og effektivt</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Resepsjonisten.no fungerer som en ekstern resepsjonist for bedriften din. Vi svarer på innkommende telefoner og sørger for at kundene dine blir møtt profesjonelt hver gang.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-elevated"
        >
          <img src={servicesImg} alt="Vårt profesjonelle team" className="w-full h-64 md:h-80 object-cover" />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
