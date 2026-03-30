import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User } from "lucide-react";

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

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Trust badges */}
            <div className="space-y-3">
              {[
                {
                  icon: <Calendar className="w-5 h-5 text-[hsl(180,100%,50%)]" />,
                  title: "Free Consultation",
                  desc: "No strings attached. Just a conversation about your automation goals.",
                },
                {
                  icon: <Clock className="w-5 h-5 text-[hsl(180,100%,50%)]" />,
                  title: "24-Hour Response",
                  desc: "I respond to all inquiries within one business day.",
                },
                {
                  icon: <MapPin className="w-5 h-5 text-[hsl(180,100%,50%)]" />,
                  title: "Based in Baguio City",
                  desc: "Serving clients worldwide, remote-first collaboration.",
                },
              ].map((item) => (
                <div key={item.title} className="glass-card p-4 flex gap-4 items-start">
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openCalendly}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book a Call
              </button>
              <a
                href="https://jimleverage.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                Meet Jimuel
              </a>
            </div>
          </motion.div>

          {/* Right — Calendly embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              onClick={openCalendly}
              className="glass-card glow-border rounded-2xl p-10 flex flex-col items-center justify-center gap-6 cursor-pointer hover:-translate-y-1 transition-transform duration-200 min-h-[320px]"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
