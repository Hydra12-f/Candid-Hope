import { Mail, Phone, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-secondary" />
          <span className="font-body opacity-90">LET'S HELP OTHERS :</span>
          <Link to="/volunteers" className="font-semibold underline underline-offset-2 hover:text-secondary transition-colors">
            BECOME A VOLUNTEER
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="mailto:candidhope1@gmail.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <Mail className="w-4 h-4" />
            candidhope1@gmail.com
          </a>
          <span className="opacity-30">|</span>
          <a href="tel:+254757975701" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <Phone className="w-4 h-4" />
            +254 757 975701
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
