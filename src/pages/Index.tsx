import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import VoiceDemoSection from "@/components/VoiceDemoSection";
import ToolsSection from "@/components/ToolsSection";
import ContactSection from "@/components/ContactSection";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background constellation-bg">
      {/* SVG filter for image sharpening */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="img-sharpen">
            <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" preserveAlpha="true" />
          </filter>
        </defs>
      </svg>
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <ProcessSection />
      <VoiceDemoSection />
      <PortfolioSection />
      <ToolsSection />
      <ContactSection />
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://www.linkedin.com/in/jim-undefined-008068372/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(180,100%,50%)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://www.upwork.com/freelancers/~01288e6acc3423e6dd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(180,100%,50%)] transition-colors"
          >
            Upwork
          </a>
        </div>
        © 2026 Jimuel Pararuan. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
