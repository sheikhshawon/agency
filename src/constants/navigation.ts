import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web & App Development", href: "/services#web-app" },
      { label: "Business Management", href: "/services#business" },
      { label: "Marketing & Growth", href: "/services#marketing" },
      { label: "Brand & Design", href: "/services#brand" },
      { label: "AI & Automation", href: "/services#ai" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_EXPLORE: NavItem[] = [
  { label: "Newsletter", href: "/newsletter" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
];

export const FOOTER_MENU: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
