import { useParams, Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import DonationDialog from "@/components/DonationDialog";
import { motion } from "framer-motion";
import { Heart, Users, Target, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCauses } from "@/hooks/useCauses";

const causesMeta: Record<string, {
  category: string;
  image: string;
  heroImage: string;
  desc: string;
  fullDesc: string;
  milestones: string[];
  impact: { label: string; value: string }[];
  gallery: string[];
}> = {
  "youth-mentorship-leadership-program": {
    category: "Mentorship",
    image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260",
    desc: "Guiding young people through structured mentorship for personal growth.",
    fullDesc: "Our Youth Mentorship & Leadership Program pairs young people with experienced mentors who provide guidance, support, and life skills training. Through weekly sessions, workshops, and community projects, participants develop confidence, communication skills, and a vision for their future. The program targets youth aged 14-24 across Nairobi's underserved communities.",
    milestones: ["Enrolled 120 youth across 5 communities", "Trained 30 volunteer mentors", "Hosted 12 leadership workshops", "3 participants received university scholarships"],
    impact: [{ label: "Youth Mentored", value: "120+" }, { label: "Mentors Trained", value: "30" }, { label: "Workshops Held", value: "12" }, { label: "Communities Reached", value: "5" }],
    gallery: ["https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600"],
  },
  "parent-caregiver-support-initiative": {
    category: "Community",
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260",
    desc: "Empowering parents with skills to support youth development at home.",
    fullDesc: "The Parent & Caregiver Support Initiative equips parents and guardians with tools for positive parenting, communication, and conflict resolution. Through community workshops, home visits, and support groups, we strengthen the family unit as the foundation for youth development.",
    milestones: ["Conducted 24 parenting workshops", "Reached 200+ families through home visits", "Established 8 parent support groups", "Reduced school dropout rates by 15% in target areas"],
    impact: [{ label: "Families Reached", value: "200+" }, { label: "Workshops Done", value: "24" }, { label: "Support Groups", value: "8" }, { label: "Dropout Reduction", value: "15%" }],
    gallery: ["https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600"],
  },
  "life-skills-workshops-for-schools": {
    category: "Education",
    image: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=1260",
    desc: "Delivering life skills training directly to schools across Nairobi.",
    fullDesc: "Our Life Skills Workshops for Schools bring practical, age-appropriate life skills training directly into classrooms across Nairobi. We work with school administrations to integrate modules on decision-making, self-awareness, empathy, financial literacy, and digital safety.",
    milestones: ["Partnered with 15 schools across Nairobi", "Trained 500+ students in life skills", "Developed 6 curriculum modules", "Trained 20 teachers as facilitators"],
    impact: [{ label: "Schools Partnered", value: "15" }, { label: "Students Trained", value: "500+" }, { label: "Modules Created", value: "6" }, { label: "Teachers Trained", value: "20" }],
    gallery: ["https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600"],
  },
  "mental-health-awareness-campaign": {
    category: "Health",
    image: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260",
    desc: "Breaking stigma around mental health in Nairobi communities.",
    fullDesc: "Our Mental Health Awareness Campaign tackles the stigma surrounding mental health in Nairobi's communities. Through community dialogues, school assemblies, social media outreach, and partnerships with local health facilities, we provide education, early intervention, and access to counseling services.",
    milestones: ["Reached 1,000+ community members through dialogues", "Provided counseling to 80 youth", "Trained 15 peer counselors", "Launched social media campaign reaching 50K+ people"],
    impact: [{ label: "People Reached", value: "1,000+" }, { label: "Youth Counseled", value: "80" }, { label: "Peer Counselors", value: "15" }, { label: "Online Reach", value: "50K+" }],
    gallery: ["https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600"],
  },
  "digital-literacy-for-youth": {
    category: "Skills",
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260",
    desc: "Teaching essential computer and internet skills to young people.",
    fullDesc: "The Digital Literacy for Youth program equips young people with essential computer, internet, and digital safety skills. In a world increasingly driven by technology, we ensure that youth in underserved communities are not left behind.",
    milestones: ["Set up 2 community computer labs", "Trained 60 youth in basic computing", "Introduced coding to 25 students", "Partnered with 3 tech companies for mentorship"],
    impact: [{ label: "Youth Trained", value: "60" }, { label: "Computer Labs", value: "2" }, { label: "Coding Students", value: "25" }, { label: "Tech Partners", value: "3" }],
    gallery: ["https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600"],
  },
  "nutrition-feeding-program": {
    category: "Nutrition",
    image: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=800",
    heroImage: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=1260",
    desc: "Providing nutritious meals and food education to underserved children and families.",
    fullDesc: "Our Nutrition & Feeding Program addresses food insecurity among children and families in Nairobi's most vulnerable communities. We provide daily nutritious meals, conduct nutrition education workshops, and partner with local farmers to ensure sustainable food access.",
    milestones: ["Serving 300+ daily meals across 4 centers", "Conducted 16 nutrition workshops", "Partnered with 5 local farms", "Reduced malnutrition rates by 20% in target areas"],
    impact: [{ label: "Daily Meals", value: "300+" }, { label: "Feeding Centers", value: "4" }, { label: "Farm Partners", value: "5" }, { label: "Malnutrition Drop", value: "20%" }],
    gallery: ["https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600"],
  },
};

const CauseDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: causes } = useCauses();
  const [donationOpen, setDonationOpen] = useState(false);

  const causeDb = (causes || []).find((c) => c.slug === slug);
  const meta = slug ? causesMeta[slug] : null;

  if (!meta || !causeDb) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Cause Not Found</h1>
          <p className="text-muted-foreground mb-8">The cause you're looking for doesn't exist.</p>
          <Link to="/causes" className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            View All Causes
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const progressPercent = Math.round((causeDb.raised / causeDb.goal) * 100);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero title={causeDb.title} subtitle={meta.desc} backgroundImage={meta.heroImage} />

        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <img src={meta.image} alt={causeDb.title} className="w-full rounded-2xl aspect-video object-cover shadow-lg" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-4">About This Cause</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{meta.fullDesc}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {meta.impact.map((item) => (
                    <div key={item.label} className="bg-muted rounded-xl p-5 text-center">
                      <p className="text-2xl font-display font-bold text-secondary">{item.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">Key Milestones</h2>
                  <div className="space-y-4">
                    {meta.milestones.map((milestone, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                        <p className="text-foreground">{milestone}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">Gallery</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {meta.gallery.map((img, i) => (
                      <img key={i} src={img} alt={`${causeDb.title} gallery ${i + 1}`} className="w-full aspect-square object-cover rounded-xl hover:scale-105 transition-transform duration-300" />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-card rounded-2xl p-8 shadow-lg sticky top-8">
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {meta.category}
                  </span>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground font-semibold">{progressPercent}% Funded</span>
                      <span className="text-muted-foreground">KES {causeDb.goal.toLocaleString()} goal</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-secondary h-3 rounded-full transition-all duration-700" style={{ width: `${Math.min(progressPercent, 100)}%` }} />
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-foreground font-bold text-lg">KES {causeDb.raised.toLocaleString()}</p>
                        <p className="text-muted-foreground text-xs">Raised so far</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-foreground font-bold text-lg">{causeDb.supporters}</p>
                        <p className="text-muted-foreground text-xs">Supporters</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-foreground font-bold text-lg">KES {causeDb.goal.toLocaleString()}</p>
                        <p className="text-muted-foreground text-xs">Goal</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setDonationOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                  >
                    Donate Now <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />

      <DonationDialog
        open={donationOpen}
        onOpenChange={setDonationOpen}
        causeSlug={causeDb.slug}
        causeTitle={causeDb.title}
      />
    </div>
  );
};

export default CauseDetails;
