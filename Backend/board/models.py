from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database.connection import Base
from datetime import datetime


from column.models import BoardColumn

# 1. Board
class Board(Base):
    __tablename__ = "boards"

    board_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.user_id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="boards")
    columns = relationship("BoardColumn", back_populates="board", cascade="all, delete")
    members = relationship("BoardMember", back_populates="board", cascade="all, delete")


# 2. BoardMember
class BoardMember(Base):
    __tablename__ = "board_members"

    id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, ForeignKey("boards.board_id"))
    user_id = Column(Integer, ForeignKey("users.user_id"))
    role = Column(String)

    board = relationship("Board", back_populates="members")
    user = relationship("User", back_populates="board_memberships")




