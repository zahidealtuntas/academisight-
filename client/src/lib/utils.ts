// =============================================================================
// AcademiSight — Utility Functions
// Design: Neo-Institutional Data-Forward Dashboard
// =============================================================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RiskLevel, Student } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the risk level category based on a numeric risk score.
 * Critical: >80% | High: 65-80% | Medium: 45-65% | Low: 20-45% | Safe: <20%
 */
export function getRiskLevel(score: number): RiskLevel {
  if (score > 80) return "critical";
  if (score > 65) return "high";
  if (score > 45) return "medium";
  if (score > 20) return "low";
  return "safe";
}

export function getRiskLabel(score: number): string {
  const level = getRiskLevel(score);
  const labels: Record<RiskLevel, string> = {
    critical: "Critical Risk",
    high: "High Risk",
    medium: "Medium Risk",
    low: "Low Risk",
    safe: "Safe",
  };
  return labels[level];
}

export function getRiskClass(score: number): string {
  return `risk-${getRiskLevel(score)}`;
}

export function getRiskColor(score: number): string {
  const level = getRiskLevel(score);
  const colors: Record<RiskLevel, string> = {
    critical: "#ef4444",
    high:     "#f97316",
    medium:   "#eab308",
    low:      "#22c55e",
    safe:     "#10b981",
  };
  return colors[level];
}

export function getRiskOklch(score: number): string {
  const level = getRiskLevel(score);
  const colors: Record<RiskLevel, string> = {
    critical: "oklch(0.58 0.22 25)",
    high:     "oklch(0.72 0.19 50)",
    medium:   "oklch(0.78 0.17 80)",
    low:      "oklch(0.72 0.18 145)",
    safe:     "oklch(0.65 0.15 165)",
  };
  return colors[level];
}

export function getOutcomeClass(outcome: string): string {
  switch (outcome) {
    case "Graduate": return "outcome-graduate";
    case "Dropout":  return "outcome-dropout";
    default:         return "outcome-enrolled";
  }
}

export function getOutcomeIcon(outcome: string): string {
  switch (outcome) {
    case "Graduate": return "✓";
    case "Dropout":  return "✗";
    default:         return "◎";
  }
}

export function formatGPA(gpa: number): string {
  return gpa.toFixed(2);
}

export function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function getAvatarColor(id: string): string {
  const colors = [
    "oklch(0.45 0.15 255)",
    "oklch(0.45 0.15 295)",
    "oklch(0.45 0.15 175)",
    "oklch(0.45 0.15 50)",
    "oklch(0.45 0.15 320)",
    "oklch(0.45 0.15 210)",
  ];
  const idx = parseInt(id.replace("STU-", ""), 10) % colors.length;
  return colors[idx];
}

export function computeStats(students: Student[]) {
  if (!students.length) return null;
  const total = students.length;
  const atRisk = students.filter((s) => s.risk_score > 65).length;
  const critical = students.filter((s) => s.risk_score > 80).length;
  const dropouts = students.filter((s) => s.predicted_outcome === "Dropout").length;
  const graduates = students.filter((s) => s.predicted_outcome === "Graduate").length;
  const enrolled = students.filter((s) => s.predicted_outcome === "Enrolled").length;
  const avgRisk = Math.round(students.reduce((a, s) => a + s.risk_score, 0) / total);
  const avgAttendance = Math.round(students.reduce((a, s) => a + s.attendance_rate, 0) / total);
  const avgGPA = (students.reduce((a, s) => a + s.previous_gpa, 0) / total).toFixed(2);
  const avgMidterm = Math.round(students.reduce((a, s) => a + s.midterm_score, 0) / total);
  return { total, atRisk, critical, dropouts, graduates, enrolled, avgRisk, avgAttendance, avgGPA, avgMidterm };
}

export function filterStudents(students: Student[], filters: {
  search: string;
  gender: string;
  scholarship: string;
  predicted_outcome: string;
  parental_education: string;
  min_risk_score: number;
  max_risk_score: number;
  min_attendance: number;
  sort_by: string;
  sort_dir: "asc" | "desc";
}): Student[] {
  let result = [...students];

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.predicted_outcome.toLowerCase().includes(q)
    );
  }

  if (filters.gender && filters.gender !== "all") {
    result = result.filter((s) => s.gender === filters.gender);
  }

  if (filters.scholarship && filters.scholarship !== "all") {
    result = result.filter((s) =>
      filters.scholarship === "yes" ? s.scholarship : !s.scholarship
    );
  }

  if (filters.predicted_outcome && filters.predicted_outcome !== "all") {
    result = result.filter((s) => s.predicted_outcome === filters.predicted_outcome);
  }

  if (filters.parental_education && filters.parental_education !== "all") {
    result = result.filter((s) => s.parental_education === filters.parental_education);
  }

  result = result.filter(
    (s) => s.risk_score >= filters.min_risk_score && s.risk_score <= filters.max_risk_score
  );

  result = result.filter((s) => s.attendance_rate >= filters.min_attendance);

  result.sort((a, b) => {
    let va: number | string = 0;
    let vb: number | string = 0;
    switch (filters.sort_by) {
      case "risk_score":    va = a.risk_score;    vb = b.risk_score;    break;
      case "name":          va = a.name;          vb = b.name;          break;
      case "attendance":    va = a.attendance_rate; vb = b.attendance_rate; break;
      case "gpa":           va = a.previous_gpa;  vb = b.previous_gpa;  break;
      case "midterm":       va = a.midterm_score;  vb = b.midterm_score; break;
      default:              va = a.risk_score;    vb = b.risk_score;
    }
    if (typeof va === "string") {
      return filters.sort_dir === "asc"
        ? va.localeCompare(vb as string)
        : (vb as string).localeCompare(va);
    }
    return filters.sort_dir === "asc"
      ? (va as number) - (vb as number)
      : (vb as number) - (va as number);
  });

  return result;
}
