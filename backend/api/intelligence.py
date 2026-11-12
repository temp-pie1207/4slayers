from typing import Optional, List, Dict, Any
import uuid
from datetime import datetime
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

@router.get("/categories/{category_id}", response_model=IntelligenceCategoryResponse)
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

NETWORK_DATA = {
    "clusters": [
        {"id": "all", "name": "All Fraud Networks", "description": "Global correlated multi-channel threat graph"},
        {"id": "banking_kyc", "name": "Banking & KYC Phishing Syndicate", "description": "Coordinated SMS gateways and credential harvest domains"},
        {"id": "upi_quishing", "name": "Reverse-Charge UPI Quishing", "description": "Trojan QR codes routing funds to decentralized mule pools"},
        {"id": "telecom_extortion", "name": "Telecom Digital Arrest Cell", "description": "Spoofed official CLI numbers demanding bail transfers"},
        {"id": "job_scam", "name": "Telegram Task & Affiliate Ring", "description": "High-yield investment and daily task payout laundering"}
    ],
    "nodes": [
        # Banking KYC cluster
        {"id": "camp_banking_01", "label": "Syndicate-42: NetBanking KYC Cell", "type": "campaign", "cluster": "banking_kyc", "risk": 0.96, "status": "Active Threat", "details": "Active smishing distribution network targeting retail banking customers", "incidents": 240, "first_seen": "2026-08-12"},
        {"id": "node_phone_kyc", "label": "+91-98210-99412 (Bulk SMS Gateway)", "type": "phone", "cluster": "banking_kyc", "risk": 0.92, "status": "Flagged", "details": "Forged sender header used in over 1,400 panic-inducing SMS blasts", "incidents": 142, "first_seen": "2026-09-01"},
        {"id": "node_url_kyc", "label": "hdfc-bank-verify-kyc.xyz", "type": "domain", "cluster": "banking_kyc", "risk": 0.97, "status": "Takedown Pending", "details": "Spoofed netbanking login portal harvesting passwords & OTPs", "incidents": 89, "first_seen": "2026-09-14"},
        {"id": "node_ip_kyc", "label": "185.220.101.5 (Bulletproof Host)", "type": "ip", "cluster": "banking_kyc", "risk": 0.88, "status": "Active Threat", "details": "Autonomous system hosting 14 distinct banking clone portals", "incidents": 56, "first_seen": "2026-07-28"},
        {"id": "node_pay_kyc", "label": "mule.recovery@okhdfcbank", "type": "payment", "cluster": "banking_kyc", "risk": 0.94, "status": "Flagged", "details": "First-hop mule VPA receiving redirected victim funds", "incidents": 38, "first_seen": "2026-09-22"},
        {"id": "node_rep_kyc1", "label": "Report #2026-0941", "type": "report", "cluster": "banking_kyc", "risk": 0.90, "status": "Verified Victim", "details": "Victim reported loss of $1,450 following urgent KYC block message", "incidents": 1, "first_seen": "2026-10-02"},

        # UPI Quishing cluster
        {"id": "camp_upi_02", "label": "Quishing Ring: QR Reverse-Collect", "type": "campaign", "cluster": "upi_quishing", "risk": 0.91, "status": "Active Threat", "details": "Fake cashback & refund stickers redirecting debit intents", "incidents": 178, "first_seen": "2026-08-25"},
        {"id": "node_qr_upi", "label": "Trojan QR (Payload: UPI Debit)", "type": "qr_endpoint", "cluster": "upi_quishing", "risk": 0.93, "status": "Flagged", "details": "Encoded raw URI: upi://pay?pa=merchant_refund_escrow@ybl&am=9999", "incidents": 112, "first_seen": "2026-09-08"},
        {"id": "node_vpa_upi", "label": "merchant_refund_escrow@ybl", "type": "payment", "cluster": "upi_quishing", "risk": 0.95, "status": "Frozen", "details": "Layer-1 cash siphon account opened with fabricated business GST", "incidents": 74, "first_seen": "2026-09-11"},
        {"id": "node_rep_upi1", "label": "Report #2026-1188", "type": "report", "cluster": "upi_quishing", "risk": 0.85, "status": "Verified Victim", "details": "Victim scanned QR thinking it was receiving marketplace refund", "incidents": 1, "first_seen": "2026-10-15"},

        # Telecom Digital Arrest cluster
        {"id": "camp_telecom_03", "label": "Cyber Extortion: Digital Arrest Hub", "type": "campaign", "cluster": "telecom_extortion", "risk": 0.98, "status": "Critical Threat", "details": "State police & narcotics impersonation coercion syndicate", "incidents": 96, "first_seen": "2026-09-10"},
        {"id": "node_phone_police", "label": "+91-11-2309-8800 (Spoofed CBI CLI)", "type": "phone", "cluster": "telecom_extortion", "risk": 0.96, "status": "Active Threat", "details": "VoIP SIP trunk spoofing central enforcement helpline identifier", "incidents": 67, "first_seen": "2026-09-12"},
        {"id": "node_crypto_telecom", "label": "USDT Escrow: 0x71c...48fa", "type": "crypto", "cluster": "telecom_extortion", "risk": 0.99, "status": "Active Threat", "details": "Cold storage depository converting extorted funds to crypto", "incidents": 42, "first_seen": "2026-09-18"},
        {"id": "node_rep_telecom", "label": "Report #2026-1402", "type": "report", "cluster": "telecom_extortion", "risk": 0.95, "status": "Verified Victim", "details": "Victim held on video call for 4 hours before transferring savings", "incidents": 1, "first_seen": "2026-10-18"},

        # Job & Task Scam cluster
        {"id": "camp_job_04", "label": "Affiliate Trap: Daily Task Ring", "type": "campaign", "cluster": "job_scam", "risk": 0.89, "status": "Active Threat", "details": "Recruiting via WhatsApp into paid Telegram review schemes", "incidents": 310, "first_seen": "2026-07-15"},
        {"id": "node_tg_job", "label": "@GlobalMedia_TasksVIP", "type": "telegram", "cluster": "job_scam", "risk": 0.87, "status": "Flagged", "details": "Telegram group with 18k members running scripted bot reviews", "incidents": 180, "first_seen": "2026-08-01"},
        {"id": "node_url_job", "label": "review-boost-earnings.cc", "type": "domain", "cluster": "job_scam", "risk": 0.91, "status": "Active Threat", "details": "Fake dashboard requiring progressive VIP deposit levels", "incidents": 95, "first_seen": "2026-08-20"},
        {"id": "node_rep_job1", "label": "Report #2026-1520", "type": "report", "cluster": "job_scam", "risk": 0.82, "status": "Verified Victim", "details": "Victim paid $500 task deposit but withdrawal was frozen", "incidents": 1, "first_seen": "2026-10-20"}
    ],
    "edges": [
        # Banking edges
        {"id": "e_b1", "source": "camp_banking_01", "target": "node_phone_kyc", "relationship": "dispatches_via", "weight": 0.95},
        {"id": "e_b2", "source": "node_phone_kyc", "target": "node_url_kyc", "relationship": "distributes_link", "weight": 0.98},
        {"id": "e_b3", "source": "node_url_kyc", "target": "node_ip_kyc", "relationship": "hosted_on", "weight": 0.88},
        {"id": "e_b4", "source": "node_url_kyc", "target": "node_pay_kyc", "relationship": "routes_credentials_to", "weight": 0.94},
        {"id": "e_b5", "source": "node_rep_kyc1", "target": "node_url_kyc", "relationship": "compromised_by", "weight": 0.90},

        # UPI edges
        {"id": "e_u1", "source": "camp_upi_02", "target": "node_qr_upi", "relationship": "deploys_payload", "weight": 0.92},
        {"id": "e_u2", "source": "node_qr_upi", "target": "node_vpa_upi", "relationship": "transfers_funds_to", "weight": 0.96},
        {"id": "e_u3", "source": "node_rep_upi1", "target": "node_qr_upi", "relationship": "scanned_at_terminal", "weight": 0.89},

        # Telecom edges
        {"id": "e_t1", "source": "camp_telecom_03", "target": "node_phone_police", "relationship": "initiates_cold_call", "weight": 0.97},
        {"id": "e_t2", "source": "node_phone_police", "target": "node_crypto_telecom", "relationship": "coerces_settlement_to", "weight": 0.99},
        {"id": "e_t3", "source": "node_rep_telecom", "target": "node_phone_police", "relationship": "targeted_by", "weight": 0.95},

        # Cross cluster links (Real Fraud syndicates share infrastructure!)
        {"id": "e_cross1", "source": "node_pay_kyc", "target": "node_vpa_upi", "relationship": "shares_mule_pool", "weight": 0.84},
        {"id": "e_cross2", "source": "camp_job_04", "target": "node_tg_job", "relationship": "operates_channel", "weight": 0.93},
        {"id": "e_cross3", "source": "node_tg_job", "target": "node_url_job", "relationship": "directs_to_portal", "weight": 0.95},
        {"id": "e_cross4", "source": "node_rep_job1", "target": "node_url_job", "relationship": "deposited_into", "weight": 0.88},
        {"id": "e_cross5", "source": "node_url_job", "target": "node_crypto_telecom", "relationship": "launders_through", "weight": 0.79}
    ]
}

