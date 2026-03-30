import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import VoiceDemoSection from "@/components/VoiceDemoSection";
import ToolsSection from "@/components/ToolsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background constellation-bg">
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <PortfolioSection />
      <VoiceDemoSection />
      <ToolsSection />
      <ContactSection />
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border">
        © 2026 Jimuel Pararuan. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
