import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";
import { Megaphone, Gift, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ideas = [
  {
    icon: Megaphone,
    title: "Social Media Campaign",
    desc: "Use your social platforms to spread the word and collect donations from friends and family.",
  },
  {
    icon: Gift,
    title: "Birthday Fundraiser",
    desc: "Dedicate your birthday to raising funds for Candid Hope instead of receiving gifts.",
  },
  {
    icon: Users,
    title: "Community Event",
    desc: "Organize a local event — a bake sale, fun run, or dinner — to raise funds and awareness.",
  },
  {
    icon: TrendingUp,
    title: "Corporate Match",
    desc: "Check if your employer offers donation matching to double the impact of your fundraiser.",
  },
];

const activeFundraisers = [
  {
    image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Run for Hope 5K Challenge",
    organizer: "James M.",
    raised: 1200,
    goal: 3000,
  },
  {
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Tech for Youth Fundraiser",
    organizer: "Sarah K.",
    raised: 4500,
    goal: 5000,
  },
  {
    image: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Feed the Children Holiday Drive",
    organizer: "Community Group",
    raised: 8000,
    goal: 10000,
  },
];

const Fundraise = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="Start a Fundraiser"
          subtitle="Rally your community to raise funds for causes that matter."
          backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        {/* How it works */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">Fundraising Ideas</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Ways to raise funds
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {ideas.map((idea, i) => (
                <motion.div
                  key={idea.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <idea.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{idea.title}</h3>
                  <p className="text-muted-foreground text-sm">{idea.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Fundraisers */}
        <section className="py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">Active Campaigns</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Join an active fundraiser
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {activeFundraisers.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <img src={f.image} alt={f.title} className="w-full aspect-video object-cover" />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{f.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">by {f.organizer}</p>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div
                        className="bg-secondary h-2 rounded-full"
                        style={{ width: `${(f.raised / f.goal) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary font-medium">${f.raised.toLocaleString()}</span>
                      <span className="text-muted-foreground">of ${f.goal.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Start Your Fundraiser Form */}
        <section className="py-24 bg-background">
          <div className="container max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-card p-8 md:p-10 rounded-2xl shadow-lg"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-2 text-center">
                Start Your Fundraiser
              </h3>
              <p className="text-muted-foreground text-center mb-8">
                Tell us about your fundraising idea and we'll help you get started.
              </p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="Your Full Name" className="bg-background" />
                <Input type="email" placeholder="Email Address" className="bg-background" />
                <Input placeholder="Fundraiser Title" className="bg-background" />
                <Input type="number" placeholder="Fundraising Goal ($)" className="bg-background" />
                <Textarea placeholder="Describe your fundraising idea..." rows={4} className="bg-background" />
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold py-3 rounded-full text-base">
                  Submit Fundraiser Idea
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Fundraise;
