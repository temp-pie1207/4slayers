from typing import Optional, List
from fastapi import APIRouter, HTTPException
from backend.database.store import get_db
from backend.schemas.report import IntelligenceCategoryResponse
from backend.demo_data import SEED_INTELLIGENCE_CATEGORIES

router = APIRouter(prefix="/intelligence", tags=["Scam Intelligence"])

def ensure_seed_intelligence():
    db = get_db()
    intel_col = db.get_collection("intelligence")
    if intel_col.count_documents({}) == 0:
        for cat in SEED_INTELLIGENCE_CATEGORIES:
            intel_col.insert_one(cat)

@router.get("", response_model=List[IntelligenceCategoryResponse])
def get_all_intelligence():
    ensure_seed_intelligence()
    db = get_db()
    intel_col = db.get_collection("intelligence")
    categories = intel_col.find({})
    if not categories:
        return SEED_INTELLIGENCE_CATEGORIES
    return categories

@router.get("/{category_id}", response_model=IntelligenceCategoryResponse)
def get_intelligence_category(category_id: str):
    ensure_seed_intelligence()
    db = get_db()
    intel_col = db.get_collection("intelligence")
    cat = intel_col.find_one({"$or": [{"id": category_id}, {"category": category_id}]})
    if not cat:
        for item in SEED_INTELLIGENCE_CATEGORIES:
            if item["id"] == category_id or item["category"] == category_id:
                return item
        raise HTTPException(status_code=404, detail="Intelligence category not found")
    return cat
