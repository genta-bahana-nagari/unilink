"use client";

import {
  HeroSection,
  FeaturedOpportunities,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  CTASection,
} from "@/components/section/landing/";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedOpportunities />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
