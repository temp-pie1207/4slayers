import uuid
from datetime import datetime
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Depends
from backend.database.store import get_db
from backend.schemas.scan import (
    MessageScanRequest, URLScanRequest, PhoneScanRequest,
    QRScanRequest, ScreenshotScanRequest, TransactionScanRequest,
    ScanResultResponse
)
from backend.services.message_analyzer import message_analyzer
from backend.services.url_analyzer import url_analyzer
from backend.services.phone_analyzer import phone_analyzer
from backend.services.qr_analyzer import qr_analyzer
from backend.services.transaction_analyzer import transaction_analyzer
from backend.services.behavioral_analyzer import behavioral_analyzer
from backend.services.graph_analyzer import graph_analyzer
from backend.services.risk_engine import risk_engine
from backend.services.explanation_engine import explanation_engine
from backend.api.auth import get_current_user
from backend.demo_data import DEMO_PRESETS

router = APIRouter(prefix="/scan", tags=["Scanning & Analysis"])

def save_and_format_scan(scan_data: dict) -> dict:
    db = get_db()
    scans_col = db.get_collection("scans")
    scans_col.insert_one(scan_data)
    return scan_data

@router.get("/demo/{demo_id}")
def get_demo_scan(demo_id: str, current_user: Optional[dict] = Depends(get_current_user)):
    preset = DEMO_PRESETS.get(demo_id.lower())
    if not preset:
        raise HTTPException(status_code=404, detail=f"Demo preset '{demo_id}' not found. Available: demo1, demo2, demo3, demo4, demo5")
    
    # Save a fresh instance into history for the active user if authenticated
    result = dict(preset)
    result["id"] = f"{demo_id}-{str(uuid.uuid4())[:8]}"
    result["created_at"] = datetime.utcnow().isoformat()
    if current_user:
        result["user_id"] = current_user["id"]
        db = get_db()
        db.get_collection("scans").insert_one(result)
    return result

@router.post("/message", response_model=ScanResultResponse)
def scan_message(req: MessageScanRequest, current_user: Optional[dict] = Depends(get_current_user)):
    msg_res = message_analyzer.analyze(req.content, req.sender_info)
    beh_res = behavioral_analyzer.analyze(req.content)

    url_scores = []
    url_signals = []
    for u in msg_res["extracted_urls"]:
        u_res = url_analyzer.analyze(u)
        url_scores.append(u_res["score"])
        url_signals.extend(u_res["signals"])

    avg_url_score = max(url_scores) if url_scores else 10.0

    all_signals = msg_res["signals"] + beh_res["signals"] + url_signals

    # Pattern recognition
    pattern_score = 15.0
    pattern_name = None
    if msg_res["impersonated_entity"] and (msg_res["score"] > 60 or avg_url_score > 60):
        pattern_score = 90.0
        pattern_name = f"{msg_res['impersonated_entity']} Impersonation Phishing Campaign"
    elif beh_res["score"] > 60:
        pattern_score = 75.0
        pattern_name = "Social Engineering Urgency Trap"

    # Scam DNA
    dna = graph_analyzer.build_scam_dna(
        scan_type="message",
        input_summary=req.content,
        extracted_urls=msg_res["extracted_urls"],
        extracted_phones=msg_res["extracted_phones"],
        impersonated_brand=msg_res["impersonated_entity"],
        identified_pattern=pattern_name,
        risk_score=int(msg_res["score"])
    )

    # Weighted composite risk
    comp_risk = risk_engine.compute_composite_risk(
        message_score=msg_res["score"],
        url_score=avg_url_score,
        behavior_score=beh_res["score"],
        pattern_score=pattern_score,
        network_score=80.0 if (msg_res["extracted_urls"] and msg_res["score"] > 60) else 15.0,
        confidence_multiplier=dna["confidence_multiplier"]
    )

    explanations = explanation_engine.generate_explanations(
        scan_type="message",
        risk_score=comp_risk["risk_score"],
        signals=all_signals,
        impersonated_entity=msg_res["impersonated_entity"],
        extracted_urls=msg_res["extracted_urls"]
    )

    next_moves = explanation_engine.predict_next_moves(comp_risk["risk_score"], "message", all_signals)
    actions = explanation_engine.get_recommended_actions(comp_risk["risk_score"], "message")

    scan_record = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"] if current_user else "anonymous",
        "type": "message",
        "input_summary": req.content,
        "raw_input": {"content": req.content, "sender_info": req.sender_info},
        "risk_score": comp_risk["risk_score"],
        "risk_level": comp_risk["risk_level"],
        "breakdown": comp_risk["breakdown"],
        "signals": all_signals,
        "explanations": explanations,
        "scam_dna": dna,
        "next_moves": next_moves,
        "recommended_actions": actions,
        "created_at": datetime.utcnow().isoformat(),
        "is_demo": req.is_demo
    }

    return save_and_format_scan(scan_record)

