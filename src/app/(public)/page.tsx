"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useEvents } from "@/hooks/use-events";
import { useResearch } from "@/hooks/use-research";
import { Calendar, FlaskConical, ArrowRight } from "lucide-react";

export default function HomePage() {
  const { events, isLoading: eventsLoading } = useEvents();
  const { research, isLoading: researchLoading } = useResearch();

  const featuredEvents = events.slice(0, 3);
  const featuredResearch = research.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Find Opportunities That Matter
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with events, research, and collaboration opportunities
            tailored to your interests and expertise.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Explore Events
              </Button>
            </Link>
            <Link href="/research">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700"
              >
                Browse Research
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Opportunities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar size={20} /> Upcoming Events
              </h3>
              {featuredEvents.length > 0 ? (
                <div className="space-y-4">
                  {featuredEvents.map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                      <Card hover className="p-5">
                        <div className="flex items-start gap-4">
                          <Avatar fallback={event.title.charAt(0)} size="lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm text-slate-500 mt-1">
                              {event.description.slice(0, 100)}...
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge
                                variant={
                                  event.status === "PUBLISHED"
                                    ? "success"
                                    : "warning"
                                }
                              >
                                {event.status}
                              </Badge>
                              <span className="text-xs text-slate-400">
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No events available yet.</p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FlaskConical size={20} /> Research Studies
              </h3>
              {featuredResearch.length > 0 ? (
                <div className="space-y-4">
                  {featuredResearch.map((r) => (
                    <Link key={r.id} href={`/research/${r.id}`}>
                      <Card hover className="p-5">
                        <div className="flex items-start gap-4">
                          <Avatar fallback={r.title.charAt(0)} size="lg" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{r.title}</h4>
                            <p className="text-sm text-slate-500 mt-1">
                              {r.description.slice(0, 100)}...
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge
                                variant={
                                  r.status === "PUBLISHED"
                                    ? "success"
                                    : "warning"
                                }
                              >
                                {r.status}
                              </Badge>
                              <span className="text-xs text-slate-400">
                                {r.researcher}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No research available yet.</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button variant="outline">
                View All Events <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Create an Account
              </h3>
              <p className="text-sm text-slate-500">
                Sign up as an Admin, Organizer, or Participant to access
                tailored features.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Browse Opportunities
              </h3>
              <p className="text-sm text-slate-500">
                Explore events and research opportunities that match your
                interests and expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Apply & Connect
              </h3>
              <p className="text-sm text-slate-500">
                Submit applications, track your status, and connect with
                organizers and fellow participants.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
