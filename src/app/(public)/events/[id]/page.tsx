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
  FiUsers,
  FiClock,
  FiArrowLeft,
  FiVideo,
  FiExternalLink,
} from "react-icons/fi";

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
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error || "Event not found"}</p>
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6"
        >
          <FiArrowLeft size={16} /> Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold">{event.title}</h1>
                <Badge variant={statusColors[event.status]}>{event.status}</Badge>
              </div>
              <Badge variant="info" className="mb-6">
                {event.category}
              </Badge>
              <p className="text-slate-600 leading-relaxed">{event.description}</p>
            </Card>

            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-4">Key Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FiMapPin size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Location</p>
                    <p className="text-sm font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Start Date</p>
                    <p className="text-sm font-medium">
                      {new Date(event.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">End Date</p>
                    <p className="text-sm font-medium">
                      {new Date(event.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {event.deadline && (
                  <div className="flex items-center gap-3">
<FiClock size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Application Deadline</p>
                      <p className="text-sm font-medium">
                        {new Date(event.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                {event.isOnline && (
                  <div className="flex items-center gap-3">
                    <FiVideo size={18} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-400">Format</p>
                      <p className="text-sm font-medium">Online Event</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600">
                  {event.registeredCount}
                </div>
                <p className="text-sm text-slate-500">
                  of {event.quota} spots filled
                </p>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(event.registeredCount / event.quota) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
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
