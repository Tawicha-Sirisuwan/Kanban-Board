from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    identifier: str  # ใช้ได้ทั้ง username หรือ email
    password: str

class UserOut(BaseModel):
    user_id: int
    username: str
    email: EmailStr

    class Config:
        orm_mode = True
