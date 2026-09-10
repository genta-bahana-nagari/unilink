"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiUsers, FiTarget, FiAward, FiZap } from "react-icons/fi";

const STEPS = [
  {
    number: "01",
    title: "Create Profile",
    description: "Sign up and tell us about your skills and interests.",
    icon: FiUsers,
  },
  {
    number: "02",
    title: "Find Projects",
    description:
      "Browse opportunities or receive personalized recommendations.",
    icon: FiTarget,
  },
  {
    number: "03",
    title: "Apply & Contribute",
    description: "Submit applications and start making an impact today.",
    icon: FiAward,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white border-neutral-300">
            <FiZap className="w-4 h-4 mr-1.5" />
            Simple Process
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Get started in three simple steps and begin your journey of
            collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2" />

          {STEPS.map((step, index) => (
            <div key={index} className="relative z-10">
              <Card className="p-8 text-center bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative inline-block mb-6 mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center shadow-lg shadow-neutral-200 dark:shadow-neutral-800">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-neutral-950 border-2 border-black dark:border-white text-black dark:text-white text-sm font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 flex-1">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
