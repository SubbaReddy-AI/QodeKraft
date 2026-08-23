from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.course import Course
from app.schemas.course import CourseResponse


router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


@router.get(
    "",
    response_model=list[CourseResponse]
)
def get_courses(
    db: Session = Depends(get_db)
):

    return (
        db.query(Course)
        .filter(
            Course.is_active == True
        )
        .order_by(
            Course.id.desc()
        )
        .all()
    )


@router.get(
    "/{slug}",
    response_model=CourseResponse
)
def get_course(
    slug: str,
    db: Session = Depends(get_db)
):

    return (
        db.query(Course)
        .filter(
            Course.slug == slug,
            Course.is_active == True
        )
        .first()
    )