// =============================================================================
// AcademiSight — Risk Distribution Chart
// Uses Recharts for visual risk breakdown
// =============================================================================

import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend
} from "recharts";
import type { Student } from "@/lib/types";
import { getRiskLevel } from "@/lib/utils";

interface Props {
  students: Student[];
}

const RISK_COLORS: Record<string, string> = {
  critical: "#ef4444",
  high:     "#f97316",
  medium:   "#eab308",
  low:      "#22c55e",
  safe:     "#10b981",
};

const OUTCOME_COLORS: Record<string, string> = {
  Graduate: "#22c55e",
  Enrolled: "#3b82f6",
  Dropout:  "#ef4444",
};

export default function RiskChart({ students }: Props) {
  const riskDist = useMemo(() => {
    const counts = { critical: 0, high: 0, medium: 0, low: 0, safe: 0 };
    students.forEach((s) => { counts[getRiskLevel(s.risk_score)]++; });
    return [
      { name: "Critical\n>80%", value: counts.critical, level: "critical" },
      { name: "High\n65–80%", value: counts.high, level: "high" },
      { name: "Medium\n45–65%", value: counts.medium, level: "medium" },
      { name: "Low\n20–45%", value: counts.low, level: "low" },
      { name: "Safe\n<20%", value: counts.safe, level: "safe" },
    ];
  }, [students]);

  const outcomeDist = useMemo(() => {
    const counts = { Graduate: 0, Enrolled: 0, Dropout: 0 };
    students.forEach((s) => { counts[s.predicted_outcome]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [students]);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { level?: string; name: string } }> }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      return (
        <div style={{
          background: "oklch(0.185 0.028 255)",
          border: "1px solid oklch(1 0 0 / 12%)",
          borderRadius: 8,
          padding: "8px 12px",
          fontFamily: "JetBrains Mono",
          fontSize: 12,
          color: "oklch(0.92 0.010 248)",
        }}>
          <div style={{ fontWeight: 700 }}>{d.value} students</div>
          <div style={{ fontSize: 10, color: "oklch(0.55 0.015 255)", marginTop: 2 }}>
            {Math.round((d.value / students.length) * 100)}% of cohort
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {/* Bar chart: Risk distribution */}
      <div style={{
        background: "oklch(0.165 0.025 255)",
        border: "1px solid oklch(1 0 0 / 8%)",
        borderRadius: 10,
        padding: "16px 20px",
      }}>
        <h3 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 14, color: "oklch(0.85 0.010 248)", marginBottom: 16 }}>
          Risk Distribution
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={riskDist} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontFamily: "Inter", fontSize: 9, fill: "oklch(0.50 0.015 255)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontFamily: "JetBrains Mono", fontSize: 10, fill: "oklch(0.45 0.015 255)" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(1 0 0 / 4%)" }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {riskDist.map((entry) => (
                <Cell key={entry.level} fill={RISK_COLORS[entry.level]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart: Predicted outcomes */}
      <div style={{
        background: "oklch(0.165 0.025 255)",
        border: "1px solid oklch(1 0 0 / 8%)",
        borderRadius: 10,
        padding: "16px 20px",
      }}>
        <h3 style={{ fontFamily: "Playfair Display", fontWeight: 600, fontSize: 14, color: "oklch(0.85 0.010 248)", marginBottom: 16 }}>
          Predicted Outcomes
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={outcomeDist}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
            >
              {outcomeDist.map((entry) => (
                <Cell key={entry.name} fill={OUTCOME_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "oklch(0.185 0.028 255)",
                border: "1px solid oklch(1 0 0 / 12%)",
                borderRadius: 8,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                color: "oklch(0.92 0.010 248)",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ fontFamily: "Inter", fontSize: 11, color: "oklch(0.65 0.010 248)" }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
