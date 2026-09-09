"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Event } from "@/types/event";
import { api } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { FiArrowLeft, FiEdit3, FiUsers, FiCalendar, FiMapPin, FiClock } from "react-icons/fi";

export default function OrganizerEventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getEventById(params.id as string).then((data) => {
      setEvent(data || null);
      setIsLoading(false);
    });
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <p className="text-muted-foreground">Event not found</p>
        <Link href="/organizer/events">
          <Button variant="outline" className="mt-4">Back to Events</Button>
        </Link>
      </div>
    );
  }

  const statusColors: Record<string, "success" | "warning" | "default" | "danger"> = {
    PUBLISHED: "success",
    PENDING: "warning",
    DRAFT: "default",
    REJECTED: "danger",
    CLOSED: "default",
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/organizer/events">
          <Button variant="ghost" size="sm">
            <FiArrowLeft size={16} className="mr-1" /> Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{event.title}</h1>
          <Badge variant={statusColors[event.status]} className="mt-1">{event.status}</Badge>
        </div>
        <Link href={`/organizer/events/${event.id}/edit`}>
          <Button variant="outline">
            <FiEdit3 size={16} className="mr-2" /> Edit
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </Card>

          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FiMapPin size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiCalendar size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Start Date</p>
                  <p className="text-sm font-medium">{new Date(event.startDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiClock size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">End Date</p>
                  <p className="text-sm font-medium">{new Date(event.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiUsers size={18} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="text-sm font-medium">{event.registeredCount}/{event.quota}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-4 sm:p-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-brand-600">{event.registeredCount}</div>
              <p className="text-sm text-muted-foreground">of {event.quota} spots filled</p>
              <div className="w-full bg-surface-200 rounded-full h-2 mt-3">
                <div
                  className="bg-brand-600 h-2 rounded-full"
                  style={{ width: `${(event.registeredCount / event.quota) * 100}%` }}
                />
              </div>
            </div>
            <Link href={`/organizer/events/${event.id}/applicants`}>
              <Button variant="outline" className="w-full">
                <FiUsers size={16} className="mr-2" /> View Applicants
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}