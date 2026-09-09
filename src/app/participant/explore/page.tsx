"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FiSearch,
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import { FaFlask } from "react-icons/fa";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/mock-api";
import { Event } from "@/types/event";
import { Research } from "@/types/research";
import { Application } from "@/types/application";

export default function ExplorePage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [research, setResearch] = useState<Research[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [applyModal, setApplyModal] = useState<{
    id: string;
    type: "EVENT" | "RESEARCH";
    title: string;
  } | null>(null);
  const [motivation, setMotivation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const [e, r, a] = await Promise.all([
        api.getPublishedEvents(),
        api.getPublishedResearch(),
        user ? api.getApplicationsByUser(user.id) : Promise.resolve([]),
      ]);
      setEvents(e);
      setResearch(r);
      setApplications(a);
      setIsLoading(false);
    }
    load();
  }, [user]);

  const hasApplied = (id: string) =>
    applications.some((a) => a.opportunityId === id);

  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      typeFilter === "ALL" || typeFilter === "EVENT";
    return matchesSearch && matchesType;
  });

  const filteredResearch = research.filter((r) => {
    const matchesSearch = r.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      typeFilter === "ALL" || typeFilter === "RESEARCH";
    return matchesSearch && matchesType;
  });

  const handleApply = async () => {
    if (!user || !applyModal || !motivation.trim()) return;
    setIsSubmitting(true);
    try {
      const app = await api.createApplication({
        applicantId: user.id,
        opportunityId: applyModal.id,
        opportunityType: applyModal.type,
        motivation: motivation.trim(),
      });
      setApplications((prev) => [app, ...prev]);
      setApplyModal(null);
      setMotivation("");
    } catch {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-3 border-brand-600 rounded-full border-surface-300" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Explore Opportunities</h1>
        <p className="text-muted-foreground mt-1">
          Discover events and research studies to join
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "EVENT", "RESEARCH"].map((type) => (
            <Button
              key={type}
              variant={typeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(type)}
            >
              {type === "ALL" ? "All" : type}
            </Button>
          ))}
        </div>
      </div>

      {filteredEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
            <FiCalendar size={20} className="text-brand-600" /> Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} hover className="overflow-hidden border-border">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <Badge variant="info">Event</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <FiMapPin size={14} /> {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiUsers size={14} />
                      {event.registeredCount}/{event.quota} registered
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar size={14} />
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  {hasApplied(event.id) ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      <FiCheckCircle size={14} className="mr-2" /> Applied
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() =>
                        setApplyModal({
                          id: event.id,
                          type: "EVENT",
                          title: event.title,
                        })
                      }
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {filteredResearch.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
            <FaFlask size={20} className="text-purple-600" /> Research
            Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResearch.map((item) => (
              <Card key={item.id} hover className="overflow-hidden border-border">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <Badge variant="default">Research</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <FaFlask size={14} /> {item.researcher}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiUsers size={14} />
                      {item.currentParticipants}/
                      {item.requiredParticipants} participants
                    </div>
                    {item.duration && (
                      <div className="flex items-center gap-1">
                        <FiClock size={14} /> {item.duration}
                      </div>
                    )}
                    {item.compensation && (
                      <div className="flex items-center gap-1">
                        <FiDollarSign size={14} /> {item.compensation}
                      </div>
                    )}
                  </div>
                  {hasApplied(item.id) ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      <FiCheckCircle size={14} className="mr-2" /> Applied
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() =>
                        setApplyModal({
                          id: item.id,
                          type: "RESEARCH",
                          title: item.title,
                        })
                      }
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {filteredEvents.length === 0 && filteredResearch.length === 0 && (
        <div className="text-center py-12">
          <FiSearch
            size={48}
            className="mx-auto text-muted-foreground mb-4"
          />
          <p className="text-muted-foreground">
            No opportunities found matching your search.
          </p>
        </div>
      )}

      {applyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-xl shadow-xl w-full max-w-md mx-4 p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Apply to {applyModal.title}
              </h3>
              <button
                onClick={() => {
                  setApplyModal(null);
                  setMotivation("");
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <Textarea
                label="Why do you want to join?"
                placeholder="Tell the organizer why you're a good fit..."
                rows={4}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setApplyModal(null);
                    setMotivation("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApply}
                  disabled={!motivation.trim() || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}