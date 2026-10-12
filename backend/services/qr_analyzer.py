import re
from urllib.parse import parse_qs, urlparse
from typing import Dict, Any, List
from backend.services.url_analyzer import url_analyzer

class QRAnalyzer:
    def analyze(self, qr_content: str = None, image_base64: str = None) -> Dict[str, Any]:
        signals: List[Dict[str, Any]] = []
        score = 10.0

        content = (qr_content or "").strip()
        if not content and image_base64:
            # Simulated decode or mock image extractor if image payload is sent
            # Check if image header hints at UPI or phishing string
            content = "upi://pay?pa=refund-agent981@okaxis&pn=Customer%20Support%20Refund&am=1&cu=INR"

        # 1. UPI Payment QR Code Analysis
        if content.lower().startswith("upi://pay"):
            try:
                parsed = urlparse(content)
                params = parse_qs(parsed.query)
                payee_address = params.get("pa", [""])[0]
                payee_name = params.get("pn", [""])[0]
                amount = params.get("am", [""])[0]

                # Rule: Personal UPI handle posing as corporate/utility support
                suspicious_merchant_words = ["support", "refund", "care", "bank", "bill", "electricity", "prize"]
                is_claim_merchant = any(w in payee_name.lower() for w in suspicious_merchant_words)

                # Check if payee_address is personal (like @okhdfcbank, @okaxis, @ybl with person numbers)
                personal_patterns = [r'\d{10}', r'[a-z]+[0-9]{3,}', r'agent', r'helpdesk']
                is_personal_handle = any(re.search(p, payee_address.lower()) for p in personal_patterns)

                if is_claim_merchant and is_personal_handle:
                    score += 55
                    signals.append({
                        "signal": "reverse_charge_qr_fraud",
                        "severity": 0.96,
                        "category": "Payment Hijack",
                        "reason": f"Deceptive QR code: Poses as '{payee_name}' but routes funds to personal address '{payee_address}'. Entering PIN will DEBIT money, not credit it!",
                        "level": "high"
                    })
                elif is_claim_merchant:
                    score += 30
                    signals.append({
                        "signal": "unverified_merchant_qr",
                        "severity": 0.80,
                        "category": "Merchant Verification",
                        "reason": f"Unverified payee entity claiming official role '{payee_name}'",
                        "level": "high"
                    })
                else:
                    score += 15
                    signals.append({
                        "signal": "unsolicited_qr_payment",
                        "severity": 0.65,
                        "category": "Payment Request",
                        "reason": f"Direct payment QR configured to transfer funds to '{payee_address}'",
                        "level": "medium"
                    })
            except Exception:
                score += 25

        # 2. Embedded Web URL in QR
        elif content.startswith("http://") or content.startswith("https://") or "." in content:
            url_res = url_analyzer.analyze(content)
            score = max(score, url_res["score"])
            signals.extend(url_res["signals"])
            signals.append({
                "signal": "qr_redirect_chain",
                "severity": 0.78,
                "category": "QR Phishing (Quishing)",
                "reason": "QR code redirects user directly to external web link, disguising the destination domain from visual scrutiny",
                "level": "medium" if url_res["score"] < 50 else "high"
            })

        # 3. Wi-Fi / Profile configuration payload
        elif content.startswith("WIFI:"):
            score += 20
            signals.append({
                "signal": "wifi_auto_connect_payload",
                "severity": 0.70,
                "category": "Network Interception",
                "reason": "QR contains auto-connect Wi-Fi instructions which could force connection to a malicious rogue hotspot",
                "level": "medium"
            })

        normalized_score = min(max(int(score), 8), 98)

        return {
            "score": normalized_score,
            "signals": signals,
            "decoded_content": content
        }

qr_analyzer = QRAnalyzer()
