from fastapi import APIRouter, Depends, HTTPException, status, Header, Request, Path
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from core.models import User, AuthAudit, Session
from core.database import get_db
from core.schemas import *  # Or import only the specific user/auth schemas you need
from typing import List
from core.security import hash_password, verify_password, create_access_token, decode_access_token
from datetime import datetime
from uuid import uuid4

router = APIRouter()
core_router = APIRouter(prefix="/api/auth", tags=["core"])

# Use HTTPBearer for explicit Bearer token in Swagger UI
token_auth_scheme = HTTPBearer()

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(token_auth_scheme), db: Session = Depends(get_db)):
    token = credentials.credentials
    try:
        payload = decode_access_token(token)
        user_id = int(payload.get("sub"))
        session_id = payload.get("session_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Session check
    session = db.query(Session).filter_by(session_id=session_id, user_id=user_id, is_active=True).first()
    if not session:
        raise HTTPException(status_code=401, detail="Session invalid or expired")
    # Optionally update last_active_at
    session.last_active_at = datetime.utcnow()
    db.commit()
    return user

@core_router.post("/register", response_model=dict, tags=["core"])
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = User(
        email=user.email,
        hashed_password=hash_password(user.password),
        full_name=user.full_name,
        is_active=True,
        role="user"
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"msg": "User registered successfully"}

@core_router.post("/login", response_model=TokenResponse, tags=["core"])
def login(user: UserLogin, db: Session = Depends(get_db), request: Request = None):
    db_user = db.query(User).filter(User.email == user.email).first()
    ip = request.client.host if request else None
    user_agent = request.headers.get("user-agent") if request else None
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        # Log failed login
        audit = AuthAudit(user_id=db_user.id if db_user else None, event="failed_login", ip_address=ip, user_agent=user_agent)
        db.add(audit)
        db.commit()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not db_user.is_active:
        audit = AuthAudit(user_id=db_user.id, event="failed_login", ip_address=ip, user_agent=user_agent)
        db.add(audit)
        db.commit()
        raise HTTPException(status_code=400, detail="Inactive user")
    # Create session
    session_id = str(uuid4())
    session = Session(
        session_id=session_id,
        user_id=db_user.id,
        ip_address=ip,
        user_agent=user_agent,
        is_active=True
    )
    db.add(session)
    db.commit()
    # Log successful login
    audit = AuthAudit(user_id=db_user.id, event="login", ip_address=ip, user_agent=user_agent)
    db.add(audit)
    db.commit()
    token = create_access_token({"sub": str(db_user.id), "email": db_user.email, "role": db_user.role, "session_id": session_id})
    return TokenResponse(access_token=token)

@core_router.post("/logout", response_model=dict, tags=["core"])
def logout(current_user: User = Depends(get_current_user), db: Session = Depends(get_db), request: Request = None, credentials: HTTPAuthorizationCredentials = Depends(token_auth_scheme)):
    ip = request.client.host if request else None
    user_agent = request.headers.get("user-agent") if request else None
    token = credentials.credentials
    payload = decode_access_token(token)
    session_id = payload.get("session_id")
    session = db.query(Session).filter_by(session_id=session_id, user_id=current_user.id, is_active=True).first()
    if session:
        session.is_active = False
        session.last_active_at = datetime.utcnow()
        db.commit()
    # Update the most recent login audit for this user to set logout_timestamp
    audit = db.query(AuthAudit).filter_by(user_id=current_user.id, event="login").order_by(AuthAudit.timestamp.desc()).first()
    if audit:
        audit.logout_timestamp = datetime.utcnow()
        db.commit()
    return {"msg": "Logged out"}

@core_router.get("/me", response_model=dict, tags=["core"])
def me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "is_active": current_user.is_active
    }

@core_router.get("/sessions", response_model=list, tags=["core"])
def list_sessions(current_user: User = Depends(get_current_user), db: Session = Depends(get_db), user_id: int = None):
    # Only allow owner or admin
    if user_id is not None:
        if current_user.role != "admin":
            raise HTTPException(status_code=403, detail="Not authorized")
        sessions = db.query(Session).filter_by(user_id=user_id).all()
    else:
        sessions = db.query(Session).filter_by(user_id=current_user.id).all()
    return [
        {
            "session_id": s.session_id,
            "created_at": s.created_at,
            "last_active_at": s.last_active_at,
            "ip_address": s.ip_address,
            "user_agent": s.user_agent,
            "is_active": s.is_active
        }
        for s in sessions
    ]

@core_router.post("/sessions/{session_id}/revoke", response_model=dict, tags=["core"])
def revoke_session(session_id: str = Path(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    session = db.query(Session).filter_by(session_id=session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    # Only allow owner or admin
    if session.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    session.is_active = False
    session.last_active_at = datetime.utcnow()
    db.commit()
    return {"msg": "Session revoked"} 