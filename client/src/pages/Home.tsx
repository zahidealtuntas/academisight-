// =============================================================================
// AcademiSight — Main Dashboard Page
// Design: Neo-Institutional Data-Forward Dashboard
// Layout: Fixed left sidebar + scrollable main content
// =============================================================================

import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import type { Student, DataFile, FilterState } from "@/lib/types";
import { filterStudents } from "@/lib/utils";
import StatsBar from "@/components/StatsBar";
import RiskChart from "@/components/RiskChart";
import StudentCard from "@/components/StudentCard";
import FilterPanel from "@/components/FilterPanel";
import StudentDetailPanel from "@/components/StudentDetailPanel";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663600599449/24Wy6MYVPVSV7LteNfF3tv/dashboard-hero-YqY7hTyYTtzYYaVJGzPVMC.webp";

const DEFAULT_FILTERS: FilterState = {
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
};

// Sidebar navigation items
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },
  { id: "styleguide", label: "Style Guide", icon: "◻" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [data, setData] = useState<DataFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load data
  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((d: DataFile) => { setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load student data."); setLoading(false); });
  }, []);

  const allStudents = useMemo(() => data?.students ?? [], [data]);
  const filteredStudents = useMemo(() => filterStudents(allStudents, filters), [allStudents, filters]);

  const handleCardClick = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedStudent(null);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    if (id === "styleguide") setLocation("/style-guide");
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.118 0.022 255)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 13, color: "oklch(0.62 0.19 255)", marginBottom: 12, letterSpacing: "0.1em" }}>
            LOADING DATA
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "oklch(0.62 0.19 255)",
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.118 0.022 255)" }}>
        <div style={{ color: "#ef4444", fontFamily: "Inter", fontSize: 14 }}>{error}</div>
      </div>
    );
  }

  const meta = data?.metadata;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "oklch(0.118 0.022 255)" }}>

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: sidebarCollapsed ? 60 : 240,
          flexShrink: 0,
          background: "oklch(0.10 0.020 255)",
          borderRight: "1px solid oklch(1 0 0 / 8%)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          transition: "width 0.25s ease",
          zIndex: 10,
        }}
      >
        {/* Logo area */}
        <div
          style={{
            padding: sidebarCollapsed ? "20px 0" : "20px 20px",
            borderBottom: "1px solid oklch(1 0 0 / 8%)",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarCollapsed ? "center" : "space-between",
            gap: 10,
          }}
        >
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 17, color: "oklch(0.95 0.008 248)", lineHeight: 1.2 }}>
                AcademiSight
              </div>
              <div style={{ fontFamily: "Inter", fontSize: 10, color: "oklch(0.48 0.015 255)", marginTop: 2 }}>
                Risk Decision Support
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 18, color: "oklch(0.62 0.19 255)" }}>A</div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              width: 24, height: 24,
              background: "none",
              border: "none",
              color: "oklch(0.45 0.015 255)",
              cursor: "pointer",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {sidebarCollapsed ? "»" : "«"}
          </button>
        </div>

        {/* Institution info */}
        {!sidebarCollapsed && meta && (
          <div style={{ padding: "12px 20px", borderBottom: "1px solid oklch(1 0 0 / 6%)" }}>
            <div style={{ fontFamily: "Inter", fontSize: 11, color: "oklch(0.55 0.015 255)", lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600, color: "oklch(0.70 0.010 248)", marginBottom: 2 }}>{meta.institution}</div>
              <div>{meta.department}</div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.45 0.015 255)", marginTop: 4 }}>
                {meta.semester}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              style={{ width: "100%", justifyContent: sidebarCollapsed ? "center" : "flex-start", border: activeNav === item.id ? undefined : "1px solid transparent" }}
              onClick={() => handleNavClick(item.id)}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom: risk legend */}
        {!sidebarCollapsed && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid oklch(1 0 0 / 8%)" }}>
            <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 9, color: "oklch(0.40 0.015 255)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Risk Legend
            </div>
            {[
              { label: "Critical", color: "#ef4444", range: ">80%" },
              { label: "High",     color: "#f97316", range: "65–80%" },
              { label: "Medium",   color: "#eab308", range: "45–65%" },
              { label: "Low",      color: "#22c55e", range: "20–45%" },
              { label: "Safe",     color: "#10b981", range: "<20%" },
            ].map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "Inter", fontSize: 11, color: "oklch(0.60 0.015 255)", flex: 1 }}>{r.label}</span>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.40 0.015 255)" }}>{r.range}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "auto" }}>

        {/* Hero Banner */}
        <div
          style={{
            position: "relative",
            height: 160,
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            flexShrink: 0,
          }}
        >
          {/* Gradient overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, oklch(0.10 0.020 255) 0%, oklch(0.10 0.020 255 / 80%) 40%, oklch(0.10 0.020 255 / 40%) 100%)",
          }} />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, oklch(0.118 0.022 255) 0%, transparent 60%)",
          }} />
          {/* Content */}
          <div style={{ position: "relative", padding: "28px 32px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 26, color: "oklch(0.97 0.005 248)", marginBottom: 4, lineHeight: 1.2 }}>
                  Student Risk Dashboard
                </h1>
                <p style={{ fontFamily: "Inter", fontSize: 13, color: "oklch(0.65 0.012 255)", lineHeight: 1.4 }}>
                  AI-powered dropout prediction · {meta?.semester} · {allStudents.length} students monitored
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.45 0.015 255)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Generated</div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "oklch(0.62 0.19 255)", fontWeight: 600 }}>{meta?.generated}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* KPI Stats Bar */}
          <StatsBar students={filteredStudents} allStudents={allStudents} />

          {/* Charts */}
          <RiskChart students={filteredStudents} />

          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            resultCount={filteredStudents.length}
            totalCount={allStudents.length}
          />

          {/* Results header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 18, color: "oklch(0.88 0.010 248)" }}>
                Student Roster
              </h2>
              <p style={{ fontFamily: "Inter", fontSize: 12, color: "oklch(0.50 0.015 255)", marginTop: 2 }}>
                Showing <span className="font-data" style={{ color: "oklch(0.78 0.15 255)", fontWeight: 700 }}>{filteredStudents.length}</span> of {allStudents.length} students
                {filters.sort_by && (
                  <> · Sorted by <span style={{ color: "oklch(0.70 0.010 248)" }}>{filters.sort_by.replace("_", " ")}</span> {filters.sort_dir === "desc" ? "↓" : "↑"}</>
                )}
              </p>
            </div>
            {/* View toggle placeholder */}
            <div style={{ display: "flex", gap: 4 }}>
              <button
                style={{ padding: "6px 10px", background: "oklch(0.62 0.19 255 / 15%)", border: "1px solid oklch(0.62 0.19 255 / 25%)", borderRadius: 6, color: "oklch(0.78 0.15 255)", fontSize: 13, cursor: "pointer" }}
                title="Grid view"
              >
                ⊞
              </button>
              <button
                style={{ padding: "6px 10px", background: "oklch(1 0 0 / 6%)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 6, color: "oklch(0.55 0.015 255)", fontSize: 13, cursor: "pointer" }}
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Student Cards Grid */}
          {filteredStudents.length === 0 ? (
            <div style={{
              padding: "60px 0",
              textAlign: "center",
              color: "oklch(0.45 0.015 255)",
              fontFamily: "Inter",
              fontSize: 14,
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>◌</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>No students match your filters</div>
              <div style={{ fontSize: 12 }}>Try adjusting the filter criteria above</div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 14,
              }}
            >
              {filteredStudents.map((student, index) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  index={index}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{ paddingTop: 20, borderTop: "1px solid oklch(1 0 0 / 6%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Inter", fontSize: 11, color: "oklch(0.38 0.015 255)" }}>
              AcademiSight v1.0 · {meta?.institution} · {meta?.department}
            </span>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.35 0.015 255)" }}>
              DSS · AI Risk Prediction Engine
            </span>
          </div>
        </div>
      </main>

      {/* ── Detail Panel ─────────────────────────────────────────────────────── */}
      {selectedStudent && (
        <StudentDetailPanel
          student={selectedStudent}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}
