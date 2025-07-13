import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, Base

# En production, utilisez Alembic pour les migrations.
Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(
    title="XalimaFlow API",
    description="API pour la création de contenu assistée par IA",
    version="0.1.0",
)

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


@app.get("/")
async def read_root():
    return {"message": "Bienvenue sur l'API XalimaFlow !"}


@app.get("/test-env")
async def test_env():
    db_url = os.getenv("DATABASE_URL", "URL de base de données non définie")
    return {"database_url_status": db_url}
