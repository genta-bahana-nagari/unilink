import Link from "next/link";
import { Opportunity } from "@/types/opportunity";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, User, Users, Clock } from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const isEvent = opportunity.type === "EVENT";
  const basePath = isEvent ? "events" : "research";

  return (
    <Link href={`/${basePath}/${opportunity.id}`}>
      <Card hover className="overflow-hidden h-full">
        <div className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Avatar fallback={opportunity.title.charAt(0)} size="lg" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                {opportunity.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant={opportunity.type === "EVENT" ? "info" : "success"}>
                  {opportunity.type === "EVENT" ? "Event" : "Research"}
                </Badge>
                <Badge
                  variant={
                    opportunity.status === "PUBLISHED" ? "success" : "warning"
                  }
                >
                  {opportunity.status}
                </Badge>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-4 line-clamp-2">
            {opportunity.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-slate-400 flex-wrap">
            {isEvent && "location" in opportunity && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {(opportunity as { location: string }).location}
              </span>
            )}
            {!isEvent && "researcher" in opportunity && (
              <span className="flex items-center gap-1">
                <User size={14} />
                {(opportunity as { researcher: string }).researcher}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users size={14} />
              {opportunity.category}
            </span>
            {opportunity.deadline && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {new Date(opportunity.deadline).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
