from sqlalchemy import Column, Integer, String
from database.connection import Base

class User(Base):
    __tablename__ = "users"  # หรือจะใช้ "user" ก็ได้ แต่ PostgreSQL มักใช้ s

    user_id = Column(Integer, primary_key=True, index=True)  # เปลี่ยนจาก id → user_id
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)