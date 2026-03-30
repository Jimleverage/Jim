import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Brivity CRM",
    role: "Database Manager / Social Media Manager",
    period: "March 2023 – February 2026",
    description:
      "Managed and maintained the CRM database for a real estate marketing team, ensuring data accuracy and clean records. Built automated workflows and managed social media presence across multiple platforms.",
    highlights: [
      "Automated lead nurture sequences using Brivity CRM",
      "Managed 2,000+ contact records with clean data practices",
      "Created and scheduled social media content across Facebook & Instagram",
      "Built reporting dashboards for marketing performance tracking",
    ],
  },
  {
    company: "RMC Real Estate",
    role: "Appointment Setter / Social Media Manager",
    period: "May 2017 – December 2022",
    description:
      "Handled lead outreach and appointment setting for a real estate team, while managing the company's social media presence and content calendar.",
    highlights: [
      "Set 50+ appointments monthly for the sales team",
      "Managed social media content and community engagement",
      "Created branded graphics and marketing materials",
      "Maintained CRM records and follow-up sequences",
    ],
  },
  {
    company: "Sitel – Capital One",
    role: "Customer Service Representative",
    period: "July 2016 – March 2017",
    description:
      "Provided customer service support for Capital One clients, handling account inquiries, disputes, and service requests in a fast-paced BPO environment.",
    highlights: [
      "Handled 80+ customer interactions daily",
      "Maintained high customer satisfaction scores",
      "Trained in financial compliance and data privacy protocols",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium accent-text uppercase tracking-widest mb-3">
            My Background
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Years of hands-on experience in CRM, automation, and marketing across multiple industries.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(180,100%,40%,0.5)] via-[hsl(270,60%,55%,0.3)] to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-[hsl(180,100%,40%)] to-[hsl(270,60%,55%)] border-2 border-background shadow-[0_0_10px_hsl(180,100%,40%,0.5)] -translate-x-1/2" />

                <div className="glass-card p-6 hover:border-[hsl(180,100%,40%,0.3)] transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg">{exp.company}</h3>
                      <p className="text-[hsl(180,100%,50%)] font-medium text-sm">{exp.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5 glass-card px-3 py-1 text-xs text-muted-foreground">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[hsl(180,100%,50%)] flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
