import re
from typing import Dict, Any, List

class MessageAnalyzer:
    URGENCY_KEYWORDS = [
        "immediately", "urgent", "within 24 hours", "account blocked", "suspended",
        "action required", "last warning", "final notice", "deactivated", "expire today",
        "restricted", "security alert", "unauthorized access", "penalty", "legal action",
        "within 2 hours", "disconnected tonight", "immediate verification", "overdue"
    ]

    CREDENTIAL_KEYWORDS = [
        "otp", "one time password", "pin", "cvv", "kyc", "update kyc", "pan card",
        "verify identity", "login to restore", "share code", "debit card details",
        "ssn", "social security", "card number", "netbanking password", "re-activate"
    ]

    LURE_KEYWORDS = [
        "congratulations", "winner", "won", "lottery", "cash prize", "part-time job",
        "earn from home", "daily income", "crypto profit", "guaranteed returns",
        "cashback reward", "free gift", "claim bonus", "refund pending"
    ]

    COERCIVE_KEYWORDS = [
        "police", "fir registered", "court notice", "arrest warrant", "customs clearance",
        "electric supply disconnect", "sim block", "trai notice", "cbi inquiry"
    ]

    KNOWN_ENTITIES = {
        "HDFC Bank": ["hdfc", "hdfcbank", "hdfc-alert"],
        "State Bank of India (SBI)": ["sbi", "yono", "state bank"],
        "Chase Bank": ["chase", "jpmorgan"],
        "Wells Fargo": ["wells fargo", "wellsfargo"],
        "PayPal": ["paypal", "pay-pal"],
        "FedEx": ["fedex", "fed-ex", "fedexpress"],
        "DHL Express": ["dhl", "dhl-tracking"],
        "USPS": ["usps", "postal service"],
        "India Post": ["indiapost", "india post", "dak seva"],
        "Electricity Board": ["electricity", "power department", "bijli bill"],
        "Income Tax / IRS": ["income tax", "irs refund", "tax department", "e-filing"],
        "Apple Support": ["apple id", "icloud security"],
        "Netflix": ["netflix billing", "netflix membership", "account paused"]
    }

    def analyze(self, text: str, sender_info: str = None) -> Dict[str, Any]:
        text_lower = text.lower()
        signals: List[Dict[str, Any]] = []
        score = 10.0  # baseline safe

        # Extract entities
        extracted_urls = re.findall(r'https?://[^\s<>"]+|www\.[^\s<>"]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?', text)
        extracted_phones = re.findall(r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+91[\s-]?\d{10}|\b\d{10}\b', text)
        extracted_amounts = re.findall(r'(?:[\$€₹£]|rs\.?|inr|usd)\s*[\d,]+(?:\.\d{2})?|\b[\d,]+(?:\.\d{2})?\s*(?:usd|inr|rs|dollars)', text_lower)

        # Check urgency
        matched_urgency = [w for w in self.URGENCY_KEYWORDS if w in text_lower]
        if matched_urgency:
            weight = min(len(matched_urgency) * 18, 35)
            score += weight
            signals.append({
                "signal": "urgency_manipulation",
                "severity": min(0.6 + (len(matched_urgency) * 0.1), 0.95),
                "category": "Behavioral",
                "reason": f"High psychological pressure detected using urgency trigger words: {', '.join(matched_urgency[:3])}",
                "level": "high" if len(matched_urgency) > 1 else "medium"
            })

        # Check credential solicitation
        matched_creds = [w for w in self.CREDENTIAL_KEYWORDS if w in text_lower]
        if matched_creds:
            weight = min(len(matched_creds) * 22, 40)
            score += weight
            signals.append({
                "signal": "credential_solicitation",
                "severity": 0.92,
                "category": "Credential Harvesting",
                "reason": f"Solicits sensitive financial or identity verification data ({', '.join(matched_creds[:2])})",
                "level": "high"
            })

        # Check financial lure
        matched_lures = [w for w in self.LURE_KEYWORDS if w in text_lower]
        if matched_lures:
            score += 25
            signals.append({
                "signal": "financial_lure",
                "severity": 0.78,
                "category": "Social Engineering",
                "reason": f"Unrealistic reward, prize or lottery lure detected: {', '.join(matched_lures[:2])}",
                "level": "medium"
            })

        # Check coercive legal/authority threat
        matched_coercion = [w for w in self.COERCIVE_KEYWORDS if w in text_lower]
        if matched_coercion:
            score += 35
            signals.append({
                "signal": "authority_intimidation",
                "severity": 0.95,
                "category": "Impersonation & Fear",
                "reason": f"Severe coercive pressure impersonating enforcement authority ({', '.join(matched_coercion[:2])})",
                "level": "high"
            })

        # Check impersonation target
        impersonated = None
        for org, patterns in self.KNOWN_ENTITIES.items():
            if any(p in text_lower for p in patterns):
                impersonated = org
                break

        if impersonated:
            # If it impersonates an entity and has links or urgency, boost heavily
            score += 15
            signals.append({
                "signal": "entity_impersonation",
                "severity": 0.85,
                "category": "Impersonation",
                "reason": f"Message poses as communications from {impersonated}",
                "level": "high"
            })

        # Check sender mismatch if sender_info is provided
        if sender_info and impersonated:
            sender_lower = sender_info.lower()
            if not any(k in sender_lower for k in [impersonated.lower()[:4]]):
                score += 20
                signals.append({
                    "signal": "sender_header_anomaly",
                    "severity": 0.88,
                    "category": "Header Spoofing",
                    "reason": f"Sender ID '{sender_info}' does not correspond to genuine {impersonated} communication headers",
                    "level": "high"
                })

        # URL presence in unsolicited SMS/Text
        if extracted_urls:
            score += 15
            signals.append({
                "signal": "unsolicited_embedded_link",
                "severity": 0.75,
                "category": "Link Injection",
                "reason": f"Contains embedded external link ({extracted_urls[0][:40]}...) prompting off-platform redirection",
                "level": "medium"
            })

        normalized_score = min(max(int(score), 5), 98)

        return {
            "score": normalized_score,
            "signals": signals,
            "extracted_urls": extracted_urls,
            "extracted_phones": extracted_phones,
            "extracted_amounts": extracted_amounts,
            "impersonated_entity": impersonated
        }

message_analyzer = MessageAnalyzer()
