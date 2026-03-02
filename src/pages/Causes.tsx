import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const causes = [
  {
    image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Mentorship",
    title: "Youth Mentorship & Leadership Program",
    desc: "Guiding young people through structured mentorship for personal growth. This program pairs youth with experienced mentors who provide guidance, support, and life skills training.",
    raised: 2500,
    goal: 8000,
  },
  {
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Community",
    title: "Parent & Caregiver Support Initiative",
    desc: "Empowering parents with skills to support youth development at home. Workshops cover communication, conflict resolution, and positive parenting techniques.",
    raised: 4200,
    goal: 10000,
  },
  {
    image: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Education",
    title: "Life Skills Workshops for Schools",
    desc: "Delivering life skills training directly to schools across Nairobi, reaching hundreds of students with practical tools for everyday challenges.",
    raised: 1800,
    goal: 5000,
  },
  {
    image: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Health",
    title: "Mental Health Awareness Campaign",
    desc: "Breaking stigma around mental health in Nairobi communities. Providing access to counseling, support groups, and educational resources for youth and families.",
    raised: 3100,
    goal: 7000,
  },
  {
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Skills",
    title: "Digital Literacy for Youth",
    desc: "Teaching essential computer and internet skills to young people, preparing them for the modern job market and empowering them with digital tools.",
    raised: 900,
    goal: 6000,
  },
  {
    image: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Nutrition",
    title: "Nutrition & Feeding Program",
    desc: "Providing nutritious meals and food education to underserved children and families to improve health outcomes and academic performance.",
    raised: 5500,
    goal: 12000,
  },
];

const Causes = () => {
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {causes.map((cause, i) => (
                <motion.div
                  key={cause.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      {cause.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{cause.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{cause.desc}</p>
                    <div className="w-full bg-muted rounded-full h-2 mb-3">
                      <div
                        className="bg-secondary h-2 rounded-full transition-all duration-700"
                        style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-foreground font-medium">
                        Raised: <span className="text-secondary">${cause.raised.toLocaleString()}</span>
                      </span>
                      <span className="text-muted-foreground">Goal: ${cause.goal.toLocaleString()}</span>
                    </div>
                    <Link
                      to="/donation"
                      className="inline-block bg-secondary text-secondary-foreground text-sm font-semibold px-6 py-2 rounded-full hover:bg-orange-glow transition-colors"
                    >
                      Donate Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Causes;
