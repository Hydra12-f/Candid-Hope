import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Heart, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const roles = [
  {
    icon: Heart,
    title: "Mentor",
    desc: "Guide and support youth through one-on-one mentorship sessions. Requires commitment of 2-4 hours per week.",
    commitment: "4 hrs/week",
  },
  {
    icon: Users,
    title: "Workshop Facilitator",
    desc: "Lead life skills workshops in schools and community centers across Nairobi.",
    commitment: "8 hrs/month",
  },
  {
    icon: Star,
    title: "Event Coordinator",
    desc: "Help organize community events, fundraisers, and awareness campaigns.",
    commitment: "Flexible",
  },
  {
    icon: Clock,
    title: "Administrative Support",
    desc: "Assist with office tasks, social media management, and program documentation.",
    commitment: "5 hrs/week",
  },
];

const volunteers = [
  {
    name: "Grace Wanjiku",
    role: "Mentor since 2022",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Volunteering with Candid Hope has been the most rewarding experience of my life.",
  },
  {
    name: "Samuel Kiprotich",
    role: "Workshop Facilitator",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Seeing the impact on these young lives motivates me every single day.",
  },
  {
    name: "Lucy Adhiambo",
    role: "Event Coordinator",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Together we create change that lasts. This is community at its best.",
  },
];

const Volunteers = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="Become a Volunteer"
          subtitle="Join our team of dedicated volunteers making a difference in Nairobi."
          backgroundImage="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        {/* Volunteer Roles */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">How You Can Help</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Volunteer Opportunities
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {roles.map((role, i) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <role.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{role.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{role.desc}</p>
                  <span className="inline-block bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {role.commitment}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Testimonials */}
        <section className="py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">Our Volunteers</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Hear from our team
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {volunteers.map((v, i) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md text-center"
                >
                  <img src={v.image} alt={v.name} className="w-full aspect-square object-cover" />
                  <div className="p-6">
                    <p className="text-foreground italic mb-4">"{v.quote}"</p>
                    <p className="font-display font-bold text-foreground">{v.name}</p>
                    <p className="text-muted-foreground text-sm">{v.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Signup Form */}
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
                Sign Up to Volunteer
              </h3>
              <p className="text-muted-foreground text-center mb-8">
                Fill out the form below and we'll get back to you within 48 hours.
              </p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="bg-background" />
                  <Input placeholder="Last Name" className="bg-background" />
                </div>
                <Input type="email" placeholder="Email Address" className="bg-background" />
                <Input type="tel" placeholder="Phone Number" className="bg-background" />
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Why do you want to volunteer?
                  </label>
                  <Textarea placeholder="Tell us a bit about yourself and your motivation..." rows={4} className="bg-background" />
                </div>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold py-3 rounded-full text-base">
                  Submit Application
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteers;
