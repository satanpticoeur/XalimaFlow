import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "XalimaFlow"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-that-should-be-stronger")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    # OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")

settings = Settings()