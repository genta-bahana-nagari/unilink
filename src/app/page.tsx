"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FiUsers,
  FiTarget,
  FiAward,
  FiArrowRight,
  FiZap,
  FiShield,
  FiGlobe,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [isVisible] = useState(true);

  const stats = [
    { label: "Active Projects", value: "500+", icon: FiTarget },
    { label: "Participants", value: "10,000+", icon: FiUsers },
    { label: "Organizations", value: "200+", icon: FiGlobe },
    { label: "Success Rate", value: "95%", icon: FiTrendingUp },
  ];

  const features = [
    {
      icon: FiZap,
      title: "Smart Matching",
      description:
        "Our algorithm matches participants with projects that fit their skills and interests.",
      color: "from-brand-500 to-brand-700",
    },
    {
      icon: FiShield,
      title: "Trusted Platform",
      description:
        "Verified organizers and secure data handling ensure a safe environment for everyone.",
      color: "from-green-500 to-emerald-700",
    },
    {
      icon: FiUsers,
      title: "Collaborative Community",
      description:
        "Join a network of passionate researchers, organizers, and volunteers.",
      color: "from-purple-500 to-violet-700",
    },
    {
      icon: FiTarget,
      title: "Impactful Results",
      description:
        "Track your contributions and see the real-world impact of your participation.",
      color: "from-orange-500 to-red-700",
    },
  ];

  const steps = [
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

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Research Lead, Stanford University",
      content:
        "UniLink helped us recruit 200 participants for our climate study in just two weeks. The quality of volunteers was exceptional.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Event Organizer, TechConf",
      content:
        "The platform's matching algorithm connected us with the perfect speakers and attendees. Our event was a huge success.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Volunteer Participant",
      content:
        "I love how easy it is to find meaningful projects. I've contributed to three research studies and met amazing people.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <Badge className="mb-6 px-4 py-2 bg-brand-500/20 text-brand-100 border border-brand-400/30">
              <FiZap className="w-4 h-4 mr-2" />
              Empowering Collaborative Research
            </Badge>

            {/* Headline */}
            <h1
              className={cn(
                "text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6",
                "transition-all duration-700 transform",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
              )}
            >
              Where Ideas Meet
              <br />
              <span className="bg-gradient-to-r from-brand-200 to-white bg-clip-text text-transparent">
                Collective Intelligence
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={cn(
                "text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto mb-8",
                "transition-all duration-700 delay-100 transform",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
              )}
            >
              UniLink connects organizations with skilled participants for
              research studies, events, and impactful collaborations. Join
              thousands making a difference.
            </p>

            {/* CTA Buttons */}
            <div
              className={cn(
                "flex flex-col sm:flex-row gap-4 justify-center",
                "transition-all duration-700 delay-200 transform",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
              )}
            >
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                >
                  Get Started Free
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-300/30 text-white hover:bg-brand-700/30 backdrop-blur-sm w-full sm:w-auto"
                >
                  Explore Projects
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div
              className={cn(
                "grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-8 border-t border-brand-400/20",
                "transition-all duration-700 delay-300 transform",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
              )}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-white mb-2">
                    <stat.icon className="w-5 h-5 text-brand-200" />
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm text-brand-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-50 text-brand-700 border-brand-200">
              Platform Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and features you need for
              successful collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 border-border hover:border-brand-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                    feature.color,
                  )}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-28 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-50 text-brand-700 border-brand-200">
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps and begin your journey of
              collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 -translate-y-1/2" />

            {steps.map((step, index) => (
              <div key={index} className="relative z-10">
                <Card className="p-8 text-center bg-card border-border hover:border-brand-200 hover:shadow-lg transition-all duration-300">
                  <div className="relative inline-block mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-200">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-brand-600 text-brand-600 text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-brand-50 text-brand-700 border-brand-200">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by Organizations Worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our community has to say about their experience with
              UniLink.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 border-border hover:border-brand-200 hover:shadow-lg transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-r from-brand-600 to-brand-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers, organizers, and participants who are
            already collaborating on meaningful projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg shadow-brand-500/30 w-full sm:w-auto"
              >
                Start Your Journey
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="border-brand-300/30 text-white hover:bg-brand-700/30 backdrop-blur-sm w-full sm:w-auto"
              >
                Browse Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
