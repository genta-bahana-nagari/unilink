"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiUsers,
  FiTarget,
  FiZap,
  FiShield,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: FiZap,
    title: "Smart Matching",
    description:
      "Our algorithm matches participants with projects that fit their skills and interests.",
  },
  {
    icon: FiShield,
    title: "Trusted Platform",
    description:
      "Verified organizers and secure data handling ensure a safe environment for everyone.",
  },
  {
    icon: FiUsers,
    title: "Collaborative Community",
    description:
      "Join a network of passionate researchers, organizers, and volunteers.",
  },
  {
    icon: FiTarget,
    title: "Impactful Results",
    description:
      "Track your contributions and see the real-world impact of your participation.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white border-neutral-300">
            Platform Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Our platform provides all the tools and features you need for
            successful collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="p-6 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0",
                )}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 flex-1">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
