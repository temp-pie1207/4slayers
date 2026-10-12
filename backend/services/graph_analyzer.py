from typing import Dict, Any, List

class GraphAnalyzer:
    def build_scam_dna(self,
                       scan_type: str,
                       input_summary: str,
                       extracted_urls: List[str] = None,
                       extracted_phones: List[str] = None,
                       payment_recipient: str = None,
                       impersonated_brand: str = None,
                       identified_pattern: str = None,
                       risk_score: int = 50) -> Dict[str, Any]:

        nodes = []
        links = []
        extracted_urls = extracted_urls or []
        extracted_phones = extracted_phones or []

        # 1. Root Source Node
        source_id = "node_source"
        nodes.append({
            "id": source_id,
            "label": f"Inbound {scan_type.upper()}",
            "type": "message" if scan_type in ["message", "screenshot"] else scan_type,
            "risk": min(risk_score / 100.0, 1.0),
            "details": input_summary[:60] + "..." if len(input_summary) > 60 else input_summary
        })

        # 2. Phone Node
        if extracted_phones:
            phone = extracted_phones[0]
            phone_id = "node_phone"
            nodes.append({
                "id": phone_id,
                "label": f"Origin: {phone}",
                "type": "phone",
                "risk": 0.85 if risk_score > 60 else 0.40,
                "details": f"Unregistered telecom routing ({phone})"
            })
            links.append({
                "source": source_id,
                "target": phone_id,
                "relationship": "originates_from",
                "weight": 0.85
            })

        # 3. URL & Domain Nodes
        if extracted_urls:
            url = extracted_urls[0]
            url_id = "node_url"
            domain = url.split("/")[2] if "/" in url.replace("http://", "").replace("https://", "") else url
            domain = domain.split(":")[0]

            nodes.append({
                "id": url_id,
                "label": f"Link: {url[:28]}...",
                "type": "url",
                "risk": 0.90 if risk_score > 60 else 0.35,
                "details": f"Target endpoint: {url}"
            })
            links.append({
                "source": source_id,
                "target": url_id,
                "relationship": "contains_hyperlink",
                "weight": 0.90
            })

            domain_id = "node_domain"
            nodes.append({
                "id": domain_id,
                "label": f"Host: {domain}",
                "type": "domain",
                "risk": 0.88 if risk_score > 60 else 0.30,
                "details": f"Suspicious registration zone: {domain}"
            })
            links.append({
                "source": url_id,
                "target": domain_id,
                "relationship": "resolves_to_host",
                "weight": 0.85
            })

        # 4. Payment Node
        if payment_recipient:
            pay_id = "node_payment"
            nodes.append({
                "id": pay_id,
                "label": f"Payee: {payment_recipient}",
                "type": "payment",
                "risk": 0.92 if risk_score > 60 else 0.40,
                "details": f"Designated beneficiary account: {payment_recipient}"
            })
            links.append({
                "source": source_id,
                "target": pay_id,
                "relationship": "demands_payment_to",
                "weight": 0.92
            })

        # 5. Targeted Brand Node
        if impersonated_brand:
            brand_id = "node_brand"
            nodes.append({
                "id": brand_id,
                "label": f"Spoofed: {impersonated_brand}",
                "type": "victim",
                "risk": 0.95,
                "details": f"Legitimate brand spoofed: {impersonated_brand}"
            })
            links.append({
                "source": source_id,
                "target": brand_id,
                "relationship": "impersonates_identity",
                "weight": 0.95
            })

        # 6. Known Scam Pattern / Syndicate Node
        pattern_label = identified_pattern or ("High-Impact Phishing Vector" if risk_score >= 60 else "Low-Risk Inbound Communication")
        pattern_id = "node_pattern"
        nodes.append({
            "id": pattern_id,
            "label": f"Campaign: {pattern_label}",
            "type": "pattern",
            "risk": 0.89 if risk_score >= 60 else 0.20,
            "details": f"Correlates with signature '{pattern_label}'"
        })
        links.append({
            "source": source_id,
            "target": pattern_id,
            "relationship": "matches_signature",
            "weight": 0.88
        })

        if extracted_urls and payment_recipient:
            links.append({
                "source": "node_url",
                "target": "node_payment",
                "relationship": "redirects_to_payment",
                "weight": 0.80
            })

        # Multi-signal confidence calculation
        channels_connected = len(nodes) - 1  # excluding source
        if channels_connected >= 4:
            confidence_multiplier = 1.38
            cluster_pattern = "Complex Multi-Vector Syndicate Campaign"
        elif channels_connected >= 2:
            confidence_multiplier = 1.20
            cluster_pattern = "Correlated Dual-Channel Threat Vector"
        else:
            confidence_multiplier = 1.0
            cluster_pattern = "Isolated Single-Signal Probe"

        return {
            "nodes": nodes,
            "links": links,
            "confidence_multiplier": confidence_multiplier,
            "cluster_pattern": cluster_pattern
        }

graph_analyzer = GraphAnalyzer()
