from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from app.crud.user import get_user_by_email
from app.schemas.token import TokenData
from app.core.config import settings
from fastapi.security import OAuth2PasswordBearer
from app.crud import user as crud_user
from app.schemas.user import UserInDB
from app.core.database import get_db
from app.models.user import User

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str | None = payload.get("sub")
        user_id: int | None = payload.get("user_id") # <--- EXTRAIRE L'ID ICI
        if email is None or user_id is None: # <--- VÉRIFIER QUE L'ID EST PRÉSENT
            raise credentials_exception
        token_data = TokenData(email=email, user_id=user_id) # <--- PASSER L'ID À TokenData
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db, email=token_data.email)
    if user is None or user.id != token_data.user_id: # <--- VÉRIFIER QUE L'ID CORRESPOND
        raise credentials_exception
    return user

@router.get("/me/", response_model=UserInDB)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user