"use client";

import { useState, useEffect, useCallback } from "react";
import { Event } from "@/types/event";
import { api } from "@/lib/mock-api";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPublishedEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadAllEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEvent = useCallback(async (id: string) => {
    try {
      return await api.getEventById(id);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }, []);

  const createEvent = useCallback(async (eventData: Partial<Event>) => {
    try {
      const newEvent = await api.createEvent(eventData);
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>) => {
    try {
      const updated = await api.updateEvent(id, updates);
      if (updated) {
        setEvents(prev => prev.map(e => e.id === id ? updated : e));
      }
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    try {
      const success = await api.deleteEvent(id);
      if (success) {
        setEvents(prev => prev.filter(e => e.id !== id));
      }
      return success;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    isLoading,
    error,
    loadEvents,
    loadAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
