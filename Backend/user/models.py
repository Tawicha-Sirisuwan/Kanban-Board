from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.connection import Base
from task.models import Task

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    boards = relationship("Board", back_populates="owner")
    board_memberships = relationship("BoardMember", back_populates="user")
    created_tasks = relationship("task.models.Task", back_populates="creator")