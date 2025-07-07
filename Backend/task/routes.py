from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
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

# 
@router.get("/boards/{board_id}/tasks")
def get_tasks_by_board(
    board_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    tasks = (
        db.query(Task)
        .options(joinedload(Task.creator))  # preload ผู้ใช้ที่สร้าง
        .filter(Task.column.has(board_id=board_id))
        .all()
    )

    return [
        {
            "task_id": task.task_id,
            "column_id": task.column_id,
            "title": task.title,
            "position": task.position,
            "due_date": task.due_date,
            "created_by": task.created_by,
            "creator_name": task.creator.username if task.creator else None
        }
        for task in tasks
    ]
