"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiCamera, FiCalendar, FiAward, FiSettings } from "react-icons/fi";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Events Joined", value: "12" },
  { label: "Research Studies", value: "8" },
  { label: "Contributions", value: "24" },
];

const RECENT_ACTIVITY = [
  { id: "1", action: "Applied to Climate Research Study", time: "2 hours ago", type: "research" },
  { id: "2", action: "Registered for Tech Conference 2024", time: "1 day ago", type: "event" },
  { id: "3", action: "Updated profile information", time: "3 days ago", type: "profile" },
  { id: "4", action: "Left feedback on AI Workshop", time: "1 week ago", type: "feedback" },
];

const SKILLS = ["Research", "Data Analysis", "Public Speaking", "Project Management", "Communication", "Teamwork"];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <section className="pt-16 sm:pt-20 lg:pt-24 px-4 pb-6 sm:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Cover/Background */}
          <div className="relative h-32 sm:h-40 lg:h-48 rounded-t-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
          
          {/* Profile Card */}
          <Card className={cn("p-4 sm:p-6 lg:p-8 -mt-16 sm:-mt-20 lg:-mt-24 mx-4 relative z-10 border-border bg-card")}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar fallback="JD" size="xl" className="ring-4 ring-background" />
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform">
                  <FiCamera className="w-4 h-4" />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">John Doe</h1>
                  <Badge variant="outline">Participant</Badge>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-3">
                  Enthusiastic researcher and volunteer passionate about contributing to meaningful projects.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <FiMapPin className="w-4 h-4" />
                    San Francisco, CA
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="w-4 h-4" />
                    Joined Jan 2024
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <Button size="sm" className="w-full sm:w-auto">
                  <FiEdit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <FiSettings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-6 sm:py-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "p-4 sm:p-6 rounded-lg",
                  "bg-card border border-border",
                  "text-center"
                )}
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Skills & Info */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className={cn("p-4 sm:p-6", "border-border bg-card")}>
                <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Contact Information</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <FiMail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">john.doe@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiUser className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">@johndoe</span>
                  </div>
                </div>
              </Card>

              {/* Skills */}
              <Card className={cn("p-4 sm:p-6", "border-border bg-card")}>
                <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Achievements */}
              <Card className={cn("p-4 sm:p-6", "border-border bg-card")}>
                <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FiAward className="w-5 h-5" />
                  Achievements
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <FiAward className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">Early Adopter</p>
                      <p className="text-xs text-muted-foreground">Joined in first month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <FiAward className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">Super Contributor</p>
                      <p className="text-xs text-muted-foreground">10+ contributions</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Activity & Recent */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <Card className={cn("p-4 sm:p-6", "border-border bg-card")}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground">Recent Activity</h2>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {RECENT_ACTIVITY.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                        activity.type === "research" && "bg-primary/10 text-primary",
                        activity.type === "event" && "bg-primary/10 text-primary",
                        activity.type === "profile" && "bg-muted text-muted-foreground",
                        activity.type === "feedback" && "bg-primary/10 text-primary",
                      )}>
                        <FiCalendar className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Applications */}
              <Card className={cn("p-4 sm:p-6", "border-border bg-card")}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground">My Applications</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="text-center py-8">
                  <FiUser className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground mb-4">No recent applications</p>
                  <Button size="sm">Browse Opportunities</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
