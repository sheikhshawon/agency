"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";

const NAV_LINKS = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Projects",     href: "/projects" },
  { label: "Contact",      href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled ? "bg-[#04051B]/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
        )}
      >
        <div className="max-w-[1312px] mx-auto px-6 xl:px-0">
          <nav className="h-[72px] flex items-center justify-between">

            {/* Logo */}
            <Logo height={28} />

            {/* Pill nav — right side, matching Xenova layout */}
            <ul
              className="hidden lg:flex items-center gap-0.5 rounded-full border border-white/[0.14] px-3 py-1.5"
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}
            >
              {NAV_LINKS.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-[13.5px] font-medium transition-colors duration-200",
                        active ? "text-white bg-white/[0.10]" : "text-white/55 hover:text-white"
                      )}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#04051B]/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#070820] border-l border-white/[0.07] flex flex-col pt-24 px-6 pb-8"
            >
              <nav className="flex-1 flex flex-col gap-1">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 text-[14px] font-medium rounded-xl transition-colors",
                      pathname === item.href
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    )}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/contact"
                className="flex items-center justify-center px-6 py-3 text-[14px] font-medium bg-[#1560FF] text-white rounded-full hover:bg-[#2A2594] transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
