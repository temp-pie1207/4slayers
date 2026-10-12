import re
from urllib.parse import urlparse
from typing import Dict, Any, List

class URLAnalyzer:
    SUSPICIOUS_TLDS = [
        ".xyz", ".top", ".tk", ".ml", ".ga", ".cf", ".gq", ".click",
        ".live", ".loan", ".buzz", ".work", ".racing", ".vip", ".cam",
        ".monster", ".icu", ".rest", ".online"
    ]

    SHORTENERS = [
        "bit.ly", "tinyurl.com", "is.gd", "t.co", "cutt.ly", "rb.gy",
        "shorturl.at", "ow.ly", "buff.ly", "tiny.cc", "goo.gl"
    ]

    TARGET_BRANDS = [
        "hdfc", "sbi", "icici", "chase", "wellsfargo", "paypal", "apple",
        "netflix", "amazon", "fedex", "dhl", "usps", "indiapost", "paytm",
        "phonepe", "google", "microsoft", "bofa", "citibank"
    ]

    SUSPICIOUS_PATH_WORDS = [
        "kyc", "verify", "login", "signin", "otp", "pin", "restore", "suspended",
        "unblock", "security", "update", "bank", "wallet", "authenticate", "claim"
    ]

    def analyze(self, url: str) -> Dict[str, Any]:
        signals: List[Dict[str, Any]] = []
        score = 8.0  # baseline safe

        clean_url = url.strip()
        if not clean_url.startswith(("http://", "https://")):
            clean_url = "http://" + clean_url

        try:
            parsed = urlparse(clean_url)
            hostname = (parsed.hostname or "").lower()
            path = parsed.path.lower()
            query = parsed.query.lower()
        except Exception:
            hostname = clean_url.lower()
            path = ""
            query = ""

        # 1. Check IP address as host
        is_ip = bool(re.match(r'^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$', hostname))
        if is_ip:
            score += 45
            signals.append({
                "signal": "ip_address_host",
                "severity": 0.95,
                "category": "Domain Obfuscation",
                "reason": f"Direct numerical IP host ({hostname}) used instead of a verified registered domain",
                "level": "high"
            })

        # 2. Check URL shortener
        is_shortener = any(s in hostname for s in self.SHORTENERS)
        if is_shortener:
            score += 30
            signals.append({
                "signal": "url_shortener_masking",
                "severity": 0.82,
                "category": "Redirection",
                "reason": f"URL shortener ({hostname}) obscures the real destination server and bypasses static filters",
                "level": "high"
            })

        # 3. Check Suspicious TLD
        matched_tld = [tld for tld in self.SUSPICIOUS_TLDS if hostname.endswith(tld)]
        if matched_tld:
            score += 32
            signals.append({
                "signal": "high_risk_tld",
                "severity": 0.80,
                "category": "Domain Reputation",
                "reason": f"Uses high-abuse top-level domain '{matched_tld[0]}' frequently associated with automated throwaway infrastructure",
                "level": "high"
            })

        # 4. Check Brand Spoofing / Typosquatting in Hostname
        spoofed_brand = None
        for brand in self.TARGET_BRANDS:
            if brand in hostname:
                # Check if it's the exact official domain or a spoof
                # Genuine examples: hdfcbank.com, chase.com, paypal.com
                is_legit = False
                for legitimate in [f"{brand}.com", f"{brand}.in", f"{brand}.org", f"{brand}bank.com"]:
                    if hostname == legitimate or hostname.endswith(f".{legitimate}"):
                        is_legit = True
                        break
                if not is_legit:
                    spoofed_brand = brand
                    score += 42
                    signals.append({
                        "signal": "brand_typosquatting",
                        "severity": 0.94,
                        "category": "Brand Impersonation",
                        "reason": f"Domain spoofing brand name '{brand.upper()}' with deceptive naming syntax ({hostname})",
                        "level": "high"
                    })
                    break

        # 5. Check Phishing Path / Keywords
        full_path = f"{path}?{query}"
        matched_path_words = [w for w in self.SUSPICIOUS_PATH_WORDS if w in full_path]
        if matched_path_words:
            weight = min(len(matched_path_words) * 15, 30)
            score += weight
            signals.append({
                "signal": "credential_harvesting_path",
                "severity": 0.78,
                "category": "Targeting",
                "reason": f"URL endpoint contains credential harvesting triggers: {', '.join(matched_path_words[:3])}",
                "level": "medium" if len(matched_path_words) == 1 else "high"
            })

        # 6. Subdomain stacking (e.g. login.secure.bank.update.com)
        subdomain_parts = hostname.split('.')
        if len(subdomain_parts) >= 4 and not is_ip:
            score += 20
            signals.append({
                "signal": "subdomain_stacking",
                "severity": 0.72,
                "category": "Deception Structure",
                "reason": f"Multiple layered subdomains ({len(subdomain_parts) - 2} levels) designed to mislead mobile browsers",
                "level": "medium"
            })

        # 7. Insecure HTTP check
        if clean_url.startswith("http://") and not hostname.startswith("localhost") and not hostname.startswith("127.0.0.1"):
            score += 12
            signals.append({
                "signal": "unencrypted_http_protocol",
                "severity": 0.55,
                "category": "Protocol Security",
                "reason": "Cleartext HTTP protocol without SSL/TLS encryption",
                "level": "low"
            })

        normalized_score = min(max(int(score), 5), 98)

        return {
            "score": normalized_score,
            "signals": signals,
            "hostname": hostname,
            "is_shortener": is_shortener,
            "spoofed_brand": spoofed_brand
        }

url_analyzer = URLAnalyzer()
