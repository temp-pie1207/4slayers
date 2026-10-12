# 4SLAYERS — AI Fraud & Scam Detection Platform

> **"Protect yourself before the scam happens."**  
> AI-powered multi-channel fraud detection that connects messages, links, phone numbers, QR codes and payment signals to identify suspicious patterns before they cause real damage.

---

## 🛡️ Core Workflow

$$\text{SCAN} \longrightarrow \text{ANALYZE} \longrightarrow \text{RISK SCORE} \longrightarrow \text{ALERT} \longrightarrow \text{RECOMMENDED ACTION}$$

Instead of evaluating an isolated message or link independently, **4SLAYERS correlates multiple threat signals** across channels into a unified **Scam DNA** graph to explain **WHY** something is dangerous and tell the user **WHAT TO DO NEXT**.

---

## ⚡ Key Differentiating Features

### 1. Multi-Channel Universal Scanner
* **SMS & Text Messages**: Identifies urgency manipulation, KYC traps, and coercive language.
* **URLs & Web Links**: Analyzes domain age, typosquatting, disposable TLDs (`.xyz`, `.top`), and redirect chains.
* **Phone Numbers**: Evaluates caller ID impersonation, premium rate toll fraud, and community report records.
* **QR Codes**: Detects reverse-charge UPI traps (`upi://pay`), quishing links, and rogue Wi-Fi configurations.
* **Screenshots**: OCR parsing of suspicious WhatsApp/SMS chat dialogues and invoice screens.
* **Transactions**: Evaluates advance-fee extortion, mule VPAs, and non-reversible settlement channels.

### 2. Weighted Multi-Signal Risk Engine
Risk score (0–100) is calculated using an adaptive fusion engine:
* **Message Analysis (25%)**
* **URL Analysis (25%)**
* **Behavioral Manipulation (20%)**
* **Known Scam Patterns (15%)**
* **Network & Graph Signals (15%)**

#### Risk Tiers
* `0–29`: **Low Risk** (Benign / Routine communication)
* `30–59`: **Medium Risk** (Suspicious / Caution required)
* `60–79`: **High Risk** (Dangerous / Likely scam)
* `80–100`: **Critical Risk** (Active high-severity fraud campaign)

### 3. Scam DNA — Fraud Network Graph
Connects entities into an interactive visual topology:
$$\text{Message} \longrightarrow \text{Phone Number} \longrightarrow \text{URL} \longrightarrow \text{Domain} \longrightarrow \text{Payment} \longrightarrow \text{Scam Pattern}$$
When multiple independent indicators point to coordinated fraud, a **multi-signal confidence multiplier** (e.g. $1.35\times$) elevates certainty.

### 4. Explainable AI (XAI) with Dual-Layer UX
Never overwhelms users with opaque AI jargon:
* **Simple Explanation ("What happened?")**: Plain English, conversational guidance for everyday citizens, students, and seniors.
* **Technical Explanation ("Why did the AI detect it?")**: Detailed token weights, lexical entropy, DNS registrar indicators, and protocol payloads.

### 5. Next Move Prediction
Probabilistic forecasts of attacker playbooks with confidence percentages:
* *"User will be redirected to a cloned NetBanking portal (92% confidence)"*
* *"Attacker will trigger live OTP request within 90 seconds (88% confidence)"*
* *"Follow-up automated IVR call to reinforce panic (74% confidence)"*

### 6. Actionable Safety Recommendations
Tailored step-by-step checklists prioritizing immediate defense:
1. Do not click the link or scan the QR code.
2. Never share OTP, PIN, password, or CVV.
3. Stop all communication immediately and block the sender.
4. Verify account status only via verified official banking channels.
5. Report incident to **1930 / National Cyber Crime Portal**.
6. If funds were transferred: trigger immediate bank freeze and chargeback dispute.

### 7. Community Scam Intelligence & Reporting
* Searchable database of crowd-sourced incidents with verified threat tags and upvotes.
* Pre-seeded knowledge base across 10 scam categories (Banking, UPI, Customer Care, Job Scams, Investment, Delivery, Govt Impersonation, Social Media, Quishing).

---

## 🚀 Pre-Loaded Demo Scenarios (1-Click Evaluation)

