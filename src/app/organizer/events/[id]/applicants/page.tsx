"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Link from "next/link";
import { api } from "@/lib/mock-api";
import { Application } from "@/types/application";
import { User } from "@/types/user";
import { Event } from "@/types/event";
import { Spinner } from "@/components/ui/spinner";

export default function EventApplicantsPage() {
  const params = useParams();
  const id = params.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [ev, apps, allUsers] = await Promise.all([
        api.getEventById(id),
        api.getApplicationsByOpportunity(id),
        api.getUsers(),
      ]);
      setEvent(ev || null);
      setApplications(apps);
      setUsers(allUsers);
      setIsLoading(false);
    }
    load();
  }, [id]);

  const getUserName = (userId: string) =>
    users.find((u) => u.id === userId)?.name || "Unknown";

  const getUserEmail = (userId: string) =>
    users.find((u) => u.id === userId)?.email || "";

  const handleStatusUpdate = async (
    appId: string,
    status: "ACCEPTED" | "REJECTED"
  ) => {
    const updated = await api.updateApplication(appId, { status });
    if (updated) {
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? updated : a))
      );
    }
  };

  const statusBadge = (status: string) => {
    const variants: Record<
      string,
      "success" | "warning" | "danger" | "info" | "default"
    > = {
      ACCEPTED: "success",
      PENDING: "warning",
      REVIEWING: "info",
      REJECTED: "danger",
      COMPLETED: "default",
    };
    return (
      <Badge variant={variants[status] || "default"}>{status}</Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/organizer/events">
          <Button variant="ghost" size="sm">
            <FiArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Applicants</h1>
          <p className="text-muted-foreground mt-1">
            {event?.title || "Event"} &mdash; {applications.length} total
            applications
          </p>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Applicant
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Applied
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Motivation
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-muted">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        fallback={getUserName(app.applicantId)}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {getUserName(app.applicantId)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getUserEmail(app.applicantId)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                    {app.motivation}
                  </td>
                  <td className="px-6 py-4">{statusBadge(app.status)}</td>
                  <td className="px-6 py-4 text-right">
                    {app.status === "PENDING" && (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(app.id, "ACCEPTED")
                          }
                        >
                          <FiCheckCircle
                            size={14}
                            className="text-success"
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(app.id, "REJECTED")
                          }
                        >
                          <FiXCircle
                            size={14}
                            className="text-danger"
                          />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No applications yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}