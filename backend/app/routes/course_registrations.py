from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.course_registration import CourseRegistration
from app.utils.dependencies import get_current_admin


router = APIRouter(
    prefix="/course-registrations",
    tags=["Course Registrations"],
)


@router.get("")
def get_course_registrations(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    registrations = (
        db.query(CourseRegistration)
        .order_by(CourseRegistration.id.desc())
        .all()
    )

    return registrations