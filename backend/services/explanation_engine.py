from typing import Dict, Any, List

class ExplanationEngine:
    def generate_explanations(self,
                              scan_type: str,
                              risk_score: int,
                              signals: List[Dict[str, Any]],
                              impersonated_entity: str = None,
                              extracted_urls: List[str] = None) -> Dict[str, Any]:

        simple_reasons: List[str] = []
        technical_reasons: List[str] = []

        if risk_score >= 60:
            if impersonated_entity:
                simple_reasons.append(
                    f"This communication falsely claims to be from {impersonated_entity} to make you trust it."
                )
                technical_reasons.append(
                    f"Entity impersonation signature detected against verified domain/sender whitelist for '{impersonated_entity}'."
                )

            # Check specific signal patterns
            signal_keys = [s.get("signal", "") for s in signals]

            if any("urgency" in s or "pressure" in s for s in signal_keys):
                simple_reasons.append(
                    "It uses alarming words like 'blocked', 'immediate', or 'urgent' to make you panic and react quickly."
                )
                technical_reasons.append(
                    "NLP lexical urgency score exceeded threshold (0.75+), indicating artificial time compression."
                )

            if any("credential" in s or "harvest" in s for s in signal_keys):
                simple_reasons.append(
                    "It asks for your secret PIN, password, OTP, or KYC documents. Real banks never ask for these via text or unsolicited links."
                )
                technical_reasons.append(
                    "Identified explicit credential-solicitation tokens targeting high-value authentication credentials (OTP/PIN/CVV)."
                )

            if any("tld" in s or "shortener" in s or "domain" in s or "typosquatting" in s for s in signal_keys) or extracted_urls:
                simple_reasons.append(
                    "The web link is not an official address. It hides where you are going or uses a deceptive copycat address."
                )
                technical_reasons.append(
                    "Domain heuristic alert: shortened URI or deceptive TLD/homograph divergence from legitimate brand registrar."
                )

            if any("payment" in s or "wire" in s or "qr" in s for s in signal_keys):
                simple_reasons.append(
                    "It prompts you to send money or scan a QR code. Entering your PIN on a QR code pays money, it never receives money."
                )
                technical_reasons.append(
                    "Payment payload inspection flagged direct peer-to-peer settlement address with zero chargeback escrow protection."
                )

            if not simple_reasons:
                simple_reasons.append(
                    "Multiple warning signs match known fraud campaigns tracked in our threat database."
                )
                technical_reasons.append(
                    "Composite risk multi-signal aggregator crossed defensive threshold based on Bayesian threat heuristics."
                )

            verdict_summary = f"Critical scam threat detected! High likelihood of {impersonated_entity or 'financial'} impersonation fraud." if risk_score >= 80 else "Suspicious input flagged with multiple social engineering indicators."

        elif risk_score >= 30:
            simple_reasons.append("Contains some unusual phrasing or unverified links that warrant caution.")
            technical_reasons.append("Medium-tier threat score: Low-to-moderate heuristic triggers without definitive credential harvesting.")
            verdict_summary = "Moderate risk. Exercise caution before clicking or replying."
        else:
            simple_reasons.append("No immediate fraud or phishing patterns were detected in this input.")
            technical_reasons.append("All NLP, domain reputation, and behavioral indicators returned benign values below baseline thresholds.")
            verdict_summary = "Safe / Low Risk. Normal communication pattern detected."

        return {
            "simple": simple_reasons,
            "technical": technical_reasons,
            "verdict_summary": verdict_summary,
            "impersonated_entity": impersonated_entity
        }

    def predict_next_moves(self, risk_score: int, scam_type: str, signals: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        predictions = []

        if risk_score >= 60:
            predictions.append({
                "action": "User redirected to a cloned, fake login or KYC portal",
                "confidence": 92 if risk_score >= 80 else 81,
                "timeline": "Immediate (upon clicking the link)",
                "detail": "A counterfeit replica of the official institution's portal designed to log keystrokes."
            })
            predictions.append({
                "action": "Attacker will request an OTP or 2FA authentication code",
                "confidence": 88 if risk_score >= 80 else 76,
                "timeline": "Within 1 to 3 minutes",
                "detail": "Fraudster triggers a live login attempt on real banking portal and prompts victim for incoming OTP."
            })
            predictions.append({
                "action": "Victim receives an automated or urgent follow-up voice call",
                "confidence": 74,
                "timeline": "Within 10 to 30 minutes",
                "detail": "A caller posing as a fraud investigator or customer care agent to reinforce the panic and demand immediate action."
            })
        elif risk_score >= 30:
            predictions.append({
                "action": "Potential promotional redirect or subscription opt-in trap",
                "confidence": 65,
                "timeline": "Upon interaction",
                "detail": "User may be prompted for email/phone number to receive spam marketing or unwanted subscriptions."
            })
        else:
            predictions.append({
                "action": "Standard legitimate recipient workflow",
                "confidence": 95,
                "timeline": "Standard",
                "detail": "Expected routine communication with no malicious redirection sequence identified."
            })

        return predictions

    def get_recommended_actions(self, risk_score: int, scam_type: str) -> List[Dict[str, Any]]:
        actions = []

        if risk_score >= 60:
            actions = [
                {
                    "step": 1,
                    "title": "Do not click the link or scan the QR code",
                    "instruction": "Avoid opening any embedded hyperlinks, downloading attachments, or scanning QR codes from this source.",
                    "priority": "critical",
                    "icon_type": "ban"
                },
                {
                    "step": 2,
                    "title": "Never share OTP, PIN, password, or CVV",
                    "instruction": "Legitimate banks and government agencies will never ask for your secret verification code, PIN, or netbanking password.",
                    "priority": "critical",
                    "icon_type": "shield-alert"
                },
                {
                    "step": 3,
                    "title": "Stop all communication immediately",
                    "instruction": "Do not reply to the message, answer incoming calls, or confront the sender. Block the sender number.",
                    "priority": "high",
                    "icon_type": "phone-off"
                },
                {
                    "step": 4,
                    "title": "Verify through official verified channels only",
                    "instruction": "If in doubt, call the official customer care number printed directly on the back of your debit card or official website.",
                    "priority": "high",
                    "icon_type": "check-circle"
                },
                {
                    "step": 5,
                    "title": "Report incident to 4SLAYERS Community & Cyber Cell",
                    "instruction": "Submit this incident to the 4SLAYERS Scam Intelligence database and your national cyber crime portal (e.g. cybercrime.gov.in / IC3).",
                    "priority": "medium",
                    "icon_type": "flag"
                },
                {
                    "step": 6,
                    "title": "If money was already transferred: act immediately",
                    "instruction": "Call your bank's 24/7 fraud helpline right away to block your card, freeze the beneficiary transaction, and lodge a dispute.",
                    "priority": "critical",
                    "icon_type": "alert-triangle"
                }
            ]
        elif risk_score >= 30:
            actions = [
                {
                    "step": 1,
                    "title": "Proceed with caution",
                    "instruction": "Verify the sender before opening links or downloading files.",
                    "priority": "medium",
                    "icon_type": "alert-circle"
                },
                {
                    "step": 2,
                    "title": "Inspect the URL destination carefully",
                    "instruction": "Look at the browser address bar to ensure the domain matches the official website.",
                    "priority": "medium",
                    "icon_type": "search"
                }
            ]
        else:
            actions = [
                {
                    "step": 1,
                    "title": "Safe communication",
                    "instruction": "Nothing suspicious was detected, but continue to practice standard cybersecurity hygiene.",
                    "priority": "preventive",
                    "icon_type": "shield-check"
                }
            ]

        return actions

explanation_engine = ExplanationEngine()
