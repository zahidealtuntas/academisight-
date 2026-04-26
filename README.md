# AcademiSight — Student Risk Decision Support System

A dashboard for university instructors to identify students at risk of dropping out or failing.

## Features

- Risk scoring dashboard with KPI stats
- Color-coded student cards (Critical / High / Medium / Low / Safe)
- Dynamic filtering by gender, scholarship, outcome, and risk score range
- Slide-over detail panel with risk factor breakdown
- Intervention log for tracking instructor actions
- UI Style Guide page (`/style-guide`)

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Radix UI + Recharts
- Wouter (routing)

## Getting Started

```bash
cd client
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173)

## Dataset

`client/public/data.json` — 25 students with demographics, academic history, and AI-generated risk scores.

## Course

Design and Programming of a Decision Support System
