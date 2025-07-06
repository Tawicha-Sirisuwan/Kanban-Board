from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class BoardCreate(BaseModel):
    title: str
    description: Optional[str] = None


class BoardOut(BaseModel):
    board_id: int
    title: str
    description: Optional[str]
    owner_id: int
    created_at: datetime

    class Config:
        orm_mode = True
