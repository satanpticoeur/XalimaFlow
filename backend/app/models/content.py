from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    content_html = Column(Text, nullable=True)  # Contenu de l'éditeur WYSIWYG
    content_markdown = Column(Text, nullable=True)
    status = Column(String, default="draft")  # draft, published, archived

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="contents")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # On peut ajouter des relations pour les tags, projets. plus tard
    # project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    # project = relationship("Project")
    # tags = relationship("Tag", secondary="content_tags", back_populates="contents")


    def __repr__(self):
        return f"<Content(title='{self.title}', user_id={self.user_id})>"