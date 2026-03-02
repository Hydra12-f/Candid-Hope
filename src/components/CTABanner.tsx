import { motion } from "framer-motion";

const CTABanner = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
            Help us build a future filled with hope and opportunities
          </h2>
          <p className="text-text-on-dark text-lg mb-10 max-w-xl mx-auto">
            Every small contribution can create a meaningful change in a young person's life in Nairobi.
          </p>
          <a
            href="#contact"
            className="inline-block bg-secondary text-secondary-foreground font-semibold px-10 py-4 rounded-full hover:bg-orange-glow transition-colors text-lg"
          >
            Donate Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
