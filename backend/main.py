from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import text
from core.database import get_db, init_db
from core.models import User
from core.security import hash_password, verify_password, create_access_token
from pydantic import BaseModel, EmailStr
from core.router import router, core_router
from project.router import project_router

app = FastAPI()
init_db()
app.include_router(router)
app.include_router(core_router)
app.include_router(project_router)

@app.get("/live")
def live():
    return {"status": "ok"}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"db": "ok"}
    except Exception as e:
        return {"db": "error", "detail": str(e)} 