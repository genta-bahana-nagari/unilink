"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEvents } from "@/hooks/use-events";
import { useResearch } from "@/hooks/use-research";
import {
  FiCalendar,
  FiArrowRight,
  FiUsers,
  FiClock,
  FiChevronRight,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";
import { GiMicroscope } from "react-icons/gi";

export function FeaturedOpportunities() {
  const { events, isLoading: eventsLoading } = useEvents();
  const { research, isLoading: researchLoading } = useResearch();

  const featuredEvents = events.slice(0, 3);
  const featuredResearch = research.slice(0, 3);

  return (
    <section className="py-16 sm:py-20 px-4 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Featured Opportunities
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover curated events and research studies looking for passionate
            volunteers like you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-black dark:text-white">
                <FiCalendar className="w-5 h-5" />
                Upcoming Events
              </h3>
              <Link
                href="/events"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white font-medium flex items-center gap-1"
              >
                View all <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {eventsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-5 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
                        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
                        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : featuredEvents.length > 0 ? (
              <div className="space-y-4">
                {featuredEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`}>
                    <Card className="group p-5 hover:shadow-lg transition-all duration-300 hover:border-black dark:hover:border-white cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                          {event.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-black dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                            {event.title}
                          </h4>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <Badge variant="default" className="text-xs">
                              {event.status}
                            </Badge>
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <FiMapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              {event.startDate
                                ? new Date(event.startDate).toLocaleDateString()
                                : "TBD"}
                            </span>
                          </div>
                        </div>
                        <FiChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-neutral-500 dark:text-neutral-400">No events available yet.</p>
                <Link href="/events/create">
                  <Button variant="outline" className="mt-4">
                    Create Event
                  </Button>
                </Link>
              </Card>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-black dark:text-white">
                <GiMicroscope className="w-5 h-5" />
                Research Studies
              </h3>
              <Link
                href="/research"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white font-medium flex items-center gap-1"
              >
                View all <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {researchLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-5 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
                        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
                        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : featuredResearch.length > 0 ? (
              <div className="space-y-4">
                {featuredResearch.map((r) => (
                  <Link key={r.id} href={`/research/${r.id}`}>
                    <Card className="group p-5 hover:shadow-lg transition-all duration-300 hover:border-black dark:hover:border-white cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                          {r.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-black dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                            {r.title}
                          </h4>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                            {r.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <Badge variant="default" className="text-xs">
                              {r.status}
                            </Badge>
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <FiUsers className="w-3 h-3" />
                              {r.researcher}
                            </span>
                            <span className="text-xs text-neutral-400 flex items-center gap-1">
                              <FiBriefcase className="w-3 h-3" />
                              {r.category || "Research"}
                            </span>
                          </div>
                        </div>
                        <FiChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors flex-shrink-0" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-neutral-500 dark:text-neutral-400">No research available yet.</p>
                <Link href="/research/create">
                  <Button variant="outline" className="mt-4">
                    Add Research
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        </div>

        <div className="text-center">
          <Link href="/events">
            <Button variant="outline" className="group">
              View All Opportunities
              <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
