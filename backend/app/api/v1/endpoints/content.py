from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.v1.endpoints.users import get_current_user  # Import from users endpoint
from app.core.config import settings
from app.core.database import get_db
from app.crud import content as crud_content
from app.models.user import User
from app.schemas.content import ContentCreate, ContentInDB, ContentUpdate, AIGenerationRequest
from app.services.ai import generate_text_with_ai

router = APIRouter()


@router.post("/", response_model=ContentInDB, status_code=status.HTTP_201_CREATED)
async def create_content(
        content_in: ContentCreate,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    return crud_content.create_user_content(db=db, content=content_in, owner_id=current_user.id)


@router.get("/{content_id}", response_model=ContentInDB)
async def read_content(
        content_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    content = crud_content.get_content(db, content_id)
    if not content or content.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found or you don't have permission"
        )
    return content


@router.get("/", response_model=List[ContentInDB])
async def read_user_contents(
        skip: int = 0,
        limit: int = 100,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    contents = crud_content.get_user_content(db, owner_id=current_user.id, skip=skip, limit=limit)
    return contents


@router.put("/{content_id}", response_model=ContentInDB)
async def update_content_item(
        content_id: int,
        content_update: ContentUpdate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    db_content = crud_content.get_content(db, content_id=content_id)
    if not db_content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    if db_content.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this content"
        )

    updated_content = crud_content.update_content(db=db, content_id=content_id, content_update=content_update)
    if not updated_content:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update content"
        )
    return updated_content


@router.delete("/{content_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_content_item(
        content_id: int,
        current_user: User = Depends(get_current_user),
        db: Session = Depends(get_db)
):
    content = crud_content.get_content(db, content_id)
    if not content or content.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found or you don't have permission"
        )
    crud_content.delete_content(db, content_id)
    return {"message": "Content deleted successfully"}


# AI GENERATION ENDPOINT
@router.post("/generate-ai-text", response_model=str)  # Returns plain string for now
async def generate_ai_text(
        ai_request: AIGenerationRequest,
        current_user: User = Depends(get_current_user)  # Ensure user is authenticated
):
    if not settings.GEMINI_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service is not configured. Please provide an OpenAI API key."
        )
    try:
        generated_text = await generate_text_with_ai(
            prompt=ai_request.prompt,
            temperature=ai_request.temperature
        )
        return generated_text
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI Configuration Error: {e}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate text with AI: {e}"
        )
