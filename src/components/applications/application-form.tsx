"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApplications } from "@/hooks/use-applications";
import { Application } from "@/types/application";

interface ApplicationFormProps {
  opportunityId: string;
  opportunityType: "EVENT" | "RESEARCH";
  onSubmit?: (application: Application) => void;
}

export function ApplicationForm({
  opportunityId,
  opportunityType,
  onSubmit,
}: ApplicationFormProps) {
  const { createApplication } = useApplications();
  const [motivation, setMotivation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newApplication = await createApplication({
        applicantId: "",
        opportunityId,
        opportunityType,
        motivation,
      });
      setMotivation("");
      onSubmit?.(newApplication);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8">
      <h2 className="text-xl font-bold mb-4">Apply for This Opportunity</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Your Motivation
          </label>
          <Textarea
            placeholder="Tell us why you'd like to participate..."
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            required
            className="min-h-[150px]"
          />
        </div>

        <Button type="submit" disabled={isSubmitting || !motivation.trim()}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Card>
  );
}
