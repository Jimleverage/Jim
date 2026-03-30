import { motion } from "framer-motion";
import { ArrowRight, Calendar, Zap, Database, Workflow } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  "CRM & Marketing Automation Specialist",
  "n8n & Make.com Workflow Builder",
  "GoHighLevel Expert",
  "Business Process Automator",
];

const stats = [
  { value: "20+", label: "Projects Built" },
  { value: "500+", label: "Hours Saved" },
  { value: "4", label: "Platforms Mastered" },
  { value: "100%", label: "Client Satisfaction" },
];

const HeroSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Typewriter
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 28);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center section-padding pt-24 relative overflow-hidden"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(180,100%,40%,0.06)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(270,60%,55%,0.06)] rounded-full blur-3xl pointer-events-none" />


      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-muted-foreground">Available for Projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-4 leading-tight"
            >
              Hi I'm{" "}
              <span className="gradient-text">Jimuel.</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl font-display font-semibold text-muted-foreground mb-4 h-8 flex items-center"
            >
              <span>{displayed}</span>
              <span className="ml-0.5 w-0.5 h-6 bg-[hsl(180,100%,50%)] inline-block animate-pulse" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base text-muted-foreground mb-8 max-w-lg leading-relaxed"
            >
              I help businesses automate their workflows and reclaim their time using{" "}
              <span className="accent-text font-medium">GoHighLevel</span>,{" "}
              <span className="accent-text font-medium">Zapier</span>, and{" "}
              <span className="accent-text font-medium">n8n</span> — so you can
              focus on what actually grows your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary flex items-center gap-2"
              >
                Contact Me
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("portfolio")}
                className="btn-outline flex items-center gap-2"
              >
                View Portfolio
              </button>
            </motion.div>

            {/* Skill highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              {[
                { icon: <Zap className="w-4 h-4" />, label: "Zapier Automation" },
                { icon: <Database className="w-4 h-4" />, label: "CRM Management" },
                { icon: <Workflow className="w-4 h-4" />, label: "GoHighLevel" },
              ].map((skill) => (
                <div
                  key={skill.label}
                  className="flex items-center gap-2 glass-card px-3 py-2 text-sm text-muted-foreground"
                >
                  <span className="text-[hsl(180,100%,50%)]">{skill.icon}</span>
                  {skill.label}
                </div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="grid grid-cols-4 gap-3"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                  className="text-center glass-card py-3 px-2 rounded-xl border border-white/8 hover:border-[hsl(180,100%,40%,0.3)] transition-colors"
                >
                  <div className="text-lg sm:text-xl font-display font-bold gradient-text leading-tight">
                    {s.value}
                  </div>
                  <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow light behind the person */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[hsl(180,100%,40%,0.18)] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[hsl(270,60%,55%,0.12)] rounded-full blur-2xl pointer-events-none" />

              {/* Profile image */}
              <div
                className="relative w-72 sm:w-80 lg:w-96"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(ellipse 90% 88% at 50% 28%, black 48%, transparent 100%)",
                  maskImage:
                    "radial-gradient(ellipse 90% 88% at 50% 28%, black 48%, transparent 100%)",
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpg`}
                  alt="Jimuel Pararuan"
                  className="w-full h-auto object-cover object-top"
                  style={{ mixBlendMode: "multiply", filter: "contrast(1.08) brightness(1.05)" }}
                />
              </div>

              {/* Floating card — strategy call */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 -left-4 glass-card px-4 py-3 glow-border cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => (window as any).Calendly?.initPopupWidget({ url: "https://calendly.com/jimuel-pasion-pararuan/30min" })}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[hsl(180,100%,50%)]" />
                  <div>
                    <p className="text-xs text-muted-foreground">Book a Free Call</p>
                    <p className="text-sm font-semibold accent-text">30-min Strategy</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card — automation stat */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-8 -right-4 glass-card px-4 py-3 border border-[hsl(270,60%,55%,0.3)] shadow-[0_0_20px_hsl(270,60%,55%,0.12)]"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[hsl(270,80%,75%)]" />
                  <div>
                    <p className="text-xs text-muted-foreground">Workflows Built</p>
                    <p className="text-sm font-bold text-[hsl(270,80%,80%)]">20+ Automations</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
