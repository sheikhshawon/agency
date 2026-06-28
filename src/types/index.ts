export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  href: string;
  year: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  challenge: string;
  result: string;
  metric: string;
  metricLabel: string;
  industry: string;
  image: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  href: string;
}
