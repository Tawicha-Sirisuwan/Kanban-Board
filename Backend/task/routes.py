from fastapi import APIRouter, Depends, HTTPException
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
    # หาค่า position สูงสุดใน column_id เดียวกัน
    max_position = db.query(Task.position).filter(Task.column_id == task.column_id).order_by(Task.position.desc()).first()
    
    # ถ้าไม่พบ task ใดใน column_id นี้ (เป็นครั้งแรก), set position เป็น 1
    new_position = (max_position[0] + 1) if max_position else 1
    
    # สร้าง Task ใหม่
    new_task = Task(
        column_id=task.column_id,
        title=task.title,
        position=new_position,  # กำหนด position โดยอัตโนมัติ
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

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.task_id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # ตรวจสอบว่าผู้ใช้เป็นเจ้าของ Task หรือไม่
    if task.created_by != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this task")

    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}

@router.put("/tasks/{task_id}", response_model=TaskOut)
def update_task(
    task_id: int,
    task: TaskCreate,  # รับข้อมูลจาก Frontend
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    print(f"Received task data: {task}")  # ดูข้อมูลที่ได้รับจาก frontend

    db_task = db.query(Task).filter(Task.task_id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    if db_task.created_by != current_user.user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this task")

    db_task.title = task.title
    db_task.due_date = task.due_date  # ต้องเป็นรูปแบบ 'YYYY-MM-DD'
    db_task.position = task.position

    db.commit()
    db.refresh(db_task)

    return db_task