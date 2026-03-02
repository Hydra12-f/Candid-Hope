import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Children smiling in Nairobi" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay/80" />
      </div>

      <div className="container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="font-display italic text-secondary text-lg mb-4">
            Help make a difference
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Lend Your{" "}
            <span className="text-secondary underline underline-offset-8 decoration-secondary/50">Heart</span>{" "}
            To Change A{" "}
            <span className="text-secondary underline underline-offset-8 decoration-secondary/50">Youth's</span>{" "}
            Story
          </h1>
          <p className="text-text-on-dark text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            Empowering the young generation and parents/caregivers in Nairobi with holistic life skills for desired change.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/donation">
              <Button className="bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold px-8 py-6 text-base rounded-full">
                DONATE NOW
              </Button>
            </Link>
            <Link to="/volunteers" className="flex items-center gap-3 text-primary-foreground hover:text-secondary transition-colors group">
              <Heart className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              <span className="font-semibold tracking-wide">BE A VOLUNTEER</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