@router.get("/network/graph")
def get_fraud_network(cluster: Optional[str] = "all"):
    nodes = NETWORK_DATA["nodes"]
    edges = NETWORK_DATA["edges"]

    if cluster and cluster != "all":
        valid_node_ids = {n["id"] for n in nodes if n["cluster"] == cluster}
        filtered_nodes = [n for n in nodes if n["cluster"] == cluster]
        filtered_edges = [e for e in edges if e["source"] in valid_node_ids and e["target"] in valid_node_ids]
        return {
            "clusters": NETWORK_DATA["clusters"],
            "active_cluster": cluster,
            "nodes": filtered_nodes,
            "edges": filtered_edges,
            "stats": {
                "total_entities": len(filtered_nodes),
                "total_relationships": len(filtered_edges),
                "high_risk_entities": len([n for n in filtered_nodes if n["risk"] > 0.8]),
                "status": "filtered"
            }
        }

    return {
        "clusters": NETWORK_DATA["clusters"],
        "active_cluster": "all",
        "nodes": nodes,
        "edges": edges,
        "stats": {
            "total_entities": len(nodes),
            "total_relationships": len(edges),
            "high_risk_entities": len([n for n in nodes if n["risk"] > 0.8]),
            "active_campaigns": 4,
            "status": "comprehensive"
        }
    }

