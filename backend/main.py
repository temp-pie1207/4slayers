import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import settings
from backend.api.auth import router as auth_router
from backend.api.scan import router as scan_router
from backend.api.reports import router as reports_router, ensure_seed_reports
from backend.api.intelligence import router as intelligence_router, ensure_seed_intelligence

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Multi-Channel AI Fraud & Scam Detection Platform — Scan, Analyze, Risk Score, Explain, Scam DNA, Next Moves, Actionable Safety"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers under /api and root (for serverless rewrite versatility)
for pfx in [settings.API_V1_STR, ""]:
    app.include_router(auth_router, prefix=pfx)
    app.include_router(scan_router, prefix=pfx)
    app.include_router(reports_router, prefix=pfx)
    app.include_router(intelligence_router, prefix=pfx)

@app.on_event("startup")
def startup_event():
    print("[4SLAYERS] Starting AI Fraud & Scam Detection Engine...")
    try:
        ensure_seed_reports()
        ensure_seed_intelligence()
        print("[4SLAYERS] Pre-seeded intelligence and threat databases loaded.")
    except Exception as e:
        print(f"[4SLAYERS] Note during startup seed: {e}")

@app.get("/")
def root():
    return {
        "platform": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "operational",
        "docs_url": "/docs",
        "workflow": "SCAN → ANALYZE → RISK SCORE → ALERT → RECOMMENDED ACTION"
    }

@app.get("/health")
@app.get("/api/health")
def health():
    return {"status": "ok", "service": "4SLAYERS Backend API"}
