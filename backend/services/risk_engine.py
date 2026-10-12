from typing import Dict, Any

class RiskEngine:
    WEIGHTS = {
        "message": 0.25,
        "url": 0.25,
        "behavior": 0.20,
        "pattern": 0.15,
        "network": 0.15
    }

    def compute_composite_risk(self,
                               message_score: float = 10.0,
                               url_score: float = 10.0,
                               behavior_score: float = 10.0,
                               pattern_score: float = 10.0,
                               network_score: float = 10.0,
                               confidence_multiplier: float = 1.0) -> Dict[str, Any]:

        raw_weighted = (
            message_score * self.WEIGHTS["message"] +
            url_score * self.WEIGHTS["url"] +
            behavior_score * self.WEIGHTS["behavior"] +
            pattern_score * self.WEIGHTS["pattern"] +
            network_score * self.WEIGHTS["network"]
        )

        # Apply multi-channel synergy boost if multiple distinct signals are elevated (> 60)
        elevated_count = sum(1 for s in [message_score, url_score, behavior_score, pattern_score] if s >= 60)
        synergy_bonus = 0
        if elevated_count >= 3:
            synergy_bonus = 15
        elif elevated_count == 2:
            synergy_bonus = 8

        final_score = int(min(max((raw_weighted * confidence_multiplier) + synergy_bonus, 5), 99))

        if final_score >= 80:
            level = "Critical Risk"
        elif final_score >= 60:
            level = "High Risk"
        elif final_score >= 30:
            level = "Medium Risk"
        else:
            level = "Low Risk"

        return {
            "risk_score": final_score,
            "risk_level": level,
            "breakdown": {
                "message_analysis": round(message_score, 1),
                "url_analysis": round(url_score, 1),
                "behavior_analysis": round(behavior_score, 1),
                "known_patterns": round(pattern_score, 1),
                "network_signals": round(network_score, 1)
            }
        }

risk_engine = RiskEngine()
