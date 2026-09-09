"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import {
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
import Link from "next/link";
import { api } from "@/lib/mock-api";
import { User } from "@/types/user";
import { Event } from "@/types/event";
import { Research } from "@/types/research";
import { Application } from "@/types/application";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [research, setResearch] = useState<Research[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [u, e, r, a] = await Promise.all([
        api.getUsers(),
        api.getEvents(),
        api.getResearch(),
        api.getApplications(),
      ]);
      setUsers(u);
      setEvents(e);
      setResearch(r);
      setApplications(a);
      setIsLoading(false);
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const pendingApprovals = [
    ...events
      .filter((e) => e.status === "PENDING")
      .map((e) => ({
        id: e.id,
        title: e.title,
        type: "EVENT" as const,
        organizerId: e.organizerId,
        createdAt: e.createdAt,
      })),
    ...research
      .filter((r) => r.status === "PENDING")
      .map((r) => ({
        id: r.id,
        title: r.title,
        type: "RESEARCH" as const,
        organizerId: r.organizerId,
        createdAt: r.createdAt,
      })),
  ];

  const pendingApplications = applications.filter(
    (a) => a.status === "PENDING"
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of platform activity and pending items
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={FiUsers}
          description={`${users.filter((u) => u.role === "PARTICIPANT").length} participants`}
        />
        <StatCard
          title="Total Events"
          value={events.length}
          icon={FiCalendar}
          description={`${events.filter((e) => e.status === "PUBLISHED").length} published`}
        />
        <StatCard
          title="Research Studies"
          value={research.length}
          icon={FaFlask}
          description={`${research.filter((r) => r.status === "PUBLISHED").length} published`}
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals.length}
          icon={FiCheckCircle}
          description={`${pendingApplications.length} applications pending`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Pending Approvals</h2>
            <Link href="/admin/approvals">
              <Button variant="ghost" size="sm">
                View All <FiArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          {pendingApprovals.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No pending approvals
            </p>
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-card rounded-lg border border-border">
                      {item.type === "EVENT" ? (
                        <FiCalendar size={16} className="text-brand-600" />
                      ) : (
                        <FaFlask size={16} className="text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                    </div>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Users</h2>
            <Link href="/admin/users">
              <Button variant="ghost" size="sm">
                View All <FiArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.avatar}
                    fallback={user.name}
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    user.role === "ADMIN"
                      ? "danger"
                      : user.role === "ORGANIZER"
                      ? "info"
                      : "default"
                  }
                >
                  {user.role}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}