@router.post("/url", response_model=ScanResultResponse)
def scan_url(req: URLScanRequest, current_user: Optional[dict] = Depends(get_current_user)):
    url_res = url_analyzer.analyze(req.url)
    beh_res = behavioral_analyzer.analyze(req.context or req.url)

    all_signals = url_res["signals"] + beh_res["signals"]

    pattern_name = f"Typosquatting Phishing Gateway ({url_res.get('spoofed_brand')})" if url_res.get('spoofed_brand') else ("Obfuscated Redirect Trap" if url_res.get("is_shortener") else None)
    pattern_score = 88.0 if pattern_name else (url_res["score"] * 0.9)

    dna = graph_analyzer.build_scam_dna(
        scan_type="url",
        input_summary=req.url,
        extracted_urls=[req.url],
        impersonated_brand=url_res.get("spoofed_brand"),
        identified_pattern=pattern_name,
        risk_score=url_res["score"]
    )

    comp_risk = risk_engine.compute_composite_risk(
        message_score=20.0,
        url_score=url_res["score"],
        behavior_score=beh_res["score"],
        pattern_score=pattern_score,
        network_score=75.0 if url_res["score"] > 60 else 15.0,
        confidence_multiplier=dna["confidence_multiplier"]
    )

    explanations = explanation_engine.generate_explanations(
        scan_type="url",
        risk_score=comp_risk["risk_score"],
        signals=all_signals,
        impersonated_entity=url_res.get("spoofed_brand"),
        extracted_urls=[req.url]
    )

    next_moves = explanation_engine.predict_next_moves(comp_risk["risk_score"], "url", all_signals)
    actions = explanation_engine.get_recommended_actions(comp_risk["risk_score"], "url")

    scan_record = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"] if current_user else "anonymous",
        "type": "url",
        "input_summary": req.url,
        "raw_input": {"url": req.url, "context": req.context},
        "risk_score": comp_risk["risk_score"],
        "risk_level": comp_risk["risk_level"],
        "breakdown": comp_risk["breakdown"],
        "signals": all_signals,
        "explanations": explanations,
        "scam_dna": dna,
        "next_moves": next_moves,
        "recommended_actions": actions,
        "created_at": datetime.utcnow().isoformat(),
        "is_demo": req.is_demo
    }

    return save_and_format_scan(scan_record)

@router.post("/phone", response_model=ScanResultResponse)
def scan_phone(req: PhoneScanRequest, current_user: Optional[dict] = Depends(get_current_user)):
    phone_res = phone_analyzer.analyze(req.phone_number, req.caller_name, req.call_type or "call")
    beh_res = behavioral_analyzer.analyze(req.caller_name or "")

    all_signals = phone_res["signals"] + beh_res["signals"]

    pattern_name = "Cold-Call Telecom Impersonation Syndicate" if phone_res["claims_official"] else None
    pattern_score = 85.0 if phone_res["score"] > 60 else 20.0

    dna = graph_analyzer.build_scam_dna(
        scan_type="phone",
        input_summary=f"{req.phone_number} ({req.caller_name or 'Unknown Caller'})",
        extracted_phones=[req.phone_number],
        impersonated_brand=req.caller_name if phone_res["claims_official"] else None,
        identified_pattern=pattern_name,
        risk_score=phone_res["score"]
    )

    comp_risk = risk_engine.compute_composite_risk(
        message_score=25.0,
        url_score=10.0,
        behavior_score=phone_res["score"] * 0.85,
        pattern_score=pattern_score,
        network_score=80.0 if phone_res["report_count"] > 0 else 20.0,
        confidence_multiplier=dna["confidence_multiplier"]
    )

    explanations = explanation_engine.generate_explanations(
        scan_type="phone",
        risk_score=comp_risk["risk_score"],
        signals=all_signals,
        impersonated_entity=req.caller_name if phone_res["claims_official"] else None
    )

    next_moves = explanation_engine.predict_next_moves(comp_risk["risk_score"], "phone", all_signals)
    actions = explanation_engine.get_recommended_actions(comp_risk["risk_score"], "phone")

    scan_record = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"] if current_user else "anonymous",
        "type": "phone",
        "input_summary": f"Phone: {req.phone_number} | Caller: {req.caller_name or 'Unspecified'}",
        "raw_input": {"phone_number": req.phone_number, "caller_name": req.caller_name, "call_type": req.call_type},
        "risk_score": comp_risk["risk_score"],
        "risk_level": comp_risk["risk_level"],
        "breakdown": comp_risk["breakdown"],
        "signals": all_signals,
        "explanations": explanations,
        "scam_dna": dna,
        "next_moves": next_moves,
        "recommended_actions": actions,
        "created_at": datetime.utcnow().isoformat(),
        "is_demo": req.is_demo
    }

    return save_and_format_scan(scan_record)

