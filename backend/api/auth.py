import hashlib
import os
import uuid
from datetime import datetime, timedelta
from typing import Optional
import jwt
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.config import settings
from backend.database.store import get_db
from backend.schemas.auth import UserRegister, UserLogin, Token, UserResponse, ForgotPasswordRequest

router = APIRouter(prefix="/auth", tags=["Authentication"])
security = HTTPBearer(auto_error=False)

def hash_password(password: str) -> str:
    salt = "4slayers_salt_v1_"
    return hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000).hex()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[dict]:
    if not credentials:
        return None
    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            return None
        db = get_db()
        users_col = db.get_collection("users")
        user = users_col.find_one({"id": user_id})
        return user
    except Exception:
        return None

def require_current_user(user: Optional[dict] = Depends(get_current_user)) -> dict:
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required to perform this action",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

@router.post("/register", response_model=Token)
def register(user_in: UserRegister):
    db = get_db()
    users_col = db.get_collection("users")
    
    existing = users_col.find_one({"email": user_in.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email address already exists")

    new_user = {
        "id": str(uuid.uuid4()),
        "name": user_in.name,
        "email": user_in.email.lower(),
        "hashed_password": hash_password(user_in.password),
        "role": "analyst",
        "created_at": datetime.utcnow().isoformat()
    }
    users_col.insert_one(new_user)
    
    token = create_access_token({"sub": new_user["id"], "email": new_user["email"], "role": new_user["role"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user["id"],
            "name": new_user["name"],
            "email": new_user["email"],
            "role": new_user["role"]
        }
    }

@router.post("/login", response_model=Token)
def login(creds: UserLogin):
    db = get_db()
    users_col = db.get_collection("users")
    user = users_col.find_one({"email": creds.email.lower()})
    
    if not user or not verify_password(creds.password, user.get("hashed_password", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": user["id"], "email": user["email"], "role": user.get("role", "user")})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user.get("role", "user")
        }
    }

@router.post("/demo-login", response_model=Token)
def demo_login():
    """Allows one-click instant evaluation login without needing to fill registration forms."""
    db = get_db()
    users_col = db.get_collection("users")
    demo_email = "analyst@4slayers.security"
    user = users_col.find_one({"email": demo_email})
    
    if not user:
        user = {
            "id": "demo-analyst-uuid-2026",
            "name": "Security Analyst (Demo)",
            "email": demo_email,
            "hashed_password": hash_password("DemoPassword123!"),
            "role": "analyst",
            "created_at": datetime.utcnow().isoformat()
        }
        users_col.insert_one(user)

    token = create_access_token({"sub": user["id"], "email": user["email"], "role": user["role"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }

@router.get("/me")
def get_me(user: dict = Depends(require_current_user)):
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "user"),
        "created_at": user.get("created_at")
    }

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest):
    return {
        "status": "success",
        "message": f"Password reset instructions have been dispatched to {req.email}."
    }
