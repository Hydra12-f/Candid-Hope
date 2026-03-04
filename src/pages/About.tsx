import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Heart, Users, BookOpen, Target, Eye, Award } from "lucide-react";

const teamMembers = [
  {
    name: "David Kamau",
    role: "Founder & Director",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Sarah Njeri",
    role: "Programs Manager",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Peter Omondi",
    role: "Community Outreach Lead",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Faith Wambui",
    role: "Youth Coordinator",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const milestones = [
  { year: "2021", text: "Candid Hope founded in Nairobi" },
  { year: "2022", text: "First youth mentorship cohort of 50 participants" },
  { year: "2023", text: "Expanded to 5 schools with life skills training" },
  { year: "2024", text: "Launched parent/caregiver support program" },
  { year: "2025", text: "Reached 1,689+ community members" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="About Us"
          subtitle="Empowering the young generation and parents/caregivers in Nairobi with holistic life skills for desired change."
          backgroundImage="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        {/* Mission, Vision, Values */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Our Mission", text: "To empower the young generation and parents/caregivers in Nairobi with holistic life skills for desired change through mentorship, education, and community outreach." },
                { icon: Eye, title: "Our Vision", text: "A society where every young person and caregiver has the skills, confidence, and support to create a meaningful, empowered life." },
                { icon: Award, title: "Our Values", text: "Integrity, compassion, empowerment, and community are at the heart of everything we do. We believe in sustainable, people-driven change." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="bg-card p-8 rounded-2xl shadow-md text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story / Timeline */}
        <section className="py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">Our Journey</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                How we started
              </h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-6"
                >
                  <span className="text-secondary font-display font-bold text-2xl min-w-[80px]">{m.year}</span>
                  <div className="bg-card p-4 rounded-xl shadow-sm flex-1">
                    <p className="text-foreground">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">Meet The Team</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                The people behind Candid Hope
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-to-br from-[hsl(var(--cta-gradient-start))] to-[hsl(var(--cta-gradient-end))]">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "1,689+", label: "Community Members" },
                { value: "5+", label: "School Partners" },
                { value: "200+", label: "Youth Mentored" },
                { value: "50+", label: "Workshops Held" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-display font-bold text-secondary mb-2">{stat.value}</p>
                  <p className="text-text-on-dark text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
