import { motion } from "framer-motion";
import { HeartHandshake, Users, HandCoins } from "lucide-react";

const services = [
  { icon: HeartHandshake, title: "Life Skills", desc: "Holistic youth empowerment." },
  { icon: Users, title: "Mentorship", desc: "Guiding the next generation." },
  { icon: HandCoins, title: "Funds Raised", desc: "Community-driven support." },
];

const ServicesStrip = () => {
  return (
    <section className="relative z-20 -mt-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-xl">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`flex items-center gap-4 p-8 ${
                i === 1 ? "bg-secondary text-secondary-foreground" : "bg-card text-card-foreground"
              }`}
            >
              <div className={`p-3 rounded-full ${i === 1 ? "bg-card/20" : "bg-secondary/10"}`}>
                <s.icon className={`w-8 h-8 ${i === 1 ? "text-secondary-foreground" : "text-secondary"}`} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className={`text-sm ${i === 1 ? "opacity-90" : "text-muted-foreground"}`}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStrip;
