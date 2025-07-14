from datetime import datetime

from slugify import slugify  # Nouveau: Importez slugify
from sqlalchemy.orm import Session

from app.models.content import Content
from app.schemas.content import ContentCreate, ContentUpdate


def create_user_content(db: Session, content: ContentCreate, owner_id: int):
    if not content.title:
        raise ValueError("Title cannot be empty for content creation.")

    generated_slug = slugify(content.title, lowercase=True)
    final_slug = generated_slug
    counter = 1
    while db.query(Content).filter(Content.slug == final_slug).first():
        final_slug = f"{generated_slug}-{counter}"
        counter += 1

    db_content = Content(
        title=content.title,
        slug=final_slug,  # Use the unique slug
        content_html=content.content_html,
        content_markdown=content.content_markdown,
        status=content.status,
        owner_id=owner_id
    )
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content


def get_content(db: Session, content_id: int):
    return db.query(Content).filter(Content.id == content_id).first()


def get_user_content(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    return db.query(Content).filter(Content.owner_id == owner_id).offset(skip).limit(limit).all()


def update_content(db: Session, content_id: int, content_update: ContentUpdate):
    db_content = db.query(Content).filter(Content.id == content_id).first()
    if not db_content:
        return None  # Retourne None si le contenu n'est pas trouvé

    update_data = content_update.model_dump(exclude_unset=True)  # Utiliser .model_dump() pour Pydantic v2+

    # Gérer la mise à jour du titre et la regénération du slug
    if "title" in update_data and update_data["title"] is not None:
        db_content.title = update_data["title"]
        # Regénérer le slug. Vous pouvez réutiliser la logique d'unicité si vous l'avez implémentée.
        db_content.slug = slugify(update_data["title"], to_lower=True)

    # Mettre à jour les autres champs à partir des données fournies dans content_update
    for key, value in update_data.items():
        if key not in ["title", "slug"]:  # Éviter de surcharger le titre/slug déjà gérés
            setattr(db_content, key, value)

    db_content.updated_at = datetime.now()  # Mettre à jour le timestamp de modification

    db.add(db_content)  # Ajouter à la session pour marquer comme modifié
    db.commit()
    db.refresh(db_content)  # Rafraîchir pour obtenir les dernières valeurs de la DB
    return db_content


def delete_content(db: Session, content_id: int):
    db_content = db.query(Content).filter(Content.id == content_id).first()
    if db_content:
        db.delete(db_content)
        db.commit()
    return db_content
