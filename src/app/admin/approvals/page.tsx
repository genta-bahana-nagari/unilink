"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
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
        <div className="animate-spin h-8 w-8 border-3 border-brand-600 rounded-full border-surface-300" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Approvals</h1>
        <p className="text-muted-foreground mt-1">
          Review and approve pending submissions
        </p>
      </div>

      <Card className="p-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <FiClock size={20} className="text-warning" />
          <h2 className="text-lg font-semibold text-foreground">
            Pending Opportunity Approvals ({pendingItems.length})
          </h2>
        </div>
        {pendingItems.length === 0 ? (
          <div className="text-center py-8">
            <FiCheckCircle
              size={48}
              className="mx-auto text-success mb-3"
            />
            <p className="text-muted-foreground">
              All caught up! No pending approvals.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-card rounded-lg border border-border">
                    {item.type === "EVENT" ? (
                      <FiCalendar size={20} className="text-brand-600" />
                    ) : (
                      <FaFlask
                        size={20}
                        className="text-purple-600"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.type} &middot; by{" "}
                      {getOrganizerName(item.organizerId)} &middot;{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleReject(item.id, item.type)}
                  >
                    <FiXCircle size={14} className="mr-1" /> Reject
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApprove(item.id, item.type)}
                  >
                    <FiCheckCircle size={14} className="mr-1" /> Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <FiArrowRight size={20} className="text-brand-600" />
          <h2 className="text-lg font-semibold text-foreground">
            Pending Applications ({pendingApps.length})
          </h2>
        </div>
        {pendingApps.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No pending applications
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                    Applicant
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                    Opportunity
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                    Type
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                    Applied
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                    Motivation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pendingApps.map((app) => (
                  <tr key={app.id} className="hover:bg-muted">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar
                          fallback={getApplicantName(app.applicantId)}
                          size="sm"
                        />
                        <span className="text-sm font-medium text-foreground">
                          {getApplicantName(app.applicantId)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
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
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
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