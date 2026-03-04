import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const upcomingEvents = [
  {
    slug: "youth-leadership-summit-2025",
    image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Youth Leadership Summit 2025",
    date: "March 15, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Nairobi Community Center",
    desc: "A full-day summit bringing together young leaders from across Nairobi for workshops, networking, and inspiration.",
  },
  {
    slug: "parent-caregiver-workshop",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Parent & Caregiver Workshop",
    date: "April 5, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Candid Hope Office, Nairobi",
    desc: "Interactive workshop on positive parenting, communication skills, and supporting youth mental health at home.",
  },
  {
    slug: "life-skills-training-bootcamp",
    image: "https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Life Skills Training Bootcamp",
    date: "May 10-12, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "Various Schools, Nairobi",
    desc: "Three-day intensive bootcamp covering decision-making, financial literacy, and career planning for secondary school students.",
  },
  {
    slug: "community-fun-day-fundraiser",
    image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Community Fun Day & Fundraiser",
    date: "June 21, 2025",
    time: "11:00 AM - 6:00 PM",
    location: "Uhuru Gardens, Nairobi",
    desc: "A family-friendly day of activities, entertainment, and fundraising to support Candid Hope's programs. Food, games, and live performances.",
  },
];

const pastEvents = [
  {
    image: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Mental Health Awareness Walk",
    date: "October 10, 2024",
    attendees: 200,
  },
  {
    image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Digital Skills Workshop",
    date: "September 15, 2024",
    attendees: 80,
  },
  {
    image: "https://images.pexels.com/photos/6646773/pexels-photo-6646773.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Holiday Feeding Program",
    date: "December 20, 2024",
    attendees: 350,
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="Events"
          subtitle="Join us at upcoming events and make a difference in your community."
          backgroundImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        {/* Upcoming Events */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">What's Coming</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Upcoming Events
              </h2>
            </div>
            <div className="space-y-8">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col md:flex-row"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-80 h-60 md:h-auto object-cover"
                  />
                  <div className="p-8 flex-1">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.desc}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-secondary" /> {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-secondary" /> {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-secondary" /> {event.location}
                      </span>
                    </div>
                    <Link to={`/events/${event.slug}`}>
                      <Button className="bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold px-6 rounded-full">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-24 bg-muted">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-semibold mb-2">Looking Back</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Past Events
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {pastEvents.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-md"
                >
                  <img src={event.image} alt={event.title} className="w-full aspect-video object-cover" />
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{event.date}</p>
                    <p className="text-secondary font-semibold text-sm">{event.attendees}+ Attendees</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
