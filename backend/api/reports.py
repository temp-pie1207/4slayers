import uuid
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Depends
from backend.database.store import get_db
from backend.schemas.report import ScamReportCreate, ScamReportResponse
from backend.api.auth import get_current_user
from backend.demo_data import SEED_COMMUNITY_REPORTS

router = APIRouter(prefix="/reports", tags=["Community Reports"])

def ensure_seed_reports():
    db = get_db()
    reports_col = db.get_collection("reports")
    if reports_col.count_documents({}) == 0:
        for rep in SEED_COMMUNITY_REPORTS:
            reports_col.insert_one(rep)

@router.get("", response_model=List[ScamReportResponse])
def get_reports(search: Optional[str] = None, scam_type: Optional[str] = None):
    ensure_seed_reports()
    db = get_db()
    reports_col = db.get_collection("reports")
    
    query = {}
    if scam_type and scam_type.lower() != "all":
        query["scam_type"] = {"$regex": scam_type, "$options": "i"}

    reports = reports_col.find(query, sort=[("created_at", -1)])

    if search:
        s_lower = search.lower()
        reports = [
            r for r in reports
            if s_lower in r.get("title", "").lower() or
               s_lower in r.get("description", "").lower() or
               s_lower in str(r.get("phone", "")).lower() or
               s_lower in str(r.get("url", "")).lower() or
               s_lower in str(r.get("recipient", "")).lower()
        ]

    return reports

@router.post("", response_model=ScamReportResponse)
def create_report(req: ScamReportCreate, current_user: Optional[dict] = Depends(get_current_user)):
    ensure_seed_reports()
    db = get_db()
    reports_col = db.get_collection("reports")

    # Generate smart indicators
    indicators = []
    if req.phone:
        indicators.append("Suspicious Phone Contact")
    if req.url:
        indicators.append("Malicious / Spoofed URL")
    if req.recipient:
        indicators.append("Mule Beneficiary Account")
    if req.loss_amount and req.loss_amount > 0:
        indicators.append(f"Financial Loss: ${req.loss_amount:.2f}")
    if not indicators:
        indicators.append("Social Engineering Tactics")

    new_report = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"] if current_user else "anonymous",
        "scam_type": req.scam_type,
        "title": req.title,
        "description": req.description,
        "phone": req.phone,
        "url": req.url,
        "recipient": req.recipient,
        "risk_level": "High" if (req.loss_amount or req.url) else "Medium",
        "indicators": indicators,
        "frequency": 1,
        "upvotes": 1,
        "created_at": datetime.utcnow().isoformat(),
        "verified": True if current_user else False
    }

    reports_col.insert_one(new_report)
    return new_report

@router.post("/{id}/upvote")
def upvote_report(id: str):
    db = get_db()
    reports_col = db.get_collection("reports")
    report = reports_col.find_one({"id": id})
    if not report:
        raise HTTPException(status_code=404, detail="Scam report not found")

    new_upvotes = report.get("upvotes", 0) + 1
    reports_col.update_one({"id": id}, {"$set": {"upvotes": new_upvotes}})
    return {"status": "success", "id": id, "upvotes": new_upvotes}
