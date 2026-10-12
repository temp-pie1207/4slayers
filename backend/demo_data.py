DEMO_PRESETS = {
    "demo1": {
        "id": "demo1",
        "title": "Demo 1: Fake Bank KYC SMS",
        "type": "message",
        "input_summary": "Dear HDFC Customer, your NetBanking account will be suspended today due to pending KYC. Click http://hdfc-bank-verify-kyc.xyz/update to prevent block immediately.",
        "risk_score": 94,
        "risk_level": "Critical Risk",
        "breakdown": {
            "message_analysis": 92.0,
            "url_analysis": 96.0,
            "behavior_analysis": 88.0,
            "known_patterns": 95.0,
            "network_signals": 84.0
        },
        "signals": [
            {
                "signal": "entity_impersonation",
                "severity": 0.95,
                "category": "Impersonation",
                "reason": "Deceptively impersonates 'HDFC Bank' using forged institutional terminology",
                "level": "high"
            },
            {
                "signal": "urgency_manipulation",
                "severity": 0.90,
                "category": "Behavioral",
                "reason": "Artificial emergency pressure: 'suspended today' and 'prevent block immediately'",
                "level": "high"
            },
            {
                "signal": "brand_typosquatting",
                "severity": 0.96,
                "category": "Domain Infrastructure",
                "reason": "Phishing domain 'hdfc-bank-verify-kyc.xyz' registered on high-abuse .xyz TLD; not an official HDFC Bank registrar",
                "level": "high"
            },
            {
                "signal": "credential_solicitation",
                "severity": 0.94,
                "category": "Credential Harvesting",
                "reason": "Forces immediate KYC re-verification designed to intercept customer netbanking credentials and OTPs",
                "level": "high"
            }
        ],
        "explanations": {
            "simple": [
                "This message is a dangerous fake claiming to be from HDFC Bank.",
                "It uses panic threats ('account suspended today') to rush you into making a mistake.",
                "The web link 'hdfc-bank-verify-kyc.xyz' is a copycat phishing page created by scammers.",
                "Real banks NEVER send links via SMS to update KYC or ask for netbanking passwords."
            ],
            "technical": [
                "Divergence from authentic HDFC Bank DNS SPF/DKIM validation matrix; originating from unauthorized mass SMS gateway.",
                "Typosquatted domain with high entropy using keyword stuffing ('verify-kyc') hosted on cheap disposable infrastructure.",
                "Matches Syndicate-42 KYC Hijack campaign signature active across 140+ recent incidents."
            ],
            "verdict_summary": "Critical Threat: Active Bank Impersonation & Credential Harvesting Campaign",
            "impersonated_entity": "HDFC Bank"
        },
        "scam_dna": {
            "nodes": [
                {"id": "s_msg", "label": "Suspicious SMS", "type": "message", "risk": 0.94, "details": "SMS received from unverified sender (+91 98210-XX941)"},
                {"id": "s_phone", "label": "+91 98210-XX941", "type": "phone", "risk": 0.88, "details": "Disposable burner SIM flagged in 18 community reports"},
                {"id": "s_url", "label": "hdfc-bank-verify-kyc.xyz", "type": "url", "risk": 0.98, "details": "Phishing portal hosted on offshore IP 185.220.101.4"},
                {"id": "s_domain", "label": "Disguised Host", "type": "domain", "risk": 0.92, "details": "Registered 48 hours ago, Cloudflare masked"},
                {"id": "s_pattern", "label": "Syndicate-42 KYC Hijack", "type": "pattern", "risk": 0.95, "details": "Cluster targeting Indian private banking users"},
                {"id": "s_victim", "label": "Target: HDFC Customers", "type": "victim", "risk": 0.96, "details": "Brand impersonation victim"}
            ],
            "links": [
                {"source": "s_msg", "target": "s_phone", "relationship": "originates_from", "weight": 0.90},
                {"source": "s_msg", "target": "s_url", "relationship": "contains_hyperlink", "weight": 0.98},
                {"source": "s_url", "target": "s_domain", "relationship": "resolves_to", "weight": 0.92},
                {"source": "s_msg", "target": "s_victim", "relationship": "spoofs_identity", "weight": 0.95},
                {"source": "s_msg", "target": "s_pattern", "relationship": "matches_signature", "weight": 0.95}
            ],
            "confidence_multiplier": 1.35,
            "cluster_pattern": "Syndicate-42 Multi-Channel Banking Phishing Network"
        },
        "next_moves": [
            {
                "action": "Redirected to authentic-looking cloned HDFC login screen",
                "confidence": 96,
                "timeline": "Immediate (upon clicking the link)",
                "detail": "Keystroke logger harvests Customer ID and Password in real-time."
            },
            {
                "action": "Fraudster triggers live OTP request to victim's phone",
                "confidence": 92,
                "timeline": "Within 90 seconds",
                "detail": "Fake page prompts: 'Enter OTP sent to your registered mobile number'."
            },
            {
                "action": "Immediate unauthorized fund siphon via IMPS/NEFT",
                "confidence": 88,
                "timeline": "Within 3 minutes",
                "detail": "Funds routed to mule accounts once OTP is submitted."
            }
        ],
        "recommended_actions": [
            {
                "step": 1,
                "title": "DO NOT CLICK the link under any circumstances",
                "instruction": "Opening the link can expose browser cookies and session data.",
                "priority": "critical",
                "icon_type": "ban"
            },
            {
                "step": 2,
                "title": "Never share your NetBanking password or OTP",
                "instruction": "HDFC Bank will NEVER request credentials or OTPs via SMS links.",
                "priority": "critical",
                "icon_type": "shield-alert"
            },
            {
                "step": 3,
                "title": "Block the sender number (+91 98210-XX941)",
                "instruction": "Add to your device blocklist and report as spam to your mobile carrier.",
                "priority": "high",
                "icon_type": "phone-off"
            },
            {
                "step": 4,
                "title": "Verify your account status via official HDFC app or phone",
                "instruction": "Open the official mobile banking app or call 1800-202-6161.",
                "priority": "high",
                "icon_type": "check-circle"
            },
            {
                "step": 5,
                "title": "Report incident to 4SLAYERS Community & Cyber Crime (1930)",
                "instruction": "Reporting helps neutralize the malicious domain and warn other users.",
                "priority": "medium",
                "icon_type": "flag"
            }
        ],
        "created_at": "2026-10-04T12:30:00Z",
        "is_demo": True
    },

    "demo2": {
        "id": "demo2",
        "title": "Demo 2: Suspicious Shortened URL",
        "type": "url",
        "input_summary": "http://bit.ly/secure-account-verify-login89",
        "risk_score": 82,
        "risk_level": "High Risk",
        "breakdown": {
            "message_analysis": 45.0,
            "url_analysis": 94.0,
            "behavior_analysis": 72.0,
            "known_patterns": 86.0,
            "network_signals": 78.0
        },
        "signals": [
            {
                "signal": "url_shortener_masking",
                "severity": 0.88,
                "category": "Redirection",
                "reason": "URL shortener (bit.ly) disguises malicious target destination from reputation scanning",
                "level": "high"
            },
            {
                "signal": "credential_harvesting_path",
                "severity": 0.90,
                "category": "Targeting",
                "reason": "Slug contains deceptive authentication tokens: 'secure', 'account', 'verify', 'login'",
                "level": "high"
            },
            {
                "signal": "unencrypted_http_protocol",
                "severity": 0.60,
                "category": "Protocol Security",
                "reason": "Cleartext HTTP protocol used instead of valid SSL certificate",
                "level": "medium"
            }
        ],
        "explanations": {
            "simple": [
                "This shortened link is deliberately masked to hide the real destination.",
                "The web address uses keywords like 'secure-account-verify' to trick you into trusting it.",
                "Scammers use shortened links to bypass spam filters before redirecting you to an attack page."
            ],
            "technical": [
                "Hop redirect analysis indicates 3-tier bounce chain resolving to Russian federation host IP 91.215.85.12.",
                "Target landing page contains cloned OAuth form targeting Google/Microsoft credentials."
            ],
            "verdict_summary": "High Risk: Obfuscated Phishing Link with Multi-Hop Redirect Chain",
            "impersonated_entity": "Account Verification Portal"
        },
        "scam_dna": {
            "nodes": [
                {"id": "d2_root", "label": "Shortened Bitly Link", "type": "url", "risk": 0.82, "details": "bit.ly/secure-account-verify-login89"},
                {"id": "d2_hop1", "label": "Redirect Hop 1", "type": "url", "risk": 0.86, "details": "cdn-cloud-storage-auth.xyz"},
                {"id": "d2_host", "label": "Host: 91.215.85.12", "type": "domain", "risk": 0.91, "details": "Bulletproof hosting autonomous system"},
                {"id": "d2_pat", "label": "Credential Harvester", "type": "pattern", "risk": 0.88, "details": "Cloned identity provider login form"}
            ],
            "links": [
                {"source": "d2_root", "target": "d2_hop1", "relationship": "redirects_through", "weight": 0.90},
                {"source": "d2_hop1", "target": "d2_host", "relationship": "resolves_to", "weight": 0.88},
                {"source": "d2_host", "target": "d2_pat", "relationship": "hosts_attack_kit", "weight": 0.85}
            ],
            "confidence_multiplier": 1.25,
            "cluster_pattern": "Obfuscated Redirect Harvester Cluster"
        },
        "next_moves": [
            {
                "action": "User prompted to log into email or enterprise cloud account",
                "confidence": 89,
                "timeline": "Immediate upon loading",
                "detail": "Fake single sign-on modal capturing username and password."
            },
            {
                "action": "Session cookie interception or malware payload download",
                "confidence": 75,
                "timeline": "Within 30 seconds",
                "detail": "Attempts drive-by download of malicious browser extension or info-stealer."
            }
        ],
        "recommended_actions": [
            {
                "step": 1,
                "title": "Do not open or click the shortened link",
                "instruction": "Never open shortened links from unknown or unverified senders.",
                "priority": "critical",
                "icon_type": "ban"
            },
            {
                "step": 2,
                "title": "Use a link expander tool if inspection is required",
                "instruction": "Use 4SLAYERS or checkurl services without opening the link in your browser.",
                "priority": "medium",
                "icon_type": "search"
            }
        ],
        "created_at": "2026-10-04T12:35:00Z",
        "is_demo": True
    },

    "demo3": {
        "id": "demo3",
        "title": "Demo 3: Fake Delivery Package SMS",
        "type": "message",
        "input_summary": "FedEx Alert: Your shipment #US-88219 has failed delivery due to missing street address. Update address within 12h or package will be returned to sender: https://fedx-redelivery-hub.top/track",
        "risk_score": 86,
        "risk_level": "High Risk",
        "breakdown": {
            "message_analysis": 85.0,
            "url_analysis": 91.0,
            "behavior_analysis": 82.0,
            "known_patterns": 89.0,
            "network_signals": 75.0
        },
        "signals": [
            {
                "signal": "entity_impersonation",
                "severity": 0.94,
                "category": "Courier Impersonation",
                "reason": "Impersonates FedEx parcel delivery logistics service",
                "level": "high"
            },
            {
                "signal": "urgency_manipulation",
                "severity": 0.85,
                "category": "Behavioral",
                "reason": "12-hour ultimatum threatens return of package to sender to force hasty action",
                "level": "high"
            },
            {
                "signal": "brand_typosquatting",
                "severity": 0.95,
                "category": "Domain Infrastructure",
                "reason": "Deceptive typo domain 'fedx-redelivery-hub.top' registered on suspicious .top TLD (official domain is fedex.com)",
                "level": "high"
            }
        ],
        "explanations": {
            "simple": [
                "This message is a classic delivery package scam mimicking FedEx.",
                "It claims your package cannot be delivered to make you click their fake link.",
                "Notice the misspelled web address 'fedx-redelivery-hub.top' instead of the real 'fedex.com'.",
                "Once on the site, they will ask for a small 'redelivery fee' ($1.99) to steal your credit card number."
            ],
            "technical": [
                "Sender lacks FedEx shortcode designation (received from random VoIP series).",
                "Domain 'fedx-redelivery-hub.top' registered 5 days ago via NameCheap with Whois privacy.",
                "Matches the widespread 'Smishing Package Redelivery' template active globally."
            ],
            "verdict_summary": "High Risk: Fake Courier Delivery Scam & Credit Card Harvesting Form",
            "impersonated_entity": "FedEx"
        },
        "scam_dna": {
            "nodes": [
                {"id": "d3_sms", "label": "Delivery SMS", "type": "message", "risk": 0.86, "details": "Package failed delivery notification"},
                {"id": "d3_brand", "label": "Spoofed: FedEx", "type": "victim", "risk": 0.95, "details": "Legitimate global logistics brand"},
                {"id": "d3_link", "label": "fedx-redelivery-hub.top", "type": "url", "risk": 0.94, "details": "Counterfeit tracking page"},
                {"id": "d3_pay", "label": "Card Fee Form ($1.99)", "type": "payment", "risk": 0.92, "details": "Credit card data skimmer"},
                {"id": "d3_pat", "label": "Smishing Redelivery Syndicate", "type": "pattern", "risk": 0.89, "details": "Automated worldwide parcel scam"}
            ],
            "links": [
                {"source": "d3_sms", "target": "d3_brand", "relationship": "impersonates", "weight": 0.95},
                {"source": "d3_sms", "target": "d3_link", "relationship": "contains_link", "weight": 0.92},
                {"source": "d3_link", "target": "d3_pay", "relationship": "charges_fake_fee", "weight": 0.90},
                {"source": "d3_pay", "target": "d3_pat", "relationship": "funnels_stolen_cards", "weight": 0.88}
            ],
            "confidence_multiplier": 1.30,
            "cluster_pattern": "Smishing Package Redelivery Network"
        },
        "next_moves": [
            {
                "action": "Victim asked to re-enter delivery address and phone number",
                "confidence": 95,
                "timeline": "Step 1 on fake portal",
                "detail": "Harvests full home address and contact details for future phishing."
            },
            {
                "action": "Prompts victim to pay nominal $1.99 redelivery fee by credit card",
                "confidence": 91,
                "timeline": "Step 2 on fake portal",
                "detail": "Steals full card number, expiration date, and CVV; initiates recurring fraudulent charges."
            }
        ],
        "recommended_actions": [
            {
                "step": 1,
                "title": "Do not enter your credit card or address",
                "instruction": "Legitimate couriers do not require fee payment via SMS links for redelivery.",
                "priority": "critical",
                "icon_type": "ban"
            },
            {
                "step": 2,
                "title": "Check tracking directly on official fedex.com",
                "instruction": "Open a new browser window and type fedex.com manually.",
                "priority": "high",
                "icon_type": "check-circle"
            }
        ],
        "created_at": "2026-10-04T12:40:00Z",
        "is_demo": True
    },

    "demo4": {
        "id": "demo4",
        "title": "Demo 4: Normal Promotional Message",
        "type": "message",
        "input_summary": "Nike Store Weekend Sale: Enjoy 20% off on all running sneakers until Sunday! Visit your nearest store or check collections online at https://www.nike.com/running",
        "risk_score": 14,
        "risk_level": "Low Risk",
        "breakdown": {
            "message_analysis": 12.0,
            "url_analysis": 8.0,
            "behavior_analysis": 15.0,
            "known_patterns": 10.0,
            "network_signals": 12.0
        },
        "signals": [
            {
                "signal": "verified_official_domain",
                "severity": 0.05,
                "category": "Domain Reputation",
                "reason": "URL points to the verified official root registrar domain: nike.com",
                "level": "low"
            },
            {
                "signal": "standard_marketing_language",
                "severity": 0.15,
                "category": "Tone Analysis",
                "reason": "Standard retail discount advertisement without coercive threats or sensitive data solicitation",
                "level": "low"
            }
        ],
        "explanations": {
            "simple": [
                "This message appears to be a legitimate retail marketing advertisement.",
                "The web link connects directly to the authentic official Nike website (nike.com).",
                "It does not ask for personal secrets, passwords, or urgent banking transfers."
            ],
            "technical": [
                "Domain TLS certificate is valid, issued to Nike Inc.",
                "Zero credential harvesting or suspicious redirection vectors detected.",
                "Tone analysis classifies as standard promotional broadcast with zero intimidation cues."
            ],
            "verdict_summary": "Low Risk: Legitimate Brand Promotional Communication",
            "impersonated_entity": None
        },
        "scam_dna": {
            "nodes": [
                {"id": "d4_msg", "label": "Promo SMS", "type": "message", "risk": 0.14, "details": "Retail sale advertisement"},
                {"id": "d4_url", "label": "https://www.nike.com", "type": "url", "risk": 0.05, "details": "Verified official corporate domain"}
            ],
            "links": [
                {"source": "d4_msg", "target": "d4_url", "relationship": "links_to_official_store", "weight": 0.95}
            ],
            "confidence_multiplier": 1.0,
            "cluster_pattern": "Verified Legitimate Retail Campaign"
        },
        "next_moves": [
            {
                "action": "Opens official Nike shopping catalog",
                "confidence": 99,
                "timeline": "Upon clicking",
                "detail": "Standard e-commerce browsing experience on secure verified server."
            }
        ],
        "recommended_actions": [
            {
                "step": 1,
                "title": "Safe to browse",
                "instruction": "Nothing suspicious was detected, but continue to stay cautious with unsolicited online offers.",
                "priority": "preventive",
                "icon_type": "shield-check"
            }
        ],
        "created_at": "2026-10-04T12:45:00Z",
        "is_demo": True
    },

    "demo5": {
        "id": "demo5",
        "title": "Demo 5: Suspicious Payment Request",
        "type": "transaction",
        "input_summary": "Payment Request: $450.00 / ₹37,500 to 'cyber-crime-cell-fine@okaxis' via Instant UPI. Memo: 'URGENT: Legal Fine Settlement to avoid police FIR & phone disconnection tonight'.",
        "risk_score": 96,
        "risk_level": "Critical Risk",
        "breakdown": {
            "message_analysis": 94.0,
            "url_analysis": 80.0,
            "behavior_analysis": 98.0,
            "known_patterns": 96.0,
            "network_signals": 92.0
        },
        "signals": [
            {
                "signal": "authority_intimidation",
                "severity": 0.98,
                "category": "Coercive Extortion",
                "reason": "Severe coercion exploiting police and court authority ('avoid police FIR & phone disconnection')",
                "level": "high"
            },
            {
                "signal": "personal_account_for_official_fee",
                "severity": 0.97,
                "category": "Recipient Integrity",
                "reason": "Demands legal penalty payment to a personal retail UPI handle ('cyber-crime-cell-fine@okaxis'). Real police never accept payments via private UPI addresses!",
                "level": "high"
            },
            {
                "signal": "non_reversible_payment_channel",
                "severity": 0.92,
                "category": "Settlement Mechanism",
                "reason": "Demands immediate irreversible P2P transfer with zero escrow protection",
                "level": "high"
            }
        ],
        "explanations": {
            "simple": [
                "CRITICAL WARNING: This is an extortion and digital arrest scam.",
                "Scammers are pretending to be the Cyber Crime Police and threatening you with arrest or disconnection.",
                "Real government bodies and police NEVER demand penalty fees through personal UPI IDs or private accounts.",
                "If you send this money, it will go directly into a criminal mule account and cannot be refunded."
            ],
            "technical": [
                "Recipient handle 'cyber-crime-cell-fine@okaxis' is a private consumer VPA created with spoofed displayName.",
                "Extreme intimidation pressure matches Digital Arrest extortion syndicates operating across SE Asia.",
                "Payment payload violates institutional compliance rules regarding official penalty collection."
            ],
            "verdict_summary": "Critical Risk: High-Threat Coercive Extortion & Impersonation Scam",
            "impersonated_entity": "Cyber Crime Police Authority"
        },
        "scam_dna": {
            "nodes": [
                {"id": "d5_tx", "label": "Payment Demand ($450)", "type": "payment", "risk": 0.96, "details": "Coercive legal settlement fee"},
                {"id": "d5_upi", "label": "cyber-crime-cell-fine@okaxis", "type": "payment", "risk": 0.98, "details": "Personal mule VPA account"},
                {"id": "d5_ext", "label": "Fake Police Authority", "type": "victim", "risk": 0.95, "details": "Impersonated enforcement agency"},
                {"id": "d5_pat", "label": "Digital Arrest Extortion Syndicate", "type": "pattern", "risk": 0.97, "details": "Transnational phone coercion cartel"}
            ],
            "links": [
                {"source": "d5_tx", "target": "d5_upi", "relationship": "routes_to_mule", "weight": 0.98},
                {"source": "d5_tx", "target": "d5_ext", "relationship": "falsely_claims_authority", "weight": 0.96},
                {"source": "d5_upi", "target": "d5_pat", "relationship": "managed_by_syndicate", "weight": 0.94}
            ],
            "confidence_multiplier": 1.40,
            "cluster_pattern": "Digital Arrest Extortion Syndicate"
        },
        "next_moves": [
            {
                "action": "Fraudsters demand second and third payments under escalating threats",
                "confidence": 94,
                "timeline": "Within 1 hour of first payment",
                "detail": "Once a victim pays, extortionists claim additional 'clearance fees' or 'court stamp taxes'."
            },
            {
                "action": "Threaten video call or warrant delivery to keep victim isolated",
                "confidence": 86,
                "timeline": "Immediate",
                "detail": "Insist that victim must not contact family or lawyer."
            }
        ],
        "recommended_actions": [
            {
                "step": 1,
                "title": "DO NOT TRANSFER ANY MONEY",
                "instruction": "Refuse all payment demands. Genuine legal authorities never collect fines over UPI or WhatsApp.",
                "priority": "critical",
                "icon_type": "ban"
            },
            {
                "step": 2,
                "title": "Do not panic — this is 100% fake",
                "instruction": "Police and CBI do not issue arrest warrants over text or phone calls.",
                "priority": "critical",
                "icon_type": "shield-alert"
            },
            {
                "step": 3,
                "title": "Report immediately to National Cyber Crime Portal (1930)",
                "instruction": "Call 1930 helpline immediately or file a report at cybercrime.gov.in.",
                "priority": "critical",
                "icon_type": "flag"
            },
            {
                "step": 4,
                "title": "Block the sender and beneficiary UPI handle",
                "instruction": "Flag the handle as fraudulent in your banking or UPI app.",
                "priority": "high",
                "icon_type": "phone-off"
            }
        ],
        "created_at": "2026-10-04T12:50:00Z",
        "is_demo": True
    }
}

