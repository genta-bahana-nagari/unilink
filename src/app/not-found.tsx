"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FiArrowLeft,
  FiArrowRight,
  FiHome,
  FiSearch,
  FiCompass,
  FiZap,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

const QUICK_LINKS = [
  {
    href: "/events",
    label: "Browse Events",
    description: "Discover upcoming opportunities",
    icon: FiCompass,
  },
  {
    href: "/research",
    label: "Research Studies",
    description: "Join active research projects",
    icon: FiSearch,
  },
  {
    href: "/",
    label: "Back Home",
    description: "Return to the homepage",
    icon: FiHome,
  },
];

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-white",
        "dark:bg-gray-950",
        "text-foreground",
      )}
    >
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat" />
      </div>

      <div
        className={cn(
          "absolute -top-24 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96",
          "rounded-full blur-3xl pointer-events-none",
          "bg-brand-400/20 dark:bg-brand-400/20",
        )}
      />

      <div
        className={cn(
          "absolute -bottom-24 right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96",
          "rounded-full blur-3xl pointer-events-none",
          "bg-brand-300/20 dark:bg-brand-600/20",
        )}
      />

      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none",
          "bg-brand-300/10 dark:bg-brand-500/10",
        )}
      />

      <div className="relative max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
        <div
          className={cn(
            "flex justify-center mb-6 sm:mb-8",
            "transition-all duration-700 transform",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0",
          )}
        >
          <Badge
            className={cn(
              "px-3.5 py-1.5 sm:px-4 sm:py-2",
              "text-xs sm:text-sm font-medium",
              "backdrop-blur-sm",
              "bg-brand-100/80 text-brand-700",
              "border border-brand-200",
              "dark:bg-brand-500/20 dark:text-brand-100",
              "dark:border-brand-400/30",
            )}
          >
            <FiZap className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
            Error 404 — Page Not Found
          </Badge>
        </div>

        <div
          className={cn(
            "mb-4 sm:mb-6",
            "transition-all duration-700 delay-100 transform",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0",
          )}
        >
          <h1
            className={cn(
              "text-[7rem] sm:text-[9rem] lg:text-[11rem]",
              "font-bold leading-none tracking-tighter",
              "bg-gradient-to-br bg-clip-text text-transparent",
              "from-brand-700 via-brand-500 to-brand-300",
              "dark:from-brand-200 dark:via-white dark:to-brand-300",
              "select-none",
            )}
          >
            404
          </h1>
        </div>

        <h2
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl",
            "font-bold tracking-tight mb-4",
            "text-brand-950 dark:text-white",
            "transition-all duration-700 delay-200 transform",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0",
          )}
        >
          This page took a wrong turn
        </h2>

        <p
          className={cn(
            "text-base sm:text-lg leading-relaxed",
            "max-w-xl mx-auto mb-10 sm:mb-12 text-pretty",
            "text-brand-700 dark:text-brand-100/90",
            "transition-all duration-700 delay-300 transform",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0",
          )}
        >
          The page you&apos;re looking for doesn&apos;t exist, was moved, or is
          temporarily unavailable. Let&apos;s get you back on track.
        </p>

        <div
          className={cn(
            "flex flex-col sm:flex-row gap-3 sm:gap-4",
            "justify-center items-center mb-14 sm:mb-16",
            "transition-all duration-700 delay-[400ms] transform",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0",
          )}
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              className={cn(
                "cursor-pointer w-full sm:w-auto h-12 px-7 text-base",
                "bg-black text-white",
                "hover:bg-brand-800",
                "dark:bg-white dark:text-black",
                "dark:hover:bg-brand-50",
                "shadow-lg shadow-brand-500/20",
                "hover:shadow-xl hover:shadow-brand-500/30",
                "transition-all duration-300",
                "hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              <FiArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Link href="/events" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className={cn(
                "cursor-pointer w-full sm:w-auto h-12 px-7 text-base",
                "border-brand-300 text-brand-800",
                "hover:text-white hover:bg-black",
                "dark:border-brand-300/30 dark:text-white",
                "dark:hover:bg-brand-700 dark:hover:text-black",
                "dark:hover:border-brand-200/50",
                "backdrop-blur-sm",
                "transition-all duration-300",
                "hover:scale-[1.02] active:scale-[0.98]",
              )}
            >
              Explore Events
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div
          className={cn(
            "relative mb-8",
            "transition-all duration-700 delay-[500ms] transform",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0",
          )}
        >
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div
              className={cn(
                "w-full h-px",
                "bg-gradient-to-r from-transparent",
                "via-brand-300 to-transparent",
                "dark:via-brand-400/30",
              )}
            />
          </div>

          <div className="relative flex justify-center">
            <span
              className={cn(
                "px-4 text-xs sm:text-sm",
                "uppercase tracking-wider font-medium",
                "bg-brand-50 dark:bg-brand-900",
                "text-brand-500 dark:text-brand-200/70",
              )}
            >
              Or try one of these
            </span>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4",
            "transition-all duration-700 delay-[600ms] transform",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0",
          )}
        >
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative flex flex-col items-center gap-2",
                "p-4 sm:p-5 rounded-xl",
                "border backdrop-blur-sm",
                "bg-white/70 border-brand-200",
                "hover:bg-white hover:border-brand-300",
                "shadow-sm hover:shadow-md",
                "dark:bg-white/5 dark:border-white/10",
                "dark:hover:bg-white/10 dark:hover:border-white/20",
                "transition-all duration-300",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg",
                  "flex items-center justify-center",
                  "bg-gradient-to-br",
                  "from-brand-100 to-brand-200",
                  "border border-brand-200",
                  "dark:from-brand-400/30 dark:to-brand-600/30",
                  "dark:border-brand-300/20",
                  "group-hover:scale-110",
                  "transition-transform",
                )}
              >
                <link.icon
                  className={cn(
                    "w-5 h-5",
                    "text-brand-700",
                    "dark:text-brand-100",
                  )}
                />
              </div>

              <div>
                <p
                  className={cn(
                    "text-sm font-semibold mb-0.5",
                    "text-brand-900 dark:text-white",
                  )}
                >
                  {link.label}
                </p>

                <p
                  className={cn(
                    "text-xs",
                    "text-brand-600",
                    "dark:text-brand-200/70",
                  )}
                >
                  {link.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p
          className={cn(
            "mt-12 sm:mt-14 text-xs sm:text-sm",
            "text-brand-500 dark:text-brand-200/50",
            "transition-all duration-700 delay-[700ms] transform",
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0",
          )}
        >
          Think this is a mistake?{" "}
          <Link
            href="/contact"
            className={cn(
              "underline underline-offset-4",
              "decoration-brand-300/60",
              "text-brand-700 hover:text-brand-900",
              "dark:text-brand-100 dark:hover:text-white",
              "dark:decoration-brand-300/40",
              "dark:hover:decoration-brand-200",
              "transition-colors",
            )}
          >
            Contact support
          </Link>
        </p>
      </div>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0",
          "h-16 sm:h-24",
          "bg-gradient-to-b",
          "from-transparent to-brand-200/20",
          "dark:to-background/5",
          "pointer-events-none",
        )}
      />
    </div>
  );
}