| Demo ID | Case | Result | Risk Score |
| :--- | :--- | :--- | :--- |
| **Demo 1** | Fake Bank KYC Suspension SMS | **Critical Risk** | 94 / 100 |
| **Demo 2** | Suspicious Shortened URL (`bit.ly/...`) | **High Risk** | 82 / 100 |
| **Demo 3** | FedEx Delivery Redelivery Fee Smishing | **High Risk** | 86 / 100 |
| **Demo 4** | Legitimate Nike Store Weekend Promo | **Low Risk** | 14 / 100 |
| **Demo 5** | Coercive Cyber Police Legal Fine UPI | **Critical Risk** | 96 / 100 |

You can test these scenarios directly using the **Interactive Test Presets Bar** on the Landing Page, Dashboard, or Scanner!

---

## 🛠️ Technology Stack

* **Frontend**: React.js (Vite 8), Tailwind CSS v4, React Router, Lucide React, Recharts.
* **Backend**: Python 3, FastAPI, Pydantic, Uvicorn, REST APIs.
* **Database**: MongoDB driver (`pymongo`) with built-in auto-fallback to local JSON document store.
* **Security & Auth**: JWT bearer token authentication, PBKDF2-SHA256 password hashing.

---

## 📂 Project Structure

```text
4slayers/
├── backend/
│   ├── main.py                  # FastAPI app entry point, CORS, routers
│   ├── config.py                # Configuration and environment settings
│   ├── demo_data.py             # Pre-seeded threat categories and 5 demo scenarios
│   ├── api/
│   │   ├── auth.py              # Register, login, 1-click demo login, JWT
│   │   ├── scan.py              # Multi-channel scanning endpoints
│   │   ├── reports.py           # Community reporting and upvotes
│   │   └── intelligence.py      # Scam taxonomy & knowledge base
│   ├── database/
│   │   └── store.py             # Dual MongoDB / JSON document database
│   ├── schemas/
│   │   ├── auth.py              # Auth request & response schemas
│   │   ├── scan.py              # Scan input models and structured signal schemas
│   │   └── report.py            # Report & intelligence schemas
│   └── services/
│       ├── message_analyzer.py  # NLP text & urgency classifier
│       ├── url_analyzer.py      # Domain, TLD, shortener, & homograph analyzer
│       ├── phone_analyzer.py    # Telecom fraud & caller ID validator
│       ├── qr_analyzer.py       # UPI reverse-charge & quishing analyzer
│       ├── transaction_analyzer.py # Advance fee & recipient integrity analyzer
│       ├── behavioral_analyzer.py  # Psychological manipulation scorer
│       ├── graph_analyzer.py    # SCAM DNA fraud network generator
│       ├── risk_engine.py       # Weighted multi-signal fusion engine
│       └── explanation_engine.py# Dual-layer XAI, next moves, & action plans
├── frontend/
│   ├── src/
│   │   ├── api.js               # REST client connecting to FastAPI
│   │   ├── App.jsx              # Router & main application structure
│   │   ├── index.css            # Tailwind CSS v4 & custom cybersecurity styles
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication session state
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Header navigation with status indicator
│   │   │   ├── Footer.jsx       # Emergency cyber helplines & links
│   │   │   ├── RiskMeter.jsx    # Visual risk gauge with dynamic score & tiers
│   │   │   ├── ScamDNAGraph.jsx # Interactive Scam DNA network visualizer
│   │   │   ├── DemoPresetsBar.jsx # 1-click test preset launcher
│   │   │   └── SubmitReportModal.jsx # Community incident submission modal
│   │   └── pages/
│   │       ├── LandingPage.jsx  # Modern cybersecurity product landing page
│   │       ├── DashboardPage.jsx# Threat telemetry, Recharts, Quick Scan cards
│   │       ├── ScannerPage.jsx  # Multi-channel universal scanner
│   │       ├── AnalysisPage.jsx # Comprehensive threat report & action plan
│   │       ├── ReportsPage.jsx  # Community scam reports feed
│   │       ├── IntelligencePage.jsx # 10 Scam category playbooks & attack flows
│   │       ├── HistoryPage.jsx  # Filterable scan audit log
│   │       └── AuthPage.jsx     # Login, Register, & 1-click analyst login
└── start.sh                     # Unified startup runner
```

---

## 🏃 Running the Application

### Quick Start (Single Command)
```bash
./start.sh
```
This automatically boots both:
* **Backend API**: `http://127.0.0.1:8000` (API Docs: `http://127.0.0.1:8000/docs`)
* **Frontend Web App**: `http://localhost:5173`

### Manual Execution

#### 1. Start the Backend
```bash
export PYTHONPATH=.
python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

#### 2. Start the Frontend
```bash
cd frontend
npm run dev
```
Open **`http://localhost:5173`** in your browser.
