from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from routes.router import router

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(router)