import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <PageHero
          title="Contact Us"
          subtitle="Get in touch with us. We'd love to hear from you."
          backgroundImage="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260"
        />

        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-secondary font-semibold mb-2">Get In Touch</p>
                <h2 className="text-4xl font-display font-bold text-foreground mb-6">
                  We're here to help
                </h2>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                  Whether you have questions about our programs, want to volunteer, or wish to make a donation, we'd love to hear from you.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Address", value: "Nairobi, Kenya" },
                    { icon: Phone, label: "Phone", value: "+254 757 975701", href: "tel:+254757975701" },
                    { icon: Mail, label: "Email", value: "candidhope1@gmail.com", href: "mailto:candidhope1@gmail.com" },
                    { icon: Clock, label: "Hours", value: "Mon - Fri: 8:00 AM - 5:00 PM" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-foreground hover:text-secondary transition-colors font-medium">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map Embed */}
                <div className="mt-10 rounded-2xl overflow-hidden shadow-md">
                  <iframe
                    title="Candid Hope Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853743783!2d36.68224!3d-1.30326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-card p-8 md:p-10 rounded-2xl shadow-lg">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                        <Input placeholder="John" className="bg-background" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                        <Input placeholder="Doe" className="bg-background" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                      <Input type="email" placeholder="john@example.com" className="bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                      <Input type="tel" placeholder="+254 700 000 000" className="bg-background" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                      <Textarea placeholder="How can we help you?" rows={5} className="bg-background" />
                    </div>
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold py-3 rounded-full text-base">
                      Send Message
                    </Button>
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

export default Contact;
