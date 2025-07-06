from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database.connection import Base
from datetime import datetime

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


# 3. BoardColumn 
class BoardColumn(Base):
    __tablename__ = "columns"

    column_id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, ForeignKey("boards.board_id"))
    title = Column(String, nullable=False)
    position = Column(Integer)

    board = relationship("Board", back_populates="columns")
    tasks = relationship("Task", back_populates="column", cascade="all, delete")


# 4. Task
class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True, index=True)
    column_id = Column(Integer, ForeignKey("columns.column_id"))
    title = Column(String, nullable=False)
    position = Column(Integer)
    created_by = Column(Integer, ForeignKey("users.user_id"))
    due_date = Column(DateTime)

    column = relationship("BoardColumn", back_populates="tasks")
    creator = relationship("User", back_populates="created_tasks")
