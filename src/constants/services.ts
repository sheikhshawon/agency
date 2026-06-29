import {
  Code2,
  LayoutDashboard,
  TrendingUp,
  Palette,
  Sparkles,
  AppWindow,
  ShoppingCart,
  Smartphone,
  Webhook,
  RefreshCw,
  Search,
  PenTool,
  Rocket,
  Contact,
  LayoutGrid,
  BarChart3,
  Workflow,
  Wrench,
  Network,
  ClipboardList,
  Hammer,
  GraduationCap,
  Target,
  FileText,
  LineChart,
  Mail,
  Compass,
  Star,
  BookOpen,
  Megaphone,
  Monitor,
  Printer,
  PackageCheck,
  Bot,
  BrainCircuit,
  Wand2,
  Plug,
  Activity,
} from "lucide-react";

export type ProcessStep = {
  icon: React.ElementType;
  label: string;
  title: string;
  desc: string;
};

export type ServiceDetail = {
  slug: string;
  number: string;
  icon: React.ElementType;
  title: string;
  /** Short blurb used on the services index cards. */
  short: string;
  /** Headline shown on the service detail page hero. */
  headline: string;
  body: string[];
  included: { icon?: React.ElementType; title: string; desc: string }[];
  /** Label for the hero / bottom CTA button. */
  cta: string;

  /* ---- Optional rich content for fully-built detail pages ---- */
  /** Word(s) within `headline` to accent in the hero. */
  heroHighlight?: string;
  /** Hero supporting paragraph (falls back to `short`). */
  heroSupporting?: string;
  overviewLabel?: string;
  overviewHeadline?: string;
  /** Overview body (falls back to `body`). */
  overviewBody?: string[];
  /** Heading for the "What is Included" section. */
  includedHeadline?: string;
  includedHighlight?: string;
  techStack?: string[];
  /** Custom process steps (falls back to a generic process). */
  process?: ProcessStep[];
  /** Heading for the process section. */
  processHeadline?: string;
  processHighlight?: string;
  bottomCta?: { headline: string; highlight: string; supporting: string };
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "web-app-development",
    number: "01",
    icon: Code2,
    title: "Web and App Development",
    short:
      "High-performance websites and web applications built on modern stacks for speed, scale, and exceptional user experience.",
    headline: "Your Digital Foundation, Built to Perform at Scale",
    heroHighlight: "Perform at Scale",
    heroSupporting:
      "We architect and build high-performance websites and web applications using modern stacks designed for speed, scalability, and exceptional user experience. Your digital presence should be as ambitious as your business.",
    body: [
      "A slow website, a broken user experience, or an application that cannot handle growth are not minor inconveniences. They are active barriers to revenue. Every day your digital infrastructure underperforms is a day your competitors gain ground.",
      "We build websites and applications that reverse that dynamic. Every project we deliver is architected on a modern, maintainable technology stack chosen for performance and long-term scalability. We do not use templates where custom solutions are needed, and we do not build for today when your business is planning for tomorrow.",
      "From your first marketing website to a complex multi-user web application, we bring the same standard of engineering precision and user-centric thinking to every project we take on.",
    ],
    overviewLabel: "What We Do",
    overviewHeadline: "We Build Digital Products That Remove Barriers to Revenue",
    included: [
      {
        icon: Code2,
        title: "Custom Website Development",
        desc: "High-performance marketing sites, landing pages, and corporate websites engineered for speed, SEO, and conversion. Every site we build is responsive, accessible, and structured to rank.",
      },
      {
        icon: AppWindow,
        title: "Web Application Development",
        desc: "Complex web apps, SaaS platforms, client portals, and internal tools built on scalable, maintainable architecture. We build for performance today and capacity tomorrow.",
      },
      {
        icon: ShoppingCart,
        title: "E-Commerce Development",
        desc: "End-to-end online store builds with seamless payment integration, inventory management, and conversion-optimised design. We build stores that turn visitors into buyers and buyers into repeat customers.",
      },
      {
        icon: Smartphone,
        title: "Mobile App Development",
        desc: "Cross-platform and native mobile applications designed for the user experience your audience expects. Fast, intuitive, and built to reflect your brand at every interaction.",
      },
      {
        icon: Webhook,
        title: "API Development and Integration",
        desc: "Robust APIs and third-party integrations that connect your digital products to the platforms and tools your business depends on. We make your systems talk to each other.",
      },
      {
        icon: RefreshCw,
        title: "Website Maintenance and Optimisation",
        desc: "Ongoing support, performance monitoring, security updates, and continuous optimisation to ensure your digital products keep performing as your business scales.",
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Supabase",
      "Sanity CMS",
      "Shopify",
      "WordPress",
      "Flutter",
      "REST API",
      "GraphQL",
      "AWS",
      "Vercel",
    ],
    process: [
      {
        icon: Search,
        label: "Discovery",
        title: "We Map Your Requirements",
        desc: "We learn your business goals, target audience, technical constraints, and growth plans before writing a single line of code.",
      },
      {
        icon: PenTool,
        label: "Design",
        title: "We Build the Blueprint",
        desc: "Wireframes, user flows, and UI design crafted to deliver the right experience for your audience and the right foundation for your developers.",
      },
      {
        icon: Code2,
        label: "Development",
        title: "We Build With Precision",
        desc: "Clean, documented, scalable code. Regular builds for review. A dedicated contact keeping you informed at every stage.",
      },
      {
        icon: Rocket,
        label: "Launch and Optimise",
        title: "We Go Live and Keep Improving",
        desc: "Full QA, performance testing, and a structured launch. Then ongoing monitoring and optimisation to ensure performance compounds over time.",
      },
    ],
    bottomCta: {
      headline: "Ready to Build Something That Actually Performs?",
      highlight: "That Actually Performs?",
      supporting:
        "Tell us what you are building. We will tell you exactly how we would approach it.",
    },
    cta: "Start Your Project",
  },
  {
    slug: "business-management-solutions",
    number: "02",
    icon: LayoutDashboard,
    title: "Business Management Solutions",
    short:
      "Integrated CRM, ERP, and operations systems that give you complete visibility and control over every part of your business.",
    headline: "Full Visibility. Total Control. Zero Operational Friction.",
    heroHighlight: "Zero Operational Friction.",
    heroSupporting:
      "We design and implement integrated business management systems that unify your operations, eliminate manual workflows, and give leadership complete clarity over every part of the business.",
    body: [
      "When your business runs on disconnected tools, manual processes, and siloed data, growth creates more problems than it solves. Every new team member, client, or market you add increases operational complexity. Without the right systems in place, that complexity gets absorbed by your people, and it slows everything down.",
      "We build integrated business management solutions that absorb that complexity instead. CRM systems that reflect how your sales team actually works. ERP platforms that unify every operational function. Dashboards that give leadership real answers in seconds, not hours of manual reporting.",
      "The result is a business that scales without losing control. One where your team spends time on high-value work instead of administration, and where every decision is made with accurate, up-to-date information.",
    ],
    overviewLabel: "What We Do",
    overviewHeadline: "We Build the Systems That Let Your Business Run at Full Capacity",
    includedHeadline: "Every System We Build Under This Discipline",
    includedHighlight: "Under This Discipline",
    included: [
      {
        icon: Contact,
        title: "CRM Implementation and Customisation",
        desc: "Sales pipeline management, contact tracking, and customer relationship tools configured precisely to your sales process. We implement and customise platforms like HubSpot, Salesforce, and Zoho, or build fully custom CRM systems when standard platforms do not fit.",
      },
      {
        icon: LayoutGrid,
        title: "ERP Systems",
        desc: "Enterprise resource planning systems that unify your operations, inventory, procurement, and financial data into a single source of truth. Built for businesses that have outgrown spreadsheets and disconnected tools.",
      },
      {
        icon: BarChart3,
        title: "Operations Dashboards",
        desc: "Real-time reporting and KPI dashboards that give leadership instant visibility into business performance without manually pulling data from multiple systems. Built to your metrics, not a default template.",
      },
      {
        icon: Workflow,
        title: "Process Automation",
        desc: "Automated workflows that eliminate repetitive manual tasks, reduce human error, and free your team to focus on work that actually requires their expertise. From approval flows to notification systems to data sync across platforms.",
      },
      {
        icon: Wrench,
        title: "Custom Internal Tools",
        desc: "Bespoke internal platforms and tools built for the specific workflows your business runs on. When no off-the-shelf solution fits, we build exactly what you need.",
      },
      {
        icon: Network,
        title: "System Integration",
        desc: "Connecting your existing platforms so they share data and work together. We eliminate the manual transfer of information between systems and create a unified operational environment.",
      },
    ],
    process: [
      {
        icon: ClipboardList,
        label: "Audit",
        title: "We Understand How You Operate Today",
        desc: "We map your current workflows, tools, data flows, and pain points before proposing any system. The more we understand the real shape of your operations, the more precisely we can improve them.",
      },
      {
        icon: PenTool,
        label: "Design",
        title: "We Architect the Right Solution",
        desc: "A structured system design with a clear implementation plan, phased rollout where needed, and defined success criteria. No surprises.",
      },
      {
        icon: Hammer,
        label: "Build and Configure",
        title: "We Build and Migrate",
        desc: "System build, configuration, data migration, and integration with your existing platforms. Your team stays operational throughout.",
      },
      {
        icon: GraduationCap,
        label: "Train and Optimise",
        title: "We Hand Over With Full Confidence",
        desc: "Team training, documentation, and a structured handover. Then ongoing support and optimisation as your operations evolve.",
      },
    ],
    processHeadline: "We Map Your Operations Before We Touch a System",
    processHighlight: "Before We Touch a System",
    bottomCta: {
      headline: "Ready to Run Your Business Without the Friction?",
      highlight: "Without the Friction?",
      supporting:
        "Tell us how your business operates today. We will show you what it could look like with the right systems in place.",
    },
    cta: "Streamline Your Operations",
  },
  {
    slug: "marketing-business-growth",
    number: "03",
    icon: TrendingUp,
    title: "Marketing and Business Growth",
    short:
      "Data-led SEO, performance campaigns, and conversion systems that build compounding growth pipelines, not one-off traffic spikes.",
    headline: "Growth Systems That Compound Over Time",
    heroHighlight: "Compound Over Time",
    heroSupporting:
      "We combine data-led SEO, performance campaigns, and conversion optimisation to build marketing engines that generate consistent, compounding pipeline. Not one-off traffic spikes. Real, sustainable growth.",
    body: [
      "Most marketing agencies optimise for the metric that looks best in a report. Impressions. Clicks. Reach. The numbers that are easy to inflate and hard to connect to actual business outcomes.",
      "We build growth systems oriented around one thing: revenue. That means starting with your market, your audience, and your competitive position before we touch a single ad account or publish a single piece of content. It means connecting every marketing activity to a measurable outcome. And it means building compounding systems instead of running isolated campaigns that produce a spike and then flatten.",
      "The businesses we work with do not just get more traffic. They get more of the right traffic, converting at a higher rate, generating more revenue per customer over a longer period. That is what a growth system produces, and that is what we build.",
    ],
    overviewLabel: "What We Do",
    overviewHeadline: "Traffic is Not the Goal. Revenue Is.",
    includedHeadline: "Every Growth Channel We Engineer and Manage",
    includedHighlight: "We Engineer and Manage",
    included: [
      {
        icon: Search,
        title: "Search Engine Optimisation",
        desc: "Technical SEO, on-page optimisation, content strategy, and authority building that improves your organic rankings and drives qualified traffic that converts. We focus on the keywords and intent signals that bring buyers, not just browsers.",
      },
      {
        icon: Target,
        title: "Performance Marketing",
        desc: "Paid search and social campaigns managed with precision targeting, continuous creative testing, and a relentless focus on cost per acquisition. We do not set campaigns live and leave them running. We optimise constantly.",
      },
      {
        icon: FileText,
        title: "Content Marketing",
        desc: "Strategic content that builds trust, demonstrates expertise, and attracts the right audience at every stage of the buying journey. Articles, guides, case studies, and landing pages that do real commercial work.",
      },
      {
        icon: LineChart,
        title: "Conversion Rate Optimisation",
        desc: "Systematic testing and optimisation of your website and landing pages to turn more of your existing traffic into paying customers. More revenue from the audience you already have.",
      },
      {
        icon: Mail,
        title: "Email and Retention Marketing",
        desc: "Automated email sequences, lifecycle campaigns, and retention strategies that increase customer lifetime value and reduce churn. The most underutilised growth lever for most businesses.",
      },
      {
        icon: BarChart3,
        title: "Analytics and Growth Reporting",
        desc: "Clear, actionable reporting that connects every marketing activity directly to business outcomes. You always know what is working, what is not, and where to invest next.",
      },
    ],
    process: [
      {
        icon: Search,
        label: "Research",
        title: "We Study Your Market First",
        desc: "Audience research, competitor analysis, keyword landscape, and channel audit. We build a complete picture of your growth opportunity before recommending a single tactic.",
      },
      {
        icon: PenTool,
        label: "Strategy",
        title: "We Design Your Growth System",
        desc: "A connected marketing plan that maps channels, content, campaigns, and conversion flows to your specific revenue goals. Every element has a purpose and a measurable outcome.",
      },
      {
        icon: Rocket,
        label: "Execute",
        title: "We Build and Launch",
        desc: "Campaign setup, content production, SEO implementation, and tracking configuration. Launched with precision, not rushed to fill a calendar slot.",
      },
      {
        icon: RefreshCw,
        label: "Optimise",
        title: "We Improve Every Week",
        desc: "Continuous testing, reporting, and optimisation. We compound what is working and cut what is not. Growth is not a one-time event. It is a system we manage and improve over time.",
      },
    ],
    processHeadline: "Strategy Before Execution. Always.",
    processHighlight: "Always.",
    bottomCta: {
      headline: "Ready to Build a Pipeline That Grows While You Sleep?",
      highlight: "That Grows While You Sleep?",
      supporting:
        "Tell us your current marketing situation and your growth targets. We will map the fastest route from one to the other.",
    },
    cta: "Build Your Growth Engine",
  },
  {
    slug: "brand-identity-creative-design",
    number: "04",
    icon: Palette,
    title: "Brand Identity and Creative Design",
    short:
      "Brand systems built to communicate authority from the first impression, from visual identity to full campaign assets.",
    headline: "The First Thing People See Decides Whether They Stay",
    heroHighlight: "Decides Whether They Stay",
    heroSupporting:
      "We build brand identities that communicate authority immediately. From brand strategy and visual identity to campaign design and digital creative, every element is engineered to build trust and hold its own at any scale.",
    body: [
      "Most businesses underestimate what their brand is actually doing. Every time a potential client lands on your website, sees your social content, reads your proposal, or receives your email, they are making a judgement about whether your business is the kind of company they want to work with.",
      "When those impressions are inconsistent, unclear, or generic, they cost you trust before you have had a chance to earn it. When they are precise, confident, and consistent, they do a significant portion of your sales work before a conversation even begins.",
      "We do not design logos. We build brand systems. That means starting with strategy: understanding your market, your audience, your competitive position, and what your business needs to communicate to win. Then we translate that strategy into a visual and verbal identity that is distinctive, scalable, and built to last.",
      "The result is a brand that works as hard as the rest of your business.",
    ],
    overviewLabel: "What We Do",
    overviewHeadline: "Your Brand Is Not Your Logo. It Is Every Impression You Make.",
    includedHeadline: "Every Creative Discipline We Bring to Your Brand",
    includedHighlight: "We Bring to Your Brand",
    included: [
      {
        icon: Compass,
        title: "Brand Strategy and Positioning",
        desc: "Defining what your brand stands for, who it speaks to, and how it differentiates from competitors. This is the foundation every design decision is built on. Without it, design is decoration. With it, design becomes a business tool.",
      },
      {
        icon: Star,
        title: "Logo and Visual Identity",
        desc: "Primary logo, alternate marks, colour systems, and typography built for consistency and impact across every medium, from a business card to a billboard to a website header.",
      },
      {
        icon: BookOpen,
        title: "Brand Guidelines",
        desc: "A comprehensive brand guide that gives every team member, designer, and agency working with your brand the clarity to maintain consistency. Logo usage, colour codes, typography rules, tone of voice, and real-world application examples.",
      },
      {
        icon: Megaphone,
        title: "Marketing and Campaign Design",
        desc: "Social media assets, advertising creatives, presentations, pitch decks, and campaign materials designed to the same standard as your core brand. Every touchpoint reinforces the same impression.",
      },
      {
        icon: Monitor,
        title: "Website and Digital Design",
        desc: "UI and UX design for websites and applications that translate your brand identity into a digital experience that converts. Design that is not just visually strong but structurally sound for the user journeys that matter.",
      },
      {
        icon: Printer,
        title: "Print and Collateral Design",
        desc: "Business cards, brochures, packaging, signage, and any physical brand materials your business needs. Every printed piece held to the same standard as your digital presence.",
      },
    ],
    process: [
      {
        icon: Search,
        label: "Discover",
        title: "We Learn Your Brand's Context",
        desc: "Your market, your audience, your competitors, and your current brand perception. We build a complete picture before we design a single element.",
      },
      {
        icon: Compass,
        label: "Strategy",
        title: "We Define Your Brand Position",
        desc: "Brand values, personality, messaging framework, and visual direction. A clear strategic foundation that every creative decision will be built on.",
      },
      {
        icon: PenTool,
        label: "Design",
        title: "We Build Your Visual Identity",
        desc: "Logo system, colour palette, typography, and supporting visual elements. Presented in context so you can see exactly how the brand performs in the real world.",
      },
      {
        icon: PackageCheck,
        label: "Deliver",
        title: "We Hand Over a Complete Brand System",
        desc: "Final files in every format you need, a comprehensive brand guide, and ongoing creative support as your business grows and your brand evolves.",
      },
    ],
    processHeadline: "Strategy First. Design Second. Always.",
    processHighlight: "Design Second. Always.",
    bottomCta: {
      headline: "Ready for a Brand That Works as Hard as You Do?",
      highlight: "Works as Hard as You Do?",
      supporting:
        "Tell us about your business and where your current brand is falling short. We will show you what a precise, strategic rebrand can do.",
    },
    cta: "Build Your Brand Identity",
  },
  {
    slug: "ai-solutions-automation",
    number: "05",
    icon: Sparkles,
    title: "AI Solutions and Automation",
    short:
      "Intelligent workflows, predictive tools, and AI-integrated systems that eliminate manual decisions and accelerate every part of your operation.",
    headline: "Intelligent Systems That Work While Your Team Sleeps",
    heroHighlight: "Work While Your Team Sleeps",
    heroSupporting:
      "We design, build, and deploy AI-powered systems and automation workflows tailored to how your business actually operates. Not generic tools configured from a box. Intelligent solutions engineered around your specific processes, your highest-cost inefficiencies, and your greatest growth opportunities.",
    body: [
      "AI and automation are no longer a future consideration. They are an active competitive advantage available today, and the gap between businesses using them and businesses that are not is widening every quarter.",
      "The challenge is not access to AI tools. It is knowing which processes to automate first, which tools are actually suited to your business, and how to implement them in a way that integrates with your existing operations without disrupting them.",
      "That is exactly what we do. We start with a workflow audit that identifies where your team's time is going and where automation would have the highest impact. Then we design and build solutions that are specific to your business, not adapted from a generic template. The result is measurable time savings, reduced operational cost, and a business that scales without proportionally increasing headcount.",
    ],
    overviewLabel: "What We Do",
    overviewHeadline: "The Businesses Gaining Ground Are Working With Smarter Systems",
    includedHeadline: "Every AI and Automation Capability We Deploy for Your Business",
    includedHighlight: "We Deploy for Your Business",
    included: [
      {
        icon: Workflow,
        title: "Workflow Automation",
        desc: "End-to-end automation of repetitive business processes including lead handling, data entry, document generation, approval flows, notifications, reporting, and fulfilment tasks. We identify the highest-cost manual processes in your business and eliminate them.",
      },
      {
        icon: Bot,
        title: "AI Chatbots and Assistants",
        desc: "Intelligent conversational tools for customer support, lead qualification, appointment booking, internal knowledge management, and sales assistance. Built on your data, trained on your processes, and integrated into your website, app, or internal systems.",
      },
      {
        icon: BrainCircuit,
        title: "Predictive Analytics",
        desc: "AI-powered data analysis that surfaces patterns, forecasts demand, flags anomalies, and gives your leadership team the intelligence to make faster, more accurate decisions. Turn your historical data into a forward-looking business tool.",
      },
      {
        icon: Wand2,
        title: "AI Content and Creative Pipelines",
        desc: "Custom AI-assisted content workflows that increase your output capacity without increasing headcount. Automated content generation, review, and publishing pipelines built around your brand voice and quality standards.",
      },
      {
        icon: Contact,
        title: "CRM and Sales Automation",
        desc: "Automated lead scoring, follow-up sequences, pipeline stage management, and sales intelligence that accelerates your revenue cycle and ensures no opportunity goes unworked.",
      },
      {
        icon: Plug,
        title: "Custom AI Integration",
        desc: "Embedding AI capabilities directly into your existing platforms, websites, applications, and internal tools. If you have a system that could be smarter, we build the intelligence layer on top of it.",
      },
    ],
    process: [
      {
        icon: ClipboardList,
        label: "Audit",
        title: "We Map Where Time Is Being Lost",
        desc: "A structured workflow audit across your operations. We identify every manual, repetitive, or error-prone process and rank them by automation potential and business impact.",
      },
      {
        icon: PenTool,
        label: "Design",
        title: "We Design the Right Automation Strategy",
        desc: "A prioritised automation roadmap with clear ROI projections. We sequence implementation to deliver quick wins first while building toward the full system.",
      },
      {
        icon: Hammer,
        label: "Build",
        title: "We Build and Integrate",
        desc: "Custom automation workflows and AI systems built and integrated into your existing environment. Tested thoroughly before any process goes live.",
      },
      {
        icon: Activity,
        label: "Monitor and Scale",
        title: "We Track, Improve, and Expand",
        desc: "Performance monitoring, error handling, and continuous improvement. As your business grows, we expand the automation layer to match.",
      },
    ],
    processHeadline: "We Audit Before We Automate. Every Time.",
    processHighlight: "Every Time.",
    bottomCta: {
      headline: "Ready to Build a Business That Runs on Intelligence?",
      highlight: "That Runs on Intelligence?",
      supporting:
        "Tell us where your team is losing the most time. We will show you exactly how automation can give it back.",
    },
    cta: "Automate Your Business",
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
