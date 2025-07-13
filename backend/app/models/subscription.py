from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base


class SubscriptionPlan(Base):
    __tablename__ = "subscription_plans"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)  # Ex: "Free", "Basic", "Premium"
    price = Column(Numeric(10, 2), nullable=False)
    description = Column(Text, nullable=True)
    max_words_per_month = Column(Integer, default=0)  # Limite de mots générés par l'IA
    features = Column(Text, nullable=True)  # JSON ou texte décrivant les fonctionnalités


class UserSubscription(Base):
    __tablename__ = "user_subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plan_id = Column(Integer, ForeignKey("subscription_plans.id"), nullable=False)

    user = relationship("User")
    plan = relationship("SubscriptionPlan")

    start_date = Column(DateTime(timezone=True), server_default=func.now())
    end_date = Column(DateTime(timezone=True), nullable=True)  # Null pour un plan "Free" ou si pas de fin
    is_active = Column(Boolean, default=True) 

    current_words_used = Column(Integer, default=0)  # Suivi de la consommation de mots IA

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())