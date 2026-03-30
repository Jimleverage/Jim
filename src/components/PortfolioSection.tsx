import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Workflow } from "lucide-react";
import ProjectModal, { type Project } from "./ProjectModal";

const projects: Project[] = [
  // ── n8n ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Advanced AI Voice Receptionist & Dynamic Appointment Manager",
    category: "n8n",
    subTags: ["Voice AI"],
    tags: ["N8N", "VAPI", "AIRTABLE", "CALENDAR APIS", "WEBHOOKS"],
    description:
      "A complex, multi-step workflow using n8n triggered by VAPI to handle inbound voice calls. It dynamically manages all appointment actions (getting, booking, updating, and cancelling slots) and logs all call data and recordings into Airtable for comprehensive tracking.",
    impactHeadline: "Delivered a Scalable, Low-Cost, and Fully Integrated 24/7 Receptionist.",
    impact:
      "The client's manual call handling process was restricted to business hours, resulting in missed opportunities and high overhead. This n8n/VAPI solution provides immediate, intelligent voice response, real-time scheduling integration, and automatic data logging, dramatically reducing overhead and guaranteeing 24/7 lead capture.",
    results: [
      { label: "Call Handling Availability", value: "24/7/365" },
      { label: "Call Data Logging Accuracy", value: "100%" },
      { label: "Staff Time Saved Per Month", value: "100+ hours" },
      { label: "Cost Reduction (Staffing)", value: "80%" },
    ],
    tools: ["n8n", "VAPI", "Airtable", "Calendar APIs", "Webhooks"],
    image: "/workflows/n8n-voice-receptionist.png",
    metric: "24/7/365",
    metricLabel: "Call handling availability",
  },
  {
    id: 2,
    title: "AI-Powered Customer Support Agent with Knowledge Base",
    category: "n8n",
    subTags: ["Support AI"],
    tags: ["N8N", "GOOGLE SHEETS", "GEMINI AI", "WEBHOOKS"],
    description:
      "Developed a robust, webhook-triggered customer support agent using n8n. The agent pulls structured data from a Google Sheets knowledge base, queries Google Gemini AI for contextual answers, and provides a concise response, ensuring accurate and consistent support.",
    impactHeadline: "Delegated 75% of Tier 1 Support Tickets to AI.",
    impact:
      "The support team was bogged down by repetitive Tier 1 questions, leading to slow response times for complex issues. By deploying this n8n agent, the client achieved near-instant resolution for common queries, freeing up human agents to focus on high-touch customer problems.",
    results: [
      { label: "Tickets Resolved by AI", value: "75%" },
      { label: "Avg First Response Time", value: "10 seconds" },
      { label: "Agent Time Saved Per Week", value: "30 hours" },
    ],
    tools: ["n8n", "Google Sheets", "Gemini AI", "Webhooks"],
    image: "/workflows/n8n-customer-support.png",
    metric: "75%",
    metricLabel: "Tickets resolved by AI",
  },
  {
    id: 3,
    title: "AI ASMR Video Production & Multi-Platform Publishing",
    category: "n8n",
    subTags: ["Content Gen"],
    tags: ["N8N", "GEMINI AI", "VIDEO API", "FACEBOOK REELS", "YOUTUBE SHORTS"],
    description:
      "A complex, scheduled n8n workflow that uses Google Gemini AI to generate video scripts, handles secure authentication (JWT exchange), interacts with a third-party API to generate and compile the video file, and automatically publishes the resulting content to YouTube Shorts and Facebook Reels.",
    impactHeadline: "Achieved Daily Content Consistency and Virality.",
    impact:
      "The client, a Content Creator, struggled with the daily production demands of short-form video content. This automation ensures a consistent, high-quality stream of content, eliminating creative block and technical publishing barriers, leading to a rapid increase in followers and views.",
    results: [
      { label: "Production Time Per Video", value: "3 minutes" },
      { label: "Content Posting Frequency", value: "Daily" },
      { label: "Cost Savings (Manual)", value: "90%" },
    ],
    tools: ["n8n", "Gemini AI", "Video API", "Facebook Reels", "YouTube Shorts"],
    image: "/workflows/n8n-video-production.png",
    metric: "3 MINUTES",
    metricLabel: "Production time per video",
  },
  {
    id: 4,
    title: "AI-Powered Facebook Messenger Engagement Agent",
    category: "n8n",
    subTags: ["Social Support"],
    tags: ["N8N", "GEMINI AI", "FACEBOOK API", "WEBHOOKS"],
    description:
      "A robust webhook-triggered system that captures incoming Facebook Messenger inquiries or page comments. The query is routed to a specialized Google Gemini AI agent for contextual, personalized response generation, and the agent automatically replies via the Facebook API.",
    impactHeadline: "Enabled 24/7 Social Media Customer Support and Engagement.",
    impact:
      "The client needed constant engagement on their social channels but lacked the staff to monitor it around the clock. This n8n-based solution provides instant, high-quality responses at any hour, enhancing customer satisfaction and ensuring no social media lead or question is missed.",
    results: [
      { label: "Availability", value: "24/7/365" },
      { label: "Initial Response Time", value: "10 seconds" },
      { label: "Community Manager Time Saved", value: "10 hours/week" },
    ],
    tools: ["n8n", "Gemini AI", "Facebook API", "Webhooks"],
    image: "/workflows/n8n-messenger-agent.png",
    metric: "24/7/365",
    metricLabel: "Availability",
  },
  {
    id: 5,
    title: "AI-Powered Weather-Contextual Social Media Posting Engine",
    category: "n8n",
    subTags: ["Social Ops"],
    tags: ["N8N", "GEMINI AI", "OPENWEATHERMAP", "CUSTOM IMAGE API", "FACEBOOK API"],
    description:
      "A scheduled n8n workflow uses the current weather data as a prompt for Google Gemini AI to generate a daily quote, which is then passed to an image generation API. The system ensures the quote is original by checking a Google Sheet log before posting the final, contextualized content and image to Facebook.",
    impactHeadline: "Delivered Real-Time, Hyper-Contextual Social Media Engagement.",
    impact:
      "The client needed daily social media content that felt relevant and timely but lacked the resources for manual daily content creation tied to real-world events. This automation provides a hands-free solution, leveraging weather data and AI creativity to deliver fresh, geo-aware content that significantly boosts local engagement and eliminates manual posting tasks.",
    results: [
      { label: "Content Relevancy", value: "100%" },
      { label: "Manual Content Creation", value: "0 minutes" },
      { label: "Posting Consistency", value: "Daily" },
    ],
    tools: ["n8n", "Gemini AI", "OpenWeatherMap", "Custom Image API", "Facebook API"],
    image: "/workflows/n8n-weather-posting.png",
    metric: "100%",
    metricLabel: "Content relevancy",
  },
  {
    id: 6,
    title: "AI Agent for Recruitment & Application",
    category: "n8n",
    subTags: ["AI Agent"],
    tags: ["N8N", "SLACK API", "GOOGLE GEMINI", "OPENROUTER", "GOOGLE DOCS API", "GMAIL"],
    description:
      "An autonomous AI agent built on n8n that streamlines the job application process. Acting as a personal career assistant, it identifies relevant job openings via chat commands, scrapes listing details, and uses Large Language Models (LLMs) to hyper-personalize application assets in real-time.",
    impactHeadline: "AI-Powered Job Scraper & Resume Optimizer Platform.",
    impact:
      "Applying for roles requires tailoring resumes to specific JDs, which is time-consuming. This Slack-based bot utilizes Gemini and OpenRouter to analyze job posts and generate ATS-optimized resumes and cover letters in seconds, drastically reducing application time.",
    results: [
      { label: "Asset Generation", value: "< 30 sec" },
      { label: "ATS Optimization", value: "AI-Driven" },
      { label: "User Interface", value: "Slack" },
    ],
    tools: ["n8n", "Slack API", "Google Gemini", "OpenRouter", "Google Docs API", "Gmail"],
    image: "/workflows/n8n-recruitment-agent.png",
    metric: "< 30 SEC",
    metricLabel: "Asset generation time",
  },

  // ── Zapier ───────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Sales Lifecycle Execution Automation (Asana & Conditional Routing)",
    category: "Zapier",
    subTags: ["Sales Auto"],
    tags: ["ZAPIER", "ASANA", "GMAIL", "GOOGLE DRIVE"],
    description:
      "This sophisticated, multi-path workflow is triggered by an updated task status in Asana and uses conditional routing to standardize lead actioning. Based on status (e.g., \"Ready to Start,\" \"Approved\"), the system automatically sends customized emails, creates project folders in Google Drive, or initiates service-specific subtasks.",
    impactHeadline: "Guaranteed Process Standardization & Instant Task Handoff.",
    impact:
      "The sales team needed strict adherence to processes for different lead stages and service lines, which was previously error-prone. This automation ensures 100% compliance by instantly triggering the correct next steps—from generating client folders to sending initial outreach—eliminating human judgment errors and accelerating every stage of the client lifecycle.",
    results: [
      { label: "Hours Saved Per Week", value: "40 hours" },
      { label: "Process Compliance Rate", value: "100%" },
      { label: "Time to Client Folder Creation", value: "3 seconds" },
    ],
    tools: ["Zapier", "Asana", "Gmail", "Google Drive"],
    image: "/workflows/zapier-sales-lifecycle.png",
    metric: "40 HOURS",
    metricLabel: "Hours saved per week",
  },
  {
    id: 6,
    title: "AI Content Repurposing & Multi-Platform Distribution",
    category: "Zapier",
    subTags: ["Content Ops"],
    tags: ["ZAPIER", "GOOGLE DRIVE", "AI", "FACEBOOK", "LINKEDIN", "INSTAGRAM"],
    description:
      "A sophisticated Zapier workflow that ingests long-form content (e.g., video transcripts, audio files) from Google Drive, uses AI to generate multiple versions of the content (blog posts, social media updates), and distributes them across LinkedIn, Facebook, and Instagram.",
    impactHeadline: "Increased Content Output by 4X with Minimal Effort.",
    impact:
      "The marketing team needed to maintain a high volume of social media engagement but lacked the bandwidth to manually adapt single-source content for four different channels. This automation turns one piece of content into a week's worth of platform-specific posts, ensuring constant audience engagement and saving significant creative labor.",
    results: [
      { label: "Hours Saved Per Month", value: "50 hours" },
      { label: "Time to Publish", value: "10 minutes" },
      { label: "Content Volume Increase", value: "300%" },
    ],
    tools: ["Zapier", "Google Drive", "AI", "Facebook", "LinkedIn", "Instagram"],
    image: "/workflows/zapier-content-repurposing.png",
    metric: "50 HOURS",
    metricLabel: "Hours saved per month",
  },
  {
    id: 7,
    title: "Advanced Leads Enrichment Pipeline",
    category: "Zapier",
    subTags: ["Sales Ops"],
    tags: ["ZAPIER", "APOLLO", "HUNTER.IO", "GOOGLE SHEETS", "SLACK", "AI", "GMAIL"],
    description:
      "A hybrid Zapier workflow that captures inbound lead data, enriches it using third-party services (Apollo/Hunter.io), and uses AI to segment leads into high and low priority paths. The system automatically notifies the sales team via Slack for high-priority leads and drafts initial outreach emails.",
    impactHeadline: "Maximized Outreach Effectiveness with Data-Driven Prioritization.",
    impact:
      "Before implementation, sales reps spent 2 hours per day manually researching prospects, often using outdated data. This pipeline ensures every lead is prioritized based on AI scoring and arrives with 10+ validated data points, allowing reps to focus 100% on personalized selling.",
    results: [
      { label: "Manual Research Time", value: "Eliminated" },
      { label: "Lead Data Completeness", value: "100%" },
      { label: "Sales Team Productivity", value: "+30%" },
    ],
    tools: ["Zapier", "Apollo", "Hunter.io", "Google Sheets", "Slack", "AI", "Gmail"],
    image: "/workflows/zapier-leads-enrichment.png",
    metric: "ELIMINATED",
    metricLabel: "Manual research time",
  },
  {
    id: 8,
    title: "Automated Job and Document Management System",
    category: "Zapier",
    subTags: ["Back Office"],
    tags: ["ZAPIER", "GOOGLE SHEETS", "GOOGLE DRIVE", "APPS SCRIPT", "EMAIL"],
    description:
      "A comprehensive back-office workflow that monitors job creation statuses in a master Google Sheet, automatically generates all required customer documents (contracts, invoices, work orders) using Google Apps Script, and files them in the correct Drive folder structure.",
    impactHeadline: "Streamlined Back-Office Operations and Eliminated Human Error in Document Generation.",
    impact:
      "The administrative team spent several hours per job manually creating, populating, and filing documents, which was prone to errors and delays. This system guarantees instant, error-free document creation and filing the moment a job status changes, enabling faster client onboarding and payment processing.",
    results: [
      { label: "Document Generation Time", value: "3 seconds" },
      { label: "Hours Saved Per Month", value: "45 hours" },
      { label: "Document Filing Accuracy", value: "100%" },
    ],
    tools: ["Zapier", "Google Sheets", "Google Drive", "Apps Script", "Email"],
    image: "/workflows/zapier-job-document.png",
    metric: "3 SECONDS",
    metricLabel: "Document generation time",
  },

  // ── GoHighLevel ──────────────────────────────────────────────────────────
  {
    id: 9,
    title: "CRM Pipeline & Revenue Recovery Automation",
    category: "GoHighLevel",
    subTags: ["Sales Auto"],
    tags: ["GOHIGHLEVEL", "AUTOMATION", "EMAIL/SMS", "CALENDAR"],
    description:
      "Built an event-driven GoHighLevel automation that monitors CRM pipeline stages in real time, triggers recovery sequences for stalled or lost deals, auto-books follow-up appointments, and routes contacts through personalized email/SMS cadences based on deal status.",
    impactHeadline: "Stopped Sales Leaks with Event-Driven Logic.",
    impact:
      "The client was losing deals due to missed follow-ups and untracked pipeline gaps. This automation ensures every lead is accounted for, every stalled deal gets a recovery sequence, and no revenue opportunity is silently dropped from the pipeline.",
    results: [
      { label: "Admin Time Saved", value: "100%" },
      { label: "Pipeline Accuracy", value: "100%" },
      { label: "Lead Recovery", value: "Automated" },
    ],
    tools: ["GoHighLevel", "Automation", "Email/SMS", "Calendar"],
    image: "/workflows/ghl-crm-pipeline.png",
    metric: "100%",
    metricLabel: "Admin time saved",
  },
  {
    id: 10,
    title: "Automated Sales Cadence & Call Disposition Logic",
    category: "GoHighLevel",
    subTags: ["Sales Ops"],
    tags: ["GOHIGHLEVEL", "CALL TRIGGERS", "LOGIC GATES", "PIPELINE OPS"],
    description:
      "Designed a GoHighLevel workflow that fires automatically after every sales call based on disposition outcome. Logic gates route each contact through the correct next-step sequence — whether that's a follow-up cadence, a pipeline stage update, or a disqualification — with zero manual input from reps.",
    impactHeadline: "Enforced Sales Discipline with Auto-Disposition Engine.",
    impact:
      "Sales reps were inconsistently logging call outcomes and skipping follow-up steps. This system enforces a standardized post-call process for every contact, ensuring pipeline hygiene and cadence compliance across the entire team without micromanagement.",
    results: [
      { label: "Manual Data Entry", value: "0 min/call" },
      { label: "Cadence Compliance", value: "100%" },
      { label: "Pipeline Hygiene", value: "Auto-Cleaned" },
    ],
    tools: ["GoHighLevel", "Call Triggers", "Logic Gates", "Pipeline Ops"],
    image: "/workflows/ghl-sales-cadence.png",
    metric: "0 MIN/CALL",
    metricLabel: "Manual data entry",
  },
  {
    id: 11,
    title: "Instant Lead Capture & Multi-Channel Nurturing Sequence",
    category: "GoHighLevel",
    subTags: ["Lead Gen"],
    tags: ["GOHIGHLEVEL", "SMS", "EMAIL", "CALL"],
    description:
      "Built a GoHighLevel workflow that triggers the moment a new lead enters the system — immediately sending a personalized SMS, queuing an email sequence, and scheduling an auto-dial attempt. The multi-channel approach maximizes contact rate and ensures no lead goes cold in the critical first minutes.",
    impactHeadline: "Guaranteed Speed-to-Lead and Optimized Engagement Velocity.",
    impact:
      "The client's team was manually following up on leads hours after they came in, losing deals to faster competitors. This automation guarantees sub-5-minute contact on every new lead through three simultaneous channels, dramatically increasing connect rates and booked appointments.",
    results: [
      { label: "Speed to Lead", value: "< 5 minutes" },
      { label: "Lead Engagement Rate", value: "+25%" },
      { label: "Response Rate", value: "+15%" },
    ],
    tools: ["GoHighLevel", "SMS", "Email", "Call"],
    image: "/workflows/ghl-lead-capture.png",
    metric: "< 5 MINUTES",
    metricLabel: "Speed to lead",
  },
  {
    id: 12,
    title: "Automated Lead Response & CRM Tag Hygiene",
    category: "GoHighLevel",
    subTags: ["CRM Hygiene"],
    tags: ["GOHIGHLEVEL", "SMS", "EMAIL", "AUTOMATION"],
    description:
      "Created a GoHighLevel automation that responds to new leads instantly while simultaneously auditing and updating CRM tags based on lead behavior and pipeline stage. Stale or incorrectly tagged contacts are automatically cleaned and re-sequenced to ensure accurate segmentation and reporting.",
    impactHeadline: "Ensured a Pristine Pipeline and Accurate Lead Status Reporting.",
    impact:
      "Messy CRM data was causing the team to target the wrong leads and report inaccurate conversion metrics. This system keeps every contact properly tagged and sequenced at all times, giving leadership a clean pipeline they can trust for forecasting and decision-making.",
    results: [
      { label: "Pipeline Purity", value: "95% clean leads" },
      { label: "Stale Leads in Pipeline", value: "-40%" },
      { label: "Sequence Compliance", value: "100%" },
    ],
    tools: ["GoHighLevel", "SMS", "Email", "Automation"],
    image: "/workflows/ghl-tag-hygiene.png",
    metric: "95% CLEAN LEADS",
    metricLabel: "Pipeline purity",
  },
  {
    id: 13,
    title: "AI Inbound Voice Agent & Appointment Booker (GHL)",
    category: "GoHighLevel",
    subTags: ["Voice AI"],
    tags: ["GOHIGHLEVEL", "AI AGENT", "KNOWLEDGE BASE", "CALENDAR APIS", "CALL TRANSFER"],
    description:
      "Deployed a GoHighLevel-native AI voice agent that handles inbound calls 24/7, answers Tier 1 questions using a structured knowledge base, qualifies callers, books appointments directly into the calendar, and transfers to a live agent when escalation is needed.",
    impactHeadline: "Provided 24/7 AI-Powered Tier 1 Support and Qualification.",
    impact:
      "The client was missing calls outside business hours and spending agent time on repetitive inquiries. This AI voice agent captures and qualifies every inbound call around the clock, books appointments instantly, and only escalates complex cases — freeing human agents for high-value conversations.",
    results: [
      { label: "Call Coverage", value: "24/7/365" },
      { label: "Tier 1 Resolution by AI", value: "85%" },
      { label: "Time to Appointment", value: "< 30 seconds" },
    ],
    tools: ["GoHighLevel", "AI Agent", "Knowledge Base", "Calendar APIs", "Call Transfer"],
    image: "/workflows/ghl-voice-agent.png",
    metric: "24/7/365",
    metricLabel: "Call coverage",
  },
  {
    id: 14,
    title: "Instagram Lead Gen & Segmentation Engine",
    category: "GoHighLevel",
    subTags: ["Social Commerce"],
    tags: ["MANYCHAT", "INSTAGRAM API", "GOHIGHLEVEL", "AUTOMATION"],
    description:
      "Built a ManyChat + GoHighLevel integration that captures Instagram comment and DM triggers, instantly delivers lead magnets via direct message, collects email opt-ins through a compliant flow, and pushes segmented contacts directly into GoHighLevel for automated nurturing sequences.",
    impactHeadline: "Converted Viral Engagement into Owned CRM Data (Email Leads).",
    impact:
      "The client had high Instagram engagement but no way to convert followers into owned contacts. This system turns every comment or DM keyword trigger into a structured lead capture event — building an email list from organic traffic while keeping the process fully compliant and spam-free.",
    results: [
      { label: "Response Time", value: "Instant" },
      { label: "Spam Flagging Risk", value: "0%" },
      { label: "Lead Capture", value: "24/7 Auto" },
    ],
    tools: ["ManyChat", "Instagram API", "GoHighLevel", "Automation"],
    image: "/workflows/ghl-instagram-lead.png",
    metric: "INSTANT",
    metricLabel: "Response time",
  },

  // ── Make ─────────────────────────────────────────────────────────────────
  {
    id: 15,
    title: "Serverless Custom Helpdesk System",
    category: "Make",
    subTags: ["Support Ops"],
    tags: ["MAKE", "GOOGLE SHEETS", "GMAIL API", "REGEX"],
    description:
      "A completely custom-built support ticketing system engineered to replace expensive enterprise helpdesk software. By leveraging Google Sheets as a relational database and Make.com as the logic engine, I created a system that allows support agents to manage thousands of tickets directly from a spreadsheet interface while maintaining professional email threading for the end user.",
    impactHeadline: "Replaced Enterprise Helpdesk with Custom Logic.",
    impact:
      "The client was managing customer support via a shared Gmail inbox, leading to collision issues (two agents replying to one email), lack of ticket tracking numbers, and zero data on agent performance. They needed a structured ticketing system but wanted to avoid the high monthly fees of platforms like Zendesk or Freshdesk. I architected a 'Serverless' helpdesk using Make.com. The system parses incoming emails, assigns them to agents based on availability, and threads conversations using unique Ticket IDs.",
    results: [
      { label: "Cost Savings", value: "100% vs SaaS" },
      { label: "Collision Rate", value: "0%" },
      { label: "Ticket Volume", value: "Thousands/mo" },
    ],
    tools: ["Make", "Google Sheets", "Gmail API", "Regex"],
    image: "/workflows/make-helpdesk.png",
    metric: "100% VS SAAS",
    metricLabel: "Cost savings",
  },
  {
    id: 16,
    title: "Automated Xero Transaction Export to Asana for Accounting",
    category: "Make",
    subTags: ["Financial Ops"],
    tags: ["MAKE", "XERO", "ASANA", "GOOGLE SHEETS"],
    description:
      "This critical accounting workflow automatically monitors completed tasks in Asana, exports the associated transaction data from Xero via API, and uploads the categorized data as a CSV attachment back into the correct Asana task. The workflow uses routing and iteration to handle bulk data efficiently.",
    impactHeadline: "Eliminated Manual Data Transfer & Ensured Audit Compliance.",
    impact:
      "The accounting team spent 5-10 hours monthly manually reconciling transactions by exporting, formatting, and uploading CSVs. This Make.com flow ensures that every completed project in Asana has immediate, verified financial records attached, guaranteeing accuracy and streamlining the monthly close process.",
    results: [
      { label: "Hours Saved Per Month", value: "8 hours" },
      { label: "Data Transfer Speed", value: "Instant" },
      { label: "Error Rate", value: "0%" },
    ],
    tools: ["Make", "Xero", "Asana", "Google Sheets"],
    image: "/workflows/make-xero-asana.png",
    metric: "8 HOURS",
    metricLabel: "Hours saved per month",
  },
  {
    id: 17,
    title: "Automated Gmail Attachment Sorting and Logging",
    category: "Make",
    subTags: ["Admin Ops"],
    tags: ["MAKE", "GMAIL", "GOOGLE DRIVE", "GOOGLE SHEETS", "GEMINI AI"],
    description:
      "This workflow monitors an inbox for emails with attachments, uses Google Gemini AI to process and categorize the attachment content, stores the files in the correct Google Drive folder, and logs the metadata into a Google Sheet for auditability.",
    impactHeadline: "Created a Fully Auditable Digital Filing System.",
    impact:
      "The client was losing critical documents and spending excessive time searching their inbox and drive for specific attachments. This system enforces structure, providing an immediate, searchable log in Google Sheets and guaranteeing every file is correctly saved based on its content, not just the email subject line.",
    results: [
      { label: "Time Saved Per File", value: "5 minutes" },
      { label: "Hours Saved Per Month", value: "15 hours" },
      { label: "Filing Accuracy", value: "100%" },
    ],
    tools: ["Make", "Gmail", "Google Drive", "Google Sheets", "Gemini AI"],
    image: "/workflows/make-gmail-attachment.png",
    metric: "5 MINUTES",
    metricLabel: "Time saved per file",
  },
  {
    id: 18,
    title: "Enterprise E-Commerce & Accounting Synchronization",
    category: "Make",
    subTags: ["FinOps"],
    tags: ["MAKE", "QUICKBOOKS ONLINE", "SELLERCLOUD API", "JSON", "DATASTORE"],
    description:
      "This project involves a highly complex Make.com scenario designed to automate financial reporting for a high-volume wholesale distributor. It eliminates manual data entry by systematically synchronizing orders, customers, and inventory items between SellerCloud and QuickBooks Online.",
    impactHeadline: "Full-Cycle Automation: E-Commerce Order Management to Accounting Platform.",
    impact:
      "The client processed thousands of orders manually, leading to ledger errors and duplicate profiles. This automation 'watches' for shipped orders, applying smart logic to find or create customers and items, updating prices dynamically, and ensuring 100% reconciliation without human intervention.",
    results: [
      { label: "Financial Accuracy", value: "100%" },
      { label: "Manual Entry", value: "Eliminated" },
      { label: "Scale", value: "Thousands/mo" },
    ],
    tools: ["Make", "QuickBooks Online", "SellerCloud API", "JSON", "DataStore"],
    image: "/workflows/make-ecommerce-sync.png",
    metric: "100%",
    metricLabel: "Financial accuracy",
  },
  {
    id: 19,
    title: "Automated Real Estate Deal Analysis (TrueARV)",
    category: "Make",
    subTags: ["Real Estate Ops"],
    tags: ["MAKE", "GOOGLE DRIVE API", "RAPIDAPI", "GOOGLE SHEETS", "JSON"],
    description:
      "A comprehensive operational workflow designed for Real Estate Investors. This system ('TrueARV') completely automates the administrative setup and initial underwriting of new property leads. It transforms a simple form submission into a fully organized, data-enriched deal package ready for human review.",
    impactHeadline: "Zero-Touch Operations: From Lead Capture to Market Analysis.",
    impact:
      "Manual setup and analysis were slowing down speed-to-lead. This automation instantly provisions Google Drive folder structures and pulls live property data (AVM) to calculate 'Confidence Tiers' based on spread percentage. It handles error logging and database updates autonomously, allowing the sales team to focus purely on closing deals.",
    results: [
      { label: "Deal Processing Time", value: "< 1 min" },
      { label: "Admin Touchpoints", value: "0" },
      { label: "Data Enrichment", value: "Automated" },
    ],
    tools: ["Make", "Google Drive API", "RapidAPI", "Google Sheets", "JSON"],
    image: "/workflows/make-real-estate.png",
    metric: "< 1 MIN",
    metricLabel: "Deal processing time",
  },
];

