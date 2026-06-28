import Hero from "@/components/sections/Hero";
import MarqueeSection from "@/components/sections/MarqueeSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero: Empowering Tomorrow with Smart Technology */}
      <Hero />
      {/* 2 — Marquee: scrolling tech/partner logos */}
      <MarqueeSection />
      {/* 3 — About: left dark card + right text (Figma Frame 247) */}
      <AboutSection />
      {/* 4 — Features/Services: 5-card grid (Figma Frame 1020) */}
      <FeaturesSection />
      {/* 5 — Why Choose Us: 3 cards (Figma Group 39475) */}
      <WhyUsSection />
      {/* 6 — FAQ: accordion (Figma Frame 1019) */}
      <FAQSection />
      {/* 7 — CTA Banner: full-width gradient (Figma Group 39474) */}
      <CTABanner />
    </>
  );
}
