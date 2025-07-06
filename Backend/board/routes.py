from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import SessionLocal
from board.models import Board  
from board.schema import BoardCreate, BoardOut  

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/boards", response_model=BoardOut)
def create_board(board: BoardCreate, db: Session = Depends(get_db)):
    new_board = Board(
        title=board.title,
        description=board.description,
        owner_id=1  
    )
    db.add(new_board)
    db.commit()
    db.refresh(new_board)
    return new_board

@router.get("/boards", response_model=list[BoardOut])
def get_all_boards(db: Session = Depends(get_db)):
    return db.query(Board).all()
