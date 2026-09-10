"use client";

import { useEvents } from "@/hooks/use-events";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { FiMapPin, FiUsers, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const { events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-background">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Events</h1>
          <p className="text-muted-foreground">
            Discover and join events that match your interests
          </p>
        </div>

        <div className="mb-6 flex gap-4 max-w-md">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search events..." 
              className={cn(
                    "h-9",
                    "w-32 lg:w-40",
                    "pl-8 pr-3",
                    "rounded-full",
                    "text-sm",
                    "text-foreground",
                    "placeholder:text-neutral-400",

                    "bg-neutral-100/80",
                    "dark:bg-neutral-900/80",

                    "border border-transparent",
                    "focus:border-neutral-300",
                    "dark:focus:border-neutral-700",

                    "focus:bg-white",
                    "dark:focus:bg-neutral-900",

                    "focus:outline-none",
                    "focus:ring-2",
                    "focus:ring-black/5",
                    "dark:focus:ring-white/10",

                    "transition-all duration-200",

                    "focus:w-40 lg:focus:w-52",
                  )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card 
              key={event.id} 
              hover 
              className={cn(
                "overflow-hidden",
                "border-border",
                "dark:border-border",
                "bg-card",
                "dark:bg-card",
                "transition-all duration-300",
                "hover:shadow-lg",
                "hover:border-primary/50",
                "dark:hover:border-primary/50"
              )}
            >
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar fallback={event.title.charAt(0)} size="lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">{event.title}</h3>
                    <Badge
                      variant={
                        event.status === "PUBLISHED" ? "success" : 
                        event.status === "PENDING" ? "warning" : "default"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {event.description.slice(0, 120)}...
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
        
        {events.length === 0 && (
          <div className="text-center py-12">
            <FiUsers size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground">Check back later for new events</p>
          </div>
        )}
      </div>
    </div>
  );
}
