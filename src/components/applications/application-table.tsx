"use client";

import { Application } from "@/types/application";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "./application-status";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, MessageSquare } from "lucide-react";

interface ApplicationTableProps {
  applications: Application[];
  isLoading?: boolean;
}

export function ApplicationTable({
  applications,
  isLoading = false,
}: ApplicationTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-3 border-blue-600 rounded-full border-slate-300" />
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No applications found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card key={app.id} className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar fallback={app.applicantId.charAt(0)} size="md" />
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold">{app.applicantId}</h4>
                  <ApplicationStatus status={app.status} />
                </div>
                <p className="text-sm text-slate-500">
                  Applied for: {app.opportunityId} ({app.opportunityType})
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                  <Calendar size={12} /> {app.appliedAt}
                </div>
                {app.motivation && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                    <MessageSquare size={12} />{" "}
                    {app.motivation.slice(0, 100)}...
                  </div>
                )}
              </div>
            </div>
            {app.feedback && (
              <div className="text-sm text-slate-500 max-w-xs">
                <p className="italic">"{app.feedback}"</p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
