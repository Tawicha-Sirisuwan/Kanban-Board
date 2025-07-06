from pydantic import BaseModel, Field
from typing import Literal

class BoardMemberBase(BaseModel):
    board_id: int
    user_id: int
    role: Literal["member", "editor"] = Field(..., description="Role: member or editor")

class BoardMemberCreate(BoardMemberBase):
    pass

class BoardMemberOut(BoardMemberBase):
    id: int

    class Config:
        orm_mode = True
