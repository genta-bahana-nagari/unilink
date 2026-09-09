import { Opportunity } from "@/types/opportunity";
import { OpportunityCard } from "./opportunity-card";
import { Spinner } from "@/components/ui/spinner";

interface OpportunityGridProps {
  opportunities: Opportunity[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function OpportunityGrid({
  opportunities,
  isLoading = false,
  emptyMessage = "No opportunities found.",
}: OpportunityGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}
