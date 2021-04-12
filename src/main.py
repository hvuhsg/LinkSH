from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import DB
from api.main import api_router

app = FastAPI()
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    DB()  # Initialize singleton


@app.on_event("shutdown")
def shutdown():
    DB.get_instance().close()

