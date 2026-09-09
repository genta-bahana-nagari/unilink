"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Calendar,
  FlaskConical,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { api } from "@/lib/mock-api";
import { Event } from "@/types/event";
import { Research } from "@/types/research";
import { Application } from "@/types/application";
import { User } from "@/types/user";

interface PendingItem {
  id: string;
  title: string;
  type: "EVENT" | "RESEARCH";
  organizerId: string;
  createdAt: string;
  status: string;
}

export default function AdminApprovalsPage() {
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
  const [pendingApps, setPendingApps] = useState<Application[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [events, research, apps, allUsers] = await Promise.all([
        api.getEvents(),
        api.getResearch(),
        api.getApplications(),
        api.getUsers(),
      ]);

      const pending: PendingItem[] = [
        ...events
          .filter((e) => e.status === "PENDING")
          .map((e) => ({
            id: e.id,
            title: e.title,
            type: "EVENT" as const,
            organizerId: e.organizerId,
            createdAt: e.createdAt,
            status: e.status,
          })),
        ...research
          .filter((r) => r.status === "PENDING")
          .map((r) => ({
            id: r.id,
            title: r.title,
            type: "RESEARCH" as const,
            organizerId: r.organizerId,
            createdAt: r.createdAt,
            status: r.status,
          })),
      ];

      setPendingItems(pending);
      setPendingApps(apps.filter((a) => a.status === "PENDING"));
      setUsers(allUsers);
      setIsLoading(false);
    }
    load();
  }, []);

  const getOrganizerName = (id: string) =>
    users.find((u) => u.id === id)?.name || "Unknown";

  const getApplicantName = (id: string) =>
    users.find((u) => u.id === id)?.name || "Unknown";

  const handleApprove = (id: string, type: "EVENT" | "RESEARCH") => {
    if (type === "EVENT") {
      api.updateEvent(id, { status: "PUBLISHED" });
    } else {
      api.updateResearch(id, { status: "PUBLISHED" });
    }
    setPendingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReject = (id: string, type: "EVENT" | "RESEARCH") => {
    if (type === "EVENT") {
      api.updateEvent(id, { status: "REJECTED" });
    } else {
      api.updateResearch(id, { status: "REJECTED" });
    }
    setPendingItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-3 border-blue-600 rounded-full border-slate-300" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Approvals</h1>
        <p className="text-slate-500 mt-1">
          Review and approve pending submissions
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={20} className="text-amber-600" />
          <h2 className="text-lg font-semibold">
            Pending Opportunity Approvals ({pendingItems.length})
          </h2>
        </div>
        {pendingItems.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle
              size={48}
              className="mx-auto text-green-500 mb-3"
            />
            <p className="text-slate-500">
              All caught up! No pending approvals.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    {item.type === "EVENT" ? (
                      <Calendar size={20} className="text-blue-600" />
                    ) : (
                      <FlaskConical
                        size={20}
                        className="text-purple-600"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-slate-500">
                      {item.type} &middot; by{" "}
                      {getOrganizerName(item.organizerId)} &middot;{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(item.id, item.type)}
                  >
                    <XCircle size={14} className="mr-1" /> Reject
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(item.id, item.type)}
                  >
                    <CheckCircle size={14} className="mr-1" /> Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold">
            Pending Applications ({pendingApps.length})
          </h2>
        </div>
        {pendingApps.length === 0 ? (
          <p className="text-slate-500 text-center py-8">
            No pending applications
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">
                    Applicant
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">
                    Opportunity
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">
                    Type
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">
                    Applied
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">
                    Motivation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar
                          fallback={getApplicantName(app.applicantId)}
                          size="sm"
                        />
                        <span className="text-sm font-medium">
                          {getApplicantName(app.applicantId)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {app.opportunityId}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          app.opportunityType === "EVENT"
                            ? "info"
                            : "default"
                        }
                      >
                        {app.opportunityType}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">
                      {app.motivation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
