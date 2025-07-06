from pydantic import BaseModel

class ColumnCreate(BaseModel):
    board_id: int
    title: str
    position: int

class ColumnOut(BaseModel):
    column_id: int
    board_id: int
    title: str
    position: int

    class Config:
        orm_mode = True
