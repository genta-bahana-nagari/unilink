"use client";

import { useState, useEffect, useCallback } from "react";
import { Research } from "@/types/research";
import { api } from "@/lib/mock-api";

export function useResearch() {
  const [research, setResearch] = useState<Research[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPublishedResearch();
      setResearch(data);
    } catch (err) {
      setError("Failed to load research");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadAllResearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getResearch();
      setResearch(data);
    } catch (err) {
      setError("Failed to load research");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getResearch = useCallback(async (id: string) => {
    try {
      return await api.getResearchById(id);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }, []);

  const createResearch = useCallback(async (researchData: Partial<Research>) => {
    try {
      const newResearch = await api.createResearch(researchData);
      setResearch(prev => [newResearch, ...prev]);
      return newResearch;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const updateResearch = useCallback(async (id: string, updates: Partial<Research>) => {
    try {
      const updated = await api.updateResearch(id, updates);
      if (updated) {
        setResearch(prev => prev.map(r => r.id === id ? updated : r));
      }
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const deleteResearch = useCallback(async (id: string) => {
    try {
      const success = await api.deleteResearch(id);
      if (success) {
        setResearch(prev => prev.filter(r => r.id !== id));
      }
      return success;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    loadResearch();
  }, [loadResearch]);

  return {
    research,
    isLoading,
    error,
    loadResearch,
    loadAllResearch,
    getResearch,
    createResearch,
    updateResearch,
    deleteResearch,
  };
}
