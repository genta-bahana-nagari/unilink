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
  User,
  Clock,
  ArrowLeft,
  Users,
  DollarSign,
  CheckCircle,
} from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !research) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error || "Research not found"}</p>
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={16} /> Back to Research
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold">{research.title}</h1>
                <Badge variant={statusColors[research.status]}>
                  {research.status}
                </Badge>
              </div>
              <Badge variant="info" className="mb-6">
                {research.category}
              </Badge>
              <p className="text-slate-600 leading-relaxed">
                {research.description}
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-4">Research Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Lead Researcher</p>
                    <p className="text-sm font-medium">{research.researcher}</p>
                  </div>
                </div>
                {research.duration && (
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Duration</p>
                      <p className="text-sm font-medium">{research.duration}</p>
                    </div>
                  </div>
                )}
                {research.deadline && (
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Application Deadline</p>
                      <p className="text-sm font-medium">
                        {new Date(research.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {research.compensation && (
                  <div className="flex items-center gap-3">
                    <DollarSign size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Compensation</p>
                      <p className="text-sm font-medium">
                        {research.compensation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {research.criteria.length > 0 && (
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-4">Participation Criteria</h2>
                <ul className="space-y-3">
                  {research.criteria.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          <div>
            <Card className="p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600">
                  {research.currentParticipants}
                </div>
                <p className="text-sm text-slate-500">
                  of {research.requiredParticipants} participants
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(research.currentParticipants / research.requiredParticipants) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {spotsLeft > 0
                    ? `${spotsLeft} spots remaining`
                    : "Study full"}
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
