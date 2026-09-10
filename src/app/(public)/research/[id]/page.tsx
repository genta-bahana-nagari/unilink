"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Research } from "@/types/research";
import { api } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  FiUser,
  FiClock,
  FiArrowLeft,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function ResearchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [research, setResearch] = useState<Research | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getResearchById(params.id as string)
      .then((data) => {
        if (data) setResearch(data);
        else setError("Research not found");
      })
      .catch(() => setError("Failed to load research"))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !research) {
    return (
      <div className="text-center py-20 bg-background">
        <p className="text-destructive mb-4">{error || "Research not found"}</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const statusColors = {
    PUBLISHED: "success" as const,
    PENDING: "warning" as const,
    DRAFT: "default" as const,
    REJECTED: "danger" as const,
    CLOSED: "default" as const,
  };

  const spotsLeft = research.requiredParticipants - research.currentParticipants;
  const progressPercent = (research.currentParticipants / research.requiredParticipants) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/research"
          className={cn(
            "inline-flex items-center gap-2 text-sm mb-6 transition-colors",
            "text-muted-foreground hover:text-primary"
          )}
        >
          <FiArrowLeft size={16} /> Back to Research
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className={cn("p-8", "border-border", "bg-card")}>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground">{research.title}</h1>
                <Badge variant={statusColors[research.status]}>{research.status}</Badge>
              </div>
              <Badge variant="info" className="mb-6">
                {research.category}
              </Badge>
              <p className="text-muted-foreground leading-relaxed">{research.description}</p>
            </Card>

            <Card className={cn("p-8", "border-border", "bg-card")}>
              <h2 className="text-xl font-semibold text-foreground mb-4">Research Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <FiUser size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Lead Researcher</p>
                    <p className="text-sm font-medium text-foreground">{research.researcher}</p>
                  </div>
                </div>
                {research.duration && (
                  <div className="flex items-center gap-3">
                    <FiClock size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground">{research.duration}</p>
                    </div>
                  </div>
                )}
                {research.deadline && (
                  <div className="flex items-center gap-3">
                    <FiClock size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Application Deadline</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(research.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {research.compensation && (
                  <div className="flex items-center gap-3">
                    <FiDollarSign size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Compensation</p>
                      <p className="text-sm font-medium text-foreground">
                        {research.compensation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {research.criteria.length > 0 && (
              <Card className={cn("p-8", "border-border", "bg-card")}>
                <h2 className="text-xl font-semibold text-foreground mb-4">Participation Criteria</h2>
                <ul className="space-y-3">
                  {research.criteria.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          <div>
            <Card className={cn("p-6 sticky top-6", "border-border", "bg-card")}>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary">
                  {research.currentParticipants}
                </div>
                <p className="text-sm text-muted-foreground">
                  of {research.requiredParticipants} participants
                </p>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {spotsLeft > 0 ? `${spotsLeft} spots remaining` : "Study full"}
                </p>
              </div>

              <Button
                className="w-full"
                disabled={spotsLeft <= 0}
              >
                {spotsLeft > 0 ? "Apply Now" : "Study Full"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
