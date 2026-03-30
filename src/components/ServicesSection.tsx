import { motion } from "framer-motion";
import { Database, Mail, Workflow, Share2, Bot, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Database className="w-6 h-6" />,
    title: "CRM & Database Management",
    description:
      "Clean, organize, and maintain your CRM so your team always has accurate data. From contact management to pipeline setup and reporting.",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Marketing Automation",
    description:
      "Build email and SMS sequences that nurture leads automatically — from first touch to closed deal — without lifting a finger.",
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Funnel Development",
    description:
      "Design and build high-converting sales funnels in GoHighLevel complete with landing pages, follow-up sequences, and payment integration.",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Integration & Workflow Automation",
    description:
      "Connect your tools using Zapier, Make, or n8n so data flows seamlessly between platforms — no manual copy-pasting needed.",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Agent Development",
    description:
      "Build intelligent AI agents that handle customer support, lead qualification, appointment booking, and content generation autonomously.",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Social Media & Marketing",
    description:
      "Manage content calendars, schedule posts, and create branded graphics that keep your business consistently visible online.",
  },
];

const ServicesSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium accent-text uppercase tracking-widest mb-3">
            What I Do
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build a fully automated, efficient business operation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 hover:border-[hsl(180,100%,40%,0.35)] hover:shadow-[0_0_28px_hsl(180,100%,40%,0.08)] transition-all duration-300 group relative overflow-hidden cursor-default"
            >
              {/* Subtle number watermark */}
              <span className="absolute top-3 right-4 text-5xl font-display font-black text-white/[0.03] select-none leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(180,100%,40%,0.15)] to-[hsl(270,60%,55%,0.15)] border border-[hsl(180,100%,40%,0.2)] flex items-center justify-center mb-4 group-hover:border-[hsl(180,100%,40%,0.5)] group-hover:shadow-[0_0_16px_hsl(180,100%,40%,0.2)] transition-all duration-300">
                <span className="text-[hsl(180,100%,50%)]">{service.icon}</span>
              </div>

              <h3 className="font-display font-semibold mb-2 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {service.description}
              </p>

              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[hsl(180,100%,50%)] opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
              >
                Get started <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
