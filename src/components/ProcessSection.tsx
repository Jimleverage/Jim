import { motion } from "framer-motion";
import { PhoneCall, Lightbulb, Hammer, Rocket, HeartHandshake, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <PhoneCall className="w-6 h-6" />,
    title: "Discovery Call",
    description:
      "We start with a free 30-minute strategy call to understand your business, current workflows, and automation goals.",
  },
  {
    number: "02",
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Strategy Design",
    description:
      "I map out a custom automation blueprint tailored to your business needs, tools, and growth objectives.",
  },
  {
    number: "03",
    icon: <Hammer className="w-6 h-6" />,
    title: "Build & Test",
    description:
      "I build and rigorously test every automation, ensuring reliability and accuracy before anything goes live.",
  },
  {
    number: "04",
    icon: <Rocket className="w-6 h-6" />,
    title: "Launch & Train",
    description:
      "We launch the system together and I train you or your team so everyone knows how to use it confidently.",
  },
  {
    number: "05",
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "Ongoing Support",
    description:
      "I stay available for tweaks, updates, and scaling as your business grows and evolves.",
  },
];

const ProcessSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="process" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium accent-text uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-5xl sm:text-6xl font-display font-bold mb-4">
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A clear, repeatable process that takes you from chaos to automated clarity — without the guesswork.
          </p>
        </motion.div>

        {/* Desktop steps */}
        <div className="hidden lg:grid grid-cols-5 gap-4 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-[hsl(180,100%,40%,0.4)] to-transparent z-0" />
              )}

              <div className="relative z-10 glass-card p-6 text-center hover:border-[hsl(180,100%,40%,0.3)] transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(180,100%,40%,0.2)] to-[hsl(270,60%,55%,0.2)] border border-[hsl(180,100%,40%,0.3)] mb-4 mx-auto">
                  <span className="text-[hsl(180,100%,50%)]">{step.icon}</span>
                </div>
                <div className="text-sm font-bold text-[hsl(180,100%,50%)] mb-2">{step.number}</div>
                <h3 className="font-display font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile steps */}
        <div className="lg:hidden space-y-4 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(180,100%,40%,0.2)] to-[hsl(270,60%,55%,0.2)] border border-[hsl(180,100%,40%,0.3)] flex items-center justify-center">
                  <span className="text-[hsl(180,100%,50%)]">{step.icon}</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-[hsl(180,100%,50%)] mb-1">{step.number}</div>
                <h3 className="font-display font-semibold text-base mb-1">{step.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

{/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => scrollTo("contact")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Start Your Automation Journey
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
