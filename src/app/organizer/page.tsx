"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  FiCalendar,
  FiUsers,
  FiFileText,
  FiArrowRight,
  FiClock,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/mock-api";
import { Event } from "@/types/event";
import { Research } from "@/types/research";
import { Application } from "@/types/application";

export default function OrganizerDashboardPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [research, setResearch] = useState<Research[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [e, r, a] = await Promise.all([
        api.getEventsByOrganizer(user!.id),
        api.getResearchByOrganizer(user!.id),
        api.getApplications(),
      ]);
      setEvents(e);
      setResearch(r);
      setApplications(a);
      setIsLoading(false);
    }
    load();
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-3 border-brand-600 rounded-full border-surface-300" />
      </div>
    );
  }

  const myEventIds = events.map((e) => e.id);
  const myResearchIds = research.map((r) => r.id);
  const myOpportunityIds = [...myEventIds, ...myResearchIds];
  const myApplications = applications.filter((a) =>
    myOpportunityIds.includes(a.opportunityId)
  );
  const pendingApps = myApplications.filter((a) => a.status === "PENDING");
  const totalRegistrations =
    events.reduce((sum, e) => sum + e.registeredCount, 0) +
    research.reduce((sum, r) => sum + r.currentParticipants, 0);

  const recentApplications = myApplications
    .sort(
      (a, b) =>
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    )
    .slice(0, 5);

  const getOpportunityTitle = (id: string) => {
    const event = events.find((e) => e.id === id);
    if (event) return event.title;
    const res = research.find((r) => r.id === id);
    if (res) return res.title;
    return id;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Organizer Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user.name}. Here&apos;s your activity overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Events"
          value={events.length}
          icon={FiCalendar}
          description={`${events.filter((e) => e.status === "PUBLISHED").length} published`}
        />
        <StatCard
          title="My Research"
          value={research.length}
          icon={FaFlask}
          description={`${research.filter((r) => r.status === "PUBLISHED").length} published`}
        />
        <StatCard
          title="Total Registrations"
          value={totalRegistrations}
          icon={FiUsers}
          description="Across all opportunities"
        />
        <StatCard
          title="Pending Applications"
          value={pendingApps.length}
          icon={FiFileText}
          description="Awaiting your review"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Applications</h2>
            <Link href="/organizer/events">
              <Button variant="ghost" size="sm">
                View All <FiArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          {recentApplications.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No applications yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Avatar fallback={app.applicantId} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {getOpportunityTitle(app.opportunityId)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Applied{" "}
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      app.status === "ACCEPTED"
                        ? "success"
                        : app.status === "PENDING"
                        ? "warning"
                        : app.status === "REJECTED"
                        ? "danger"
                        : "info"
                    }
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">My Events</h2>
            <Link href="/organizer/events">
              <Button variant="ghost" size="sm">
                View All <FiArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No events created yet
            </p>
          ) : (
            <div className="space-y-3">
              {events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-card rounded-lg border border-border">
                      <FiCalendar size={16} className="text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.registeredCount}/{event.quota} registered
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      event.status === "PUBLISHED"
                        ? "success"
                        : event.status === "PENDING"
                        ? "warning"
                        : "default"
                    }
                  >
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}