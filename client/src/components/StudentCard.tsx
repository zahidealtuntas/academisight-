// =============================================================================
// AcademiSight — Student Card Component
// Design: Neo-Institutional Data-Forward Dashboard
// Left border color = risk level indicator
// Monospace font for all numerical values
// =============================================================================

import type { Student } from "@/lib/types";
import {
  getRiskClass,
  getRiskLabel,
  getRiskLevel,
  getRiskColor,
  getOutcomeClass,
  getOutcomeIcon,
  getInitials,
  getAvatarColor,
  formatGPA,
} from "@/lib/utils";

interface Props {
  student: Student;
  index: number;
  onClick: (student: Student) => void;
}

export default function StudentCard({ student, index, onClick }: Props) {
  const riskLevel = getRiskLevel(student.risk_score);
  const riskColor = getRiskColor(student.risk_score);
  const avatarBg = getAvatarColor(student.id);
  const staggerClass = `card-stagger-${Math.min(index + 1, 12)}`;

  return (
    <div
      className={`student-card border-${riskLevel} animate-fade-in-up ${staggerClass}`}
      onClick={() => onClick(student)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(student); }}
      style={{ padding: "16px 18px 16px 22px" }}
    >
      {/* Top row: Avatar + Name + ID + Outcome badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: avatarBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: "white",
              fontFamily: "Inter",
              flexShrink: 0,
              border: `1.5px solid ${riskColor}33`,
            }}
          >
            {getInitials(student.name)}
          </div>
          <div>
            <div style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 14, color: "oklch(0.92 0.010 248)", lineHeight: 1.3 }}>
              {student.name}
            </div>
            <div className="font-data" style={{ fontSize: 10, color: "oklch(0.48 0.015 255)", marginTop: 1 }}>
              {student.id} · Age {student.age}
            </div>
          </div>
        </div>
        <span
          className={`risk-badge ${getOutcomeClass(student.predicted_outcome)}`}
          style={{ flexShrink: 0, fontSize: 10 }}
        >
          {getOutcomeIcon(student.predicted_outcome)} {student.predicted_outcome}
        </span>
      </div>

      {/* Risk score bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span style={{ fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Risk Score
          </span>
          <div className="flex items-center gap-2">
            <span
              className="font-data font-bold"
              style={{ fontSize: 16, color: riskColor, lineHeight: 1 }}
            >
              {student.risk_score}%
            </span>
            <span className={`risk-badge ${getRiskClass(student.risk_score)}`} style={{ fontSize: 9, padding: "1px 6px" }}>
              {getRiskLabel(student.risk_score)}
            </span>
          </div>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${student.risk_score}%`,
              background: `linear-gradient(90deg, ${riskColor}88, ${riskColor})`,
              boxShadow: `0 0 6px ${riskColor}44`,
            }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8,
        padding: "10px 0",
        borderTop: "1px solid oklch(1 0 0 / 6%)",
      }}>
        {/* Attendance */}
        <div className="flex flex-col items-center gap-1">
          <span style={{ fontSize: 9, color: "oklch(0.48 0.015 255)", fontFamily: "Inter", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Attend.
          </span>
          <span
            className="font-data font-bold"
            style={{
              fontSize: 15,
              color: student.attendance_rate >= 75 ? "#22c55e" : student.attendance_rate >= 60 ? "#eab308" : "#ef4444",
            }}
          >
            {student.attendance_rate}%
          </span>
        </div>

        {/* Midterm */}
        <div className="flex flex-col items-center gap-1" style={{ borderLeft: "1px solid oklch(1 0 0 / 6%)", borderRight: "1px solid oklch(1 0 0 / 6%)" }}>
          <span style={{ fontSize: 9, color: "oklch(0.48 0.015 255)", fontFamily: "Inter", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Midterm
          </span>
          <span
            className="font-data font-bold"
            style={{
              fontSize: 15,
              color: student.midterm_score >= 70 ? "#22c55e" : student.midterm_score >= 55 ? "#eab308" : "#ef4444",
            }}
          >
            {student.midterm_score}
          </span>
        </div>

        {/* GPA */}
        <div className="flex flex-col items-center gap-1">
          <span style={{ fontSize: 9, color: "oklch(0.48 0.015 255)", fontFamily: "Inter", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            GPA
          </span>
          <span
            className="font-data font-bold"
            style={{
              fontSize: 15,
              color: student.previous_gpa >= 3.0 ? "#22c55e" : student.previous_gpa >= 2.5 ? "#eab308" : "#ef4444",
            }}
          >
            {formatGPA(student.previous_gpa)}
          </span>
        </div>
      </div>

      {/* Bottom row: scholarship + part-time job tags */}
      <div className="flex items-center gap-2 mt-2" style={{ flexWrap: "wrap" }}>
        {student.scholarship && (
          <span className="risk-badge outcome-graduate" style={{ fontSize: 9, padding: "1px 6px" }}>
            🎓 {student.scholarship_type}
          </span>
        )}
        {student.part_time_job && (
          <span className="risk-badge risk-medium" style={{ fontSize: 9, padding: "1px 6px" }}>
            💼 Part-time Job
          </span>
        )}
        {student.extracurricular && (
          <span className="risk-badge outcome-enrolled" style={{ fontSize: 9, padding: "1px 6px" }}>
            ⭐ Extracurricular
          </span>
        )}
        {student.risk_factors.length > 0 && (
          <span className="risk-badge risk-critical" style={{ fontSize: 9, padding: "1px 6px", marginLeft: "auto" }}>
            {student.risk_factors.length} risk factor{student.risk_factors.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}
