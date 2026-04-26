AcademiSight — Student Risk Decision Support System
A dashboard for university instructors to identify students at risk of dropping out or failing, built with React, TypeScript, and Vite.

Project Structure
student-risk-dss/
├── client/
│   ├── public/
│   │   └── data.json          # Student dataset (25 students)
│   └── src/
│       ├── components/
│       │   ├── FilterPanel.tsx         # Dynamic multi-criteria filtering
│       │   ├── StudentCard.tsx         # Card component with risk indicator
│       │   ├── StudentDetailPanel.tsx  # Slide-over detail view
│       │   ├── StatsBar.tsx            # KPI summary bar
│       │   ├── RiskChart.tsx           # Risk distribution chart
│       │   └── InterventionLog.tsx     # Instructor intervention tracker
│       ├── pages/
│       │   ├── Home.tsx                # Main dashboard
│       │   └── StyleGuide.tsx          # UI style guide page
│       ├── lib/
│       │   ├── types.ts                # TypeScript type definitions
│       │   └── utils.ts                # Filter & utility functions
│       └── index.css                   # Design system & CSS variables
├── server/
│   └── index.ts               # Express server
├── shared/
│   └── const.ts               # Shared constants
└── package.json

Getting Started
Prerequisites

Node.js (v18 or higher)
pnpm

Install pnpm (if not installed)
bashnpm install -g pnpm
Run the project
bash# Navigate into the client folder
cd client

# Install dependencies
pnpm install

# Start the development server
pnpm dev
Then open http://localhost:5173 in your browser.

Features
Dashboard (/)

KPI Stats Bar — total students, at-risk count, average risk score, dropout predictions
Risk Distribution Chart — visual breakdown of risk levels
Student Cards — each card shows key data at a glance with a color-coded risk border
Dynamic Filtering — filter by gender, scholarship status, predicted outcome, parental education, and risk score range
Detail Panel — click any card to open a slide-over panel showing full student profile and contributing risk factors
Intervention Log — record and track instructor interventions per student

Style Guide (/style-guide)

Full color palette with HEX codes
Typography scale (H1 → Caption)
Atomic UI components: buttons, badges, inputs, progress bars


Dataset
Located at client/public/data.json. Contains 25 students with the following fields:
FieldTypeDescriptionidstringUnique student IDnamestringFull nameagenumberAgegenderstringMale / FemalescholarshipbooleanHas scholarshipscholarship_typestringType of scholarshipparental_educationstringPrimary / High School / University / Postgraduateattendance_ratenumber% attendance (0–100)midterm_scorenumberMidterm exam score (0–100)previous_gpanumberPrevious semester GPA (0.0–4.0)assignment_completionnumber% assignments completed (0–100)extracurricularbooleanParticipates in extracurricular activitiespart_time_jobbooleanHas a part-time jobdistance_from_campus_kmnumberDistance from campus in kmrisk_scorenumberAI-generated risk score % (0–100)predicted_outcomestringGraduate / Enrolled / Dropoutrisk_factorsstring[]List of contributing risk factorsnotesstringInstructor notes

Design System
Philosophy: Neo-Institutional Data-Forward Dashboard — authoritative yet supportive, avoiding punitive visual cues.
Typography
RoleFontSizeWeightH1 — Page TitlePlayfair Display28pxBoldH2 — Section TitlePlayfair Display20pxSemiBoldBodyInter14pxRegularNumerical DataJetBrains Mono14pxRegular/BoldCaption / LabelInter11pxMedium, uppercase
Color Palette
TokenHEX (approx.)UsageBackground#181C27Page backgroundCard Surface#1E2330Card & panel backgroundsPrimary#5B7FE0Interactive elements, linksRisk Critical#C45040Risk score > 80%Risk High#C47840Risk score 65–80%Risk Medium#B89440Risk score 45–65%Risk Low#4A9460Risk score 20–45%Risk Safe#3D9070Risk score < 20%
Risk Level Thresholds
LevelRangeColorCritical80–100%RedHigh65–79%OrangeMedium45–64%AmberLow20–44%GreenSafe0–19%Teal

Tech Stack
LayerTechnologyFrameworkReact 19 + TypeScriptBuild ToolVite 7StylingTailwind CSS v4 + Custom CSS VariablesUI ComponentsRadix UI primitivesChartsRechartsRoutingWouterIconsLucide ReactPackage Managerpnpm

Deliverables

client/public/data.json — Student dataset
/style-guide route — UI style guide (colors, fonts, components)
Functional prototype — this repository


Course
Design and Programming of a Decision Support System