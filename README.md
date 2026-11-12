# 4SLAYERS — Multimodal AI Fraud & Scam Detection Platform

<div align="center">

  [![Live Demo](https://img.shields.io/badge/Live_Demo-4SLAYERS_Online-C69A42?style=for-the-badge&logo=vercel&logoColor=white)](https://4slayers.vercel.app)
  [![React 19](https://img.shields.io/badge/Frontend-React_19_%2B_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![FastAPI](https://img.shields.io/badge/Backend-FastAPI_%2B_Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
  [![Three.js](https://img.shields.io/badge/3D_Engine-Three.js_Scam_DNA-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

  <p align="center">
    <strong>"SEE THE PATTERN. STOP THE SCAM."</strong><br>
    An award-winning digital intelligence platform built on the <strong>Golden Intelligence</strong> design language, connecting messages, links, calls, QR codes, and payment signals to uncover cross-channel fraud patterns that isolated systems miss.
  </p>

  <p align="center">
    <a href="https://4slayers.vercel.app"><strong>⚡ Launch Live Production Platform (Vercel) ↗</strong></a> •
    <a href="https://github.com/temp-pie1207/4slayers">GitHub Repository</a> •
    <a href="https://naman-portfolio-theta.vercel.app">Author Portfolio</a>
  </p>

</div>

---

## 🏛️ Creative Direction: Golden Intelligence

The platform embodies **Golden Intelligence** — combining:
- Warm ivory backgrounds (`#FBF8F0`) and champagne accents (`#EAD6A0`)
- Primary metallic gold (`#C69A42`) and deep gold highlights (`#906727`)
- Deep burgundy contrast accents (`#4A151A`)
- Oversized geometric typography (**Oxanium** / **Michroma**)
- Clear readable interface typography (**Plus Jakarta Sans**)
- Editorial statement font (**DM Serif Display**)
- Precise diagnostic metadata font (**IBM Plex Mono**)
- Interactive 3D Scam DNA object rendered in real-time with Three.js
- Pointer-reactive golden particle atmosphere & subtle architectural grid

---

## ⚡ Architecture Overview

```
4SLAYERS ARCHITECTURE
├── frontend/                     # React 19 + Vite + Tailwind CSS v4 + Framer Motion
│   ├── src/
│   │   ├── components/           # ScamDNAHero3D, HeroGoldenAtmosphere, AppLayout, Navbar, etc.
│   │   ├── context/              # AuthContext, ThemeContext (Golden Light / Obsidian Dark)
│   │   ├── pages/                # 13 Landing Sections + Workspace Console (Dashboard, Scan, History, DNA, Network, Reports, Intel, Analytics, Settings)
│   │   └── api.js                # Centralized typed HTTP client
│   └── index.html                # Google Fonts & Metadata
├── backend/                      # Python + FastAPI + Document Vector Heuristics
│   ├── api/                      # Auth, Scanning, Community Reports, Intelligence & Network Graph
│   ├── database/                 # MongoDB with automatic SQLite3 ACID Document fallback
│   ├── services/                 # Message, URL, Phone, QR, Transaction, Risk & Graph Analyzers
│   ├── schemas/                  # Pydantic v2 validation models
│   └── tests/                    # Pytest test suite covering full workflow
├── docker-compose.yml            # Multi-container orchestration (Mongo + FastAPI + Vite)
└── start.sh                      # One-command dual runner (FastAPI :8000 + Vite :5173)
```

---

## 🚀 Quickstart & Execution

### Prerequisites
- Python 3.10+
- Node.js 18+ (Node 20+ recommended)
- (Optional) MongoDB 6+ or Docker

### 1. One-Click Dual Launch
```bash
./start.sh
```
This automatically launches:
- **Backend API**: `http://127.0.0.1:8000` (Swagger docs at `http://127.0.0.1:8000/docs`)
- **Frontend App**: `http://localhost:5173`

### 2. Manual Startup
**Backend:**
```bash
python3 -m pip install -r requirements.txt
python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 3. Docker Compose Startup
```bash
docker compose up --build
```

---

## 🧪 Automated Pytest Verification

Run the full backend test suite verifying authentication, multimodal scanning, threat heuristic rules, Scam DNA graph generation, and data export:

```bash
PYTHONPATH=. pytest backend/tests/test_api.py -v
```

---

## 🧭 Narrative Order of the 13 Landing Page Sections

1. **Section 01 — Hero**: Cinematic opening with editorial grid, custom 4SLAYERS brand mark, technical eyebrow, primary golden CTA, and interactive 3D Scam DNA object.
2. **Section 02 — Product Intelligence Strip**: Architectural grid displaying `MULTIMODAL INPUT`, `EXPLAINABLE ANALYSIS`, `CONNECTED SIGNALS`, and `ACTIONABLE PROTECTION`.
3. **Section 03 — The Problem**: *"A SCAM IS NEVER JUST ONE SIGNAL."* Four editorial cards detailing harmless isolation, cross-channel convergence, post-loss realization, and fragmented defenses.
4. **Section 04 — The Scanner**: Live interactive preview executing real backend heuristic analysis through progressive stages (`EXTRACTING SIGNALS → MATCHING RULES → CONNECTING EVIDENCE → GENERATING REPORT`).
5. **Section 05 — Scam DNA**: Full-width interactive topological visualization demonstrating connected attack nodes with clickable evidence inspector.
6. **Section 06 — Multimodal Intelligence**: Seven editorial cards spanning SMS, URLs, QR, Screenshot/OCR, Phone, Payment, and Cross-Channel Correlation.
7. **Section 07 — Explainable AI**: *"NOT JUST A SCORE. THE REASON BEHIND IT."* Dual-mode report with plain language explanations, matched heuristic rules, and transparent unknown limitations.
8. **Section 08 — Fraud Network**: Interactive syndicate graph with cluster filtering (Banking KYC, UPI Quishing, Telecom Arrest, Job Scam) and forensic details panel.
9. **Section 09 — How It Works**: 5-stage process diagram (`01 COLLECT → 02 EXTRACT → 03 ANALYZE → 04 CONNECT → 05 PROTECT`).
10. **Section 10 — Safety Recommendations**: Actionable response playbooks for suspicious messages, links, QR codes, and official impersonation.
11. **Section 11 — Privacy & Trust**: Honest data sovereignty guarantees, ephemeral upload parsing, single-click deletion, and realistic limitations.
12. **Section 12 — Final CTA**: Dramatic golden-to-burgundy transition with *"THE NEXT SCAM SHOULDN'T CATCH YOU OFF GUARD."*
13. **Section 13 — Footer**: Real navigation, documentation, governance, and compact brand mark.

---

## 🗄️ Application Workspace Routes (`/app/*`)

- `/app` — **Overview Dashboard**: Live threat velocity, active syndicates, recent dossiers, quick scanner.
- `/app/scan` — **New Threat Scan**: Unified multimodal scanner supporting text, URLs, phone numbers, QR codes, and transactions.
- `/app/scans` — **Scan History**: Search, vector filter, risk filter, sort by date/score, delete.
- `/app/scans/:scanId` — **Forensic Dossier**: Risk decomposition, signal timeline, Scam DNA, next moves, actions, JSON export, analyst verification.
- `/app/scam-dna` — **Scam DNA Explorer**: Interactive topological graph inspector with synthetic scenarios.
- `/app/network` — **Fraud Network**: Empirical cross-cluster infrastructure graph with search and entity inspector.
- `/app/reports` — **Community Reports**: Verified public threat reports, upvoting, and incident broadcast modal.
- `/app/intelligence` — **Threat Intelligence**: 10 categorized threat domains with tactics and mitigation.
- `/app/analytics` — **Analytics**: Recharts visualizations for monthly velocity, channel densities, and risk distribution.
- `/app/notifications` — **Threat Alerts**: Real-time broadcast inbox with unread badges and severity filtering.
- `/app/settings` — **Settings & Sovereignty**: Sensitivity tuning, notification toggles, GDPR JSON audit export, and permanent data purge.

---

## 🔒 Security & Data Rights

- **Zero Third-Party Ad Trackers**: No advertising pixels or external telemetry beacons.
- **SSRF & Injection Prevention**: Safe parameter validation, strict pydantic typing, and safe URL scheme inspection.
- **Ephemeral Upload Parsing**: Uploaded QR images are evaluated in volatile memory and never retained.
- **GDPR & CCPA Rights**: Instant single-click structured JSON archive export (`GET /api/auth/export`) and irreversible data wipe (`DELETE /api/auth/purge-data`).

---

## ✦ Author & Engineering Credits

**Naman Kashyap**
- 🐙 GitHub: [@temp-pie1207](https://github.com/temp-pie1207)
- 🌐 Portfolios: [Echo Verse](https://naman-portfolio-theta.vercel.app) • [Davies Editorial](https://davies-ten.vercel.app)
- 💻 LeetCode: [Naman_1207](https://leetcode.com/u/Naman_1207/)
- 📧 Email: [namankashyap484@gmail.com](mailto:namankashyap484@gmail.com)
- 🏆 **Achievement**: 1st Place Winner, Hackathon AI Track

---

## ✦ License

This project is open-source and released under the [MIT License](LICENSE).
