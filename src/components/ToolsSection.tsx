import { motion } from "framer-motion";

const row1 = [
  { name: "GoHighLevel", img: null, text: "GHL" },
  { name: "Zapier", img: "https://cdn.simpleicons.org/zapier/FF4A00" },
  { name: "n8n", img: "https://cdn.simpleicons.org/n8n/EA4B71" },
  { name: "Make", img: "https://cdn.simpleicons.org/make/6D00CC" },
  { name: "HubSpot", img: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Slack", img: "https://cdn.simpleicons.org/slack/4A154B" },
  { name: "Notion", img: "https://cdn.simpleicons.org/notion/ffffff" },
  { name: "Airtable", img: "https://cdn.simpleicons.org/airtable/18BFFF" },
  { name: "Mailchimp", img: "https://cdn.simpleicons.org/mailchimp/FFE01B" },
  { name: "Salesforce", img: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "ClickUp", img: "https://cdn.simpleicons.org/clickup/7B68EE" },
  { name: "Trello", img: "https://cdn.simpleicons.org/trello/0052CC" },
  { name: "Asana", img: "https://cdn.simpleicons.org/asana/F06A6A" },
  { name: "Zendesk", img: "https://cdn.simpleicons.org/zendesk/03363D" },
  { name: "Calendly", img: "https://cdn.simpleicons.org/calendly/006BFF" },
  { name: "Google", img: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "G. Sheets", img: "https://cdn.simpleicons.org/googlesheets/34A853" },
  { name: "WhatsApp", img: "https://cdn.simpleicons.org/whatsapp/25D366" },
];

const row2 = [
  { name: "Gemini", img: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
  { name: "Claude", img: "https://cdn.simpleicons.org/anthropic/D4A574" },
  { name: "VAPI", img: null, text: "VAPI" },
  { name: "ElevenLabs", img: "https://cdn.simpleicons.org/elevenlabs/ffffff" },
  { name: "Perplexity", img: "https://cdn.simpleicons.org/perplexity/20808D" },
  { name: "OpenAI", img: "https://cdn.simpleicons.org/openai/ffffff" },
  { name: "DALL-E", img: "https://cdn.simpleicons.org/openai/ffffff" },
  { name: "Midjourney", img: null, text: "MJ" },
  { name: "Runway ML", img: null, text: "RML" },
  { name: "SORA", img: null, text: "SORA" },
  { name: "Nano Banana", img: null, text: "NB" },
  { name: "Figma", img: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Canva", img: "https://cdn.simpleicons.org/canva/00C4CC" },
  { name: "CapCut", img: "https://cdn.simpleicons.org/capcut/ffffff" },
  { name: "OpusClip", img: null, text: "Opus" },
  { name: "Premiere", img: "https://cdn.simpleicons.org/adobepremierepro/9999FF" },
  { name: "After Effects", img: "https://cdn.simpleicons.org/adobeaftereffects/9999FF" },
  { name: "Facebook", img: "https://cdn.simpleicons.org/facebook/1877F2" },
  { name: "Instagram", img: "https://cdn.simpleicons.org/instagram/E4405F" },
  { name: "LinkedIn", img: "https://cdn.simpleicons.org/linkedin/0A66C2" },
  { name: "X / Twitter", img: "https://cdn.simpleicons.org/x/ffffff" },
  { name: "Pinterest", img: "https://cdn.simpleicons.org/pinterest/BD081C" },
  { name: "YouTube", img: "https://cdn.simpleicons.org/youtube/FF0000" },
  { name: "WordPress", img: "https://cdn.simpleicons.org/wordpress/21759B" },
  { name: "JavaScript", img: "https://cdn.simpleicons.org/javascript/F7DF1E" },
];

type Tool = { name: string; img?: string | null; text?: string };

const ToolCard = ({ tool }: { tool: Tool }) => (
  <div className="flex flex-col items-center gap-2 mx-3">
    <div className="w-24 h-24 rounded-2xl bg-[hsl(222,47%,9%)] border border-white/8 flex items-center justify-center hover:border-[hsl(180,100%,40%,0.4)] hover:shadow-[0_0_16px_hsl(180,100%,40%,0.1)] transition-all duration-300">
      {tool.img ? (
        <img src={tool.img} alt={tool.name} className="w-12 h-12 object-contain" />
      ) : (
        <span className="text-sm font-bold text-[hsl(180,100%,50%)]">{tool.text}</span>
      )}
    </div>
    <span className="text-sm text-muted-foreground whitespace-nowrap">{tool.name}</span>
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
          <h2 className="text-5xl sm:text-6xl font-display font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
