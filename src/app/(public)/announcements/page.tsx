"use client";

import { FiBell } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/mock-api";
import { Announcement } from "@/types/announcement";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await api.getAnnouncements();
      setAnnouncements(data);
      setIsLoading(false);
    }
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Announcements
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news and updates from Fivo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className={cn(
              "p-6",
              "border-border",
              "bg-card",
              "hover:shadow-lg",
              "transition-all duration-300",
              "hover:border-primary/50",
              "dark:hover:border-primary/50",
            )}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  "bg-primary/10",
                  "dark:bg-primary/10",
                )}
              >
                <FiBell size={16} className="text-primary" />
              </div>
              <Badge
                variant={
                  announcement.type === "IMPORTANT"
                    ? "danger"
                    : announcement.type === "UPDATE"
                      ? "info"
                      : "default"
                }
              >
                {announcement.type}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {announcement.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {announcement.content}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {new Date(announcement.createdAt).toLocaleDateString()}
              </span>
              {announcement.expiresAt && (
                <span className="text-xs text-muted-foreground">
                  Expires:{" "}
                  {new Date(announcement.expiresAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {announcements.length === 0 && (
        <div className="text-center py-12">
          <FiBell size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No announcements
          </h3>
          <p className="text-muted-foreground">Check back later for updates</p>
        </div>
      )}
    </div>
  );
}
