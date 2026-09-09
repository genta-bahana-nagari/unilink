"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FiArrowLeft, FiSave, FiPlus, FiX } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/mock-api";

const categories = [
  "Health & Psychology",
  "Environmental Science",
  "Healthcare & Technology",
  "Computer Science",
  "Social Sciences",
  "Engineering",
  "Business",
  "Other",
];

export default function CreateResearchPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    researcher: "",
    requiredParticipants: "",
    duration: "",
    compensation: "",
    deadline: "",
    criteria: [] as string[],
  });
  const [newCriterion, setNewCriterion] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim())
      errs.description = "Description is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.researcher.trim())
      errs.researcher = "Researcher name is required";
    if (
      !form.requiredParticipants ||
      Number(form.requiredParticipants) <= 0
    )
      errs.requiredParticipants = "Valid participant count is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const addCriterion = () => {
    if (newCriterion.trim()) {
      setForm((p) => ({
        ...p,
        criteria: [...p.criteria, newCriterion.trim()],
      }));
      setNewCriterion("");
    }
  };

  const removeCriterion = (index: number) => {
    setForm((p) => ({
      ...p,
      criteria: p.criteria.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    setIsSubmitting(true);
    try {
      await api.createResearch({
        title: form.title,
        description: form.description,
        category: form.category,
        researcher: form.researcher,
        requiredParticipants: Number(form.requiredParticipants),
        duration: form.duration || undefined,
        compensation: form.compensation || undefined,
        deadline: form.deadline
          ? new Date(form.deadline).toISOString()
          : undefined,
        criteria: form.criteria,
        organizerId: user.id,
        status: "DRAFT",
      });
      router.push("/organizer/research");
    } catch {
      setErrors({ submit: "Failed to create research study" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-3 border-blue-600 rounded-full border-slate-300" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/organizer/research">
          <Button variant="ghost" size="sm">
            <FiArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create Research Study</h1>
          <p className="text-slate-500 mt-1">
            Fill in the details to create a new research study
          </p>
        </div>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            placeholder="Research study title"
            value={form.title}
            onChange={(e) =>
              setForm((p) => ({ ...p, title: e.target.value }))
            }
            error={errors.title}
          />

          <Textarea
            label="Description"
            placeholder="Describe your research study..."
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            error={errors.description}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              label="Researcher"
              placeholder="Lead researcher name"
              value={form.researcher}
              onChange={(e) =>
                setForm((p) => ({ ...p, researcher: e.target.value }))
              }
              error={errors.researcher}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Required Participants"
              type="number"
              placeholder="Number of participants"
              value={form.requiredParticipants}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  requiredParticipants: e.target.value,
                }))
              }
              error={errors.requiredParticipants}
            />
            <Input
              label="Duration"
              placeholder="e.g. 3 months"
              value={form.duration}
              onChange={(e) =>
                setForm((p) => ({ ...p, duration: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Compensation"
              placeholder="e.g. $50 gift card"
              value={form.compensation}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  compensation: e.target.value,
                }))
              }
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

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              Participation Criteria
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a criterion"
                value={newCriterion}
                onChange={(e) => setNewCriterion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCriterion();
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addCriterion}
              >
                <FiPlus size={16} />
              </Button>
            </div>
            {form.criteria.length > 0 && (
              <div className="space-y-2">
                {form.criteria.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                  >
                    <span className="text-sm">{c}</span>
                    <button
                      type="button"
                      onClick={() => removeCriterion(i)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          <div className="flex justify-end gap-3">
            <Link href="/organizer/research">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              <FiSave size={16} className="mr-2" />
              {isSubmitting ? "Creating..." : "Create Research"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