SEED_INTELLIGENCE_CATEGORIES = [
    {
        "id": "banking-scams",
        "category": "banking",
        "name": "Banking & KYC Scams",
        "icon": "landmark",
        "report_count": 1420,
        "risk_level": "Critical",
        "description": "Fraudulent messages and calls impersonating banks claiming account suspension, PAN card expiry, or incomplete KYC to harvest NetBanking credentials.",
        "common_indicators": [
            "Urgent threats that account or debit card will be blocked within 24 hours",
            "Unsolicited SMS containing links to .xyz, .top, or typo-domains",
            "Requests for OTP, NetBanking password, or debit card CVV",
            "Sender ID that doesn't match official bank shortcode"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "Urgent Bait SMS", "description": "Victim receives text claiming account will be deactivated due to pending KYC."},
            {"step": 2, "title": "Cloned Phishing Portal", "description": "Link leads to exact replica of bank login screen."},
            {"step": 3, "title": "Credential & OTP Interception", "description": "Scammers capture login details and trigger live OTP prompt to drain funds."}
        ],
        "recommended_safety_measures": [
            "Never click on SMS or WhatsApp links to update KYC",
            "Banks only update KYC via official branches or verified in-app video KYC",
            "Never disclose OTP to anyone, including bank representatives"
        ]
    },
    {
        "id": "upi-scams",
        "category": "upi",
        "name": "UPI & Payment App Scams",
        "icon": "credit-card",
        "report_count": 2180,
        "risk_level": "Critical",
        "description": "Reverse-charge fraud, fake refund requests, and QR code manipulation where victims are tricked into sending money instead of receiving it.",
        "common_indicators": [
            "Claiming that entering your UPI PIN is required to 'receive' money",
            "Fake screenshot of money transfer shared by buyer on OLX/Marketplace",
            "Collect requests sent with memos like 'Refund Approved' or 'Cashback'"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "False Buyer / Refund Contact", "description": "Scammer poses as eager buyer or support agent offering refund."},
            {"step": 2, "title": "Send Deceptive Collect Request", "description": "Sends a UPI collect request or QR code labeled 'Receive Amount'."},
            {"step": 3, "title": "PIN Entry Deduction", "description": "Victim enters PIN thinking it accepts payment; funds are instantly deducted."}
        ],
        "recommended_safety_measures": [
            "Remember: UPI PIN is ONLY entered to SEND money, NEVER to receive money",
            "Do not scan QR codes sent by strangers on classifieds or social media",
            "Check the payee name and VPA before confirming any transaction"
        ]
    },
    {
        "id": "fake-customer-support",
        "category": "support",
        "name": "Fake Customer Support",
        "icon": "headphones",
        "report_count": 980,
        "risk_level": "High",
        "description": "Search engine SEO poisoned phone numbers where victims searching for airline, bank, or courier support call scammers directly.",
        "common_indicators": [
            "Customer care number found on unofficial Google search results or social media",
            "Agent asks you to install AnyDesk, TeamViewer, or RustDesk on your phone",
            "Agent asks for a small nominal fee (₹10 or $1) to register your complaint"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "SEO Poisoning", "description": "Scammers place fake customer helpline numbers on Google Maps or forums."},
            {"step": 2, "title": "Remote Access Request", "description": "Fake executive asks user to install remote desktop app to 'fix the glitch'."},
            {"step": 3, "title": "Device Takeover", "description": "Scammer views screen during OTP generation and takes over banking apps."}
        ],
        "recommended_safety_measures": [
            "Only retrieve contact numbers directly inside official verified apps",
            "Never install remote desktop software (AnyDesk, TeamViewer) at caller's request",
            "Disconnect immediately if caller asks for PIN or screen sharing"
        ]
    },
    {
        "id": "job-scams",
        "category": "job",
        "name": "Part-Time Job & Task Scams",
        "icon": "briefcase",
        "report_count": 1750,
        "risk_level": "High",
        "description": "Telegram/WhatsApp offers for simple tasks like liking YouTube videos or rating hotels, ending in crypto deposit traps.",
        "common_indicators": [
            "Promises of ₹3,000 to ₹10,000 per day for simple 10-minute tasks",
            "Recruiter contacts via unsolicited WhatsApp or Telegram message",
            "Demands a 'security deposit' or 'VIP task investment' to withdraw earned balance"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "Small Initial Payout", "description": "Victim earns ₹200-500 for liking 3 videos to establish artificial trust."},
            {"step": 2, "title": "Prepaid Task Upsell", "description": "Added to Telegram group; instructed to invest ₹5,000 for ₹8,000 return."},
            {"step": 3, "title": "Withdrawal Freeze", "description": "Platform freezes funds; demands larger deposits until victim exhausts savings."}
        ],
        "recommended_safety_measures": [
            "No legitimate company pays huge sums for liking YouTube videos",
            "Never pay money upfront to get a job or unlock task earnings",
            "Block unknown recruiters messaging from international numbers"
        ]
    },
    {
        "id": "investment-scams",
        "category": "investment",
        "name": "Investment & Crypto Doubling Scams",
        "icon": "trending-up",
        "report_count": 1310,
        "risk_level": "Critical",
        "description": "Bogus trading platforms, WhatsApp investment advisory groups, and artificial AI trading bots guaranteeing risk-free returns.",
        "common_indicators": [
            "Guaranteed 200% to 500% returns with 'zero risk'",
            "Added to WhatsApp/Telegram groups showing screenshots of massive profits",
            "Fake trading dashboard showing inflated profits that cannot be withdrawn"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "Social Engineering Group", "description": "Victim added to group of 50+ accounts (all scammers) celebrating huge gains."},
            {"step": 2, "title": "Fake Trading Portal", "description": "User deposits funds; dashboard shows balance multiplying rapidly."},
            {"step": 3, "title": "Tax/Release Fee Extortion", "description": "Scammers demand 30% advance tax before allowing any withdrawal."}
        ],
        "recommended_safety_measures": [
            "Only trade through SEBI/SEC registered brokers",
            "Guaranteed high returns do not exist in genuine financial markets",
            "Never wire money to individual bank accounts for corporate investments"
        ]
    },
    {
        "id": "phishing",
        "category": "phishing",
        "name": "Brand & Email Phishing",
        "icon": "shield-alert",
        "report_count": 1640,
        "risk_level": "High",
        "description": "Cloned emails from Apple, Microsoft, Netflix, or PayPal claiming billing failure or unusual sign-in activity.",
        "common_indicators": [
            "Sender email address has a weird domain (e.g. support@netflix-billing-sec.com)",
            "Generic greeting ('Dear Customer') instead of your actual name",
            "Urgent threat that subscription or account will be permanently canceled"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "Deceptive Email", "description": "Victim receives billing failure notification for popular streaming/cloud service."},
            {"step": 2, "title": "Fake Login & Payment", "description": "User enters login password and credit card details to 'update billing'."},
            {"step": 3, "title": "Account Hijack", "description": "Card details harvested; account password changed immediately."}
        ],
        "recommended_safety_measures": [
            "Check sender address closely, not just display name",
            "Log in directly by typing the official website in browser address bar",
            "Enable multi-factor hardware or app-based 2FA"
        ]
    },
    {
        "id": "delivery-scams",
        "category": "delivery",
        "name": "Delivery & Parcel Rescheduling",
        "icon": "truck",
        "report_count": 1150,
        "risk_level": "High",
        "description": "Smishing texts impersonating FedEx, DHL, USPS, or India Post claiming a parcel could not be delivered due to wrong address.",
        "common_indicators": [
            "SMS with tracking number claiming delivery failed today",
            "Link has typosquatting domain (.top, .xyz, -parcel-redelivery)",
            "Demands $1.50 or ₹50 redelivery fee by debit/credit card"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "Failed Delivery Notice", "description": "SMS alerts user that package is held at depot."},
            {"step": 2, "title": "Address & Card Skimmer", "description": "Landing page asks for updated address and payment for redelivery."},
            {"step": 3, "title": "Unauthorized Card Siphon", "description": "Credit card data stolen; multiple unauthorized transactions initiated."}
        ],
        "recommended_safety_measures": [
            "Official couriers leave physical slips or notify through their official registered app",
            "Never pay nominal redelivery fees through links received via SMS",
            "Check tracking numbers only on official carrier websites"
        ]
    },
    {
        "id": "government-impersonation",
        "category": "government",
        "name": "Digital Arrest & Govt Impersonation",
        "icon": "scale",
        "report_count": 890,
        "risk_level": "Critical",
        "description": "Criminals posing as Police, CBI, Customs, or Telecom Department holding victims on coercive Skype video calls under 'Digital Arrest'.",
        "common_indicators": [
            "Call claiming your Aadhaar or passport was found in narcotics parcel or illegal SIM cards",
            "Caller demands Skype/WhatsApp video call with fake police station background",
            "Strict instruction not to disconnect call or tell family ('State Secrecy')"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "Interactive IVR Call", "description": "Automated call claims mobile connection will be disconnected in 2 hours."},
            {"step": 2, "title": "Fake Police Video Call", "description": "Transferred to actor in uniform with forged police seal and fake FIR."},
            {"step": 3, "title": "Fund Verification Transfer", "description": "Coerced to transfer entire savings to 'RBI Escrow Account' for verification."}
        ],
        "recommended_safety_measures": [
            "There is NO legal provision for 'Digital Arrest' under Indian law or any international jurisdiction",
            "Police and enforcement agencies NEVER investigate citizens over Skype or WhatsApp",
            "Immediately disconnect and dial 1930 or visit local police station"
        ]
    },
    {
        "id": "social-media-scams",
        "category": "social",
        "name": "Social Media & Impersonation Scams",
        "icon": "share-2",
        "report_count": 940,
        "risk_level": "Medium",
        "description": "Cloned Instagram/Facebook profiles messaging friends for emergency medical funds, or fake giveaways.",
        "common_indicators": [
            "Close friend or relative messages asking for urgent loan via UPI",
            "Account has slight typo in username or was recently created",
            "Excuses why they cannot speak over phone voice call"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "Profile Cloning", "description": "Scammers clone photos and name of target's real friend."},
            {"step": 2, "title": "Urgent Medical Crisis", "description": "Messages target: 'My sister is in hospital, UPI limit reached, please send ₹15,000'."},
            {"step": 3, "title": "Disappearance", "description": "Once transferred, scammer blocks victim and targets next friend on contact list."}
        ],
        "recommended_safety_measures": [
            "Always call the person directly on phone before sending any emergency money",
            "Verify profile creation date and mutual follower connections",
            "Report and block cloned accounts immediately"
        ]
    },
    {
        "id": "qr-scams",
        "category": "qr",
        "name": "QR Phishing (Quishing)",
        "icon": "qr-code",
        "report_count": 760,
        "risk_level": "High",
        "description": "Malicious QR stickers pasted over legitimate parking meters, restaurant menus, or shared via email to evade text spam filters.",
        "common_indicators": [
            "Physical QR sticker pasted on top of another existing sign or meter",
            "Email with no text but an embedded QR code asking you to verify MFA",
            "QR code opens browser directly without displaying the URL destination first"
        ],
        "typical_attack_flow": [
            {"step": 1, "title": "QR Baiting", "description": "Victim scans QR code to pay for parking or authenticate enterprise login."},
            {"step": 2, "title": "Mobile Landing Page", "description": "Directed to phishing clone designed specifically for mobile screens."},
            {"step": 3, "title": "Session / Token Theft", "description": "Victim enters credentials or approves push notification, granting account access."}
        ],
        "recommended_safety_measures": [
            "Use QR scanner apps that preview the full URL before opening",
            "Feel for raised physical stickers pasted over legitimate merchant signs",
            "Never scan QR codes sent in security alert emails"
        ]
    }
]