@router.get("/metrics/analytics")
def get_platform_analytics():
    return {
        "overview": {
            "total_scans": 12840,
            "threats_blocked": 9410,
            "average_risk_score": 78.4,
            "cross_channel_correlations": 3120,
            "confirmed_mules": 640,
            "detection_accuracy": 98.7
        },
        "channels": [
            {"name": "SMS & Chat", "code": "sms", "scans": 4210, "threats": 3850, "rate": 91.4, "avg_score": 84},
            {"name": "URLs & Domains", "code": "url", "scans": 5120, "threats": 4680, "rate": 91.4, "avg_score": 86},
            {"name": "QR / Quishing", "code": "qr", "scans": 1840, "threats": 1540, "rate": 83.7, "avg_score": 79},
            {"name": "Phone / Vishing", "code": "phone", "scans": 2900, "threats": 2420, "rate": 83.4, "avg_score": 74},
            {"name": "Payment & Mules", "code": "payment", "scans": 3100, "threats": 2890, "rate": 93.2, "avg_score": 88}
        ],
        "risk_distribution": [
            {"name": "Critical", "count": 5649, "percentage": 44, "color": "#B42332"},
            {"name": "High", "count": 4108, "percentage": 32, "color": "#A86C13"},
            {"name": "Medium", "count": 2054, "percentage": 16, "color": "#C69A42"},
            {"name": "Safe / Low", "count": 1029, "percentage": 8, "color": "#277653"}
        ],
        "trends": [
            {"month": "May", "scans": 1240, "threats": 890, "correlations": 240},
            {"month": "Jun", "scans": 1580, "threats": 1140, "correlations": 310},
            {"month": "Jul", "scans": 2100, "threats": 1520, "correlations": 480},
            {"month": "Aug", "scans": 2450, "threats": 1810, "correlations": 620},
            {"month": "Sep", "scans": 2720, "threats": 2040, "correlations": 710},
            {"month": "Oct", "scans": 2750, "threats": 2010, "correlations": 760}
        ],
        "top_targeted_entities": [
            {"entity": "HDFC Bank", "incidents": 1420, "vector": "Fake KYC SMS & Typosquatted Domains", "risk": "Critical"},
            {"entity": "State Bank of India", "incidents": 1180, "vector": "Rewards Points Phishing Portals", "risk": "Critical"},
            {"entity": "FedEx / Customs", "incidents": 960, "vector": "Unclaimed Package Fee Links", "risk": "High"},
            {"entity": "Police / CBI Digital Arrest", "incidents": 880, "vector": "Spoofed Calling & Coercion", "risk": "Critical"},
            {"entity": "Telegram Task Affiliate", "incidents": 740, "vector": "High-Yield Review Deposit Scams", "risk": "High"}
        ]
    }

