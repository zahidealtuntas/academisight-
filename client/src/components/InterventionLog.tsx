// =============================================================================
// AcademiSight — Intervention Log Component
// Design: Neo-Institutional Data-Forward Dashboard
// Shows all interventions for a student with add/edit/delete functionality
// =============================================================================

import { useState } from "react";
import type { Intervention, InterventionType } from "@/lib/types";

interface Props {
  studentId: string;
  studentName: string;
  interventions: Intervention[];
  onAdd: (intervention: Omit<Intervention, "id">) => void;
  onUpdate: (id: string, updates: Partial<Intervention>) => void;
  onDelete: (id: string) => void;
}

const INTERVENTION_TYPES: InterventionType[] = ["Email", "Meeting", "Tutoring", "Counseling", "Warning", "Other"];

const OUTCOME_COLORS: Record<string, string> = {
  Positive: "#22c55e",
  Neutral: "#eab308",
  Negative: "#ef4444",
  Pending: "#3b82f6",
};

const INTERVENTION_ICONS: Record<InterventionType, string> = {
  Email: "✉",
  Meeting: "👤",
  Tutoring: "📚",
  Counseling: "💬",
  Warning: "⚠",
  Other: "◆",
};

export default function InterventionLog({
  studentId,
  studentName,
  interventions,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Intervention, "id">>({
    student_id: studentId,
    type: "Email",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    outcome: "Pending",
    instructor_name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.notes.trim()) return;

    if (editingId) {
      onUpdate(editingId, formData);
      setEditingId(null);
    } else {
      onAdd(formData);
    }
    setFormData({
      student_id: studentId,
      type: "Email",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      outcome: "Pending",
      instructor_name: "",
    });
    setShowForm(false);
  };

  const handleEdit = (intervention: Intervention) => {
    setFormData(intervention);
    setEditingId(intervention.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      student_id: studentId,
      type: "Email",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      outcome: "Pending",
      instructor_name: "",
    });
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("tr-TR", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 15, color: "oklch(0.80 0.010 248)" }}>
          Intervention Log
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "6px 12px",
            background: showForm ? "oklch(1 0 0 / 8%)" : "oklch(0.62 0.19 255)",
            border: showForm ? "1px solid oklch(1 0 0 / 12%)" : "none",
            borderRadius: 6,
            color: showForm ? "oklch(0.78 0.010 248)" : "white",
            fontFamily: "Inter",
            fontWeight: 600,
            fontSize: 12,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {showForm ? "Cancel" : "+ Add Intervention"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "14px 16px",
            background: "oklch(0.22 0.028 255)",
            border: "1px solid oklch(0.62 0.19 255 / 25%)",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Row 1: Type + Date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
                Type
              </label>
              <select
                className="filter-select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as InterventionType })}
              >
                {INTERVENTION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
                Date
              </label>
              <input
                type="date"
                className="search-input"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Row 2: Outcome + Instructor */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
                Outcome
              </label>
              <select
                className="filter-select"
                value={formData.outcome || "Pending"}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value as "Positive" | "Neutral" | "Negative" | "Pending" })}
              >
                <option value="Pending">Pending</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
                Instructor Name
              </label>
              <input
                type="text"
                className="search-input"
                placeholder="Your name (optional)"
                value={formData.instructor_name || ""}
                onChange={(e) => setFormData({ ...formData, instructor_name: e.target.value })}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
              Notes
            </label>
            <textarea
              className="search-input"
              style={{ minHeight: 60, fontFamily: "Inter", resize: "vertical" }}
              placeholder="Describe the intervention and its details..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              required
            />
          </div>

          {/* Follow-up Date */}
          <div>
            <label style={{ display: "block", fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>
              Follow-up Date (optional)
            </label>
            <input
              type="date"
              className="search-input"
              value={formData.follow_up_date || ""}
              onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value || undefined })}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "7px 14px",
                background: "oklch(1 0 0 / 8%)",
                border: "1px solid oklch(1 0 0 / 12%)",
                borderRadius: 6,
                color: "oklch(0.65 0.010 248)",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "7px 14px",
                background: "oklch(0.62 0.19 255)",
                border: "none",
                borderRadius: 6,
                color: "white",
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {editingId ? "Update" : "Add"} Intervention
            </button>
          </div>
        </form>
      )}

      {/* Interventions List */}
      {interventions.length === 0 ? (
        <div style={{
          padding: "20px",
          textAlign: "center",
          background: "oklch(0.165 0.025 255)",
          borderRadius: 8,
          border: "1px solid oklch(1 0 0 / 6%)",
        }}>
          <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.5 }}>◌</div>
          <div style={{ fontFamily: "Inter", fontSize: 12, color: "oklch(0.50 0.015 255)" }}>
            No interventions recorded yet
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {interventions.map((intervention) => (
            <div
              key={intervention.id}
              style={{
                padding: "12px 14px",
                background: "oklch(0.165 0.025 255)",
                border: "1px solid oklch(1 0 0 / 8%)",
                borderRadius: 8,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "oklch(0.22 0.028 255)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {INTERVENTION_ICONS[intervention.type]}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 12, color: "oklch(0.85 0.010 248)" }}>
                    {intervention.type}
                  </span>
                  <span className="risk-badge" style={{ fontSize: 9, padding: "1px 6px", background: `${OUTCOME_COLORS[intervention.outcome || "Pending"]}22`, color: OUTCOME_COLORS[intervention.outcome || "Pending"], border: `1px solid ${OUTCOME_COLORS[intervention.outcome || "Pending"]}44` }}>
                    {intervention.outcome || "Pending"}
                  </span>
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.45 0.015 255)", marginLeft: "auto" }}>
                    {formatDate(intervention.date)}
                  </span>
                </div>

                <div style={{ fontFamily: "Inter", fontSize: 11, color: "oklch(0.75 0.010 248)", lineHeight: 1.4, marginBottom: 6 }}>
                  {intervention.notes}
                </div>

                <div style={{ display: "flex", gap: 12, fontSize: 10, color: "oklch(0.50 0.015 255)" }}>
                  {intervention.instructor_name && (
                    <span>By <strong>{intervention.instructor_name}</strong></span>
                  )}
                  {intervention.follow_up_date && (
                    <span>Follow-up: <strong>{formatDate(intervention.follow_up_date)}</strong></span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => handleEdit(intervention)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    background: "oklch(1 0 0 / 8%)",
                    border: "1px solid oklch(1 0 0 / 10%)",
                    color: "oklch(0.62 0.19 255)",
                    cursor: "pointer",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                  }}
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  onClick={() => onDelete(intervention.id)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    background: "oklch(0.58 0.22 25 / 15%)",
                    border: "1px solid oklch(0.58 0.22 25 / 20%)",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                  }}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
