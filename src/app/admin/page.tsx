"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  FlaskConical,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
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
        <div className="animate-spin h-8 w-8 border-3 border-blue-600 rounded-full border-slate-300" />
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
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Overview of platform activity and pending items
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={Users}
          description={`${users.filter((u) => u.role === "PARTICIPANT").length} participants`}
        />
        <StatCard
          title="Total Events"
          value={events.length}
          icon={Calendar}
          description={`${events.filter((e) => e.status === "PUBLISHED").length} published`}
        />
        <StatCard
          title="Research Studies"
          value={research.length}
          icon={FlaskConical}
          description={`${research.filter((r) => r.status === "PUBLISHED").length} published`}
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals.length}
          icon={CheckCircle}
          description={`${pendingApplications.length} applications pending`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pending Approvals</h2>
            <Link href="/admin/approvals">
              <Button variant="ghost" size="sm">
                View All <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          {pendingApprovals.length === 0 ? (
            <p className="text-slate-500 text-sm py-4 text-center">
              No pending approvals
            </p>
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                      {item.type === "EVENT" ? (
                        <Calendar size={16} className="text-blue-600" />
                      ) : (
                        <FlaskConical size={16} className="text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.type}</p>
                    </div>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Users</h2>
            <Link href="/admin/users">
              <Button variant="ghost" size="sm">
                View All <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.avatar}
                    fallback={user.name}
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
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
