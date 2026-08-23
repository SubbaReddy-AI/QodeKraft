from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.mentor import Mentor
from app.schemas.mentor import MentorResponse


router = APIRouter(
    prefix="/mentors",
    tags=["Mentors"]
)


@router.get(
    "",
    response_model=list[MentorResponse]
)
def get_mentors(
    db: Session = Depends(get_db)
):

    return (
        db.query(Mentor)
        .filter(
            Mentor.is_active == True
        )
        .order_by(
            Mentor.id
        )
        .all()
    )


@router.get(
    "/{mentor_id}",
    response_model=MentorResponse
)
def get_mentor(
    mentor_id: int,
    db: Session = Depends(get_db)
):

    return db.get(
        Mentor,
        mentor_id
    )