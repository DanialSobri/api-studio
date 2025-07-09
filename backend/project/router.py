from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.models import User
from core.database import get_db
from .service import create_project, get_project, get_projects_for_user, update_project, delete_project, get_user_role_for_project, set_user_role_for_project, remove_user_from_project
from .schemas import ProjectCreate, ProjectUpdate, ProjectRead, ProjectUserRoleBase, ProjectUserRoleRead
from typing import List
from core.router import get_current_user
from core.schemas import UserRead

project_router = APIRouter(prefix="/api/projects", tags=["projects"])

@project_router.post("/", response_model=ProjectRead)
def create_new_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_project = create_project(db, name=project.name, description=project.description, owner_id=current_user.id)
    return db_project

@project_router.get("/", response_model=List[ProjectRead])
def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    projects = get_projects_for_user(db, user_id=current_user.id)
    result = []
    for project in projects:
        users = [
            ProjectUserRoleRead(
                user_id=ur.user_id,
                project_id=ur.project_id,
                role=ur.role,
                user=UserRead.model_validate(ur.user) if ur.user else None
            )
            for ur in project.user_roles
        ]
        result.append(ProjectRead(
            id=project.id,
            name=project.name,
            description=project.description,
            created_at=project.created_at,
            updated_at=project.updated_at,
            users=users
        ))
    return result

@project_router.get("/{project_id}", response_model=ProjectRead)
def get_project_detail(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = get_project(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    role = get_user_role_for_project(db, current_user.id, project_id)
    if not role:
        raise HTTPException(status_code=403, detail="Not authorized for this project")
    users = [
        ProjectUserRoleRead(
            user_id=ur.user_id,
            project_id=ur.project_id,
            role=ur.role,
            user=UserRead.model_validate(ur.user) if ur.user else None
        )
        for ur in project.user_roles
    ]
    return ProjectRead(
        id=project.id,
        name=project.name,
        description=project.description,
        created_at=project.created_at,
        updated_at=project.updated_at,
        users=users
    )

@project_router.put("/{project_id}", response_model=ProjectRead)
def update_project_detail(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    role = get_user_role_for_project(db, current_user.id, project_id)
    if role not in ["owner", "developer"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this project")
    project = update_project(db, project_id, name=project_update.name, description=project_update.description)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@project_router.delete("/{project_id}", response_model=dict)
def delete_project_detail(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    role = get_user_role_for_project(db, current_user.id, project_id)
    if role != "owner":
        raise HTTPException(status_code=403, detail="Only owners can delete the project")
    success = delete_project(db, project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"msg": "Project deleted"}

@project_router.post("/{project_id}/users", response_model=dict)
def add_or_update_user_role(
    project_id: int,
    user_role: ProjectUserRoleBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Only owner can add/update roles
    role = get_user_role_for_project(db, current_user.id, project_id)
    if role != "owner":
        raise HTTPException(status_code=403, detail="Only owners can manage roles")
    set_user_role_for_project(db, user_id=user_role.user_id, project_id=project_id, role=user_role.role)
    return {"msg": "User role updated"}

@project_router.delete("/{project_id}/users/{user_id}", response_model=dict)
def remove_user_from_project_route(
    project_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Only owner can remove users
    role = get_user_role_for_project(db, current_user.id, project_id)
    if role != "owner":
        raise HTTPException(status_code=403, detail="Only owners can remove users")
    remove_user_from_project(db, user_id=user_id, project_id=project_id)
    return {"msg": "User removed from project"} 