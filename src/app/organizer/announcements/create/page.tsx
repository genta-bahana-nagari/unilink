"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/mock-api";

export default function CreateAnnouncementPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "INFO",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.content.trim()) errs.content = "Content is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    setIsSubmitting(true);
    try {
      await api.createAnnouncement({
        title: form.title,
        content: form.content,
        type: form.type as "INFO" | "UPDATE" | "IMPORTANT",
        authorId: user.id,
      });
      router.push("/organizer/announcements");
    } catch {
      setErrors({ submit: "Failed to create announcement" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/organizer/announcements">
          <Button variant="ghost" size="sm">
            <FiArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Announcement</h1>
          <p className="text-muted-foreground mt-1">Share an update with participants</p>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            placeholder="Announcement title"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            error={errors.title}
          />

          <Select
            label="Type"
            options={["INFO", "UPDATE", "IMPORTANT"]}
            value={form.type}
            onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
          />

          <Textarea
            label="Content"
            placeholder="Write your announcement..."
            rows={6}
            value={form.content}
            onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
            error={errors.content}
          />

          {errors.submit && (
            <p className="text-sm text-danger">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-3">
            <Link href="/organizer/announcements">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              <FiSave size={16} className="mr-2" />
              {isSubmitting ? "Creating..." : "Create Announcement"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}