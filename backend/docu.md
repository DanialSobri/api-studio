# Backend Documentation

## main.py
- **Purpose:** Entry point for the FastAPI application. Initializes the database and includes all routers.
- **Endpoints:**
  - `/live`: Health check endpoint.
  - `/test-db`: Checks database connectivity.

## core/
### core/models.py
- **Purpose:** SQLAlchemy models for authentication and user management.
- **Models:**
  - `User`: User accounts, roles, and profile info.
  - `AuthAudit`: Authentication event logs (login, logout, failed login).
  - `Session`: User session management.

### core/database.py
- **Purpose:** Database connection and session management.
- **Functions:**
  - `get_db()`: Dependency for DB session.
  - `init_db()`: Initializes all tables.

### core/schemas.py
- **Purpose:** Pydantic schemas for user and auth data validation/serialization.
- **Schemas:**
  - `UserBase`, `UserCreate`, `UserUpdate`, `UserRead`

### core/config.py
- **Purpose:** Loads environment variables and app settings (DB URL, secret key).

### core/security.py
- **Purpose:** Password hashing, JWT creation/verification.
- **Functions:**
  - `hash_password`, `verify_password`, `create_access_token`, `decode_access_token`

### core/router.py
- **Purpose:** Auth and user management API endpoints.
- **Endpoints:**
  - `/api/auth/register`: Register a new user.
  - `/api/auth/login`: User login, returns JWT.
  - `/api/auth/logout`: Logout and revoke session.
  - `/api/auth/me`: Get current user info.
  - `/api/auth/sessions`: List user sessions.
  - `/api/auth/sessions/{session_id}/revoke`: Revoke a session.

## project/
### project/models.py
- **Purpose:** SQLAlchemy models for projects and project-user roles.
- **Models:**
  - `Project`: Project entity.
  - `ProjectUserRole`: User's role in a project (owner, developer, viewer).

### project/schemas.py
- **Purpose:** Pydantic schemas for project and project-user data.
- **Schemas:**
  - `ProjectBase`, `ProjectCreate`, `ProjectUpdate`, `ProjectUserRoleBase`, `ProjectUserRoleRead`, `ProjectRead`

### project/service.py
- **Purpose:** Business logic for project CRUD and user-role management.
- **Functions:**
  - `create_project`, `get_project`, `get_projects_for_user`, `update_project`, `delete_project`, `get_user_role_for_project`, `set_user_role_for_project`, `remove_user_from_project`

### project/router.py
- **Purpose:** Project management API endpoints.
- **Endpoints:**
  - `POST /api/projects/`: Create a new project.
  - `GET /api/projects/`: List all projects for the current user (with users/roles).
  - `GET /api/projects/{project_id}`: Get project details (with users/roles).
  - `PUT /api/projects/{project_id}`: Update a project.
  - `DELETE /api/projects/{project_id}`: Delete a project.
  - `POST /api/projects/{project_id}/users`: Add/update a user's role in a project.
  - `DELETE /api/projects/{project_id}/users/{user_id}`: Remove a user from a project. 