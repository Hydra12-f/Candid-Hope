import { motion } from "framer-motion";

const partners = [
  { name: "UNICEF Kenya", logo: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Nairobi County", logo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "World Vision", logo: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Kenya Red Cross", logo: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=200" },
  { name: "Save the Children", logo: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=200" },
];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-secondary font-semibold mb-2">Our Partners & Supporters</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Trusted by leading organizations
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-border group-hover:border-secondary transition-colors shadow-sm">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
