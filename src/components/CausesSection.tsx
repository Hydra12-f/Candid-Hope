import { motion } from "framer-motion";
import { useState } from "react";
import { useCauses } from "@/hooks/useCauses";
import DonationDialog from "@/components/DonationDialog";
import cause1 from "@/assets/cause-1.jpg";
import cause2 from "@/assets/cause-2.jpg";
import cause3 from "@/assets/cause-3.jpg";

const causeImages: Record<string, string> = {
  "youth-mentorship-leadership-program": cause1,
  "parent-caregiver-support-initiative": cause2,
  "life-skills-workshops-for-schools": cause3,
};

const causeCategories: Record<string, string> = {
  "youth-mentorship-leadership-program": "Mentorship",
  "parent-caregiver-support-initiative": "Community",
  "life-skills-workshops-for-schools": "Education",
};

const CausesSection = () => {
  const { data: causes } = useCauses();
  const [donationCause, setDonationCause] = useState<{ slug: string; title: string } | null>(null);

  // Show only first 3 causes on homepage
  const displayCauses = (causes || []).slice(0, 3);

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
          {displayCauses.map((cause, i) => {
            const progress = cause.goal > 0 ? (cause.raised / cause.goal) * 100 : 0;
            return (
              <motion.div
                key={cause.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={causeImages[cause.slug] || cause1}
                    alt={cause.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {causeCategories[cause.slug] || "Cause"}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{cause.title}</h3>

                  <div className="w-full bg-muted rounded-full h-2 mb-3">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-foreground font-medium">
                      Raised: <span className="text-secondary">KES {cause.raised.toLocaleString()}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Goal: KES {cause.goal.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => setDonationCause({ slug: cause.slug, title: cause.title })}
                    className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Donate Now
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {donationCause && (
        <DonationDialog
          open={!!donationCause}
          onOpenChange={(open) => { if (!open) setDonationCause(null); }}
          causeSlug={donationCause.slug}
          causeTitle={donationCause.title}
        />
      )}
    </section>
  );
};

export default CausesSection;
