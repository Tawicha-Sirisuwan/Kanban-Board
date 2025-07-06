# user/models.py
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.connection import Base


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


