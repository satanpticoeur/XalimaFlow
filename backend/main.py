from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints import auth, users, content
from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(
    title="XalimaFlow API",
    description="API pour la création de contenu assistée par IA",
    version="0.1.0",
)

# Configuration CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs API
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(content.router, prefix="/api/v1/content", tags=["content"])  # <--- ADD THIS


@app.get("/")
async def read_root():
    return {"message": "Bienvenue sur l'API XalimaFlow !"}
