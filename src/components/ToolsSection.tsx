import { motion } from "framer-motion";

const toolCategories = [
  {
    title: "CRM Platforms",
    tools: ["Brivity CRM", "GoHighLevel", "HubSpot", "Azul.io", "Compass", "Sierra Interactive"],
  },
  {
    title: "Automation & Integration",
    tools: ["Zapier", "n8n", "Make (Integromat)"],
  },
  {
    title: "Marketing & Content",
    tools: ["Meta Business Suite", "Canva", "Adobe Creative Cloud", "Mailchimp", "SendGrid", "CapCut"],
  },
  {
    title: "Productivity & Collaboration",
    tools: ["Google Workspace", "Microsoft Office", "Asana", "Slack", "Notion"],
  },
  {
    title: "Additional Platforms",
    tools: ["WordPress", "Elementor", "Google Analytics", "Google Sheets", "Calendly"],
  },
];

const tickerTools = [
  "GoHighLevel", "Zapier", "n8n", "Make", "Brivity CRM", "HubSpot",
  "Mailchimp", "Slack", "Notion", "Asana", "Google Workspace", "Meta Business Suite",
  "Canva", "Adobe CC", "WordPress", "Calendly", "Stripe", "SendGrid",
  "Google Analytics", "Typeform", "Airtable", "CapCut",
];

const ToolsSection = () => {
  return (
    <section id="tools" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium accent-text uppercase tracking-widest mb-3">
            My Stack
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Tools & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The platforms I use daily to build powerful automations and manage complex workflows.
          </p>
        </motion.div>

        {/* Tool category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {toolCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 hover:border-[hsl(180,100%,40%,0.3)] transition-all duration-300"
            >
              <h3 className="font-display font-semibold text-sm mb-4 gradient-text">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg text-sm glass-card text-muted-foreground hover:text-foreground hover:border-[hsl(180,100%,40%,0.3)] transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="relative overflow-hidden py-6 border-y border-border">
        <div className="flex animate-scroll-x gap-8 w-max">
          {[...tickerTools, ...tickerTools].map((tool, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:accent-text transition-colors px-2"
            >
              <span className="text-[hsl(180,100%,50%)] mr-2">✦</span>
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
