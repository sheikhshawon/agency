import type { Service, Project, Testimonial, Stat } from "@/types";

export const HERO_STATS: Stat[] = [
  { value: "1000", suffix: "+", label: "Smart Tech Solutions" },
  { value: "283", suffix: "K+", label: "Business Clients" },
  { value: "300", suffix: "M+", label: "Users Reached" },
];

export const SERVICES: Service[] = [
  {
    id: "web-app",
    title: "Web & App Development",
    description:
      "Scalable, high-performance web and mobile applications built with modern technologies that grow with your business.",
    icon: "Code2",
    href: "/services#web-app",
    features: ["Custom Web Apps", "Mobile Development", "API Integration", "Cloud Deployment"],
  },
  {
    id: "business",
    title: "Business Management Solutions",
    description:
      "Streamline your operations with intelligent ERP, CRM, and workflow automation systems tailored to your processes.",
    icon: "LayoutDashboard",
    href: "/services#business",
    features: ["ERP Systems", "CRM Platforms", "Process Automation", "Analytics Dashboards"],
  },
  {
    id: "marketing",
    title: "Marketing & Business Growth",
    description:
      "Data-driven marketing strategies and growth hacking techniques that deliver measurable ROI and sustainable growth.",
    icon: "TrendingUp",
    href: "/services#marketing",
    features: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Growth Analytics"],
  },
  {
    id: "brand",
    title: "Brand Identity & Creative Design",
    description:
      "Compelling brand identities and stunning visual experiences that make your business unforgettable in the market.",
    icon: "Palette",
    href: "/services#brand",
    features: ["Brand Strategy", "Logo & Identity", "UI/UX Design", "Motion Graphics"],
  },
  {
    id: "ai",
    title: "AI Solutions & Automation",
    description:
      "Cutting-edge AI tools, automation pipelines, and intelligent systems that eliminate repetition and unlock efficiency.",
    icon: "Sparkles",
    href: "/services#ai",
    features: ["AI Integration", "Process Automation", "Chatbots & Agents", "Data Intelligence"],
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "NexaCommerce Platform",
    description: "Full-stack e-commerce ecosystem with AI-powered recommendations and real-time inventory management.",
    category: "Web Development",
    image: "/images/projects/nexa-commerce.jpg",
    tags: ["Next.js", "AI", "Supabase"],
    href: "/projects/nexa-commerce",
    year: "2024",
  },
  {
    id: "proj-2",
    title: "PulseHR: HR Management Suite",
    description: "Enterprise HR platform serving 5,000+ employees with automated onboarding and performance tracking.",
    category: "Business Solutions",
    image: "/images/projects/pulse-hr.jpg",
    tags: ["React", "Node.js", "PostgreSQL"],
    href: "/projects/pulse-hr",
    year: "2024",
  },
  {
    id: "proj-3",
    title: "GrowthOS: Marketing Automation",
    description: "AI-driven marketing automation that increased client lead generation by 340% in 90 days.",
    category: "Marketing & Growth",
    image: "/images/projects/growth-os.jpg",
    tags: ["AI", "Automation", "Analytics"],
    href: "/projects/growth-os",
    year: "2023",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "James Harrington",
    role: "CEO",
    company: "Apex Retail Group",
    avatar: "/images/avatars/james.jpg",
    quote:
      "Enif IT transformed our digital presence completely. Their team didn't just build a website, they built a growth engine. ROI was visible within the first month.",
    rating: 5,
  },
  {
    id: "t-2",
    name: "Sarah Chen",
    role: "CTO",
    company: "MediFlow Clinics",
    avatar: "/images/avatars/sarah.jpg",
    quote:
      "The business management system they delivered is exceptional. Complex requirements handled with precision. Our team's productivity jumped 60% on day one.",
    rating: 5,
  },
  {
    id: "t-3",
    name: "Marcus Blake",
    role: "Founder",
    company: "GrowStack Agency",
    avatar: "/images/avatars/marcus.jpg",
    quote:
      "We hired Enif IT for AI automation and they over-delivered. Their solutions saved us 40+ hours per week. Best tech investment we've ever made.",
    rating: 5,
  },
];

export const IMPACT_STATS: Stat[] = [
  { value: "4,172", suffix: "+", label: "Digital Projects" },
  { value: "500", suffix: "M+", label: "Active Users" },
  { value: "97.2", suffix: "%", label: "Client Satisfaction" },
  { value: "600", suffix: "+", label: "Innovations Shipped" },
];
