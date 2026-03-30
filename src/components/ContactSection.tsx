import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";

const openCalendly = () => {
  (window as any).Calendly?.initPopupWidget({
    url: "https://calendly.com/jimuel-pasion-pararuan/30min",
  });
};

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(180,100%,40%,0.04)] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium accent-text uppercase tracking-widest mb-3">
            Let's Work Together
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Let's Get Back{" "}
            <span className="gradient-text">Your Time!</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to Automate Your Business?
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mt-3">
            Book a free 30-minute strategy call and let's map out exactly how automation can
            save you hours every week.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div
            onClick={openCalendly}
            className="glass-card glow-border rounded-2xl p-10 flex flex-col items-center justify-center gap-6 cursor-pointer hover:-translate-y-1 transition-transform duration-200 min-h-[320px] w-full max-w-md"
          >
            <div className="w-16 h-16 rounded-full bg-[hsl(180,100%,40%,0.12)] flex items-center justify-center">
              <Calendar className="w-8 h-8 text-[hsl(180,100%,50%)]" />
            </div>
            <div className="text-center">
              <p className="text-xl font-display font-bold mb-2">Book a Free Strategy Call</p>
              <p className="text-muted-foreground text-sm">30 minutes · No commitment</p>
            </div>
            <span className="btn-primary px-8">Pick a Time</span>
          </div>

          <a
            href="https://jimleverage.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            Meet Jimuel
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
