from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database.connection import SessionLocal
from user.models import User 
from user.schema import UserCreate 
from user.auth import create_access_token, get_current_user
from user.password_utils import hash_password, verify_password  # ✅ import ที่เพิ่ม
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    identifier: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users")  # ✅ REGISTER
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    hashed_pw = hash_password(user.password)  # ✅ hash password
    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "user_id": new_user.user_id,
        "username": new_user.username,
        "email": new_user.email
    }

@router.post("/login")  # ✅ LOGIN
def login_user(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        or_(User.username == request.identifier, User.email == request.identifier)
    ).first()

    if not user or not verify_password(request.password, user.password):  # ✅ verify hash
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": str(user.user_id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email
    }

@router.get("/users")
def list_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    users = db.query(User).all()
    return [
        {
            "user_id": u.user_id,
            "username": u.username,
            "email": u.email
        } for u in users
    ]

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "user_id": current_user.user_id,
        "username": current_user.username,
        "email": current_user.email
    }
