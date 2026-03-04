import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const events = [
  {
    slug: "youth-leadership-summit-2025",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260",
    title: "Youth Leadership Summit 2025",
    date: "March 15, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Nairobi Community Center",
    spots: 50,
    desc: "A full-day summit bringing together young leaders from across Nairobi for workshops, networking, and inspiration.",
    details: "Join us for an immersive day of leadership development featuring keynote speakers, interactive workshops on public speaking and project management, networking sessions with industry professionals, and a community action planning exercise. Lunch and materials provided. Open to youth aged 16-25.",
  },
  {
    slug: "parent-caregiver-workshop",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260",
    title: "Parent & Caregiver Workshop",
    date: "April 5, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Candid Hope Office, Nairobi",
    spots: 30,
    desc: "Interactive workshop on positive parenting, communication skills, and supporting youth mental health at home.",
    details: "This hands-on workshop equips parents and caregivers with practical tools for supporting their children's emotional and social development. Topics include active listening techniques, setting healthy boundaries, understanding adolescent behavior, and creating a supportive home environment. Light refreshments provided.",
  },
  {
    slug: "life-skills-training-bootcamp",
    image: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=1260",
    title: "Life Skills Training Bootcamp",
    date: "May 10-12, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "Various Schools, Nairobi",
    spots: 100,
    desc: "Three-day intensive bootcamp covering decision-making, financial literacy, and career planning for secondary school students.",
    details: "This comprehensive 3-day program brings together secondary school students for intensive life skills training. Day 1 focuses on self-awareness and decision-making, Day 2 covers financial literacy and entrepreneurship basics, and Day 3 addresses career planning and goal-setting. Certificate of completion provided.",
  },
  {
    slug: "community-fun-day-fundraiser",
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260",
    title: "Community Fun Day & Fundraiser",
    date: "June 21, 2025",
    time: "11:00 AM - 6:00 PM",
    location: "Uhuru Gardens, Nairobi",
    spots: 200,
    desc: "A family-friendly day of activities, entertainment, and fundraising to support Candid Hope's programs.",
    details: "Bring the whole family for a day of fun and community! Activities include live music performances, children's games and face painting, food stalls featuring local cuisine, a silent auction with donated items, and a charity walk. All proceeds support Candid Hope's youth empowerment programs. Entry is free; donations encouraged.",
  },
];

const EventRegistration = () => {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <main className="py-32 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Event Not Found</h1>
          <Link to="/events" className="text-secondary hover:underline">← Back to Events</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title={event.title}
          subtitle={event.desc}
          backgroundImage={event.image}
        />

        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Event Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 text-secondary hover:text-orange-glow font-semibold transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4" /> All Events
                </Link>

                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full aspect-video object-cover rounded-2xl mb-8 shadow-lg"
                />

                <div className="space-y-4 mb-8">
                  {[
                    { icon: Calendar, label: event.date },
                    { icon: Clock, label: event.time },
                    { icon: MapPin, label: event.location },
                    { icon: Users, label: `${event.spots} spots available` },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-section-green-soft rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-secondary" />
                      </div>
                      <span className="text-foreground font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-section-warm rounded-2xl p-6">
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed">{event.details}</p>
                </div>
              </motion.div>

              {/* Registration Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-3"
              >
                <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg sticky top-28">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Register for This Event
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Fill in your details below to secure your spot.
                  </p>
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">First Name *</label>
                        <Input placeholder="John" className="bg-background" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name *</label>
                        <Input placeholder="Doe" className="bg-background" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address *</label>
                      <Input type="email" placeholder="john@example.com" className="bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label>
                      <Input type="tel" placeholder="+254 700 000 000" className="bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Age Group</label>
                      <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground">
                        <option>Select age group</option>
                        <option>Under 18</option>
                        <option>18-25</option>
                        <option>26-35</option>
                        <option>36-45</option>
                        <option>46+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Number of Attendees</label>
                      <Input type="number" min="1" max="5" defaultValue="1" className="bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Special Requirements (optional)
                      </label>
                      <Textarea placeholder="Dietary needs, accessibility requirements, etc." rows={3} className="bg-background" />
                    </div>
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold py-4 rounded-full text-lg">
                      Complete Registration
                    </Button>
                    <p className="text-center text-muted-foreground text-xs">
                      By registering, you agree to receive event updates via email.
                    </p>
                  </form>
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

export default EventRegistration;
