from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from user.routes import router as user_router
from board.routes import router as board_router
from database.connection import engine, Base 
from column.routes import router as column_router
from task.routes import router as task_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(board_router)
app.include_router(column_router)
app.include_router(task_router)