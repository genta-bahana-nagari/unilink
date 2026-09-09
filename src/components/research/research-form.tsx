"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEvents } from "@/hooks/use-events";
import { useResearch } from "@/hooks/use-research";
import { Event } from "@/types/event";
import { Research } from "@/types/research";

interface ResearchFormProps {
  research?: Research;
  onSubmit: (data: Partial<Research>) => void;
  onCancel?: () => void;
}

export function ResearchForm({
  research,
  onSubmit,
  onCancel,
}: ResearchFormProps) {
  const { createResearch, updateResearch } = useResearch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: research?.title || "",
    description: research?.description || "",
    category: research?.category || "",
    researcher: research?.researcher || "",
    requiredParticipants: research?.requiredParticipants?.toString() || "",
    criteria: research?.criteria?.join("\n") || "",
    compensation: research?.compensation || "",
    duration: research?.duration || "",
    status: research?.status || "DRAFT",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const criteria = formData.criteria
        .split("\n")
        .filter((c) => c.trim() !== "");
      const data = {
        ...formData,
        requiredParticipants: Number(formData.requiredParticipants),
        currentParticipants: research?.currentParticipants || 0,
        organizerId: research?.organizerId || "",
        type: "RESEARCH" as const,
        createdAt: research?.createdAt || new Date().toISOString(),
        criteria,
      };
      if (research) {
        await updateResearch(research.id, data);
      } else {
        await createResearch(data);
      }
      onSubmit(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Health & Psychology",
    "Environmental Science",
    "Healthcare & Technology",
    "Technology",
    "Design",
    "Business",
    "General",
  ];

  const statusOptions = ["DRAFT", "PENDING", "PUBLISHED", "CLOSED"];

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        {research ? "Edit Research" : "Create Research"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          placeholder="Enter research title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />

        <Textarea
          label="Description"
          placeholder="Describe the research study"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Category"
            options={categories}
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          <Select
            label="Status"
            options={statusOptions}
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          />
        </div>

        <Input
          label="Lead Researcher"
          placeholder="Researcher name and credentials"
          value={formData.researcher}
          onChange={(e) => handleChange("researcher", e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Required Participants"
            type="number"
            placeholder="Number of participants needed"
            value={formData.requiredParticipants}
            onChange={(e) => handleChange("requiredParticipants", e.target.value)}
            required
          />
          <Input
            label="Duration"
            placeholder="e.g., 3 months"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </div>

        <Input
          label="Compensation"
          placeholder="e.g., $50 Amazon gift card"
          value={formData.compensation}
          onChange={(e) => handleChange("compensation", e.target.value)}
        />

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Participation Criteria
          </label>
          <Textarea
            placeholder="One criterion per line"
            value={formData.criteria}
            onChange={(e) => handleChange("criteria", e.target.value)}
            required
            className="min-h-[120px]"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : research
              ? "Update Research"
              : "Create Research"}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
