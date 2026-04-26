// =============================================================================
// AcademiSight — Filter Panel
// Design: Neo-Institutional Data-Forward Dashboard
// Complex multi-criteria filtering for student risk data
// =============================================================================

import { useState } from "react";
import type { FilterState } from "@/lib/types";

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
  totalCount: number;
}

export default function FilterPanel({ filters, onChange, resultCount, totalCount }: Props) {
  const [expanded, setExpanded] = useState(true);

  const update = (key: keyof FilterState, value: string | number) => {
    onChange({ ...filters, [key]: value });
  };

  const reset = () => {
    onChange({
      search: "",
      gender: "all",
      scholarship: "all",
      predicted_outcome: "all",
      parental_education: "all",
      min_risk_score: 0,
      max_risk_score: 100,
      min_attendance: 0,
      sort_by: "risk_score",
      sort_dir: "desc",
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.gender !== "all" ||
    filters.scholarship !== "all" ||
    filters.predicted_outcome !== "all" ||
    filters.parental_education !== "all" ||
    filters.min_risk_score > 0 ||
    filters.max_risk_score < 100 ||
    filters.min_attendance > 0;

  return (
    <div
      style={{
        background: "oklch(0.165 0.025 255)",
        border: "1px solid oklch(1 0 0 / 8%)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: expanded ? "1px solid oklch(1 0 0 / 8%)" : "none",
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 13, fontFamily: "Inter", fontWeight: 600, color: "oklch(0.85 0.010 248)" }}>
            Filters & Sort
          </span>
          {hasActiveFilters && (
            <span
              style={{
                fontSize: 10,
                fontFamily: "JetBrains Mono",
                fontWeight: 700,
                padding: "2px 8px",
                background: "oklch(0.62 0.19 255 / 20%)",
                color: "oklch(0.78 0.15 255)",
                borderRadius: 4,
                border: "1px solid oklch(0.62 0.19 255 / 30%)",
              }}
            >
              ACTIVE
            </span>
          )}
          <span style={{ fontSize: 11, color: "oklch(0.50 0.015 255)", fontFamily: "JetBrains Mono" }}>
            {resultCount}/{totalCount} students
          </span>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={(e) => { e.stopPropagation(); reset(); }}
              style={{
                fontSize: 11,
                fontFamily: "Inter",
                color: "oklch(0.58 0.22 25)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px 6px",
              }}
            >
              Reset
            </button>
          )}
          <span style={{ color: "oklch(0.50 0.015 255)", fontSize: 14 }}>
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {/* Filter body */}
      {expanded && (
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Search */}
          <div>
            <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
              Search
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "oklch(0.45 0.015 255)", fontSize: 13 }}>
                🔍
              </span>
              <input
                type="text"
                className="search-input"
                style={{ paddingLeft: 30 }}
                placeholder="Name, ID, or outcome..."
                value={filters.search}
                onChange={(e) => update("search", e.target.value)}
              />
            </div>
          </div>

          {/* Row 1: Gender + Scholarship + Outcome */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                Gender
              </label>
              <select
                className="filter-select"
                value={filters.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                <option value="all">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                Scholarship
              </label>
              <select
                className="filter-select"
                value={filters.scholarship}
                onChange={(e) => update("scholarship", e.target.value)}
              >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                Outcome
              </label>
              <select
                className="filter-select"
                value={filters.predicted_outcome}
                onChange={(e) => update("predicted_outcome", e.target.value)}
              >
                <option value="all">All</option>
                <option value="Graduate">Graduate</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Dropout">Dropout</option>
              </select>
            </div>
          </div>

          {/* Row 2: Parental Education + Sort */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                Parental Education
              </label>
              <select
                className="filter-select"
                value={filters.parental_education}
                onChange={(e) => update("parental_education", e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="Primary School">Primary School</option>
                <option value="High School">High School</option>
                <option value="University">University</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                Sort By
              </label>
              <div style={{ display: "flex", gap: 6 }}>
                <select
                  className="filter-select"
                  style={{ flex: 1 }}
                  value={filters.sort_by}
                  onChange={(e) => update("sort_by", e.target.value)}
                >
                  <option value="risk_score">Risk Score</option>
                  <option value="name">Name</option>
                  <option value="attendance">Attendance</option>
                  <option value="gpa">GPA</option>
                  <option value="midterm">Midterm</option>
                </select>
                <button
                  onClick={() => update("sort_dir", filters.sort_dir === "asc" ? "desc" : "asc")}
                  style={{
                    padding: "7px 10px",
                    background: "oklch(0.20 0.025 255)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    borderRadius: 8,
                    color: "oklch(0.78 0.010 248)",
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    flexShrink: 0,
                  }}
                  title={filters.sort_dir === "asc" ? "Ascending" : "Descending"}
                >
                  {filters.sort_dir === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>

          {/* Risk Score Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label style={{ fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Risk Score Range
              </label>
              <span className="font-data" style={{ fontSize: 11, color: "oklch(0.72 0.15 255)" }}>
                {filters.min_risk_score}% — {filters.max_risk_score}%
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="range"
                className="risk-slider"
                min={0}
                max={100}
                value={filters.min_risk_score}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val <= filters.max_risk_score) update("min_risk_score", val);
                }}
              />
              <input
                type="range"
                className="risk-slider"
                min={0}
                max={100}
                value={filters.max_risk_score}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= filters.min_risk_score) update("max_risk_score", val);
                }}
              />
            </div>
          </div>

          {/* Min Attendance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label style={{ fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Min. Attendance
              </label>
              <span className="font-data" style={{ fontSize: 11, color: "oklch(0.72 0.15 255)" }}>
                ≥ {filters.min_attendance}%
              </span>
            </div>
            <input
              type="range"
              className="risk-slider"
              min={0}
              max={100}
              value={filters.min_attendance}
              onChange={(e) => update("min_attendance", parseInt(e.target.value))}
            />
          </div>

          {/* Quick filter presets */}
          <div>
            <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              Quick Presets
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { label: "Critical Risk", fn: () => onChange({ ...filters, min_risk_score: 81, max_risk_score: 100, predicted_outcome: "all" }) },
                { label: "Scholarship + High Risk", fn: () => onChange({ ...filters, scholarship: "yes", min_risk_score: 70, max_risk_score: 100 }) },
                { label: "Low Attendance (<60%)", fn: () => onChange({ ...filters, min_attendance: 0, max_risk_score: 100 }) },
                { label: "Predicted Dropout", fn: () => onChange({ ...filters, predicted_outcome: "Dropout" }) },
                { label: "Top Performers", fn: () => onChange({ ...filters, min_risk_score: 0, max_risk_score: 20, predicted_outcome: "Graduate" }) },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={preset.fn}
                  style={{
                    fontSize: 10,
                    fontFamily: "Inter",
                    fontWeight: 500,
                    padding: "4px 10px",
                    background: "oklch(0.22 0.028 255)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    borderRadius: 6,
                    color: "oklch(0.72 0.010 248)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.62 0.19 255 / 15%)";
                    (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.78 0.15 255)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.62 0.19 255 / 30%)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.22 0.028 255)";
                    (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.72 0.010 248)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(1 0 0 / 10%)";
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
