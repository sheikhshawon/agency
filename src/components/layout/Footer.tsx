import Link from "next/link";
import Logo from "@/components/common/Logo";

/* Figma Footer: 1440x284, bg rgb(4,5,27), Logo + nav + socials + copyright */

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { Icon: FacebookIcon, href: "https://facebook.com/enifit", label: "Facebook" },
  { Icon: TwitterIcon, href: "https://twitter.com/enifit", label: "Twitter" },
  { Icon: InstagramIcon, href: "https://instagram.com/enifit", label: "Instagram" },
  { Icon: LinkedinIcon, href: "https://linkedin.com/company/enifit", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: "#04051B",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(42,37,148,0.6), transparent)",
        }}
      />

      <div className="max-w-[1312px] mx-auto px-6 xl:px-0 py-14 lg:py-16 flex flex-col items-center gap-10">

        {/* Logo */}
        <Logo height={30} />

        {/* Nav links */}
        <nav>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[14px] text-white/45 hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white hover:border-[#2A2594]/50 hover:bg-[#2A2594]/15 transition-all duration-300"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between w-full">
          <p
            className="text-[13px] text-white/30"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            © {new Date().getFullYear()} Enif IT Services Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[13px] text-white/30 hover:text-white/60 transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[13px] text-white/30 hover:text-white/60 transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
