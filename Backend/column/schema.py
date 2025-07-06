# column/schema.py
from pydantic import BaseModel

class ColumnCreateWithoutPosition(BaseModel):
    board_id: int
    title: str

class ColumnCreate(ColumnCreateWithoutPosition):
    position: int  

class ColumnOut(BaseModel):
    column_id: int
    board_id: int
    title: str
    position: int

    class Config:
        orm_mode = True

class ColumnUpdate(BaseModel):
    title: str