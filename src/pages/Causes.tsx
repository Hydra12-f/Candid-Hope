import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import DonationDialog from "@/components/DonationDialog";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCauses } from "@/hooks/useCauses";

const causeImages: Record<string, string> = {
  "youth-mentorship-leadership-program": "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
  "parent-caregiver-support-initiative": "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
  "life-skills-workshops-for-schools": "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600",
  "mental-health-awareness-campaign": "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600",
  "digital-literacy-for-youth": "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
  "nutrition-feeding-program": "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600",
};

const causeCategories: Record<string, string> = {
  "youth-mentorship-leadership-program": "Mentorship",
  "parent-caregiver-support-initiative": "Community",
  "life-skills-workshops-for-schools": "Education",
  "mental-health-awareness-campaign": "Health",
  "digital-literacy-for-youth": "Skills",
  "nutrition-feeding-program": "Nutrition",
};

const causeDescs: Record<string, string> = {
  "youth-mentorship-leadership-program": "Guiding young people through structured mentorship for personal growth. This program pairs youth with experienced mentors who provide guidance, support, and life skills training.",
  "parent-caregiver-support-initiative": "Empowering parents with skills to support youth development at home. Workshops cover communication, conflict resolution, and positive parenting techniques.",
  "life-skills-workshops-for-schools": "Delivering life skills training directly to schools across Nairobi, reaching hundreds of students with practical tools for everyday challenges.",
  "mental-health-awareness-campaign": "Breaking stigma around mental health in Nairobi communities. Providing access to counseling, support groups, and educational resources for youth and families.",
  "digital-literacy-for-youth": "Teaching essential computer and internet skills to young people, preparing them for the modern job market and empowering them with digital tools.",
  "nutrition-feeding-program": "Providing nutritious meals and food education to underserved children and families to improve health outcomes and academic performance.",
};

const Causes = () => {
  const { data: causes, isLoading } = useCauses();
  const [donationCause, setDonationCause] = useState<{ slug: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="Our Causes"
          subtitle="Support the initiatives that matter most to our communities in Nairobi."
          backgroundImage="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        <section className="py-24 bg-background">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading causes...</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(causes || []).map((cause, i) => {
                  const progress = cause.goal > 0 ? (cause.raised / cause.goal) * 100 : 0;
                  return (
                    <motion.div
                      key={cause.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                    >
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={causeImages[cause.slug] || "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600"}
                          alt={cause.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                          {causeCategories[cause.slug] || "Cause"}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">{cause.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{causeDescs[cause.slug] || ""}</p>
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
                          <span className="text-muted-foreground">Goal: KES {cause.goal.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-3">
                          <Link
                            to={`/causes/${cause.slug}`}
                            className="inline-block bg-foreground text-background text-sm font-semibold px-5 py-2 rounded-full hover:opacity-80 transition-opacity"
                          >
                            Learn More
                          </Link>
                          <button
                            onClick={() => setDonationCause({ slug: cause.slug, title: cause.title })}
                            className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
                          >
                            Donate Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />

      {donationCause && (
        <DonationDialog
          open={!!donationCause}
          onOpenChange={(open) => { if (!open) setDonationCause(null); }}
          causeSlug={donationCause.slug}
          causeTitle={donationCause.title}
        />
      )}
    </div>
  );
};

export default Causes;
