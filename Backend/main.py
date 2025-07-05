from fastapi import FastAPI
from user.routes import router as user_router
from user.schema import Base
from database.connection import engine, Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
