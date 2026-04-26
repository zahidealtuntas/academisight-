// =============================================================================
// AcademiSight — UI Style Guide Page
// Showcases: HEX codes, font scales, atomic components
// Design: Neo-Institutional Data-Forward Dashboard
// =============================================================================

import { useLocation } from "wouter";

export default function StyleGuide() {
  const [, setLocation] = useLocation();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "oklch(0.118 0.022 255)" }}>
      {/* Sidebar stub */}
      <aside style={{
        width: 240,
        flexShrink: 0,
        background: "oklch(0.10 0.020 255)",
        borderRight: "1px solid oklch(1 0 0 / 8%)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}>
        <div style={{ padding: "20px 20px", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
          <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 17, color: "oklch(0.95 0.008 248)" }}>AcademiSight</div>
          <div style={{ fontFamily: "Inter", fontSize: 10, color: "oklch(0.48 0.015 255)", marginTop: 2 }}>Risk Decision Support</div>
        </div>
        <nav style={{ padding: "12px 10px" }}>
          <button
            className="nav-item"
            style={{ width: "100%", border: "1px solid transparent" }}
            onClick={() => setLocation("/")}
          >
            <span style={{ fontSize: 16 }}>◈</span>
            <span>Dashboard</span>
          </button>
          <button
            className="nav-item active"
            style={{ width: "100%" }}
            onClick={() => {}}
          >
            <span style={{ fontSize: 16 }}>◻</span>
            <span>Style Guide</span>
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px 40px", maxWidth: 900 }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <button
                onClick={() => setLocation("/")}
                style={{ fontFamily: "Inter", fontSize: 12, color: "oklch(0.62 0.19 255)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                ← Back to Dashboard
              </button>
            </div>
            <h1 style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 30, color: "oklch(0.95 0.008 248)", marginBottom: 8 }}>
              UI Style Guide
            </h1>
            <p style={{ fontFamily: "Inter", fontSize: 14, color: "oklch(0.60 0.015 255)", lineHeight: 1.6, maxWidth: 600 }}>
              Design system documentation for the <strong style={{ color: "oklch(0.78 0.010 248)" }}>AcademiSight</strong> Student Risk Decision Support System.
              Philosophy: <em>Neo-Institutional Data-Forward Dashboard</em>.
            </p>
          </div>

          {/* Section: Color System */}
          <section style={{ marginBottom: 48 }}>
            <SectionHeader title="Color System" number="01" />

            <SubHeader title="Base Palette" />
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
              {[
                { name: "Background", hex: "#0F1629", oklch: "oklch(0.118 0.022 255)", desc: "Deep Navy — Authority" },
                { name: "Card Surface", hex: "#1A2340", oklch: "oklch(0.165 0.025 255)", desc: "Elevated Navy" },
                { name: "Sidebar", hex: "#0A1020", oklch: "oklch(0.10 0.020 255)", desc: "Deepest Navy" },
                { name: "Primary Blue", hex: "#3B82F6", oklch: "oklch(0.62 0.19 255)", desc: "Electric Blue" },
                { name: "Foreground", hex: "#EEF2F8", oklch: "oklch(0.945 0.008 248)", desc: "Near-white text" },
                { name: "Muted Text", hex: "#6B7A99", oklch: "oklch(0.55 0.015 255)", desc: "Secondary labels" },
              ].map((c) => (
                <ColorSwatch key={c.name} {...c} />
              ))}
            </div>

            <SubHeader title="Semantic Risk Colors" />
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[
                { name: "Critical", hex: "#EF4444", range: ">80%", desc: "Immediate intervention" },
                { name: "High Risk", hex: "#F97316", range: "65–80%", desc: "Urgent attention" },
                { name: "Medium", hex: "#EAB308", range: "45–65%", desc: "Monitor closely" },
                { name: "Low Risk", hex: "#22C55E", range: "20–45%", desc: "Minor concerns" },
                { name: "Safe", hex: "#10B981", range: "<20%", desc: "On track" },
              ].map((c) => (
                <div key={c.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{
                    width: 90, height: 64, borderRadius: 8,
                    background: c.hex + "22",
                    border: `1px solid ${c.hex}55`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: c.hex, boxShadow: `0 0 12px ${c.hex}66` }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 12, color: "oklch(0.85 0.010 248)" }}>{c.name}</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.55 0.015 255)" }}>{c.hex}</div>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.45 0.015 255)" }}>{c.range}</div>
                    <div style={{ fontFamily: "Inter", fontSize: 10, color: "oklch(0.42 0.015 255)" }}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Typography */}
          <section style={{ marginBottom: 48 }}>
            <SectionHeader title="Typography Scale" number="02" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  tag: "H1", font: "Playfair Display Bold", size: "28px / 700",
                  sample: "Student Risk Dashboard",
                  style: { fontFamily: "Playfair Display", fontWeight: 700, fontSize: 28, color: "oklch(0.95 0.008 248)" }
                },
                {
                  tag: "H2", font: "Playfair Display SemiBold", size: "20px / 600",
                  sample: "Academic Performance Overview",
                  style: { fontFamily: "Playfair Display", fontWeight: 600, fontSize: 20, color: "oklch(0.88 0.010 248)" }
                },
                {
                  tag: "H3", font: "Playfair Display SemiBold", size: "15px / 600",
                  sample: "Contributing Risk Factors",
                  style: { fontFamily: "Playfair Display", fontWeight: 600, fontSize: 15, color: "oklch(0.80 0.010 248)" }
                },
                {
                  tag: "Body", font: "Inter Regular", size: "14px / 400",
                  sample: "Student demographic and academic data is analyzed to generate AI-powered predictive risk scores for early intervention.",
                  style: { fontFamily: "Inter", fontWeight: 400, fontSize: 14, color: "oklch(0.78 0.010 248)", lineHeight: 1.6 }
                },
                {
                  tag: "Data", font: "JetBrains Mono Bold", size: "14–28px / 700",
                  sample: "92% · 3.85 GPA · 95% Attendance · STU-017",
                  style: { fontFamily: "JetBrains Mono", fontWeight: 700, fontSize: 14, color: "oklch(0.92 0.010 248)" }
                },
                {
                  tag: "Caption", font: "Inter Medium Uppercase", size: "10–11px / 500",
                  sample: "RISK SCORE · STUDENT ID · PREDICTED OUTCOME · ATTENDANCE RATE",
                  style: { fontFamily: "Inter", fontWeight: 500, fontSize: 10, color: "oklch(0.50 0.015 255)", textTransform: "uppercase" as const, letterSpacing: "0.08em" }
                },
              ].map((t) => (
                <div key={t.tag} style={{
                  display: "flex", alignItems: "flex-start", gap: 20,
                  padding: "14px 18px",
                  background: "oklch(0.165 0.025 255)",
                  borderRadius: 8, border: "1px solid oklch(1 0 0 / 8%)",
                }}>
                  <div style={{ width: 70, flexShrink: 0 }}>
                    <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "oklch(0.62 0.19 255)", fontWeight: 700 }}>{t.tag}</div>
                    <div style={{ fontFamily: "Inter", fontSize: 9, color: "oklch(0.42 0.015 255)", marginTop: 3, lineHeight: 1.4 }}>{t.size}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={t.style}>{t.sample}</div>
                    <div style={{ fontFamily: "Inter", fontSize: 10, color: "oklch(0.38 0.015 255)", marginTop: 6 }}>{t.font}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Atomic Components */}
          <section style={{ marginBottom: 48 }}>
            <SectionHeader title="Atomic Components" number="03" />

            <SubHeader title="Risk Score Badges" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              <span className="risk-badge risk-critical">Critical Risk</span>
              <span className="risk-badge risk-high">High Risk</span>
              <span className="risk-badge risk-medium">Medium Risk</span>
              <span className="risk-badge risk-low">Low Risk</span>
              <span className="risk-badge risk-safe">Safe</span>
            </div>

            <SubHeader title="Predicted Outcome Badges" />
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <span className="risk-badge outcome-graduate">✓ Graduate</span>
              <span className="risk-badge outcome-enrolled">◎ Enrolled</span>
              <span className="risk-badge outcome-dropout">✗ Dropout</span>
            </div>

            <SubHeader title="Buttons" />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              <button style={{ padding: "9px 20px", background: "oklch(0.62 0.19 255)", border: "none", borderRadius: 8, color: "white", fontFamily: "Inter", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                Primary — Schedule Intervention
              </button>
              <button style={{ padding: "9px 20px", background: "oklch(1 0 0 / 8%)", border: "1px solid oklch(1 0 0 / 12%)", borderRadius: 8, color: "oklch(0.78 0.010 248)", fontFamily: "Inter", fontWeight: 500, fontSize: 13, cursor: "pointer" }}>
                Secondary — Send Email
              </button>
              <button style={{ padding: "9px 20px", background: "oklch(0.58 0.22 25 / 15%)", border: "1px solid oklch(0.58 0.22 25 / 30%)", borderRadius: 8, color: "#ef4444", fontFamily: "Inter", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                Danger — Flag Student
              </button>
            </div>

            <SubHeader title="Form Inputs" />
            <div style={{ display: "flex", gap: 10, maxWidth: 560, marginBottom: 24, flexWrap: "wrap" }}>
              <input className="search-input" style={{ maxWidth: 280 }} placeholder="Search by name or ID..." readOnly />
              <select className="filter-select" style={{ minWidth: 150 }}>
                <option>All Outcomes</option>
                <option>Graduate</option>
                <option>Enrolled</option>
                <option>Dropout</option>
              </select>
            </div>

            <SubHeader title="Risk Progress Bars" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 480, marginBottom: 24 }}>
              {[
                { label: "Critical — 93%", w: 93, color: "#ef4444" },
                { label: "High — 74%", w: 74, color: "#f97316" },
                { label: "Medium — 51%", w: 51, color: "#eab308" },
                { label: "Low — 28%", w: 28, color: "#22c55e" },
                { label: "Safe — 8%", w: 8, color: "#10b981" },
              ].map((b) => (
                <div key={b.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "Inter", fontSize: 12, color: "oklch(0.60 0.015 255)" }}>{b.label}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${b.w}%`, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>

            <SubHeader title="Data Table (Monospace — JetBrains Mono)" />
            <div style={{ background: "oklch(0.165 0.025 255)", borderRadius: 8, border: "1px solid oklch(1 0 0 / 8%)", overflow: "hidden", marginBottom: 24 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Attendance</th>
                    <th>Midterm</th>
                    <th>GPA</th>
                    <th>Risk Score</th>
                    <th>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>STU-014</td>
                    <td style={{ fontFamily: "Inter", fontSize: 13 }}>Serkan Doğan</td>
                    <td style={{ color: "#ef4444" }}>44%</td>
                    <td style={{ color: "#ef4444" }}>41</td>
                    <td style={{ color: "#ef4444" }}>1.75</td>
                    <td><span className="risk-badge risk-critical">93%</span></td>
                    <td><span className="risk-badge outcome-dropout">✗ Dropout</span></td>
                  </tr>
                  <tr>
                    <td>STU-008</td>
                    <td style={{ fontFamily: "Inter", fontSize: 13 }}>Burak Koç</td>
                    <td style={{ color: "#eab308" }}>65%</td>
                    <td style={{ color: "#eab308" }}>61</td>
                    <td style={{ color: "#eab308" }}>2.55</td>
                    <td><span className="risk-badge risk-medium">58%</span></td>
                    <td><span className="risk-badge outcome-enrolled">◎ Enrolled</span></td>
                  </tr>
                  <tr>
                    <td>STU-017</td>
                    <td style={{ fontFamily: "Inter", fontSize: 13 }}>Pınar Çetin</td>
                    <td style={{ color: "#22c55e" }}>97%</td>
                    <td style={{ color: "#22c55e" }}>96</td>
                    <td style={{ color: "#22c55e" }}>3.92</td>
                    <td><span className="risk-badge risk-safe">3%</span></td>
                    <td><span className="risk-badge outcome-graduate">✓ Graduate</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SubHeader title="Intervention Log Entry" />
            <div style={{
              padding: "12px 14px",
              background: "oklch(0.165 0.025 255)",
              border: "1px solid oklch(1 0 0 / 8%)",
              borderRadius: 8,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              marginBottom: 24,
            }}>
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
                ✉
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 12, color: "oklch(0.85 0.010 248)" }}>
                    Email
                  </span>
                  <span className="risk-badge" style={{ fontSize: 9, padding: "1px 6px", background: "#22c55e22", color: "#22c55e", border: "1px solid #22c55e44" }}>
                    Positive
                  </span>
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.45 0.015 255)", marginLeft: "auto" }}>
                    Apr 24, 2026
                  </span>
                </div>
                <div style={{ fontFamily: "Inter", fontSize: 11, color: "oklch(0.75 0.010 248)", lineHeight: 1.4, marginBottom: 6 }}>
                  Sent reminder about upcoming assignment deadline and offered tutoring support.
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: 10, color: "oklch(0.50 0.015 255)" }}>
                  <span>By <strong>Dr. Ayşe Yılmaz</strong></span>
                  <span>Follow-up: <strong>May 1, 2026</strong></span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button
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
                  }}
                >
                  ✎
                </button>
                <button
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
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            <SubHeader title="Stat Card" />
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { label: "Total Students", value: "25", sub: "in cohort", icon: "👥", color: undefined },
                { label: "Critical Risk", value: "5", sub: "Immediate action", icon: "🚨", color: "#ef4444" },
                { label: "Avg Risk Score", value: "44%", sub: "Cohort average", icon: "📊", color: "#eab308" },
                { label: "Avg Attendance", value: "71%", sub: "Avg GPA: 2.78", icon: "📅", color: "#22c55e" },
              ].map((s) => (
                <div key={s.label} className="stat-card" style={{ minWidth: 160 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 10, color: "oklch(0.50 0.015 255)", fontFamily: "Inter", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</span>
                    <span style={{ fontSize: 18, opacity: 0.7 }}>{s.icon}</span>
                  </div>
                  <div className="font-data font-bold" style={{ fontSize: 26, color: s.color || "oklch(0.92 0.010 248)", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "oklch(0.50 0.015 255)", fontFamily: "Inter" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Spacing */}
          <section style={{ marginBottom: 48 }}>
            <SectionHeader title="Spacing & Border Radius" number="04" />
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 24 }}>
              {[4, 8, 12, 16, 20, 24, 32, 40, 48].map((s) => (
                <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: s, height: s, background: "oklch(0.62 0.19 255 / 60%)", borderRadius: 2 }} />
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "oklch(0.50 0.015 255)" }}>{s}px</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[0, 4, 6, 8, 10, 16, 9999].map((r) => (
                <div key={r} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 48, height: 48, background: "oklch(0.22 0.028 255)", border: "1px solid oklch(1 0 0 / 15%)", borderRadius: r }} />
                  <span style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "oklch(0.50 0.015 255)" }}>{r === 9999 ? "50%" : `${r}px`}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <div style={{ paddingTop: 20, borderTop: "1px solid oklch(1 0 0 / 8%)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "Inter", fontSize: 11, color: "oklch(0.38 0.015 255)" }}>
              AcademiSight Design System v1.0
            </span>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.35 0.015 255)" }}>
              Neo-Institutional Data-Forward Dashboard
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

function SectionHeader({ title, number }: { title: string; number: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
      <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "oklch(0.62 0.19 255)", fontWeight: 700 }}>{number}</span>
      <h2 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 20, color: "oklch(0.85 0.010 248)" }}>{title}</h2>
    </div>
  );
}

function SubHeader({ title }: { title: string }) {
  return (
    <h3 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 11, color: "oklch(0.50 0.015 255)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
      {title}
    </h3>
  );
}

function ColorSwatch({ name, hex, oklch, desc }: { name: string; hex: string; oklch: string; desc: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ width: 90, height: 64, borderRadius: 8, background: hex, border: "1px solid oklch(1 0 0 / 12%)" }} />
      <div>
        <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 11, color: "oklch(0.85 0.010 248)" }}>{name}</div>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "oklch(0.62 0.19 255)" }}>{hex}</div>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 9, color: "oklch(0.42 0.015 255)", marginTop: 1 }}>{oklch}</div>
        <div style={{ fontFamily: "Inter", fontSize: 10, color: "oklch(0.42 0.015 255)" }}>{desc}</div>
      </div>
    </div>
  );
}
