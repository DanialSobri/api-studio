from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from core.config import settings
from core.models import Base, User
from sqlalchemy.orm import Session
from typing import List, Optional

engine = create_engine(settings.DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    # Ensure all tables, including AuthAudit, are created
    Base.metadata.create_all(bind=engine)