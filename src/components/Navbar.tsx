import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#services" },
  { label: "Causes", href: "#causes" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-secondary fill-secondary" />
          <span className="text-2xl font-display font-bold text-primary">
            Candid<span className="text-secondary">Hope</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body font-medium text-foreground hover:text-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button className="bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold px-6 rounded-full">
            DONATE NOW
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-b border-border px-6 pb-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block font-body font-medium text-foreground hover:text-secondary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="bg-secondary text-secondary-foreground hover:bg-orange-glow font-semibold px-6 rounded-full w-full">
            DONATE NOW
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
