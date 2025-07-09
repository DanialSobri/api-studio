from sqlalchemy.orm import Session
from .models import Project, ProjectUserRole
from core.models import User
from typing import List, Optional
from sqlalchemy.orm import joinedload

def create_project(db: Session, name: str, description: Optional[str], owner_id: int) -> Project:
    project = Project(name=name, description=description)
    db.add(project)
    db.commit()
    db.refresh(project)
    owner_role = ProjectUserRole(user_id=owner_id, project_id=project.id, role="owner")
    db.add(owner_role)
    db.commit()
    # Eagerly load user_roles so that the owner is included in the response
    db.refresh(project)
    return project

def get_project(db: Session, project_id: int) -> Optional[Project]:
    return db.query(Project).options(
        joinedload(Project.user_roles).joinedload(ProjectUserRole.user)
    ).filter(Project.id == project_id).first()

def get_projects_for_user(db: Session, user_id: int) -> List[Project]:
    return (
        db.query(Project)
        .options(joinedload(Project.user_roles).joinedload(ProjectUserRole.user))
        .join(ProjectUserRole)
        .filter(ProjectUserRole.user_id == user_id)
        .all()
    )

def update_project(db: Session, project_id: int, name: Optional[str], description: Optional[str]) -> Optional[Project]:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return None
    if name is not None:
        project.name = name
    if description is not None:
        project.description = description
    db.commit()
    db.refresh(project)
    return project

def delete_project(db: Session, project_id: int) -> bool:
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return False
    db.delete(project)
    db.commit()
    return True

def get_user_role_for_project(db: Session, user_id: int, project_id: int) -> Optional[str]:
    pur = db.query(ProjectUserRole).filter_by(user_id=user_id, project_id=project_id).first()
    return pur.role if pur else None

def set_user_role_for_project(db: Session, user_id: int, project_id: int, role: str) -> ProjectUserRole:
    pur = db.query(ProjectUserRole).filter_by(user_id=user_id, project_id=project_id).first()
    if pur:
        pur.role = role
    else:
        pur = ProjectUserRole(user_id=user_id, project_id=project_id, role=role)
        db.add(pur)
    db.commit()
    return pur

def remove_user_from_project(db: Session, user_id: int, project_id: int) -> bool:
    pur = db.query(ProjectUserRole).filter_by(user_id=user_id, project_id=project_id).first()
    if not pur:
        return False
    db.delete(pur)
    db.commit()
    return True 