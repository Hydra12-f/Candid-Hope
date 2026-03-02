import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const PageHero = ({ title, subtitle, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative py-32 flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay/85" />
      </div>
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-on-dark text-lg md:text-xl max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
