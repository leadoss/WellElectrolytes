import HeroSection from "@/components/home/HeroSection";
import FlavorsSection from "@/components/home/FlavorsSection";
import SocialProofStrip from "@/components/home/SocialProofStrip";
import IngredientsSection from "@/components/home/IngredientsSection";
import QualitySection from "@/components/home/QualitySection";
import ComparisonSection from "@/components/home/ComparisonSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FlavorsSection />
      <SocialProofStrip />
      <IngredientsSection />
      <QualitySection />
      <ComparisonSection />
      <TestimonialsSection />
    </>
  );
}
