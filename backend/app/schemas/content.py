from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ContentBase(BaseModel):
    title: str
    content_html: Optional[str] = None
    content_markdown: Optional[str] = None
    status: str = "draft" # Default status

class ContentCreate(ContentBase):
    pass

class ContentUpdate(BaseModel): # <--- MODIFIÉ ICI: Hérite de BaseModel pour rendre tous les champs optionnels
    title: Optional[str] = None
    content_html: Optional[str] = None
    content_markdown: Optional[str] = None
    status: Optional[str] = None
    slug: Optional[str] = None # Permettre la mise à jour du slug si besoin, bien que ce soit rare

class ContentInDB(ContentBase):
    id: int
    slug: str
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AIGenerationRequest(BaseModel):
    prompt: str
    max_tokens: Optional[int] = 500
    temperature: Optional[float] = 0.7