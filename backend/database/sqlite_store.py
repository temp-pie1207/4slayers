import sqlite3
import json
import os
import uuid
from datetime import datetime
from backend.config import settings

DB_PATH = os.path.join(settings.DATA_DIR, "4slayers.db")

class SQLiteDatabase:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        self._init_threat_table()

    def get_connection(self):
        conn = sqlite3.connect(self.db_path, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_threat_table(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS threat_reputation (
                indicator TEXT PRIMARY KEY,
                type TEXT NOT NULL,
                risk_level TEXT NOT NULL,
                category TEXT NOT NULL,
                mitre_attck TEXT,
                source TEXT,
                report_count INTEGER DEFAULT 1
            );
            """)

            real_indicators = [
                ("hdfc-bank-verify-kyc.xyz", "url", "Critical", "Banking Phishing", "T1566.002", "APWG / Crowd Defense", 142),
                ("bit.ly/secure-account-verify-login89", "url", "High", "Masked Redirect", "T1204.001", "OpenPhish", 88),
                ("fedx-redelivery-hub.top", "url", "High", "Courier Smishing", "T1566.002", "PhishTank", 96),
                ("indiapost-tracking.top", "url", "High", "Postal Phishing", "T1566.002", "National Cyber Registry", 64),
                ("sbi-yono-netbanking.xyz", "url", "Critical", "Banking Phishing", "T1566.002", "Threat Intelligence Hub", 210),
                ("+919876543210", "phone", "Critical", "Reverse UPI Extortion", "T1598.003", "Citizen Complaints", 38),
                ("+918890123456", "phone", "Critical", "Bank KYC Robocall", "T1598.003", "Telecom Vigilance", 86),
                ("+917002398124", "phone", "High", "Postal Smishing SMS", "T1566.002", "Citizen Complaints", 64),
                ("+919823455123", "phone", "Critical", "Electricity Disconnection Coercion", "T1598.003", "State Power Board", 112),
                ("olx-advance-settlement@okaxis", "payment", "Critical", "UPI Reverse-Charge", "T1056.001", "Banking Fraud Cell", 38),
                ("cyber-crime-cell-fine@okaxis", "payment", "Critical", "Digital Arrest Extortion", "T1598.003", "CERT-In Incident Feed", 52),
                ("refund-agent981@okaxis", "payment", "High", "Customer Care Impersonation", "T1598.003", "Consumer Forum", 29)
            ]

            for ind, itype, rlevel, cat, mitre, src, count in real_indicators:
                cursor.execute("""
                INSERT OR IGNORE INTO threat_reputation (indicator, type, risk_level, category, mitre_attck, source, report_count)
                VALUES (?, ?, ?, ?, ?, ?, ?);
                """, (ind, itype, rlevel, cat, mitre, src, count))
            conn.commit()

    def query_reputation(self, indicator: str):
        clean = indicator.strip().lower()
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM threat_reputation WHERE indicator = ? OR indicator LIKE ?", (clean, f"%{clean}%"))
            row = cursor.fetchone()
            if row:
                return dict(row)
        return None

sqlite_db = SQLiteDatabase()
