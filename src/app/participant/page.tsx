"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiArrowRight,
  FiCalendar,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/mock-api";
import { Application } from "@/types/application";
import { Event } from "@/types/event";
import { Research } from "@/types/research";

export default function ParticipantDashboardPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [research, setResearch] = useState<Research[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [a, e, r] = await Promise.all([
        api.getApplicationsByUser(user!.id),
        api.getPublishedEvents(),
        api.getPublishedResearch(),
      ]);
      setApplications(a);
      setEvents(e);
      setResearch(r);
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

  const accepted = applications.filter((a) => a.status === "ACCEPTED");
  const pending = applications.filter((a) => a.status === "PENDING");
  const rejected = applications.filter((a) => a.status === "REJECTED");

  const recentApps = [...applications]
    .sort(
      (a, b) =>
        new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
    )
    .slice(0, 5);

  const getOppTitle = (id: string) => {
    const ev = events.find((e) => e.id === id);
    if (ev) return ev.title;
    const res = research.find((r) => r.id === id);
    if (res) return res.title;
    return id;
  };

  const getOppType = (id: string): "EVENT" | "RESEARCH" | null => {
    if (events.find((e) => e.id === id)) return "EVENT";
    if (research.find((r) => r.id === id)) return "RESEARCH";
    return null;
  };

  const recommendedEvents = events
    .filter(
      (e) =>
        !applications.find((a) => a.opportunityId === e.id) &&
        e.status === "PUBLISHED"
    )
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Participant Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user.name}. Track your applications and discover new
          opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={applications.length}
          icon={FiFileText}
          description="Across all opportunities"
        />
        <StatCard
          title="Accepted"
          value={accepted.length}
          icon={FiCheckCircle}
          description="Successfully accepted"
        />
        <StatCard
          title="Pending"
          value={pending.length}
          icon={FiClock}
          description="Awaiting review"
        />
        <StatCard
          title="Rejected"
          value={rejected.length}
          icon={FiXCircle}
          description="Not selected"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Applications</h2>
            <Link href="/participant/applications">
              <Button variant="ghost" size="sm">
                View All <FiArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          {recentApps.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No applications yet. Start exploring opportunities!
            </p>
          ) : (
            <div className="space-y-3">
              {recentApps.map((app) => {
                const type = getOppType(app.opportunityId);
                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-card rounded-lg border border-border">
                        {type === "EVENT" ? (
                          <FiCalendar
                            size={16}
                            className="text-brand-600"
                          />
                        ) : (
                          <FaFlask
                            size={16}
                            className="text-purple-600"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {getOppTitle(app.opportunityId)}
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
                );
              })}
            </div>
          )}
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recommended</h2>
            <Link href="/participant/explore">
              <Button variant="ghost" size="sm">
                Explore <FiArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          {recommendedEvents.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No new opportunities available
            </p>
          ) : (
            <div className="space-y-3">
              {recommendedEvents.map((event) => (
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
                        {event.category} &middot;{" "}
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="success">Open</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}