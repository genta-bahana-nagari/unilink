"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Make an Impact?
        </h2>
        <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
          Join thousands of researchers, organizers, and participants who are
          already collaborating on meaningful projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-neutral-100 shadow-lg shadow-black/20 w-full sm:w-auto"
            >
              Start Your Journey
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/events">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black w-full sm:w-auto"
            >
              Browse Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