@router.post("/qr", response_model=ScanResultResponse)
def scan_qr(req: QRScanRequest, current_user: Optional[dict] = Depends(get_current_user)):
    qr_res = qr_analyzer.analyze(req.qr_content, req.image_base64)
    beh_res = behavioral_analyzer.analyze(qr_res["decoded_content"])

    all_signals = qr_res["signals"] + beh_res["signals"]

    pattern_name = "Reverse-Charge UPI Quishing Scheme" if "upi://" in qr_res["decoded_content"].lower() else "QR Code Redirection Phishing"
    pattern_score = 90.0 if qr_res["score"] > 60 else 15.0

    dna = graph_analyzer.build_scam_dna(
        scan_type="qr",
        input_summary=f"QR Payload: {qr_res['decoded_content'][:60]}...",
        identified_pattern=pattern_name,
        risk_score=qr_res["score"]
    )

    comp_risk = risk_engine.compute_composite_risk(
        message_score=20.0,
        url_score=qr_res["score"] if "http" in qr_res["decoded_content"] else 15.0,
        behavior_score=qr_res["score"] * 0.9,
        pattern_score=pattern_score,
        network_score=75.0 if qr_res["score"] > 60 else 15.0,
        confidence_multiplier=dna["confidence_multiplier"]
    )

    explanations = explanation_engine.generate_explanations(
        scan_type="qr",
        risk_score=comp_risk["risk_score"],
        signals=all_signals
    )

    next_moves = explanation_engine.predict_next_moves(comp_risk["risk_score"], "qr", all_signals)
    actions = explanation_engine.get_recommended_actions(comp_risk["risk_score"], "qr")

    scan_record = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"] if current_user else "anonymous",
        "type": "qr",
        "input_summary": f"QR Content: {qr_res['decoded_content'][:70]}",
        "raw_input": {"qr_content": req.qr_content},
        "risk_score": comp_risk["risk_score"],
        "risk_level": comp_risk["risk_level"],
        "breakdown": comp_risk["breakdown"],
        "signals": all_signals,
        "explanations": explanations,
        "scam_dna": dna,
        "next_moves": next_moves,
        "recommended_actions": actions,
        "created_at": datetime.utcnow().isoformat(),
        "is_demo": req.is_demo
    }

    return save_and_format_scan(scan_record)

@router.post("/screenshot", response_model=ScanResultResponse)
def scan_screenshot(req: ScreenshotScanRequest, current_user: Optional[dict] = Depends(get_current_user)):
    extracted_text = req.text_content or "Urgent Alert: Your bank account will be blocked today due to pending KYC. Click http://hdfc-bank-verify-kyc.xyz to update."
    
    msg_res = message_analyzer.analyze(extracted_text)
    beh_res = behavioral_analyzer.analyze(extracted_text)

    all_signals = msg_res["signals"] + beh_res["signals"]
    all_signals.append({
        "signal": "ocr_text_extracted",
        "severity": 0.70,
        "category": "Visual Intelligence",
        "reason": f"Extracted {len(extracted_text.split())} words from screenshot using optical character analysis",
        "level": "medium"
    })

    dna = graph_analyzer.build_scam_dna(
        scan_type="screenshot",
        input_summary=extracted_text[:80],
        extracted_urls=msg_res["extracted_urls"],
        extracted_phones=msg_res["extracted_phones"],
        impersonated_brand=msg_res["impersonated_entity"],
        identified_pattern="Screenshot Social Engineering Artifact",
        risk_score=msg_res["score"]
    )

    comp_risk = risk_engine.compute_composite_risk(
        message_score=msg_res["score"],
        url_score=85.0 if msg_res["extracted_urls"] else 15.0,
        behavior_score=beh_res["score"],
        pattern_score=80.0 if msg_res["score"] > 60 else 20.0,
        network_score=70.0 if msg_res["extracted_urls"] else 15.0,
        confidence_multiplier=dna["confidence_multiplier"]
    )

    explanations = explanation_engine.generate_explanations(
        scan_type="screenshot",
        risk_score=comp_risk["risk_score"],
        signals=all_signals,
        impersonated_entity=msg_res["impersonated_entity"],
        extracted_urls=msg_res["extracted_urls"]
    )

    next_moves = explanation_engine.predict_next_moves(comp_risk["risk_score"], "screenshot", all_signals)
    actions = explanation_engine.get_recommended_actions(comp_risk["risk_score"], "screenshot")

    scan_record = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"] if current_user else "anonymous",
        "type": "screenshot",
        "input_summary": f"Screenshot OCR Analysis: {extracted_text[:70]}...",
        "raw_input": {"text_content": extracted_text, "notes": req.notes},
        "risk_score": comp_risk["risk_score"],
        "risk_level": comp_risk["risk_level"],
        "breakdown": comp_risk["breakdown"],
        "signals": all_signals,
        "explanations": explanations,
        "scam_dna": dna,
        "next_moves": next_moves,
        "recommended_actions": actions,
        "created_at": datetime.utcnow().isoformat(),
        "is_demo": req.is_demo
    }

    return save_and_format_scan(scan_record)

