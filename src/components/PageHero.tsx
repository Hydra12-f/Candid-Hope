import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const PageHero = ({ title, subtitle, backgroundImage }: PageHeroProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <section className="relative py-28 md:py-36 flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay))]/95 via-[hsl(var(--hero-overlay))]/80 to-[hsl(var(--hero-overlay))]/60" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 border border-secondary/10 rounded-full" />
      <div className="absolute bottom-10 right-20 w-40 h-40 border border-secondary/15 rounded-full" />
      <div className="absolute -left-10 bottom-0 w-56 h-56 bg-secondary/5 rounded-full blur-2xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-6">
            <Link
              to="/"
              className="text-text-on-dark/70 hover:text-secondary transition-colors"
            >
              Home
            </Link>
            {pathSegments.map((segment, i) => (
              <span key={segment} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-text-on-dark/40" />
                <span className={i === pathSegments.length - 1 ? "text-secondary font-medium" : "text-text-on-dark/70"}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")}
                </span>
              </span>
            ))}
          </nav>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-on-dark/80 text-lg md:text-xl max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Accent bar */}
          <div className="mt-8 flex items-center gap-2">
            <div className="w-12 h-1 bg-secondary rounded-full" />
            <div className="w-6 h-1 bg-secondary/50 rounded-full" />
            <div className="w-3 h-1 bg-secondary/25 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
