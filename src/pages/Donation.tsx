import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Heart, Shield, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const amounts = [10, 25, 50, 100, 250, 500];

const impactItems = [
  { icon: Heart, amount: "$10", text: "Provides school supplies for one child for a term" },
  { icon: Users, amount: "$50", text: "Funds one youth through a full mentorship program" },
  { icon: Globe, amount: "$100", text: "Sponsors a life skills workshop at a local school" },
  { icon: Shield, amount: "$500", text: "Supports a month of community outreach programs" },
];

const Donation = () => {
  const [selected, setSelected] = useState<number | null>(50);
  const [custom, setCustom] = useState("");

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
              {/* Donation Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Choose an Amount</h3>
                  <p className="text-muted-foreground mb-6">Every contribution makes a difference.</p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {amounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => { setSelected(amount); setCustom(""); }}
                        className={`py-3 rounded-xl font-semibold transition-all text-lg ${
                          selected === amount
                            ? "bg-secondary text-secondary-foreground shadow-md"
                            : "bg-muted text-foreground hover:bg-secondary/20"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  <div className="mb-8">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Custom Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={custom}
                      onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-display font-bold text-foreground">Personal Information</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" className="bg-background" />
                      <Input placeholder="Last Name" className="bg-background" />
                    </div>
                    <Input type="email" placeholder="Email Address" className="bg-background" />
                    <Input type="tel" placeholder="Phone Number" className="bg-background" />
                  </div>

                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold py-4 rounded-full text-lg">
                    Donate ${selected || custom || "0"} Now
                  </Button>

                  <p className="text-center text-muted-foreground text-xs mt-4 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> Your donation is secure and encrypted
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
                  Every dollar directly supports our programs in Nairobi. Here's how your contribution makes a difference:
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

                {/* Trust indicators */}
                <div className="mt-12 p-6 bg-primary rounded-2xl">
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
    </div>
  );
};

export default Donation;
