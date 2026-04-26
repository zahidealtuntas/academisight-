// =============================================================================
// AcademiSight — Type Definitions
// =============================================================================

export type PredictedOutcome = "Graduate" | "Dropout" | "Enrolled";

export type RiskLevel = "critical" | "high" | "medium" | "low" | "safe";

export interface Student {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  scholarship: boolean;
  scholarship_type: string | null;
  parental_education: "Primary School" | "High School" | "University" | "Postgraduate";
  attendance_rate: number;
  midterm_score: number;
  previous_gpa: number;
  assignment_completion: number;
  extracurricular: boolean;
  part_time_job: boolean;
  distance_from_campus_km: number;
  risk_score: number;
  predicted_outcome: PredictedOutcome;
  risk_factors: string[];
  notes: string;
}

export interface DataFile {
  metadata: {
    institution: string;
    department: string;
    semester: string;
    generated: string;
    total_students: number;
  };
  students: Student[];
}

export type InterventionType = "Email" | "Meeting" | "Tutoring" | "Counseling" | "Warning" | "Other";

export interface Intervention {
  id: string;
  student_id: string;
  type: InterventionType;
  date: string;
  notes: string;
  outcome?: "Positive" | "Neutral" | "Negative" | "Pending";
  follow_up_date?: string;
  instructor_name?: string;
}

export interface FilterState {
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
}
