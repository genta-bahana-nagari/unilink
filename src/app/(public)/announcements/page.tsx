"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/mock-api";
import { Announcement } from "@/types/announcement";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    api.getAnnouncements().then((data) => setAnnouncements(data));
  }, []);

  const typeColors = {
    INFO: "info" as const,
    UPDATE: "default" as const,
    IMPORTANT: "danger" as const,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Announcements</h1>
          <p className="text-slate-500">
            Stay up to date with the latest news and updates
          </p>
        </div>

        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Bell size={20} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">
                      {announcement.title}
                    </h3>
                    <Badge variant={typeColors[announcement.type]}>
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {announcement.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
