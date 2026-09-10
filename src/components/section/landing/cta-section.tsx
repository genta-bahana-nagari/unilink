"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-background text-foreground transition-colors duration-300">
      {/* Subtle theme-aware background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
          Ready to Make an Impact?
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of researchers, organizers, and participants who are
          already collaborating on meaningful projects.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA */}
          <Link href="/auth/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="
               cursor-pointer
                w-full sm:w-auto
                h-12
                px-7
                rounded-full
                border-border
                bg-background
                text-foreground
                hover:bg-muted
                hover:text-foreground
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              Start Your Journey
              <FiArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/events" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="
                cursor-pointer
                w-full sm:w-auto
                h-12
                px-7
                rounded-full
                border-border
                bg-background
                text-foreground
                hover:bg-muted
                hover:text-foreground
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              Browse Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
