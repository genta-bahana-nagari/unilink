"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiMapPin, FiUsers, FiArrowRight, FiBriefcase, FiSend } from "react-icons/fi";
import { cn } from "@/lib/utils";

const JOBS = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and maintain our platform's user-facing features using React and Next.js.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "Product Designer",
    department: "Design",
    location: "Hybrid",
    type: "Full-time",
    description: "Shape the user experience of our collaboration platform from concept to delivery.",
    skills: ["Figma", "UI/UX", "Design Systems"],
  },
  {
    id: "3",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Design and implement scalable APIs and services for our growing platform.",
    skills: ["Node.js", "PostgreSQL", "GraphQL", "AWS"],
  },
  {
    id: "4",
    title: "Community Manager",
    department: "Operations",
    location: "On-site",
    type: "Full-time",
    description: "Build and nurture our community of researchers, organizers, and participants.",
    skills: ["Communication", "Community Building", "Social Media"],
  },
  {
    id: "5",
    title: "Data Scientist",
    department: "Analytics",
    location: "Remote",
    type: "Full-time",
    description: "Analyze platform metrics and develop insights to improve matching algorithms.",
    skills: ["Python", "SQL", "Machine Learning", "Statistics"],
  },
  {
    id: "6",
    title: "Marketing Lead",
    department: "Marketing",
    location: "Hybrid",
    type: "Full-time",
    description: "Drive our marketing strategy and build brand awareness in the research community.",
    skills: ["Content Marketing", "SEO", "Brand Strategy"],
  },
];

const BENEFITS = [
  "Flexible remote work",
  "Competitive salary",
  "Health insurance",
  "Professional development budget",
  "401k matching",
  "Unlimited PTO",
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            Join Our Team
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 leading-tight">
            Build the Future of
            <br />
            <span className="text-primary">Collaborative Research</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Join our mission to connect researchers and participants for impactful collaborations.
            We&apos;re building tools that make research happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              View Open Roles
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <FiSend className="mr-2 h-4 w-4" />
              Refer Someone
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Why Work at UniLink?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              We believe in taking care of our team so they can take care of our community.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit}
                className="p-3 sm:p-4 rounded-lg bg-card border border-border text-center"
              >
                <p className="text-xs sm:text-sm font-medium text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Open Positions
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                {JOBS.length} positions available
              </p>
            </div>
            <Badge variant="outline" className="w-fit">
              <FiBriefcase className="mr-1.5" />
              Remote-First
            </Badge>
          </div>

          <div className="space-y-4">
            {JOBS.map((job) => (
              <Card
                key={job.id}
                className={cn(
                  "p-4 sm:p-5 lg:p-6",
                  "border-border bg-card",
                  "hover:border-primary/50 dark:hover:border-primary/50",
                  "transition-all duration-300",
                  "hover:shadow-md"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground">
                        {job.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {job.department}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <FiMapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiUsers className="w-3.5 h-3.5" />
                        {job.department}
                      </span>
                    </div>
                  </div>
                  <Button size="default" className="w-full sm:w-auto shrink-0">
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-muted-foreground text-sm sm:text-base mb-4">
              Don&apos;t see a role that fits? Join our talent pool.
            </p>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Join Talent Pool
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
