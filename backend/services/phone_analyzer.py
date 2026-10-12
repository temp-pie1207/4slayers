import re
from typing import Dict, Any, List
from backend.database.store import get_db

class PhoneAnalyzer:
    PREMIUM_RATE_PREFIXES = [
        "+232", "+247", "+252", "+373", "+881", "+882", "+269", "+236"
    ]

    SUSPICIOUS_CARRIER_PATTERNS = [
        r'^\+?91[6789]\d{9}$',  # Personal mobile claiming to be corporate customer care
        r'^\+?1(?:800|888|877|866)\d{7}$'  # Inbound toll-free used as caller ID
    ]

    def analyze(self, phone: str, caller_name: str = None, call_type: str = "call") -> Dict[str, Any]:
        signals: List[Dict[str, Any]] = []
        score = 12.0  # baseline safe

        cleaned = re.sub(r'[\s\-\(\)\.]', '', phone.strip())
        
        # Check database for previous reports on this number
        db = get_db()
        reports_col = db.get_collection("reports")
        existing_reports = []
        try:
            existing_reports = reports_col.find({"phone": {"$regex": cleaned[-10:] if len(cleaned) >= 10 else cleaned}})
        except Exception:
            pass

        report_count = len(existing_reports)
        if report_count > 0:
            score += min(report_count * 20, 50)
            signals.append({
                "signal": "community_scam_history",
                "severity": min(0.7 + (report_count * 0.08), 0.98),
                "category": "Community Intelligence",
                "reason": f"Phone number has {report_count} community fraud reports flagged by verified users",
                "level": "high"
            })

        # Check premium rate / one-ring scam prefixes
        for pfx in self.PREMIUM_RATE_PREFIXES:
            if cleaned.startswith(pfx):
                score += 55
                signals.append({
                    "signal": "wangiri_premium_rate",
                    "severity": 0.95,
                    "category": "Telecom Fraud",
                    "reason": f"Originates from high-risk international destination '{pfx}' known for 'Wangiri' one-ring toll fraud",
                    "level": "high"
                })
                break

        # Check caller name claiming to be official entity while using personal mobile
        caller_name_lower = (caller_name or "").lower()
        official_keywords = ["bank", "support", "care", "police", "customs", "delivery", "kyc", "telecom", "officer", "executive"]
        claims_official = any(w in caller_name_lower for w in official_keywords)

        if claims_official:
            # Check if it's an unverified mobile number
            if len(cleaned) >= 10 and not cleaned.startswith("1800"):
                score += 38
                signals.append({
                    "signal": "unofficial_caller_id_impersonation",
                    "severity": 0.89,
                    "category": "Caller ID Spoofing",
                    "reason": f"Caller claims to represent '{caller_name}', but originates from an unverified private cellular line",
                    "level": "high"
                })

        # Generic pattern risk
        if cleaned.startswith("+92") or cleaned.startswith("+234"):
            score += 35
            signals.append({
                "signal": "cross_border_syndicate_origin",
                "severity": 0.82,
                "category": "Geolocation Risk",
                "reason": "Originates from a foreign telecom corridor with elevated reported scam call center activity",
                "level": "high"
            })

        normalized_score = min(max(int(score), 8), 98)

        return {
            "score": normalized_score,
            "signals": signals,
            "cleaned_phone": cleaned,
            "report_count": report_count,
            "claims_official": claims_official
        }

phone_analyzer = PhoneAnalyzer()
