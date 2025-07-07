from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database.connection import Base
from datetime import datetime

from column.models import BoardColumn

class Task(Base):
    __tablename__ = "tasks"

    task_id = Column(Integer, primary_key=True, index=True)
    column_id = Column(Integer, ForeignKey("board_columns.column_id"))
    title = Column(String, nullable=False)
    position = Column(Integer)
    created_by = Column(Integer, ForeignKey("users.user_id"))
    due_date = Column(DateTime)

    column = relationship(BoardColumn, back_populates="tasks")
    creator = relationship("user.models.User", back_populates="created_tasks")  # ✅ ใช้ path แทน import
    