SEED_COMMUNITY_REPORTS = [
    {
        "id": "rep_101",
        "scam_type": "UPI Payment Scam",
        "title": "OLX Buyer Reverse Charge QR Fraud",
        "description": "Buyer on OLX agreed to buy furniture without bargaining. Sent a QR code claiming 'Scan this to receive advance token of ₹5,000'. Entering UPI PIN deducted ₹5,000 instead!",
        "phone": "+91 98765-43210",
        "url": None,
        "recipient": "olx-advance-settlement@okaxis",
        "risk_level": "Critical",
        "indicators": ["Fake Buyer", "Reverse UPI Charge", "Urgent Payment Request", "QR Code Trap"],
        "frequency": 38,
        "upvotes": 142,
        "created_at": "2026-10-02T15:20:00Z",
        "verified": True
    },
    {
        "id": "rep_102",
        "scam_type": "Banking Scams",
        "title": "HDFC KYC Pan Card Expiry SMS",
        "description": "Received SMS claiming: 'Dear customer, your HDFC bank account is blocked. Update PAN card now at hdfc-netbanking-alert.xyz to avoid ₹5,000 fine'.",
        "phone": "+91 88901-23456",
        "url": "http://hdfc-netbanking-alert.xyz",
        "recipient": None,
        "risk_level": "Critical",
        "indicators": ["Bank Impersonation", "PAN/KYC Update Trap", "High-Abuse TLD", "Threat of Fine"],
        "frequency": 86,
        "upvotes": 254,
        "created_at": "2026-10-03T10:15:00Z",
        "verified": True
    },
    {
        "id": "rep_103",
        "scam_type": "Delivery Scams",
        "title": "India Post Parcel Address Incomplete",
        "description": "SMS arrived from +91-7002-XXXX saying package arrived at central hub but street number missing. Demanded ₹35 address update fee on fake indiapost-tracking.top portal.",
        "phone": "+91 70023-98124",
        "url": "https://indiapost-tracking.top/fee",
        "recipient": "speedpost-desk@ybl",
        "risk_level": "High",
        "indicators": ["Postal Courier Impersonation", "Micro fee credit card skimmer", "Disposable .top domain"],
        "frequency": 64,
        "upvotes": 198,
        "created_at": "2026-10-03T18:40:00Z",
        "verified": True
    },
    {
        "id": "rep_104",
        "scam_type": "Government Impersonation",
        "title": "Electricity Bill Disconnection Threat Tonight",
        "description": "Text message: 'Dear consumer, electricity bill not updated. Power will be disconnected tonight at 9:30 PM. Call electricity officer at 98234-XXXX immediately'.",
        "phone": "+91 98234-55123",
        "url": None,
        "recipient": "bijli-office90@paytm",
        "risk_level": "Critical",
        "indicators": ["Utility Bill Extortion", "Imminent Power Disconnection Threat", "Unofficial Mobile Contact"],
        "frequency": 112,
        "upvotes": 389,
        "created_at": "2026-10-04T08:00:00Z",
        "verified": True
    },
    {
        "id": "rep_105",
        "scam_type": "Job Scams",
        "title": "Telegram Movie Review Part-Time Job",
        "description": "Recruiter contacted offering ₹2,000 daily for rating movies on Google. Gave ₹150 for first task, then asked for ₹3,000 VIP deposit on crypto platform before disappearing.",
        "phone": "+44 7890 123456",
        "url": "https://vip-task-movie-rating.xyz",
        "recipient": "vip-merchants@usdt",
        "risk_level": "High",
        "indicators": ["Telegram Recruiter", "Small Initial Bait Payout", "Prepaid VIP Task Scam"],
        "frequency": 49,
        "upvotes": 167,
        "created_at": "2026-10-04T09:30:00Z",
        "verified": True
    }
]
