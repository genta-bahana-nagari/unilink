"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/mock-api";
import { Announcement } from "@/types/announcement";

interface AnnouncementFormProps {
  onSubmit?: (announcement: Announcement) => void;
  onCancel?: () => void;
}

export function AnnouncementForm({ onSubmit, onCancel }: AnnouncementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "INFO" as Announcement["type"],
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newAnnouncement = await api.createAnnouncement({
        ...formData,
        authorId: "",
      });
      setFormData({ title: "", content: "", type: "INFO" });
      onSubmit?.(newAnnouncement);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6">Create Announcement</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          placeholder="Enter announcement title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />

        <Textarea
          label="Content"
          placeholder="Write your announcement..."
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          required
          className="min-h-[150px]"
        />

        <Select
          label="Type"
          options={["INFO", "UPDATE", "IMPORTANT"]}
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
