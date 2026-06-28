import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <MarqueeSection />
      <FeaturesSection />
      <WhyUsSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}
