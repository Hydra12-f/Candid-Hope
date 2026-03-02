import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Heart className="w-7 h-7 text-secondary fill-secondary" />
              <span className="text-2xl font-display font-bold">
                Candid<span className="text-secondary">Hope</span>
              </span>
            </Link>
            <p className="text-text-on-dark leading-relaxed mb-6">
              Empowering the young generation and parents/caregivers in Nairobi with holistic life skills for desired change.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/hopecandid/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors text-sm font-bold"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/hopecandid"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors text-sm font-bold"
              >
                ig
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">Pages</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "About", to: "/about" },
                { label: "Blog", to: "/blog" },
                { label: "Causes", to: "/causes" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-text-on-dark hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                { label: "Events", to: "/events" },
                { label: "Donation", to: "/donation" },
                { label: "Volunteers", to: "/volunteers" },
                { label: "Fundraise", to: "/fundraise" },
                { label: "Support", to: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-text-on-dark hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-on-dark/60 mb-1">ADDRESS:</p>
                  <p className="text-text-on-dark">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-on-dark/60 mb-1">PHONE:</p>
                  <a href="tel:+254757975701" className="text-text-on-dark hover:text-secondary transition-colors">
                    +254 757 975701
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-text-on-dark/60 mb-1">EMAIL:</p>
                  <a href="mailto:candidhope1@gmail.com" className="text-text-on-dark hover:text-secondary transition-colors">
                    candidhope1@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-on-dark/60">
          <p>© 2025 Candid Hope. All rights reserved.</p>
          <a href="http://www.candidhope.org/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
            www.candidhope.org
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
