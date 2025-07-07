from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import SessionLocal
from board.models import Board  
from board.schema import BoardCreate, BoardOut  
from user.auth import get_current_user
from user.models import User  

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/boards", response_model=BoardOut)
def create_board(
    board: BoardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)  
):
    new_board = Board(
        title=board.title,
        description=board.description,
        owner_id=current_user.user_id  
    )
    db.add(new_board)
    db.commit()
    db.refresh(new_board)
    return new_board

@router.get("/boards", response_model=list[BoardOut])
def get_all_boards(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Board).filter(Board.owner_id == current_user.user_id).all()


@router.delete("/boards/{board_id}")
def delete_board(
    board_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_board = db.query(Board).filter(Board.board_id == board_id, Board.owner_id == current_user.user_id).first()
    if not db_board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    db.delete(db_board)
    db.commit()
    return {"detail": "Board deleted successfully"}

@router.put("/boards/{board_id}", response_model=BoardOut)
def update_board(
    board_id: int,
    board: BoardCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_board = db.query(Board).filter(Board.board_id == board_id, Board.owner_id == current_user.user_id).first()
    if not db_board:
        raise HTTPException(status_code=404, detail="Board not found")
    
    db_board.title = board.title
    db_board.description = board.description
    db.commit()
    db.refresh(db_board)
    return db_board
