"use client";

import { useResearch } from "@/hooks/use-research";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { FlaskConical, User } from "lucide-react";

export default function ResearchPage() {
  const { research, isLoading, error } = useResearch();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-3 border-blue-600 rounded-full border-slate-300" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Research Opportunities</h1>
          <p className="text-slate-500">
            Join research studies that align with your expertise
          </p>
        </div>

        <div className="mb-6 flex gap-4 max-w-md">
          <Input placeholder="Search research..." className="flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {research.map((r) => (
            <Card key={r.id} hover className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar fallback={r.title.charAt(0)} size="lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{r.title}</h3>
                    <Badge
                      variant={
                        r.status === "PUBLISHED" ? "success" : "warning"
                      }
                      className="mt-1"
                    >
                      {r.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  {r.description.slice(0, 120)}...
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <User size={14} /> {r.researcher}
                  </span>
                  <span>
                    {r.currentParticipants}/{r.requiredParticipants}
                    participants
                  </span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href={`/research/${r.id}`}>View Details</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
