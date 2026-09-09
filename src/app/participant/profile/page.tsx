"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { FiSave, FiCalendar, FiFileText } from "react-icons/fi";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/mock-api";
import { Application } from "@/types/application";
import { Event } from "@/types/event";
import { Research } from "@/types/research";

export default function ProfilePage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [research, setResearch] = useState<Research[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [a, e, r] = await Promise.all([
        api.getApplicationsByUser(user!.id),
        api.getEvents(),
        api.getResearch(),
      ]);
      setApplications(a);
      setEvents(e);
      setResearch(r);
      setForm({
        name: user!.name,
        email: user!.email,
        bio: user!.bio || "",
      });
      setIsLoading(false);
    }
    load();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await api.updateUser(user.id, {
        name: form.name,
        email: form.email,
        bio: form.bio,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // handle error
    } finally {
      setIsSaving(false);
    }
  };

  const getOppTitle = (id: string) => {
    const ev = events.find((e) => e.id === id);
    if (ev) return ev.title;
    const res = research.find((r) => r.id === id);
    if (res) return res.title;
    return id;
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  const accepted = applications.filter((a) => a.status === "ACCEPTED");

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account information
        </p>
      </div>

      <Card className="p-6 border-border">
        <div className="flex items-center gap-4 mb-6">
          <Avatar src={user.avatar} fallback={user.name} size="lg" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
            <Badge
              variant={
                user.role === "ADMIN"
                  ? "danger"
                  : user.role === "ORGANIZER"
                  ? "info"
                  : "default"
              }
            >
              {user.role}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm((p) => ({ ...p, name: e.target.value }))
            }
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((p) => ({ ...p, email: e.target.value }))
            }
          />

          <Textarea
            label="Bio"
            placeholder="Tell us about yourself..."
            rows={3}
            value={form.bio}
            onChange={(e) =>
              setForm((p) => ({ ...p, bio: e.target.value }))
            }
          />

          <div className="flex justify-end gap-3">
            {saved && (
              <p className="text-sm text-success flex items-center gap-1">
                <FiSave size={14} /> Saved successfully
              </p>
            )}
            <Button onClick={handleSave} disabled={isSaving}>
              <FiSave size={16} className="mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
          <FiFileText size={20} /> Application History
        </h3>
        {applications.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No applications yet
          </p>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {getOppTitle(app.opportunityId)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Applied{" "}
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant={
                    app.status === "ACCEPTED"
                      ? "success"
                      : app.status === "PENDING"
                      ? "warning"
                      : app.status === "REJECTED"
                      ? "danger"
                      : app.status === "REVIEWING"
                      ? "info"
                      : "default"
                  }
                >
                  {app.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
          <FiCalendar size={20} /> Accepted Opportunities
        </h3>
        {accepted.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No accepted applications yet
          </p>
        ) : (
          <div className="space-y-3">
            {accepted.map((app) => (
              <div
                key={app.id}
                className="flex items-center gap-3 p-3 bg-success-bg rounded-lg border border-success-border"
              >
                <div className="p-2 bg-card rounded-lg">
                  <FiCalendar size={16} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {getOppTitle(app.opportunityId)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Accepted on{" "}
                    {app.updatedAt
                      ? new Date(app.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}