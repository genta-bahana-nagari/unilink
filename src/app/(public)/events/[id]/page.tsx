"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Event } from "@/types/event";
import { api } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiArrowLeft,
  FiVideo,
  FiExternalLink,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getEventById(params.id as string)
      .then((data) => {
        if (data) setEvent(data);
        else setError("Event not found");
      })
      .catch(() => setError("Failed to load event"))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center py-20 bg-background">
        <p className="text-destructive mb-4">{error || "Event not found"}</p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  const statusColors = {
    PUBLISHED: "success" as const,
    PENDING: "warning" as const,
    DRAFT: "default" as const,
    REJECTED: "danger" as const,
    CLOSED: "default" as const,
  };

  const spotsLeft = event.quota - event.registeredCount;
  const progressPercent = (event.registeredCount / event.quota) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/events"
          className={cn(
            "inline-flex items-center gap-2 text-sm mb-6 transition-colors",
            "text-muted-foreground hover:text-primary"
          )}
        >
          <FiArrowLeft size={16} /> Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className={cn("p-8", "border-border", "bg-card")}>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground">{event.title}</h1>
                <Badge variant={statusColors[event.status]}>{event.status}</Badge>
              </div>
              <Badge variant="info" className="mb-6">
                {event.category}
              </Badge>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </Card>

            <Card className={cn("p-8", "border-border", "bg-card")}>
              <h2 className="text-xl font-semibold text-foreground mb-4">Key Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FiMapPin size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiClock size={18} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">End Date</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(event.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {event.deadline && (
                  <div className="flex items-center gap-3">
                    <FiClock size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Application Deadline</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(event.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {event.isOnline && (
                  <div className="flex items-center gap-3">
                    <FiVideo size={18} className="text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Format</p>
                      <p className="text-sm font-medium text-foreground">Online Event</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div>
            <Card className={cn("p-6 sticky top-6", "border-border", "bg-card")}>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary">
                  {event.registeredCount}
                </div>
                <p className="text-sm text-muted-foreground">
                  of {event.quota} spots filled
                </p>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {spotsLeft > 0 ? `${spotsLeft} spots remaining` : "Event full"}
                </p>
              </div>

              <Button
                className="w-full"
                disabled={spotsLeft <= 0}
              >
                {spotsLeft > 0 ? "Apply Now" : "Event Full"}
              </Button>

              {event.isOnline && event.meetingLink && (
                <a
                  href={event.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full"
                >
                  <Button variant="outline" className="w-full">
                    <FiExternalLink size={16} className="mr-2" />
                    Join Meeting
                  </Button>
                </a>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
