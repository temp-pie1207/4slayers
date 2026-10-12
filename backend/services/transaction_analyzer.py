from typing import Dict, Any, List

class TransactionAnalyzer:
    HIGH_RISK_METHODS = [
        "gift card", "crypto", "bitcoin", "usdt", "wire transfer",
        "western union", "moneygram", "unverified upi", "instant debit"
    ]

    HIGH_RISK_MEMOS = [
        "fine", "tax penalty", "kyc unlock", "customs fee", "security deposit",
        "job registration fee", "processing fee", "advance fee", "refund deposit",
        "electricity bill", "police clearance", "overdue fine"
    ]

    def analyze(self, amount: float, recipient: str, payment_method: str, description: str = "") -> Dict[str, Any]:
        signals: List[Dict[str, Any]] = []
        score = 10.0

        desc_lower = (description or "").lower()
        method_lower = (payment_method or "").lower()
        recipient_lower = (recipient or "").lower()

        # 1. Payment Method Risk
        if any(m in method_lower for m in ["gift card", "crypto", "bitcoin", "usdt", "western union"]):
            score += 48
            signals.append({
                "signal": "non_reversible_payment_channel",
                "severity": 0.94,
                "category": "Payment Method",
                "reason": f"Payment method '{payment_method}' is irreversible with zero chargeback protection or fraud insurance",
                "level": "high"
            })
        elif "upi" in method_lower or "p2p" in method_lower or "zelle" in method_lower:
            score += 18
            signals.append({
                "signal": "direct_peer_to_peer_transfer",
                "severity": 0.70,
                "category": "Settlement Mechanism",
                "reason": "Direct instantaneous settlement to individual account without escrow safeguards",
                "level": "medium"
            })

        # 2. Transaction Memo / Coercive context
        matched_memos = [m for m in self.HIGH_RISK_MEMOS if m in desc_lower]
        if matched_memos:
            score += 35
            signals.append({
                "signal": "advance_fee_coercion_context",
                "severity": 0.90,
                "category": "Transaction Purpose",
                "reason": f"Memo contains advance-fee or penalty coercion keyword: '{matched_memos[0]}'",
                "level": "high"
            })

        # 3. Recipient Discrepancy
        official_terms = ["customs", "tax", "police", "court", "bank", "government", "electricity", "delivery"]
        claims_official_fee = any(w in desc_lower for w in official_terms)

        is_personal_recipient = ("@" in recipient_lower and not any(k in recipient_lower for k in [".gov", ".org", "merchant"])) or \
                                (recipient_lower.replace(" ", "").isalnum() and not any(k in recipient_lower for k in ["corp", "ltd", "inc"]))

        if claims_official_fee and is_personal_recipient:
            score += 40
            signals.append({
                "signal": "personal_account_for_official_fee",
                "severity": 0.96,
                "category": "Recipient Integrity",
                "reason": f"Official fee/penalty claimed in description, but payment is routed to personal account '{recipient}'",
                "level": "high"
            })

        # 4. Micro-amount probe check
        if 0.0 < amount <= 2.0 and ("verify" in desc_lower or "test" in desc_lower or "kyc" in desc_lower):
            score += 25
            signals.append({
                "signal": "micro_transaction_probe",
                "severity": 0.75,
                "category": "Account Probing",
                "reason": f"Nominal charge of {amount} fits micro-deposit probing tactics to validate active accounts for automated debits",
                "level": "medium"
            })

        normalized_score = min(max(int(score), 10), 98)

        return {
            "score": normalized_score,
            "signals": signals,
            "amount": amount,
            "recipient": recipient,
            "method": payment_method
        }

transaction_analyzer = TransactionAnalyzer()
