"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FiSearch,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiMessageSquare,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/mock-api";
import { Application } from "@/types/application";
import { Event } from "@/types/event";
import { Research } from "@/types/research";

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [research, setResearch] = useState<Research[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [detailModal, setDetailModal] = useState<Application | null>(null);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [a, e, r] = await Promise.all([
        api.getApplicationsByUser(user!.id),
        api.getEvents(),
        api.getResearch(),
      ]);
      setApplications(a);
      setEvents(e);
      setResearch(r);
      setIsLoading(false);
    }
    load();
  }, [user]);

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

  const filtered = applications.filter((a) => {
    const title = getOppTitle(a.opportunityId);
    const matchesSearch = title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-3 border-brand-600 rounded-full border-surface-300" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground mt-1">
          Track the status of your opportunity applications
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "PENDING", "REVIEWING", "ACCEPTED", "REJECTED"].map(
            (status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === "ALL" ? "All" : status}
              </Button>
            )
          )}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Opportunity
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Type
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Applied
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
              {filtered.map((app) => {
                const type = getOppType(app.opportunityId);
                return (
                  <tr key={app.id} className="hover:bg-muted">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
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
                        <p className="text-sm font-medium text-foreground">
                          {getOppTitle(app.opportunityId)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          type === "EVENT" ? "info" : "default"
                        }
                      >
                        {type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {statusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDetailModal(app)}
                      >
                        <FiEye size={14} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-md mx-4 p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Application Details</h3>
              <button
                onClick={() => setDetailModal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <FiXCircle size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Opportunity</p>
                <p className="font-medium text-foreground">
                  {getOppTitle(detailModal.opportunityId)}
                </p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <Badge
                    variant={
                      detailModal.opportunityType === "EVENT"
                        ? "info"
                        : "default"
                    }
                  >
                    {detailModal.opportunityType}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {statusBadge(detailModal.status)}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applied</p>
                <p className="text-sm text-foreground">
                  {new Date(
                    detailModal.appliedAt
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Motivation</p>
                <p className="text-sm text-foreground">{detailModal.motivation}</p>
              </div>
              {detailModal.feedback && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <FiMessageSquare size={14} /> Feedback
                  </p>
                  <p className="text-sm bg-muted p-3 rounded-lg text-foreground">
                    {detailModal.feedback}
                  </p>
                </div>
              )}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDetailModal(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}