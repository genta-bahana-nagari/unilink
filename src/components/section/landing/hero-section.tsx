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
  {
    label: "Active Projects",
    value: "500+",
    icon: FiTarget,
  },
  {
    label: "Participants",
    value: "10,000+",
    icon: FiUsers,
  },
  {
    label: "Organizations",
    value: "200+",
    icon: FiGlobe,
  },
  {
    label: "Success Rate",
    value: "95%",
    icon: FiTrendingUp,
  },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-white dark:bg-black",
        "text-black dark:text-white",
        "transition-colors duration-300",
      )}
    >
      {/* =====================================================
          SUBTLE BACKGROUND TEXTURE
          ===================================================== */}

      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "opacity-[0.035] dark:opacity-[0.03]",
          "bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_1px)]",
          "bg-[size:24px_24px]",
        )}
      />

      {/* =====================================================
          TOP GLOW
          ===================================================== */}

      <div
        className={cn(
          "absolute",
          "-top-24",
          "left-1/4",
          "w-64 h-64",
          "sm:w-80 sm:h-80",
          "lg:w-96 lg:h-96",
          "rounded-full",
          "blur-3xl",
          "pointer-events-none",
          "bg-neutral-200/60",
          "dark:bg-neutral-800/30",
        )}
      />

      {/* =====================================================
          BOTTOM GLOW
          ===================================================== */}

      <div
        className={cn(
          "absolute",
          "-bottom-24",
          "right-1/4",
          "w-64 h-64",
          "sm:w-80 sm:h-80",
          "lg:w-96 lg:h-96",
          "rounded-full",
          "blur-3xl",
          "pointer-events-none",
          "bg-neutral-200/60",
          "dark:bg-neutral-800/30",
        )}
      />

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div
        className={cn(
          "relative",
          "max-w-7xl",
          "mx-auto",
          "px-4 sm:px-6 lg:px-8",
          "pt-24 sm:pt-32 lg:pt-44",
          "pb-16 sm:pb-20 lg:pb-28",
        )}
      >
        <div className="text-center max-w-3xl mx-auto">
          {/* =================================================
              BADGE
              ================================================= */}

          <div
            className={cn(
              "flex justify-center",
              "mb-6 sm:mb-8",
              "transition-all duration-500",
              "transform",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0",
            )}
          >
            <Badge
              className={cn(
                "px-3.5 py-1.5",
                "sm:px-4 sm:py-2",
                "rounded-full",
                "text-xs sm:text-sm",
                "font-medium",
                "transition-colors duration-300",

                /* Light */
                "bg-neutral-100",
                "text-black",
                "border-neutral-300",

                /* Dark */
                "dark:bg-neutral-900",
                "dark:text-white",
                "dark:border-neutral-700",
              )}
            >
              <FiZap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
              Empowering Collaborative Research
            </Badge>
          </div>

          {/* =================================================
              TITLE
              ================================================= */}

          <h1
            className={cn(
              "font-bold",
              "tracking-tight",
              "text-balance",

              "text-[2rem]",
              "leading-[1.15]",

              "sm:text-5xl",
              "sm:leading-[1.1]",

              "lg:text-6xl",
              "lg:leading-[1.05]",

              "mb-6 sm:mb-7",

              "text-black",
              "dark:text-white",

              "transition-all duration-500 delay-100",
              "transform",

              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0",
            )}
          >
            Where Ideas Meet
            <br />
            <span className="text-black dark:text-white">
              Collective Intelligence
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p
            className={cn(
              "text-pretty",
              "text-base sm:text-lg lg:text-xl",
              "leading-relaxed",
              "max-w-2xl",
              "mx-auto",
              "mb-8 sm:mb-10",

              "text-neutral-600",
              "dark:text-neutral-400",

              "transition-all duration-500 delay-200",
              "transform",

              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0",
            )}
          >
            UniLink connects organizations with skilled participants for
            research studies, events, and impactful collaborations. Join
            thousands making a difference.
          </p>

          {/* =================================================
              BUTTONS
              ================================================= */}

          <div
            className={cn(
              "flex flex-col sm:flex-row",
              "gap-3 sm:gap-4",
              "justify-center items-center",
              "mb-14 sm:mb-16",

              "transition-all duration-500 delay-300",
              "transform",

              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0",
            )}
          >
            {/* Primary */}
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className={cn(
                  "group",
                  "w-full sm:w-auto",
                  "cursor-pointer",
                  "h-12",
                  "px-7",
                  "text-base",
                  "rounded-full",

                  /* Light */
                  "bg-black",
                  "text-white",
                  "hover:bg-neutral-800",

                  /* Dark */
                  "dark:bg-white",
                  "dark:text-black",
                  "dark:hover:bg-neutral-200",

                  "shadow-lg",
                  "shadow-black/10",
                  "dark:shadow-white/10",

                  "hover:shadow-xl",

                  "transition-all duration-300",
                  "hover:scale-[1.02]",
                  "active:scale-[0.98]",
                )}
              >
                <span>Get Started Free</span>

                <FiArrowRight
                  className={cn(
                    "ml-2",
                    "h-4 w-4",
                    "transition-transform duration-200",
                    "group-hover:translate-x-0.5",
                  )}
                />
              </Button>
            </Link>

            {/* Secondary */}
            <Link href="/events" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "w-full sm:w-auto",
                  "cursor-pointer",
                  "h-12",
                  "px-7",
                  "text-base",
                  "rounded-full",

                  /* Light */
                  "border-neutral-300",
                  "bg-white",
                  "text-black",
                  "hover:bg-neutral-100",
                  "hover:text-black",

                  /* Dark */
                  "dark:border-neutral-700",
                  "dark:bg-black",
                  "dark:text-white",
                  "dark:hover:bg-neutral-900",
                  "dark:hover:text-white",

                  "transition-all duration-300",
                )}
              >
                Explore Projects
              </Button>
            </Link>
          </div>

          {/* =================================================
              STATS
              ================================================= */}

          <div
            className={cn(
              "relative",

              "transition-all duration-500 delay-500",
              "transform",

              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0",
            )}
          >
            {/* Divider */}
            <div
              className={cn(
                "absolute",
                "-top-px",
                "left-1/2",
                "-translate-x-1/2",
                "w-full",
                "max-w-3xl",
                "h-px",

                "bg-gradient-to-r",
                "from-transparent",
                "via-neutral-300",
                "to-transparent",

                "dark:via-neutral-700",
              )}
            />

            <div
              className={cn(
                "grid",
                "grid-cols-2",
                "sm:grid-cols-4",
                "gap-y-8",
                "gap-x-4 sm:gap-x-8",
                "pt-8 sm:pt-10",
              )}
            >
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col",
                    "items-center",
                    "text-center",

                    index > 0 && "sm:border-l",
                    index > 0 && "sm:border-neutral-300",
                    index > 0 && "dark:sm:border-neutral-700",
                    index > 0 && "sm:pl-8",
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex items-center justify-center",
                      "w-8 h-8",
                      "rounded-full",
                      "mb-2",

                      "bg-neutral-100",
                      "dark:bg-neutral-900",

                      "text-neutral-600",
                      "dark:text-neutral-400",
                    )}
                  >
                    <stat.icon className="w-4 h-4" />
                  </div>

                  {/* Value */}
                  <span
                    className={cn(
                      "text-2xl sm:text-3xl",
                      "font-bold",
                      "tabular-nums",
                      "leading-none",
                      "mb-1.5",

                      "text-black",
                      "dark:text-white",
                    )}
                  >
                    {stat.value}
                  </span>

                  {/* Label */}
                  <p
                    className={cn(
                      "text-xs sm:text-sm",
                      "leading-tight",
                      "font-medium",

                      "text-neutral-500",
                      "dark:text-neutral-400",
                    )}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FADE
          ===================================================== */}

      <div
        className={cn(
          "absolute",
          "bottom-0",
          "left-0",
          "right-0",
          "h-16 sm:h-24",
          "pointer-events-none",

          "bg-gradient-to-b",
          "from-transparent",
          "to-white",

          "dark:to-black",
        )}
      />
    </section>
  );
}
