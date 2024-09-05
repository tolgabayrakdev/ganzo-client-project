from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .controller import authentication_controller, threat_controller
from .database import engine
from . import model

model.Base.metadata.create_all(bind=engine)
load_dotenv()

app = FastAPI()

origins = ["http://localhost:5173", "https://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=authentication_controller.router, prefix="/api/v1/authentication")
app.include_router(router=threat_controller.router, prefix="/api/v1/threat")


@app.get("/")
def read_root():
    return {"Hello": "World"}