const categories = ["n8n", "Zapier", "GoHighLevel", "Make"];

const PortfolioSection = () => {
  const [active, setActive] = useState("n8n");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter((p) => p.category === active);

  const countFor = (cat: string) =>
    projects.filter((p) => p.category === cat).length;

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium accent-text uppercase tracking-widest mb-3">
            My Work
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
            Automation <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real automations built for real businesses. Click any project to see the full case study.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-[hsl(270,60%,55%)] text-white shadow-[0_0_20px_hsl(270,60%,55%,0.4)]"
                  : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
              }`}
            >
              {cat}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                  active === cat
                    ? "bg-white/20 text-white"
                    : "bg-white/8 text-muted-foreground"
                }`}
              >
                {countFor(cat)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              onClick={() => setSelected(project)}
              className="group rounded-xl bg-[hsl(222,47%,9%)] border border-white/8 overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-[hsl(180,100%,40%,0.25)] hover:shadow-[0_0_24px_hsl(180,100%,40%,0.08)] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-44 bg-[#0d0d18] overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Workflow className="w-10 h-10 text-white/10" />
                  </div>
                )}
                {/* Category badge */}
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm border border-white/10 uppercase tracking-wide">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display font-bold text-base text-foreground mb-2 leading-snug group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-muted-foreground tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-muted-foreground">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-3 border-t border-white/6">
                  <span className="text-sm font-bold text-[hsl(180,100%,50%)]">
                    {project.metric}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-[hsl(180,100%,50%)] transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default PortfolioSection;
