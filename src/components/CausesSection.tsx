import { motion } from "framer-motion";
import cause1 from "@/assets/cause-1.jpg";
import cause2 from "@/assets/cause-2.jpg";
import cause3 from "@/assets/cause-3.jpg";

const causes = [
  {
    image: cause1,
    category: "Mentorship",
    title: "Youth Mentorship & Leadership Program",
    desc: "Guiding young people through structured mentorship for personal growth.",
    raised: 2500,
    goal: 8000,
  },
  {
    image: cause2,
    category: "Community",
    title: "Parent & Caregiver Support Initiative",
    desc: "Empowering parents with skills to support youth development at home.",
    raised: 4200,
    goal: 10000,
  },
  {
    image: cause3,
    category: "Education",
    title: "Life Skills Workshops for Schools",
    desc: "Delivering life skills training directly to schools across Nairobi.",
    raised: 1800,
    goal: 5000,
  },
];

const CausesSection = () => {
  return (
    <section id="causes" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold mb-2">Our Causes</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Find popular causes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {causes.map((cause, i) => (
            <motion.div
              key={cause.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  {cause.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{cause.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{cause.desc}</p>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all duration-700"
                    style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground font-medium">
                    Raised: <span className="text-secondary">${cause.raised.toLocaleString()}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Goal: ${cause.goal.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CausesSection;
