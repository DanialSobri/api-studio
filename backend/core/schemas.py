from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str = Field(..., example="my@example.com")
    full_name: str | None = None

class UserCreate(UserBase):
    password: str = Field(..., example="password")

class UserUpdate(BaseModel):
    email: Optional[str] = None
    password: Optional[str] = None
    full_name: Optional[str] = None

class UserRead(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None
    model_config = {'from_attributes': True} 