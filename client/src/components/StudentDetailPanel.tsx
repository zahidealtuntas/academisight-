// =============================================================================
// AcademiSight — Student Detail Panel (Slide-over)
// Design: Neo-Institutional Data-Forward Dashboard
// Shows full student profile with risk factor breakdown + intervention log
// =============================================================================

import { useEffect, useRef, useState } from "react";
import type { Student } from "@/lib/types";
import { useInterventions } from "@/hooks/useInterventions";
import InterventionLog from "./InterventionLog";
import {
  getRiskClass,
  getRiskLabel,
  getRiskColor,
  getOutcomeClass,
  getOutcomeIcon,
  getInitials,
  getAvatarColor,
  formatGPA,
} from "@/lib/utils";

interface Props {
  student: Student | null;
  onClose: () => void;
}

function RiskGauge({ score }: { score: number }) {
  const radius = 52;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = (score / 100) * circumference;
  const color = getRiskColor(score);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: 120, height: 120 }}>
        <svg width={120} height={120} viewBox="0 0 120 120">
          <circle
            cx={60} cy={60} r={normalizedRadius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          <circle
            cx={60} cy={60} r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${progress} ${circumference - progress}`}
            strokeDashoffset={circumference * 0.25}
            style={{ filter: `drop-shadow(0 0 8px ${color}88)`, transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-data font-bold leading-none"
            style={{ fontSize: 28, color }}
          >
            {score}
          </span>
          <span style={{ fontSize: 11, color: "oklch(0.55 0.015 255)", fontFamily: "Inter", fontWeight: 500 }}>
            RISK %
          </span>
        </div>
      </div>
      <span
        className={`risk-badge ${getRiskClass(score)}`}
        style={{ fontSize: 11 }}
      >
        {getRiskLabel(score)}
      </span>
    </div>
  );
}

function MetricBar({ label, value, max = 100, color }: {
  label: string;
  value: number;
  max?: number;
  color: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 11, color: "oklch(0.55 0.015 255)", fontFamily: "Inter", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
        <span className="font-data font-bold" style={{ fontSize: 13, color: "oklch(0.92 0.010 248)" }}>
          {value}{max === 100 ? "%" : max === 4 ? "" : ""}
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function StudentDetailPanel({ student, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "interventions">("overview");
  const { getStudentInterventions, addIntervention, updateIntervention, deleteIntervention } = useInterventions();
  const studentInterventions = student ? getStudentInterventions(student.id) : [];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!student) return null;

  const riskColor = getRiskColor(student.risk_score);
  const avatarBg = getAvatarColor(student.id);

  return (
    <>
      {/* Overlay */}
      <div className="detail-overlay" onClick={onClose} />

      {/* Panel */}
      <div className="detail-panel" ref={panelRef}>
        {/* Header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid oklch(1 0 0 / 8%)",
            background: "oklch(0.12 0.020 255)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: avatarBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "Inter",
                  flexShrink: 0,
                  border: `2px solid ${riskColor}44`,
                }}
              >
                {getInitials(student.name)}
              </div>
              <div>
                <h2 style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 20, color: "oklch(0.95 0.008 248)", marginBottom: 2 }}>
                  {student.name}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="font-data" style={{ fontSize: 11, color: "oklch(0.50 0.015 255)" }}>
                    {student.id}
                  </span>
                  <span style={{ color: "oklch(0.30 0.02 255)" }}>·</span>
                  <span style={{ fontSize: 11, color: "oklch(0.55 0.015 255)", fontFamily: "Inter" }}>
                    Age {student.age}
                  </span>
                  <span style={{ color: "oklch(0.30 0.02 255)" }}>·</span>
                  <span style={{ fontSize: 11, color: "oklch(0.55 0.015 255)", fontFamily: "Inter" }}>
                    {student.gender}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                background: "oklch(1 0 0 / 8%)",
                border: "1px solid oklch(1 0 0 / 10%)",
                color: "oklch(0.60 0.015 255)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 14%)";
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.92 0.010 248)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 8%)";
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.60 0.015 255)";
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 24, overflowY: "auto", height: "calc(100% - 120px)" }}>

          {/* Risk Gauge + Outcome */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            background: "oklch(0.165 0.025 255)",
            borderRadius: 10,
            padding: "20px 24px",
            border: "1px solid oklch(1 0 0 / 8%)",
          }}>
            <RiskGauge score={student.risk_score} />
            <div style={{ width: 1, height: 80, background: "oklch(1 0 0 / 8%)" }} />
            <div className="flex flex-col items-center gap-3">
              <span style={{ fontSize: 11, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Predicted Outcome
              </span>
              <span
                className={`risk-badge ${getOutcomeClass(student.predicted_outcome)}`}
                style={{ fontSize: 14, padding: "6px 14px" }}
              >
                {getOutcomeIcon(student.predicted_outcome)} {student.predicted_outcome}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
            <button
              onClick={() => setActiveTab("overview")}
              style={{
                padding: "8px 14px",
                background: activeTab === "overview" ? "oklch(0.62 0.19 255 / 15%)" : "none",
                border: activeTab === "overview" ? "1px solid oklch(0.62 0.19 255 / 25%)" : "none",
                borderRadius: "6px 6px 0 0",
                color: activeTab === "overview" ? "oklch(0.78 0.15 255)" : "oklch(0.55 0.015 255)",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("interventions")}
              style={{
                padding: "8px 14px",
                background: activeTab === "interventions" ? "oklch(0.62 0.19 255 / 15%)" : "none",
                border: activeTab === "interventions" ? "1px solid oklch(0.62 0.19 255 / 25%)" : "none",
                borderRadius: "6px 6px 0 0",
                color: activeTab === "interventions" ? "oklch(0.78 0.15 255)" : "oklch(0.55 0.015 255)",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              Interventions ({studentInterventions.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <>
              {/* Academic Metrics */}
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 15, color: "oklch(0.80 0.010 248)", marginBottom: 14 }}>
                  Academic Performance
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <MetricBar label="Attendance Rate" value={student.attendance_rate} color={
                    student.attendance_rate >= 80 ? "#22c55e" :
                    student.attendance_rate >= 65 ? "#eab308" : "#ef4444"
                  } />
                  <MetricBar label="Midterm Score" value={student.midterm_score} color={
                    student.midterm_score >= 70 ? "#22c55e" :
                    student.midterm_score >= 55 ? "#eab308" : "#ef4444"
                  } />
                  <MetricBar label="Assignment Completion" value={student.assignment_completion} color={
                    student.assignment_completion >= 80 ? "#22c55e" :
                    student.assignment_completion >= 60 ? "#eab308" : "#ef4444"
                  } />
                </div>
              </div>

              {/* Numeric Data Table */}
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 15, color: "oklch(0.80 0.010 248)", marginBottom: 14 }}>
                  Key Indicators
                </h3>
                <table className="data-table" style={{ background: "oklch(0.165 0.025 255)", borderRadius: 8, overflow: "hidden" }}>
                  <tbody>
                    <tr>
                      <td style={{ color: "oklch(0.55 0.015 255)", fontFamily: "Inter", fontSize: 12 }}>Previous GPA</td>
                      <td className="font-data" style={{ fontWeight: 700, textAlign: "right", color: student.previous_gpa >= 3.0 ? "#22c55e" : student.previous_gpa >= 2.5 ? "#eab308" : "#ef4444" }}>
                        {formatGPA(student.previous_gpa)} / 4.00
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "oklch(0.55 0.015 255)", fontFamily: "Inter", fontSize: 12 }}>Distance from Campus</td>
                      <td className="font-data" style={{ fontWeight: 700, textAlign: "right" }}>
                        {student.distance_from_campus_km} km
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "oklch(0.55 0.015 255)", fontFamily: "Inter", fontSize: 12 }}>Scholarship</td>
                      <td style={{ textAlign: "right" }}>
                        {student.scholarship ? (
                          <span className="risk-badge outcome-graduate">{student.scholarship_type}</span>
                        ) : (
                          <span className="risk-badge" style={{ color: "oklch(0.55 0.015 255)", background: "oklch(1 0 0 / 5%)", border: "1px solid oklch(1 0 0 / 10%)" }}>None</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "oklch(0.55 0.015 255)", fontFamily: "Inter", fontSize: 12 }}>Parental Education</td>
                      <td className="font-data" style={{ fontWeight: 500, textAlign: "right", fontSize: 12 }}>
                        {student.parental_education}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "oklch(0.55 0.015 255)", fontFamily: "Inter", fontSize: 12 }}>Part-time Job</td>
                      <td style={{ textAlign: "right" }}>
                        <span className={`risk-badge ${student.part_time_job ? "risk-medium" : "outcome-graduate"}`}>
                          {student.part_time_job ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: "oklch(0.55 0.015 255)", fontFamily: "Inter", fontSize: 12 }}>Extracurricular</td>
                      <td style={{ textAlign: "right" }}>
                        <span className={`risk-badge ${student.extracurricular ? "outcome-graduate" : "risk-low"}`}>
                          {student.extracurricular ? "Active" : "None"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Risk Factors */}
              {student.risk_factors.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 15, color: "oklch(0.80 0.010 248)", marginBottom: 14 }}>
                    Contributing Risk Factors
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {student.risk_factors.map((factor, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          padding: "10px 14px",
                          background: "oklch(0.58 0.22 25 / 8%)",
                          border: "1px solid oklch(0.58 0.22 25 / 20%)",
                          borderRadius: 8,
                        }}
                      >
                        <span style={{ color: "#ef4444", fontSize: 14, flexShrink: 0, marginTop: 1 }}>⚠</span>
                        <span style={{ fontSize: 13, color: "oklch(0.85 0.010 248)", fontFamily: "Inter", lineHeight: 1.4 }}>
                          {factor}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Notes */}
              {student.notes && (
                <div>
                  <h3 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 15, color: "oklch(0.80 0.010 248)", marginBottom: 10 }}>
                    Instructor Notes
                  </h3>
                  <div style={{
                    padding: "12px 16px",
                    background: "oklch(0.62 0.19 255 / 8%)",
                    border: "1px solid oklch(0.62 0.19 255 / 20%)",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "oklch(0.80 0.010 248)",
                    fontFamily: "Inter",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}>
                    "{student.notes}"
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "interventions" && (
            <InterventionLog
              studentId={student.id}
              studentName={student.name}
              interventions={studentInterventions}
              onAdd={(intervention) => addIntervention(intervention)}
              onUpdate={updateIntervention}
              onDelete={deleteIntervention}
            />
          )}

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
            <button
              style={{
                flex: 1,
                padding: "10px 16px",
                background: "oklch(0.62 0.19 255)",
                border: "none",
                borderRadius: 8,
                color: "white",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.55 0.19 255)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.62 0.19 255)"; }}
              onClick={() => { setActiveTab("interventions"); }}
            >
              + Log Intervention
            </button>
            <button
              style={{
                flex: 1,
                padding: "10px 16px",
                background: "oklch(1 0 0 / 8%)",
                border: "1px solid oklch(1 0 0 / 12%)",
                borderRadius: 8,
                color: "oklch(0.78 0.010 248)",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 14%)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "oklch(1 0 0 / 8%)"; }}
              onClick={() => { alert(`Sending email to ${student.name}`); }}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
