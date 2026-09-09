"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, CheckCircle, XCircle, Eye } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/mock-api";
import { Application } from "@/types/application";
import { User } from "@/types/user";
import { Event } from "@/types/event";

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
        <div className="animate-spin h-8 w-8 border-3 border-blue-600 rounded-full border-slate-300" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/organizer/events">
          <Button variant="ghost" size="sm">
            <ArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Event Applicants</h1>
          <p className="text-slate-500 mt-1">
            {event?.title || "Event"} &mdash; {applications.length} total
            applications
          </p>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                  Applicant
                </th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                  Applied
                </th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                  Motivation
                </th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        fallback={getUserName(app.applicantId)}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {getUserName(app.applicantId)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {getUserEmail(app.applicantId)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
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
                          <CheckCircle
                            size={14}
                            className="text-green-600"
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleStatusUpdate(app.id, "REJECTED")
                          }
                        >
                          <XCircle
                            size={14}
                            className="text-red-600"
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
                    className="px-6 py-8 text-center text-slate-500"
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
