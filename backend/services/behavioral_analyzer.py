from typing import Dict, Any, List

class BehavioralAnalyzer:
    BEHAVIORAL_PATTERNS = {
        "time_pressure": {
            "keywords": ["urgent", "immediately", "within 24 hours", "within 2 hours", "today only", "expire soon", "hurry", "right now", "last day"],
            "title": "Time Pressure Manipulation",
            "reason": "Artificially compresses decision time to bypass critical thinking and analytical hesitation.",
            "weight": 30
        },
        "fear_intimidation": {
            "keywords": ["police", "arrest", "court", "fir", "fine", "penalty", "disconnect", "blocked", "legal action", "seized", "criminal"],
            "title": "Fear & Intimidation Induction",
            "reason": "Induces panic by threatening punitive legal, financial, or service termination consequences.",
            "weight": 35
        },
        "authority_exploitation": {
            "keywords": ["cyber cell", "cbi", "rbi", "customs", "supreme court", "fraud prevention department", "bank manager", "telecom officer", "irs officer"],
            "title": "Authority Exploitation",
            "reason": "Leverages perceived hierarchical authority to demand unquestioned compliance.",
            "weight": 30
        },
        "isolation_technique": {
            "keywords": ["do not tell", "confidential call", "do not disconnect", "keep secret", "stay on line", "private matter", "do not share with family"],
            "title": "Victim Isolation Tactic",
            "reason": "Attempts to isolate the victim from friends, family, or official advisory channels.",
            "weight": 40
        },
        "greed_curiosity": {
            "keywords": ["lottery", "cash prize", "earned", "refund of", "double your money", "part time salary", "bonus unlocked"],
            "title": "Reward & Greed Induction",
            "reason": "Exploits financial vulnerability or desire for effortless profit to distract from structural red flags.",
            "weight": 25
        }
    }

    def analyze(self, text: str) -> Dict[str, Any]:
        text_lower = (text or "").lower()
        signals: List[Dict[str, Any]] = []
        score = 10.0

        for pattern_key, meta in self.BEHAVIORAL_PATTERNS.items():
            matched = [k for k in meta["keywords"] if k in text_lower]
            if matched:
                score += meta["weight"]
                signals.append({
                    "signal": pattern_key,
                    "severity": min(0.65 + (len(matched) * 0.1), 0.95),
                    "category": meta["title"],
                    "reason": f"{meta['reason']} Detected cues: {', '.join(matched[:3])}",
                    "level": "high" if len(matched) > 1 or meta["weight"] >= 35 else "medium"
                })

        normalized_score = min(max(int(score), 10), 98)

        return {
            "score": normalized_score,
            "signals": signals,
            "tactics_count": len(signals)
        }

behavioral_analyzer = BehavioralAnalyzer()
