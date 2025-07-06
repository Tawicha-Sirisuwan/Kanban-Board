# column/routes.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.connection import SessionLocal
from column.models import BoardColumn
from column.schema import ColumnCreateWithoutPosition, ColumnOut
from user.auth import get_current_user
from user.models import User

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/board-columns", response_model=ColumnOut)
def create_column(
    column: ColumnCreateWithoutPosition,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # ✅ ดึง position ล่าสุดของ board นี้
    last_column = (
        db.query(BoardColumn)
        .filter(BoardColumn.board_id == column.board_id)
        .order_by(BoardColumn.position.desc())
        .first()
    )
    next_position = last_column.position + 1 if last_column else 1

    new_column = BoardColumn(
        board_id=column.board_id,
        title=column.title,
        position=next_position
    )
    db.add(new_column)
    db.commit()
    db.refresh(new_column)
    return new_column

@router.get("/board-columns/{board_id}", response_model=list[ColumnOut])
def get_columns_by_board(
    board_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(BoardColumn).filter(BoardColumn.board_id == board_id).order_by(BoardColumn.position).all()
