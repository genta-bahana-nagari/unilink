"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEvents } from "@/hooks/use-events";
import { useResearch } from "@/hooks/use-research";
import { Event } from "@/types/event";
import { Research } from "@/types/research";

interface EventFormProps {
  event?: Event;
  onSubmit: (data: Partial<Event>) => void;
  onCancel?: () => void;
}

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const { createEvent, updateEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    category: event?.category || "",
    location: event?.location || "",
    startDate: event?.startDate || "",
    endDate: event?.endDate || "",
    quota: event?.quota?.toString() || "",
    isOnline: event?.isOnline || false,
    meetingLink: event?.meetingLink || "",
    status: event?.status || "DRAFT",
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = {
        ...formData,
        quota: Number(formData.quota),
        organizerId: event?.organizerId || "",
        type: "EVENT" as const,
        registeredCount: event?.registeredCount || 0,
        createdAt: event?.createdAt || new Date().toISOString(),
      };
      if (event) {
        await updateEvent(event.id, data);
      } else {
        await createEvent(data);
      }
      onSubmit(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Technology",
    "Design",
    "Business",
    "Health & Psychology",
    "Environmental Science",
    "Healthcare & Technology",
    "General",
  ];

  const statusOptions = ["DRAFT", "PENDING", "PUBLISHED", "CLOSED"];

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        {event ? "Edit Event" : "Create Event"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          placeholder="Enter event title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />

        <Textarea
          label="Description"
          placeholder="Describe the event"
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
          label="Location"
          placeholder="Event location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            required
          />
          <Input
            label="End Date"
            type="datetime-local"
            value={formData.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Quota"
            type="number"
            placeholder="Maximum participants"
            value={formData.quota}
            onChange={(e) => handleChange("quota", e.target.value)}
            required
          />
          <Checkbox
            label="Online Event"
            checked={formData.isOnline}
            onChange={(e) => handleChange("isOnline", e.target.checked)}
          />
        </div>

        {formData.isOnline && (
          <Input
            label="Meeting Link"
            placeholder="https://meet.google.com/..."
            value={formData.meetingLink}
            onChange={(e) => handleChange("meetingLink", e.target.value)}
          />
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : event
              ? "Update Event"
              : "Create Event"}
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
