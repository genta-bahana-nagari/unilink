import { User } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ApplicationStatus } from "./application-status";

interface ApplicantTableProps {
  applicants: User[];
  applicationsStatus?: Record<string, string>;
  isLoading?: boolean;
}

export function ApplicantTable({
  applicants,
  applicationsStatus = {},
  isLoading = false,
}: ApplicantTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-3 border-blue-600 rounded-full border-slate-300" />
      </div>
    );
  }

  if (applicants.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No applicants found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applicants.map((applicant) => (
        <Card key={applicant.id} className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar fallback={applicant.name} size="md" />
              <div>
                <h4 className="font-semibold">{applicant.name}</h4>
                <p className="text-sm text-slate-500">{applicant.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={
                  applicant.status === "ACTIVE"
                    ? "success"
                    : applicant.status === "PENDING"
                    ? "warning"
                    : "default"
                }
              >
                {applicant.status}
              </Badge>
              {applicationsStatus[applicant.id] && (
                <ApplicationStatus
                  status={
                    applicationsStatus[applicant.id] as
                      | "PENDING"
                      | "REVIEWING"
                      | "ACCEPTED"
                      | "REJECTED"
                      | "COMPLETED"
                  }
                />
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
