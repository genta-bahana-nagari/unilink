"use client";

import { Announcement } from "@/types/announcement";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiCalendar, FiBell } from "react-icons/fi";

const typeColors = {
  INFO: "info" as const,
  UPDATE: "default" as const,
  IMPORTANT: "danger" as const,
};

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex-shrink-0">
          <FiBell size={20} className="text-brand-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-lg">{announcement.title}</h3>
            <Badge variant={typeColors[announcement.type]}>
              {announcement.type}
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mb-3">{announcement.content}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <FiCalendar size={12} />{" "}
              {new Date(announcement.createdAt).toLocaleDateString()}
            </span>
            {announcement.expiresAt && (
              <span className="flex items-center gap-1">
                <FiCalendar size={12} /> Expires{" "}
                {new Date(announcement.expiresAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
