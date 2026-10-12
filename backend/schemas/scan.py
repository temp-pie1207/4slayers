from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class MessageScanRequest(BaseModel):
    content: str
    sender_info: Optional[str] = None
    is_demo: bool = False

class URLScanRequest(BaseModel):
    url: str
    context: Optional[str] = None
    is_demo: bool = False

class PhoneScanRequest(BaseModel):
    phone_number: str
    caller_name: Optional[str] = None
    call_type: Optional[str] = "call"  # call, sms, whatsapp
    is_demo: bool = False

class QRScanRequest(BaseModel):
    qr_content: Optional[str] = None
    image_base64: Optional[str] = None
    is_demo: bool = False

class ScreenshotScanRequest(BaseModel):
    image_base64: Optional[str] = None
    text_content: Optional[str] = None
    notes: Optional[str] = None
    is_demo: bool = False

class TransactionScanRequest(BaseModel):
    amount: float
    recipient: str
    payment_method: str
    description: Optional[str] = None
    image_base64: Optional[str] = None
    is_demo: bool = False

class ScanSignal(BaseModel):
    signal: str
    severity: float  # 0.0 - 1.0
    category: str
    reason: str
    level: str  # high, medium, low, info

class ScamNode(BaseModel):
    id: str
    label: str
    type: str  # message, phone, url, domain, payment, pattern, victim
    risk: float
    details: Optional[str] = None

class ScamLink(BaseModel):
    source: str
    target: str
    relationship: str
    weight: float

class ScamDNA(BaseModel):
    nodes: List[ScamNode]
    links: List[ScamLink]
    confidence_multiplier: float
    cluster_pattern: str

class NextMovePrediction(BaseModel):
    action: str
    confidence: int  # percentage
    timeline: str
    detail: str

class RecommendedAction(BaseModel):
    step: int
    title: str
    instruction: str
    priority: str  # critical, high, medium, preventive
    icon_type: Optional[str] = None

class Explanations(BaseModel):
    simple: List[str]
    technical: List[str]
    verdict_summary: str
    impersonated_entity: Optional[str] = None

class RiskBreakdown(BaseModel):
    message_analysis: float
    url_analysis: float
    behavior_analysis: float
    known_patterns: float
    network_signals: float

class ScanResultResponse(BaseModel):
    id: str
    user_id: Optional[str] = None
    type: str  # message, url, phone, qr, screenshot, transaction
    input_summary: str
    raw_input: Optional[Dict[str, Any]] = None
    risk_score: int  # 0 - 100
    risk_level: str  # Low Risk, Medium Risk, High Risk, Critical Risk
    breakdown: RiskBreakdown
    signals: List[ScanSignal]
    explanations: Explanations
    scam_dna: ScamDNA
    next_moves: List[NextMovePrediction]
    recommended_actions: List[RecommendedAction]
    created_at: str
    is_demo: bool = False