@router.post("/transaction", response_model=ScanResultResponse)
def scan_transaction(req: TransactionScanRequest, current_user: Optional[dict] = Depends(get_current_user)):
    tx_res = transaction_analyzer.analyze(
        amount=req.amount,
        recipient=req.recipient,
        payment_method=req.payment_method,
        description=req.description or ""
    )
    beh_res = behavioral_analyzer.analyze(req.description or "")

    all_signals = tx_res["signals"] + beh_res["signals"]

    pattern_name = "Advance-Fee / Legal Penalty Extortion" if tx_res["score"] > 60 else None
    pattern_score = 92.0 if tx_res["score"] > 60 else 15.0

    dna = graph_analyzer.build_scam_dna(
        scan_type="transaction",
        input_summary=f"Payment of {req.amount} via {req.payment_method} to {req.recipient}",
        payment_recipient=req.recipient,
        identified_pattern=pattern_name,
        risk_score=tx_res["score"]
    )

    comp_risk = risk_engine.compute_composite_risk(
        message_score=30.0,
        url_score=10.0,
        behavior_score=beh_res["score"] if beh_res["score"] > 20 else tx_res["score"] * 0.8,
        pattern_score=pattern_score,
        network_score=85.0 if tx_res["score"] > 60 else 15.0,
        confidence_multiplier=dna["confidence_multiplier"]
    )

    explanations = explanation_engine.generate_explanations(
        scan_type="transaction",
        risk_score=comp_risk["risk_score"],
        signals=all_signals
    )

    next_moves = explanation_engine.predict_next_moves(comp_risk["risk_score"], "transaction", all_signals)
    actions = explanation_engine.get_recommended_actions(comp_risk["risk_score"], "transaction")

    scan_record = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"] if current_user else "anonymous",
        "type": "transaction",
        "input_summary": f"Transaction: ${req.amount:.2f} ({req.payment_method}) -> {req.recipient}",
        "raw_input": {
            "amount": req.amount,
            "recipient": req.recipient,
            "payment_method": req.payment_method,
            "description": req.description
        },
        "risk_score": comp_risk["risk_score"],
        "risk_level": comp_risk["risk_level"],
        "breakdown": comp_risk["breakdown"],
        "signals": all_signals,
        "explanations": explanations,
        "scam_dna": dna,
        "next_moves": next_moves,
        "recommended_actions": actions,
        "created_at": datetime.utcnow().isoformat(),
        "is_demo": req.is_demo
    }

    return save_and_format_scan(scan_record)

@router.get("s")
def list_scans(current_user: Optional[dict] = Depends(get_current_user)):
    db = get_db()
    scans_col = db.get_collection("scans")
    
    query = {}
    if current_user:
        query = {"$or": [{"user_id": current_user["id"]}, {"user_id": "anonymous"}, {"is_demo": True}]}
    
    scans = scans_col.find(query, sort=[("created_at", -1)], limit=50)
    
    # If empty, return the demo cases so history has immediately viewable records
    if not scans:
        scans = list(DEMO_PRESETS.values())
        
    return scans

@router.get("/{id}")
def get_scan(id: str):
    # Check demo presets first
    clean_id = id.lower()
    for k, v in DEMO_PRESETS.items():
        if clean_id.startswith(k):
            return v
            
    db = get_db()
    scans_col = db.get_collection("scans")
    scan = scans_col.find_one({"id": id})
    if not scan:
        raise HTTPException(status_code=404, detail="Scan result not found")
    return scan

@router.delete("/{id}")
def delete_scan(id: str, current_user: Optional[dict] = Depends(get_current_user)):
    db = get_db()
    scans_col = db.get_collection("scans")
    deleted = scans_col.delete_one({"id": id})
    return {"status": "success", "deleted": deleted}
