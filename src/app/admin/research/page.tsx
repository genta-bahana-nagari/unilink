"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { FiSearch, FiUsers, FiClock, FiDollarSign } from "react-icons/fi";
import { api } from "@/lib/mock-api";
import { Research } from "@/types/research";

export default function AdminResearchPage() {
  const [research, setResearch] = useState<Research[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    api.getResearch().then((data) => {
      setResearch(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = research.filter((r) => {
    const matchesSearch = r.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status: string) => {
    const variants: Record<
      string,
      "success" | "warning" | "danger" | "info" | "default"
    > = {
      PUBLISHED: "success",
      PENDING: "warning",
      DRAFT: "default",
      REJECTED: "danger",
      CLOSED: "info",
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">Research Studies</h1>
        <p className="text-muted-foreground mt-1">
          Manage all research studies on the platform
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search research..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "PUBLISHED", "PENDING", "DRAFT", "REJECTED"].map(
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
                  Study
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Researcher
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Participants
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Duration
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Compensation
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-muted">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {item.researcher}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <FiUsers size={14} />
                      {item.currentParticipants}/
                      {item.requiredParticipants}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <FiClock size={14} />
                      {item.duration || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <FiDollarSign size={14} />
                      {item.compensation || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {statusBadge(item.status)}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No research studies found
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