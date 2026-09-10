"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FiUsers,
  FiTarget,
  FiArrowRight,
  FiZap,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Active Projects", value: "500+", icon: FiTarget },
  { label: "Participants", value: "10,000+", icon: FiUsers },
  { label: "Organizations", value: "200+", icon: FiGlobe },
  { label: "Success Rate", value: "95%", icon: FiTrendingUp },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" />

      <div className="absolute -top-24 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-44 pb-16 sm:pb-20 lg:pb-28">
        <div className="text-center max-w-3xl mx-auto">
          <div
            className={cn(
              "flex justify-center mb-6 sm:mb-8",
              "transition-all duration-500 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <Badge className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-black text-white border border-neutral-300 text-xs sm:text-sm font-medium">
              <FiZap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
              Empowering Collaborative Research
            </Badge>
          </div>

          <h1
            className={cn(
              "font-bold text-white tracking-tight text-balance",
              "text-[2rem] leading-[1.15]",
              "sm:text-5xl sm:leading-[1.1]",
              "lg:text-6xl lg:leading-[1.05]",
              "mb-6 sm:mb-7",
              "transition-all duration-500 delay-100 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            Where Ideas Meet
            <br />
            <span className="text-white">Collective Intelligence</span>
          </h1>

          <p
            className={cn(
              "text-neutral-400 text-pretty",
              "text-base sm:text-lg lg:text-xl",
              "leading-relaxed",
              "max-w-2xl mx-auto",
              "mb-8 sm:mb-10",
              "transition-all duration-500 delay-200 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            UniLink connects organizations with skilled participants for
            research studies, events, and impactful collaborations. Join
            thousands making a difference.
          </p>

          <div
            className={cn(
              "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center",
              "mb-14 sm:mb-16",
              "transition-all duration-500 delay-300 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group w-full sm:w-auto h-12 px-7 text-base bg-white text-black hover:bg-neutral-100 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started Free</span>
                <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/events" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-7 text-base border-black text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Explore Projects
              </Button>
            </Link>
          </div>

          <div
            className={cn(
              "relative",
              "transition-all duration-500 delay-500 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 sm:gap-x-8 pt-8 sm:pt-10">
              {STATS.map((stat, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col items-center text-center",
                    index > 0 && "sm:border-l sm:border-neutral-300 sm:pl-8",
                  )}
                >
                  <div className="flex items-center justify-center gap-1.5 text-neutral-500 mb-2">
                    <stat.icon className="w-4 h-4 flex-shrink-0" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none mb-1.5">
                    {stat.value}
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-tight font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
}
