from fastapi import APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse


site_router = APIRouter()
site_router.mount("/static", StaticFiles(directory="www/static"), name="static files")


@site_router.get("/")
def index():
    return RedirectResponse(url="/static/index.html")