SEEDED_NOTIFICATIONS = [
    {
        "id": "notif_01",
        "title": "New High-Risk Campaign: Axis Bank KYC Typosquatting",
        "message": "Global intelligence detected 8 new domains mimicking Axis Bank netbanking hosted on disposable .vip registrars.",
        "severity": "critical",
        "timestamp": "12 minutes ago",
        "read": False,
        "type": "campaign_alert"
    },
    {
        "id": "notif_02",
        "title": "Threat Signature DB Updated: v2.84",
        "message": "Loaded 1,420 new mule VPAs and 680 malicious VoIP caller IDs into real-time cross-channel matching matrix.",
        "severity": "info",
        "timestamp": "1 hour ago",
        "read": False,
        "type": "system"
    },
    {
        "id": "notif_03",
        "title": "Quishing Warning: QR Reverse-Debits on Marketplaces",
        "message": "14 community reports flagged a scammer requesting sellers to scan an incoming QR to 'receive advance deposit'.",
        "severity": "warning",
        "timestamp": "4 hours ago",
        "read": True,
        "type": "community"
    },
    {
        "id": "notif_04",
        "title": "Cross-Channel Correlation Confirmed: Syndicate-42",
        "message": "A message scan was automatically linked with an active Telegram laundering group and frozen beneficiary account.",
        "severity": "critical",
        "timestamp": "1 day ago",
        "read": True,
        "type": "intel"
    }
]

@router.get("/notifications/list")
def get_notifications():
    return SEEDED_NOTIFICATIONS

@router.post("/notifications/{id}/read")
def mark_notification_read(id: str):
    for n in SEEDED_NOTIFICATIONS:
        if n["id"] == id:
            n["read"] = True
            return {"status": "success", "id": id, "read": True}
    return {"status": "not_found", "id": id}

@router.post("/notifications/read-all")
def mark_all_notifications_read():
    for n in SEEDED_NOTIFICATIONS:
        n["read"] = True
    return {"status": "success", "count": len(SEEDED_NOTIFICATIONS)}

