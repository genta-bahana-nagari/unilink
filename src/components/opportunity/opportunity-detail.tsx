import { Opportunity } from "@/types/opportunity";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiMapPin, FiUser, FiClock } from "react-icons/fi";

interface OpportunityDetailProps {
  opportunity: Opportunity;
  onApply?: () => void;
  applyLabel?: string;
  applyDisabled?: boolean;
}

export function OpportunityDetail({
  opportunity,
  onApply,
  applyLabel = "Apply Now",
  applyDisabled = false,
}: OpportunityDetailProps) {
  const isEvent = opportunity.type === "EVENT";

  const statusColors = {
    PUBLISHED: "success" as const,
    PENDING: "warning" as const,
    DRAFT: "default" as const,
    REJECTED: "danger" as const,
    CLOSED: "default" as const,
  };

  return (
    <Card className="p-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold">{opportunity.title}</h1>
        <Badge variant={statusColors[opportunity.status]}>
          {opportunity.status}
        </Badge>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Badge variant={isEvent ? "info" : "success"}>
          {isEvent ? "Event" : "Research"}
        </Badge>
        <Badge variant="default">{opportunity.category}</Badge>
      </div>

      <p className="text-slate-600 leading-relaxed mb-8">
        {opportunity.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {isEvent && "location" in opportunity && (
          <div className="flex items-center gap-3">
            <FiMapPin size={18} className="text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Location</p>
              <p className="text-sm font-medium">
                {(opportunity as { location: string }).location}
              </p>
            </div>
          </div>
        )}
        {!isEvent && "researcher" in opportunity && (
          <div className="flex items-center gap-3">
            <FiUser size={18} className="text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Researcher</p>
              <p className="text-sm font-medium">
                {(opportunity as { researcher: string }).researcher}
              </p>
            </div>
          </div>
        )}
        {opportunity.deadline && (
          <div className="flex items-center gap-3">
            <FiClock size={18} className="text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Application Deadline</p>
              <p className="text-sm font-medium">
                {new Date(opportunity.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {onApply && (
        <Button
          className="w-full"
          onClick={onApply}
          disabled={applyDisabled}
        >
          {applyLabel}
        </Button>
      )}
    </Card>
  );
}
