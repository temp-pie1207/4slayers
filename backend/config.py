import os

class Settings:
    PROJECT_NAME: str = "4SLAYERS — AI Fraud & Scam Detection Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "4slayers_super_secret_jwt_key_2026_cybersec")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    DATABASE_NAME: str = "4slayers"
    DATA_DIR: str = os.getenv("DATA_DIR", "/tmp/4slayers_data" if os.getenv("VERCEL") else os.path.join(os.path.dirname(os.path.abspath(__file__)), "data"))

settings = Settings()
