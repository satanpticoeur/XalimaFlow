from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False

# Propriétés pour la création d'un utilisateur
class UserCreate(UserBase):
    password: str

# Propriétés pour la mise à jour d'un utilisateur (optionnel)
class UserUpdate(UserBase):
    password: Optional[str] = None

# Propriétés à retourner après création/lecture
class UserInDB(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        # orm_mode = True
        from_attributes = True