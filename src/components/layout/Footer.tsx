import Link from "next/link";
import Logo from "@/components/common/Logo";
import SubscribeForm from "@/components/layout/SubscribeForm";

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FBIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}
function IGIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LIIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const NAV = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Projects",     href: "/projects" },
  { label: "Blog",         href: "/blog" },
  { label: "Contact",      href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

const SOCIALS = [
  { Icon: LIIcon, href: "#", label: "LinkedIn" },
  { Icon: FBIcon, href: "#", label: "Facebook" },
  { Icon: XIcon,  href: "#", label: "Twitter/X" },
  { Icon: IGIcon, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer style={{ background: "transparent", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-[1312px] mx-auto px-6 xl:px-0">

        {/* Newsletter row */}
        <div className="flex items-center justify-between py-10 gap-6 flex-wrap">
          <div className="max-w-md">
            <h3
              className="text-white text-lg font-semibold"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Stay in the loop
            </h3>
            <p
              className="text-[13px] text-white/40 mt-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Get occasional updates on what we&apos;re building. No spam, ever.
            </p>
          </div>
          <SubscribeForm />
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Main row */}
        <div className="flex items-center justify-between py-8 gap-6 flex-wrap">

          {/* Logo */}
          <Logo height={26} />

          {/* Nav */}
          <nav>
            <ul className="flex items-center gap-7 flex-wrap justify-center">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Copyright */}
        <div className="py-5 text-center">
          <p className="text-[12px] text-white/25"
            style={{ fontFamily: "var(--font-dm-sans)" }}>
            Copyright © 2026 Enif IT Services Ltd. All Rights Reserved. &nbsp;|&nbsp; enifit.com
          </p>
        </div>
      </div>
    </footer>
  );
}
