import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_demo_presets():
    res = client.get("/api/scan/demo/demo1")
    assert res.status_code == 200
    data = res.json()
    assert data["id"].startswith("demo1")
    assert data["risk_score"] > 80
    assert "HDFC" in data["input_summary"]
    assert "explanations" in data

def test_message_scan():
    payload = {
        "content": "URGENT: Your Netbanking account has been suspended. Verify immediately at http://hdfc-verify-kyc.xyz to avoid permanent deactivation.",
        "sender_info": "+91-98210-99412"
    }
    res = client.post("/api/scan/message", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["risk_score"] >= 70
    assert data["risk_level"] in ["High Risk", "Critical Risk"]
    assert len(data["signals"]) > 0
    assert len(data["scam_dna"]["nodes"]) >= 2

def test_url_scan():
    payload = {
        "url": "http://secure-paypal-login-verify.top/account",
        "context": "Urgent password reset email"
    }
    res = client.post("/api/scan/url", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["risk_score"] >= 60
    assert "explanations" in data

def test_multimodal_scan():
    payload = {
        "message": "Immediate refund of $450 waiting. Scan QR code or remit processing fee to recover balance.",
        "url": "http://fast-refund-portal.click/claim",
        "phone": "+91-98765-43210",
        "payment_recipient": "refund_officer@axis",
        "amount": 450.0
    }
    res = client.post("/api/scan/multimodal", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["risk_score"] >= 70
    # Check that cross channel correlation signal was triggered
    signal_names = [s["signal"] for s in data["signals"]]
    assert "cross_channel_correlation" in signal_names

def test_network_graph():
    res = client.get("/api/intelligence/network/graph")
    assert res.status_code == 200
    data = res.json()
    assert "nodes" in data
    assert "edges" in data
    assert len(data["nodes"]) > 5
    assert len(data["edges"]) > 5

    # Filtered cluster
    res_cluster = client.get("/api/intelligence/network/graph?cluster=banking_kyc")
    assert res_cluster.status_code == 200
    cluster_data = res_cluster.json()
    assert cluster_data["active_cluster"] == "banking_kyc"
    assert len(cluster_data["nodes"]) > 0

def test_analytics_metrics():
    res = client.get("/api/intelligence/metrics/analytics")
    assert res.status_code == 200
    data = res.json()
    assert "overview" in data
    assert "channels" in data
    assert "risk_distribution" in data
    assert data["overview"]["total_scans"] > 1000

def test_notifications():
    res = client.get("/api/intelligence/notifications/list")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 3

def test_auth_workflow():
    # 1. Register a test user
    import uuid
    rand_email = f"analyst_{uuid.uuid4().hex[:6]}@gmail.com"
    reg_payload = {
        "name": "Test Investigator",
        "email": rand_email,
        "password": "StrongPassword2026!"
    }
    res_reg = client.post("/api/auth/register", json=reg_payload)
    assert res_reg.status_code == 200
    token = res_reg.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Get me
    res_me = client.get("/api/auth/me", headers=headers)
    assert res_me.status_code == 200
    assert res_me.json()["email"] == rand_email

    # 3. Settings
    res_set = client.get("/api/auth/settings", headers=headers)
    assert res_set.status_code == 200

    # 4. Data export
    res_exp = client.get("/api/auth/export", headers=headers)
    assert res_exp.status_code == 200
    assert "account" in res_exp.json()
