import { Announcement } from "@/types/announcement";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnnouncementCard } from "./announcement-card";
import { Spinner } from "@/components/ui/spinner";

interface AnnouncementTableProps {
  announcements: Announcement[];
  isLoading?: boolean;
}

const typeColors = {
  INFO: "info" as const,
  UPDATE: "default" as const,
  IMPORTANT: "danger" as const,
};

export function AnnouncementTable({
  announcements,
  isLoading = false,
}: AnnouncementTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No announcements found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <span
                  className={`inline-flex items-center rounded-full p-1.5 text-xs font-medium ${
                    announcement.type === "IMPORTANT"
                      ? "bg-red-100 text-red-700"
                      : announcement.type === "UPDATE"
                      ? "bg-slate-100 text-slate-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {announcement.type === "IMPORTANT" ? "!" : announcement.type === "UPDATE" ? "i" : "i"}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold">{announcement.title}</h4>
                  <Badge variant={typeColors[announcement.type]}>
                    {announcement.type}
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 mb-2">
                  {announcement.content}
                </p>
                <span className="text-xs text-slate-400">
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
