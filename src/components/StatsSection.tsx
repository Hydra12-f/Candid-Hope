import { motion } from "framer-motion";
import { Heart, Users, GraduationCap, Globe } from "lucide-react";

const stats = [
  {
    icon: Heart,
    value: "1,689+",
    label: "Families Helped",
    iconBg: "bg-[hsl(var(--stats-icon-yellow))]/20",
    iconColor: "text-[hsl(var(--stats-icon-yellow))]",
  },
  {
    icon: Users,
    value: "150+",
    label: "Active Volunteers",
    iconBg: "bg-[hsl(var(--stats-icon-blue))]/20",
    iconColor: "text-[hsl(var(--stats-icon-blue))]",
  },
  {
    icon: GraduationCap,
    value: "45+",
    label: "Programs",
    iconBg: "bg-[hsl(var(--stats-icon-purple))]/20",
    iconColor: "text-[hsl(var(--stats-icon-purple))]",
  },
  {
    icon: Globe,
    value: "12+",
    label: "Communities Served",
    iconBg: "bg-[hsl(var(--stats-icon-orange))]/20",
    iconColor: "text-[hsl(var(--stats-icon-orange))]",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-section-warm">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className={`w-14 h-14 mx-auto mb-4 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </div>
              <p className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
