from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.connection import SessionLocal
from task.schema import TaskCreate, TaskOut
from task.models import Task  
from user.auth import get_current_user
from user.models import User

router = APIRouter()

# ฟังก์ชันสำหรับเรียก DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# สร้าง Task ใหม่
@router.post("/tasks", response_model=TaskOut)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_task = Task(
        column_id=task.column_id,
        title=task.title,
        position=task.position,
        due_date=task.due_date,
        created_by=current_user.user_id  
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task
