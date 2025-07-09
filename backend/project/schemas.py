from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from core.schemas import UserRead

class ProjectBase(BaseModel):
    name: str = Field(..., example="My Project")
    description: Optional[str] = Field(None, example="A description of the project.")

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class ProjectUserRoleBase(BaseModel):
    user_id: int
    role: str  # "owner", "developer", "viewer"

class ProjectUserRoleRead(ProjectUserRoleBase):
    project_id: int
    user: UserRead
    model_config = {'from_attributes': True}

class ProjectRead(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime
    users: List[ProjectUserRoleRead] = []

    model_config = {'from_attributes': True} 