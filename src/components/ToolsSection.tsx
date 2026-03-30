import { motion } from "framer-motion";

const row1 = [
  { name: "GoHighLevel", img: null, bg: "#1a1a2e", text: "GHL" },
  { name: "Zapier", img: "https://cdn.simpleicons.org/zapier/FF4A00" },
  { name: "n8n", img: "https://cdn.simpleicons.org/n8n/EA4B71" },
  { name: "Make", img: "https://cdn.simpleicons.org/make/6D00CC" },
  { name: "HubSpot", img: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Slack", img: "https://cdn.simpleicons.org/slack/4A154B" },
  { name: "Notion", img: "https://cdn.simpleicons.org/notion/ffffff" },
  { name: "Airtable", img: "https://cdn.simpleicons.org/airtable/18BFFF" },
  { name: "Mailchimp", img: "https://cdn.simpleicons.org/mailchimp/FFE01B" },
  { name: "Google", img: "https://cdn.simpleicons.org/google/4285F4" },
];

const row2 = [
  { name: "Canva", img: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "WordPress", img: "https://cdn.simpleicons.org/wordpress/21759B" },
  { name: "Asana", img: "https://cdn.simpleicons.org/asana/F06A6A" },
  { name: "Salesforce", img: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "Gemini", img: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
  { name: "Claude", img: "https://cdn.simpleicons.org/anthropic/D4A574" },
  { name: "JavaScript", img: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "VAPI", img: null, bg: "#1a1a2e", text: "VAPI" },
  { name: "Calendly", img: "https://cdn.simpleicons.org/calendly/006BFF" },
  { name: "CapCut", img: "https://cdn.simpleicons.org/capcut/ffffff" },
];

type Tool = { name: string; img?: string | null; bg?: string; text?: string };

const ToolCard = ({ tool }: { tool: Tool }) => (
  <div className="flex flex-col items-center gap-2 mx-3">
    <div className="w-20 h-20 rounded-2xl bg-[hsl(222,47%,9%)] border border-white/8 flex items-center justify-center hover:border-[hsl(180,100%,40%,0.4)] hover:shadow-[0_0_16px_hsl(180,100%,40%,0.1)] transition-all duration-300">
      {tool.img ? (
        <img src={tool.img} alt={tool.name} className="w-10 h-10 object-contain" />
      ) : (
        <span className="text-sm font-bold text-[hsl(180,100%,50%)]">{tool.text}</span>
      )}
    </div>
    <span className="text-xs text-muted-foreground whitespace-nowrap">{tool.name}</span>
  </div>
);

const MarqueeRow = ({ tools, reverse = false }: { tools: Tool[]; reverse?: boolean }) => {
  const doubled = [...tools, ...tools];
  return (
    <div className="relative overflow-hidden py-2">
      <div className={`flex w-max ${reverse ? "animate-scroll-x-reverse" : "animate-scroll-x"}`}>
        {doubled.map((tool, i) => (
          <ToolCard key={i} tool={tool} />
        ))}
      </div>
    </div>
  );
};

const ToolsSection = () => {
  return (
    <section id="tools" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium accent-text uppercase tracking-widest mb-3">
            Technology
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to build powerful automation solutions.
          </p>
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="space-y-6">
          <MarqueeRow tools={row1} />
          <MarqueeRow tools={row2} reverse />
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
