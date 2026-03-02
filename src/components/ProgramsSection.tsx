import { motion } from "framer-motion";
import { GraduationCap, HeartPulse, BookOpen, Shield } from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "Life Skills Training",
    desc: "Equipping youth with essential life skills including decision-making, communication, and leadership.",
  },
  {
    icon: HeartPulse,
    title: "Health & Wellness",
    desc: "Promoting mental health awareness and physical well-being among young people and caregivers.",
  },
  {
    icon: BookOpen,
    title: "Education Support",
    desc: "Providing educational resources and mentorship to help youth build their own futures.",
  },
  {
    icon: Shield,
    title: "Community Outreach",
    desc: "Engaging parents and caregivers in holistic community development programs.",
  },
];

const ProgramsSection = () => {
  return (
    <section id="services" className="py-24 bg-muted">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold mb-2">Our Programs</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Empowering Communities, Changing Lives
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors">
                <p.icon className="w-8 h-8 text-secondary group-hover:text-secondary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
