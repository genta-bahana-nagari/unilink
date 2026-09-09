"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import Link from "next/link";
import { api } from "@/lib/mock-api";
import { Event } from "@/types/event";

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

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    api.getEventById(id).then((data) => {
      if (data) {
        setEvent(data);
        setForm({
          title: data.title,
          description: data.description,
          category: data.category,
          location: data.location,
          startDate: data.startDate.slice(0, 16),
          endDate: data.endDate.slice(0, 16),
          quota: String(data.quota),
          deadline: data.deadline ? data.deadline.slice(0, 16) : "",
          isOnline: data.isOnline || false,
          meetingLink: data.meetingLink || "",
        });
      }
      setIsLoading(false);
    });
  }, [id]);

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
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await api.updateEvent(id, {
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
      });
      router.push("/organizer/events");
    } catch {
      setErrors({ submit: "Failed to update event" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-3 border-brand-600 rounded-full border-surface-300" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Event not found</p>
        <Link href="/organizer/events">
          <Button variant="outline" className="mt-4">
            Back to Events
          </Button>
        </Link>
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
          <h1 className="text-2xl font-bold text-foreground">Edit Event</h1>
          <p className="text-muted-foreground mt-1">{event.title}</p>
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}