import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Heart, Shield, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCauses } from "@/hooks/useCauses";
import DonationDialog from "@/components/DonationDialog";

const amounts = [500, 1000, 2500, 5000, 10000, 25000];

const impactItems = [
  { icon: Heart, amount: "KES 500", text: "Provides school supplies for one child for a term" },
  { icon: Users, amount: "KES 2,500", text: "Funds one youth through a full mentorship program" },
  { icon: Globe, amount: "KES 5,000", text: "Sponsors a life skills workshop at a local school" },
  { icon: Shield, amount: "KES 25,000", text: "Supports a month of community outreach programs" },
];

const Donation = () => {
  const { data: causes } = useCauses();
  const [selectedCause, setSelectedCause] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const causeObj = (causes || []).find((c) => c.slug === selectedCause);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="Make a Donation"
          subtitle="Your generosity fuels hope and change in Nairobi communities."
          backgroundImage="https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Donation CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Choose a Cause</h3>
                  <p className="text-muted-foreground mb-6">Select a cause and donate via M-Pesa.</p>

                  <div className="space-y-3 mb-8">
                    {(causes || []).map((cause) => {
                      const progress = cause.goal > 0 ? (cause.raised / cause.goal) * 100 : 0;
                      return (
                        <button
                          key={cause.slug}
                          onClick={() => setSelectedCause(cause.slug)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            selectedCause === cause.slug
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/50"
                          }`}
                        >
                          <p className="font-semibold text-foreground">{cause.title}</p>
                          <div className="w-full bg-muted rounded-full h-1.5 mt-2 mb-1">
                            <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            KES {cause.raised.toLocaleString()} raised of KES {cause.goal.toLocaleString()}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    onClick={() => { if (selectedCause) setDialogOpen(true); }}
                    disabled={!selectedCause}
                    className="w-full bg-secondary text-secondary-foreground hover:opacity-90 font-semibold py-4 rounded-full text-lg"
                  >
                    Donate via M-Pesa
                  </Button>

                  <p className="text-center text-muted-foreground text-xs mt-4 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> Your donation is secure via M-Pesa
                  </p>
                </div>
              </motion.div>

              {/* Impact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-secondary font-semibold mb-2">Your Impact</p>
                <h2 className="text-4xl font-display font-bold text-foreground mb-6">
                  See how your donation helps
                </h2>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                  Every shilling directly supports our programs in Nairobi. Here's how your contribution makes a difference:
                </p>

                <div className="space-y-6">
                  {impactItems.map((item, i) => (
                    <motion.div
                      key={item.amount}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="flex items-start gap-4 bg-card p-5 rounded-xl shadow-sm"
                    >
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-secondary text-lg">{item.amount}</p>
                        <p className="text-muted-foreground">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-gradient-to-br from-[hsl(var(--cta-gradient-start))] to-[hsl(var(--cta-gradient-end))] rounded-2xl">
                  <h4 className="font-display font-bold text-primary-foreground mb-4">Why Donate to Candid Hope?</h4>
                  <ul className="space-y-2 text-text-on-dark text-sm">
                    <li>✓ 100% of donations go directly to programs</li>
                    <li>✓ Transparent reporting on fund usage</li>
                    <li>✓ Registered nonprofit organization</li>
                    <li>✓ Serving Nairobi communities since 2021</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {causeObj && (
        <DonationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          causeSlug={causeObj.slug}
          causeTitle={causeObj.title}
        />
      )}
    </div>
  );
};

export default Donation;
