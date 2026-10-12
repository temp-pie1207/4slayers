import json
import os
import uuid
import sqlite3
from datetime import datetime
import pymongo
from backend.config import settings
from backend.database.sqlite_store import sqlite_db, DB_PATH

class SQLiteCollectionWrapper:
    """
    High-performance real-world database collection wrapper implementing MongoDB/Document
    semantics over indexed SQLite tables, providing true ACID persistence and relational indexing.
    """
    def __init__(self, table_name: str, db_path: str = DB_PATH):
        self.table_name = table_name
        self.db_path = db_path
        self._ensure_table()

    def _get_connection(self):
        conn = sqlite3.connect(self.db_path, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        return conn

    def _ensure_table(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"""
            CREATE TABLE IF NOT EXISTS {self.table_name} (
                id TEXT PRIMARY KEY,
                doc_json TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            """)
            cursor.execute(f"CREATE INDEX IF NOT EXISTS idx_{self.table_name}_created ON {self.table_name}(created_at);")
            conn.commit()

    def _matches(self, doc, query):
        if not query:
            return True
        for key, val in query.items():
            if key == "_id" or key == "id":
                doc_id = doc.get("id") or doc.get("_id")
                if str(doc_id) != str(val):
                    return False
            elif key == "$or":
                matched_any = False
                for subq in val:
                    if self._matches(doc, subq):
                        matched_any = True
                        break
                if not matched_any:
                    return False
            elif isinstance(val, dict):
                doc_val = doc.get(key)
                if "$regex" in val:
                    import re
                    pattern = val["$regex"]
                    options = val.get("$options", "")
                    flags = re.IGNORECASE if "i" in options else 0
                    if not (doc_val and re.search(pattern, str(doc_val), flags)):
                        return False
            else:
                if doc.get(key) != val:
                    return False
        return True

    def find_one(self, query):
        if query and ("id" in query or "_id" in query):
            target_id = query.get("id") or query.get("_id")
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(f"SELECT doc_json FROM {self.table_name} WHERE id = ?", (str(target_id),))
                row = cursor.fetchone()
                if row:
                    res = json.loads(row["doc_json"])
                    res["_id"] = res["id"]
                    return res

        # Fallback to full match
        docs = self.find(query, limit=1)
        return docs[0] if docs else None

    def find(self, query=None, sort=None, limit=None):
        query = query or {}
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"SELECT doc_json FROM {self.table_name} ORDER BY created_at DESC")
            rows = cursor.fetchall()
            docs = []
            for r in rows:
                try:
                    d = json.loads(r["doc_json"])
                    if self._matches(d, query):
                        d["_id"] = d.get("id")
                        docs.append(d)
                except Exception:
                    continue

            if sort:
                for field, order in reversed(sort):
                    docs.sort(key=lambda x: str(x.get(field, "")), reverse=(order == -1 or order == pymongo.DESCENDING))

            if limit:
                docs = docs[:limit]
            return docs

    def insert_one(self, doc):
        new_doc = dict(doc)
        if "id" not in new_doc:
            new_doc["id"] = str(uuid.uuid4())
        new_doc["_id"] = new_doc["id"]
        created_at = new_doc.get("created_at") or datetime.utcnow().isoformat()
        new_doc["created_at"] = created_at

        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"""
            INSERT OR REPLACE INTO {self.table_name} (id, doc_json, created_at)
            VALUES (?, ?, ?);
            """, (new_doc["id"], json.dumps(new_doc, default=str), created_at))
            conn.commit()

        class InsertResult:
            def __init__(self, inserted_id):
                self.inserted_id = inserted_id
        return InsertResult(new_doc["id"])

    def update_one(self, query, update):
        doc = self.find_one(query)
        if not doc:
            class UpdateResult:
                def __init__(self, modified_count):
                    self.modified_count = modified_count
            return UpdateResult(0)

        if "$set" in update:
            doc.update(update["$set"])
        if "$inc" in update:
            for k, inc_val in update["$inc"].items():
                doc[k] = doc.get(k, 0) + inc_val

        self.insert_one(doc)
        class UpdateResult:
            def __init__(self, modified_count):
                self.modified_count = modified_count
        return UpdateResult(1)

    def count_documents(self, query=None):
        return len(self.find(query))

    def delete_one(self, query):
        doc = self.find_one(query)
        if not doc:
            return False
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"DELETE FROM {self.table_name} WHERE id = ?", (doc["id"],))
            conn.commit()
            return cursor.rowcount > 0


class DatabaseManager:
    def __init__(self):
        self.is_mongo = False
        self.client = None
        self.db = None
        self._connect()

    def _connect(self):
        try:
            client = pymongo.MongoClient(settings.MONGODB_URI, serverSelectionTimeoutMS=1000)
            client.server_info()
            self.client = client
            self.db = client[settings.DATABASE_NAME]
            self.is_mongo = True
            print("[4SLAYERS] Connected to live MongoDB server cluster.")
        except Exception:
            print("[4SLAYERS] Live MongoDB not detected. Initializing SQLite3 ACID relational database.")
            self.is_mongo = False

    def get_collection(self, name: str):
        if self.is_mongo and self.db is not None:
            return self.db[name]
        return SQLiteCollectionWrapper(name)

    def query_reputation(self, indicator: str):
        return sqlite_db.query_reputation(indicator)

db_manager = DatabaseManager()

def get_db():
    return db_manager
