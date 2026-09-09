"use client";

import { useState, useEffect, useCallback } from "react";
import { Application } from "@/types/application";
import { api } from "@/lib/mock-api";

export function useApplications(userId?: string) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let data;
      if (userId) {
        data = await api.getApplicationsByUser(userId);
      } else {
        data = await api.getApplications();
      }
      setApplications(data);
    } catch (err) {
      setError("Failed to load applications");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const getApplicationsForOpportunity = useCallback(async (opportunityId: string) => {
    try {
      return await api.getApplicationsByOpportunity(opportunityId);
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  const createApplication = useCallback(async (applicationData: Partial<Application>) => {
    try {
      const newApplication = await api.createApplication(applicationData);
      setApplications(prev => [newApplication, ...prev]);
      return newApplication;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const updateApplication = useCallback(async (id: string, updates: Partial<Application>) => {
    try {
      const updated = await api.updateApplication(id, updates);
      if (updated) {
        setApplications(prev => prev.map(a => a.id === id ? updated : a));
      }
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const deleteApplication = useCallback(async (id: string) => {
    try {
      const success = await api.deleteApplication(id);
      if (success) {
        setApplications(prev => prev.filter(a => a.id !== id));
      }
      return success;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  return {
    applications,
    isLoading,
    error,
    loadApplications,
    getApplicationsForOpportunity,
    createApplication,
    updateApplication,
    deleteApplication,
  };
}
