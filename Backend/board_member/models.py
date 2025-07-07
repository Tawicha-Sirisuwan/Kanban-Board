# models.py
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from database.connection import Base
from user.models import User  # เชื่อมกับ User model

class BoardMember(Base):
    __tablename__ = "board_members"

    id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, ForeignKey("boards.board_id"))
    user_id = Column(Integer, ForeignKey("users.user_id"))
    role = Column(String)

    board = relationship("Board", back_populates="members")
    user = relationship("User", back_populates="board_memberships")  # เชื่อมโยงกับ User model
