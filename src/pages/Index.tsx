import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesStrip from "@/components/ServicesStrip";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import ProgramsSection from "@/components/ProgramsSection";
import CausesSection from "@/components/CausesSection";
import CTABanner from "@/components/CTABanner";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesStrip />
        <AboutSection />
        <ProgramsSection />
        <StatsSection />
        <CausesSection />
        <CTABanner />
        <TestimonialsSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
