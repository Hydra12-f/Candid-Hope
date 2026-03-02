import { motion } from "framer-motion";
import { Heart, Users, BookOpen } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src={aboutImage}
              alt="Candid Hope community gathering"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-square"
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-2xl shadow-lg hidden md:block">
              <p className="text-3xl font-display font-bold">1,689+</p>
              <p className="text-sm opacity-90">Community Members</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-secondary font-body font-semibold mb-2">Welcome, let's make a difference!</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              A trusted nonprofit empowering youth in Nairobi
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Since 2021, Candid Hope has been empowering the young generation and parents/caregivers in Nairobi with holistic life skills for desired change. We believe in equipping communities with tools for lasting transformation.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Heart, text: "Providing holistic life skills to underserved youth" },
                { icon: Users, text: "Supporting parents and caregivers with resources" },
                { icon: BookOpen, text: "Facilitating mentorship and education programs" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <a
              href="#causes"
              className="inline-block bg-secondary text-secondary-foreground font-semibold px-8 py-3 rounded-full hover:bg-orange-glow transition-colors"
            >
              Support Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
