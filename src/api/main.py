from secrets import token_urlsafe
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import RedirectResponse
from pydantic import AnyHttpUrl

from db import DB

api_router = APIRouter()


@api_router.post("/link")
def new_link(long_link: AnyHttpUrl):
    db = DB.get_instance()
    length = 50
    while True:
        new_short_link = token_urlsafe(int(length/10))
        if db.get_link(new_short_link) is not None:
            length += 1
            continue
        db.add_link(long_link, new_short_link)
        break
    return {"short_link": new_short_link}


@api_router.get("/r/{short_link}")
def get_link(short_link: str):
    db = DB.get_instance()
    long_link = db.get_link(short_link)
    if long_link is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Can't find long link")
    return RedirectResponse(url=long_link)
