from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    column_id: int
    title: str
    position: int
    due_date: Optional[datetime] = None

class TaskOut(BaseModel):
    task_id: int
    column_id: int
    title: str
    position: int
    due_date: Optional[datetime] = None
    creator_name: Optional[str] = None  # ✅ เพิ่ม field นี้เข้าไป

    class Config:
        orm_mode = True
