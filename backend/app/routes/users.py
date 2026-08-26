from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User
from app.models.course import Course
from app.models.project import Project
from app.models.job_application import JobApplication
from app.schemas.user import UserResponse
from app.utils.dependencies import get_current_admin


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("/dashboard-stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    return {
        "users": db.query(User).count(),
        "courses": db.query(Course).count(),
        "projects": db.query(Project).count(),
        "applications": db.query(JobApplication).count(),
    }


@router.get(
    "",
    response_model=list[UserResponse],
)
def get_users(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    return (
        db.query(User)
        .order_by(User.id.desc())
        .all()
    )