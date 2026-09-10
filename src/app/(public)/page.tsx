// src/app/(public)/page.tsx
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
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedOpportunities />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}