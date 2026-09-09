"use client";

import { useEvents } from "@/hooks/use-events";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { FiMapPin, FiUsers } from "react-icons/fi";
import Link from "next/link";

export default function EventsPage() {
  const { events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-3 border-blue-600 rounded-full border-slate-300" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Events</h1>
          <p className="text-slate-500">
            Discover and join events that match your interests
          </p>
        </div>

        <div className="mb-6 flex gap-4 max-w-md">
          <Input placeholder="Search events..." className="flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} hover className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar fallback={event.title.charAt(0)} size="lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <Badge
                      variant={
                        event.status === "PUBLISHED" ? "success" : "warning"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  {event.description.slice(0, 120)}...
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <FiMapPin size={14} /> {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers size={14} /> {event.registeredCount}/{event.quota}
                  </span>
                </div>
                <Link href={`/events/${event.id}`}>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
