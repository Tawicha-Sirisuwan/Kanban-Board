from pydantic import BaseModel, Field
from typing import Literal

class BoardMemberBase(BaseModel):
    board_id: int
    user_id: int
    role: Literal["member", "editor"] = Field(..., description="Role: member or editor")

class BoardMemberCreate(BoardMemberBase):
    pass

class BoardMemberOut(BaseModel):
    id: int
    board_id: int
    user_id: int
    role: str
    username: str  # เพิ่มข้อมูล username
    email: str  # เพิ่มข้อมูล email

    class Config:
        orm_mode = True