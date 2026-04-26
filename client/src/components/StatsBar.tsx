// =============================================================================
// AcademiSight — Stats Bar (KPI Summary Row)
// Design: Neo-Institutional Data-Forward Dashboard
// Shows aggregate statistics for the current filtered cohort
// =============================================================================

import { useMemo } from "react";
import type { Student } from "@/lib/types";
import { computeStats } from "@/lib/utils";

interface Props {
  students: Student[];
  allStudents: Student[];
}

function StatCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  icon: string;
}) {
  return (
    <div className="stat-card flex-1" style={{ minWidth: 0 }}>
      <div className="flex items-start justify-between mb-2">
        <span style={{ fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </span>
        <span style={{ fontSize: 18, opacity: 0.7 }}>{icon}</span>
      </div>
      <div
        className="font-data font-bold"
        style={{ fontSize: 28, lineHeight: 1, color: color || "oklch(0.92 0.010 248)", marginBottom: 4 }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: "oklch(0.50 0.015 255)", fontFamily: "Inter" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function StatsBar({ students, allStudents }: Props) {
  const stats = useMemo(() => computeStats(students), [students]);
  const allStats = useMemo(() => computeStats(allStudents), [allStudents]);

  if (!stats || !allStats) return null;

  const isFiltered = students.length !== allStudents.length;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <StatCard
        label="Total Students"
        value={stats.total}
        sub={isFiltered ? `of ${allStats.total} total` : "in cohort"}
        icon="👥"
      />
      <StatCard
        label="At Risk (>65%)"
        value={stats.atRisk}
        sub={`${Math.round((stats.atRisk / stats.total) * 100)}% of cohort`}
        color="#f97316"
        icon="⚠️"
      />
      <StatCard
        label="Critical (>80%)"
        value={stats.critical}
        sub={`Immediate action needed`}
        color="#ef4444"
        icon="🚨"
      />
      <StatCard
        label="Predicted Dropout"
        value={stats.dropouts}
        sub={`${stats.graduates} Graduate · ${stats.enrolled} Enrolled`}
        color="#ef4444"
        icon="📉"
      />
      <StatCard
        label="Avg Risk Score"
        value={`${stats.avgRisk}%`}
        sub={`Cohort average`}
        color={stats.avgRisk > 50 ? "#f97316" : stats.avgRisk > 30 ? "#eab308" : "#22c55e"}
        icon="📊"
      />
      <StatCard
        label="Avg Attendance"
        value={`${stats.avgAttendance}%`}
        sub={`Avg GPA: ${stats.avgGPA}`}
        color={stats.avgAttendance >= 75 ? "#22c55e" : "#eab308"}
        icon="📅"
      />
    </div>
  );
}
