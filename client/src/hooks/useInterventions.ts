// =============================================================================
// AcademiSight — useInterventions Hook
// Manages intervention log data with localStorage persistence
// =============================================================================

import { useState, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";
import type { Intervention } from "@/lib/types";

const STORAGE_KEY = "academisight_interventions";

export function useInterventions() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setInterventions(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load interventions:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist to localStorage whenever interventions change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(interventions));
    }
  }, [interventions, loading]);

  const addIntervention = useCallback((intervention: Omit<Intervention, "id">) => {
    const newIntervention: Intervention = {
      ...intervention,
      id: nanoid(),
    };
    setInterventions((prev) => [newIntervention, ...prev]);
    return newIntervention;
  }, []);

  const updateIntervention = useCallback((id: string, updates: Partial<Intervention>) => {
    setInterventions((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updates } : i))
    );
  }, []);

  const deleteIntervention = useCallback((id: string) => {
    setInterventions((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const getStudentInterventions = useCallback(
    (studentId: string) =>
      interventions
        .filter((i) => i.student_id === studentId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [interventions]
  );

  const getInterventionStats = useCallback((studentId: string) => {
    const logs = getStudentInterventions(studentId);
    return {
      total: logs.length,
      lastIntervention: logs[0]?.date || null,
      positive: logs.filter((l) => l.outcome === "Positive").length,
      negative: logs.filter((l) => l.outcome === "Negative").length,
      pending: logs.filter((l) => l.outcome === "Pending").length,
    };
  }, [getStudentInterventions]);

  return {
    interventions,
    loading,
    addIntervention,
    updateIntervention,
    deleteIntervention,
    getStudentInterventions,
    getInterventionStats,
  };
}
