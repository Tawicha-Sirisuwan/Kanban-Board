from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database.connection import Base

class BoardColumn(Base):
    __tablename__ = "board_columns"  # ✅ เปลี่ยนชื่อ table ไม่ให้ชน

    column_id = Column(Integer, primary_key=True, index=True)
    board_id = Column(Integer, ForeignKey("boards.board_id"))
    title = Column(String, nullable=False)
    position = Column(Integer)

    board = relationship("Board", back_populates="columns")
    tasks = relationship("Task", back_populates="column", cascade="all, delete")
