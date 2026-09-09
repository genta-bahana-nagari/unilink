// src/app/(public)/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEvents } from "@/hooks/use-events";
import { useResearch } from "@/hooks/use-research";
import {
  FiCalendar,
  FiArrowRight,
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiTarget,
  FiAward,
  FiChevronRight,
  FiMapPin,
  FiBriefcase,
  FiZap,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { events, isLoading: eventsLoading } = useEvents();
  const { research, isLoading: researchLoading } = useResearch();
  const [isVisible] = useState(true);

  const featuredEvents = events.slice(0, 3);
  const featuredResearch = research.slice(0, 3);

  // Stats data
  const stats = [
    { label: "Active Events", value: "127+", icon: FiCalendar },
    { label: "Research Studies", value: "84+", icon: FaFlask },
    { label: "Volunteers", value: "2.4K+", icon: FiUsers },
    { label: "Success Rate", value: "94%", icon: FiTrendingUp },
  ];

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Sign up as an organizer or volunteer. Customize your profile to showcase your expertise and interests.",
      icon: FiUsers,
    },
    {
      number: "02",
      title: "Discover Opportunities",
      description:
        "Browse through events and research studies that match your skills. Use filters to find the perfect fit.",
      icon: FiTarget,
    },
    {
      number: "03",
      title: "Apply & Collaborate",
      description:
        "Submit applications, track your status, and connect with organizers. Start making an impact today.",
      icon: FiAward,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className={cn(
          "relative min-h-[90vh] flex items-center overflow-hidden",
          "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900",
        )}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                <FiZap className="w-4 h-4" />
                <span>Empowering Collaboration</span>
              </div>

              <h1
                className={cn(
                  "text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]",
                  "transition-all duration-700 transform",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                Find Opportunities
                <br />
                <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  That Matter
                </span>
              </h1>

              <p
                className={cn(
                  "text-lg sm:text-xl text-blue-100 max-w-xl",
                  "transition-all duration-700 delay-100 transform",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                Connect with events, research, and collaboration opportunities
                tailored to your interests and expertise. Join a community of
                innovators and change-makers.
              </p>

              {/* CTA Buttons */}
              <div
                className={cn(
                  "flex flex-wrap gap-4",
                  "transition-all duration-700 delay-200 transform",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                <Link href="/events">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Events
<FiArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/research">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    Browse Research
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div
                className={cn(
                  "grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8",
                  "transition-all duration-700 delay-300 transform",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0",
                )}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-white">
                    <div className="flex items-center gap-2 text-blue-200">
                      <stat.icon className="w-4 h-4" />
                      <span className="text-2xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-sm text-blue-200/80 mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div
              className={cn(
                "hidden lg:flex justify-center items-center",
                "transition-all duration-700 delay-400 transform",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
              )}
            >
              <div className="relative w-full max-w-md">
                <div className="relative z-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-2xl">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                          {i}
                        </div>
                        <div className="flex-1">
                          <div className="h-3 w-32 bg-white/20 rounded animate-pulse" />
                          <div className="h-2 w-24 bg-white/10 rounded mt-2 animate-pulse" />
                        </div>
                        <FiChevronRight className="w-5 h-5 text-white/40" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-indigo-400/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Featured Opportunities
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover curated events and research studies looking for
              passionate volunteers like you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Events Column */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
                  <FiCalendar className="w-5 h-5 text-brand-600" />
                  Upcoming Events
                </h3>
                <Link
                  href="/events"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View all <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {eventsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-5 animate-pulse">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-3/4" />
                          <div className="h-3 bg-slate-200 rounded w-full" />
                          <div className="h-3 bg-slate-200 rounded w-1/2" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : featuredEvents.length > 0 ? (
                <div className="space-y-4">
                  {featuredEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                      <Card className="group p-5 hover:shadow-lg transition-all duration-300 hover:border-blue-200 cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 font-semibold text-lg flex-shrink-0">
                            {event.title.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {event.title}
                            </h4>
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                              {event.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge
                                variant={
                                  event.status === "PUBLISHED"
                                    ? "success"
                                    : "warning"
                                }
                                className="text-xs"
                              >
                                {event.status}
                              </Badge>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <FiMapPin className="w-3 h-3" />
                                {event.location}
                              </span>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <FiClock className="w-3 h-3" />
                                {event.startDate ? new Date(event.startDate).toLocaleDateString() : "TBD"}
                              </span>
                            </div>
                          </div>
                          <FiChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-colors flex-shrink-0" />
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-slate-500">No events available yet.</p>
                  <Link href="/events/create">
                    <Button variant="outline" className="mt-4">
                      Create Event
                    </Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Research Column */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
                  <FaFlask className="w-5 h-5 text-purple-600" />
                  Research Studies
                </h3>
                <Link
                  href="/research"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                >
                  View all <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {researchLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-5 animate-pulse">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-200" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-200 rounded w-3/4" />
                          <div className="h-3 bg-slate-200 rounded w-full" />
                          <div className="h-3 bg-slate-200 rounded w-1/2" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : featuredResearch.length > 0 ? (
                <div className="space-y-4">
                  {featuredResearch.map((r) => (
                    <Link key={r.id} href={`/research/${r.id}`}>
                      <Card className="group p-5 hover:shadow-lg transition-all duration-300 hover:border-purple-200 cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 font-semibold text-lg flex-shrink-0">
                            {r.title.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                              {r.title}
                            </h4>
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                              {r.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                              <Badge
                                variant={
                                  r.status === "PUBLISHED"
                                    ? "success"
                                    : "warning"
                                }
                                className="text-xs"
                              >
                                {r.status}
                              </Badge>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <FiUsers className="w-3 h-3" />
                                {r.researcher}
                              </span>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <FiBriefcase className="w-3 h-3" />
                                {r.category || "Research"}
                              </span>
                            </div>
                          </div>
                          <FiChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-slate-500">No research available yet.</p>
                  <Link href="/research/create">
                    <Button variant="outline" className="mt-4">
                      Add Research
                    </Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button variant="outline" className="group">
                View All Opportunities
                <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-0 px-4 py-1.5 text-sm">
              <FiZap className="w-4 h-4 mr-1.5" />
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get started in three simple steps and begin your journey of
              collaboration and impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 relative z-10 bg-white/80 backdrop-blur-sm">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-shadow">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-blue-600 text-blue-600 text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of volunteers and organizers who are already
            collaborating and creating change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 shadow-lg shadow-blue-500/30"
              >
                Get Started Now
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Add Tailwind animation classes */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
