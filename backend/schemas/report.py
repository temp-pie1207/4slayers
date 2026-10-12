from pydantic import BaseModel, Field
from typing import Optional, List

class ScamReportCreate(BaseModel):
    scam_type: str
    title: str
    description: str
    phone: Optional[str] = None
    url: Optional[str] = None
    recipient: Optional[str] = None
    loss_amount: Optional[float] = 0.0
    evidence_base64: Optional[str] = None
    incident_date: Optional[str] = None

class ScamReportResponse(BaseModel):
    id: str
    user_id: Optional[str] = None
    scam_type: str
    title: str
    description: str
    phone: Optional[str] = None
    url: Optional[str] = None
    recipient: Optional[str] = None
    risk_level: str
    indicators: List[str]
    frequency: int
    upvotes: int
    created_at: str
    verified: bool

class AttackStep(BaseModel):
    step: int
    title: str
    description: str

class IntelligenceCategoryResponse(BaseModel):
    id: str
    category: str
    name: str
    icon: str
    report_count: int
    risk_level: str
    description: str
    common_indicators: List[str]
    typical_attack_flow: List[AttackStep]
    recommended_safety_measures: List[str]
