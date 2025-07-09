from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import datetime
from core.models import Base

class ProjectUserRole(Base):
    __tablename__ = "project_user_roles"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id"), primary_key=True)
    role = Column(String(50), nullable=False)  # e.g., "owner", "developer", "viewer"
    user = relationship("User", back_populates="project_roles")
    project = relationship("Project", back_populates="user_roles")

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    user_roles = relationship("ProjectUserRole", back_populates="project", cascade="all, delete-orphan") 