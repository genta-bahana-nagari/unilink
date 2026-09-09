"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/mock-api";

const categories = [
  "Technology",
  "Design",
  "Business",
  "Health",
  "Education",
  "Science",
  "Arts",
  "Other",
];

export default function CreateEventPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    quota: "",
    deadline: "",
    isOnline: false,
    meetingLink: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim())
      errs.description = "Description is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.location.trim()) errs.location = "Location is required";
    if (!form.startDate) errs.startDate = "Start date is required";
    if (!form.endDate) errs.endDate = "End date is required";
    if (!form.quota || Number(form.quota) <= 0)
      errs.quota = "Valid quota is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    setIsSubmitting(true);
    try {
      await api.createEvent({
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        quota: Number(form.quota),
        deadline: form.deadline
          ? new Date(form.deadline).toISOString()
          : undefined,
        isOnline: form.isOnline,
        meetingLink: form.isOnline ? form.meetingLink : undefined,
        organizerId: user.id,
        status: "DRAFT",
      });
      router.push("/organizer/events");
    } catch {
      setErrors({ submit: "Failed to create event" });
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
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/organizer/events">
          <Button variant="ghost" size="sm">
            <FiArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Event</h1>
          <p className="text-muted-foreground mt-1">
            Fill in the details to create a new event
          </p>
        </div>
      </div>

      <Card className="p-6 border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            placeholder="Event title"
            value={form.title}
            onChange={(e) =>
              setForm((p) => ({ ...p, title: e.target.value }))
            }
            error={errors.title}
          />

          <Textarea
            label="Description"
            placeholder="Describe your event..."
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            error={errors.description}
          />

          <Select
            label="Category"
            options={categories}
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value }))
            }
            error={errors.category}
          />

          <Input
            label="Location"
            placeholder="Event location"
            value={form.location}
            onChange={(e) =>
              setForm((p) => ({ ...p, location: e.target.value }))
            }
            error={errors.location}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="datetime-local"
              value={form.startDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, startDate: e.target.value }))
              }
              error={errors.startDate}
            />
            <Input
              label="End Date"
              type="datetime-local"
              value={form.endDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, endDate: e.target.value }))
              }
              error={errors.endDate}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Quota"
              type="number"
              placeholder="Max participants"
              value={form.quota}
              onChange={(e) =>
                setForm((p) => ({ ...p, quota: e.target.value }))
              }
              error={errors.quota}
            />
            <Input
              label="Application Deadline"
              type="datetime-local"
              value={form.deadline}
              onChange={(e) =>
                setForm((p) => ({ ...p, deadline: e.target.value }))
              }
            />
          </div>

          <Checkbox
            label="This is an online event"
            checked={form.isOnline}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                isOnline: e.target.checked,
              }))
            }
          />

          {form.isOnline && (
            <Input
              label="Meeting Link"
              placeholder="https://..."
              value={form.meetingLink}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  meetingLink: e.target.value,
                }))
              }
            />
          )}

          {errors.submit && (
            <p className="text-sm text-danger">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-3">
            <Link href="/organizer/events">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              <FiSave size={16} className="mr-2" />
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}