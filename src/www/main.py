from fastapi import APIRouter
from fastapi.responses import RedirectResponse


site_router = APIRouter()


@site_router.get("/")
def index():
    return RedirectResponse(url="/static/index.html")
