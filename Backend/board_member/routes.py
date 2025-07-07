from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import SessionLocal
from user.auth import get_current_user
from user.models import User
from board_member.models import BoardMember
from board_member.schema import BoardMemberCreate, BoardMemberOut

router = APIRouter()

# ฟังก์ชันเชื่อมต่อฐานข้อมูล
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ฟังก์ชันตรวจสิทธิ์: ต้องเป็น editor ถึงจะดำเนินการได้
def check_board_permission(db: Session, board_id: int, user_id: int):
    member = db.query(BoardMember).filter_by(board_id=board_id, user_id=user_id).first()
    if not member:
        raise HTTPException(status_code=403, detail="Not a member of this board")
    if member.role != "editor":
        raise HTTPException(status_code=403, detail="Only editors can perform this action")

# เพิ่มสมาชิกเข้า board (editor หรือ member)
@router.post("/board-members", response_model=BoardMemberOut)
def add_board_member(
    member: BoardMemberCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # ตรวจว่า current_user ต้องเป็น editor ของบอร์ดนั้นก่อน
    check_board_permission(db, board_id=member.board_id, user_id=current_user.user_id)

    new_member = BoardMember(**member.dict())
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    return new_member

# ดูสมาชิกทั้งหมดใน board
@router.get("/board-members/{board_id}", response_model=list[BoardMemberOut])
def get_board_members(
    board_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # ตรวจว่า current_user เป็นสมาชิกบอร์ด (member/editor) หรือไม่
    member = db.query(BoardMember).filter_by(board_id=board_id, user_id=current_user.user_id).first()
    if not member:
        raise HTTPException(status_code=403, detail="You are not a member of this board")

    return db.query(BoardMember).filter(BoardMember.board_id == board_id).all()


@router.delete("/board-members/{id}")
def delete_board_member(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    member = db.query(BoardMember).filter(BoardMember.id == id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")

    # ตรวจสิทธิ์ว่า current_user ต้องเป็น editor ของบอร์ดนั้น
    check_board_permission(db, board_id=member.board_id, user_id=current_user.user_id)

    db.delete(member)
    db.commit()
    return {"message": "Board member deleted successfully"}