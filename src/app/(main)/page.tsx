import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import MarqueeSection from "@/components/sections/MarqueeSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import FAQSection from "@/components/sections/FAQSection";
import CTABanner from "@/components/sections/CTABanner";
import { getPartners } from "@/app/admin/partners/actions";

export default async function HomePage() {
  const partners = await getPartners();

  return (
    <>
      <Hero />
      <AboutSection />
      <MarqueeSection partners={partners} />
      <FeaturesSection />
      <WhyUsSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}
