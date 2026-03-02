import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Grace Wanjiku",
    role: "Community Volunteer",
    text: "Candid Hope has transformed our community. The life skills programs have given our youth confidence and direction. I've seen firsthand how young people are becoming leaders.",
    stars: 5,
  },
  {
    name: "James Ochieng",
    role: "Parent & Supporter",
    text: "As a parent, the caregiver workshops changed how I relate to my children. The team at Candid Hope truly cares about every family they work with. I'm forever grateful.",
    stars: 5,
  },
  {
    name: "Mary Akinyi",
    role: "Youth Participant",
    text: "The mentorship program opened doors I never knew existed. I now have the skills and confidence to pursue my dreams. Candid Hope believes in us when others don't.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 bg-muted">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold mb-2">Our Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Voices sharing our mission
          </h2>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="bg-card p-10 rounded-2xl shadow-lg"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].stars }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                ))}
              </div>
              <p className="text-foreground text-lg leading-relaxed mb-8 italic">
                "{testimonials[current].text}"
              </p>
              <p className="font-display text-xl font-bold text-foreground">
                {testimonials[current].name}
              </p>
              <p className="text-muted-foreground text-sm">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
