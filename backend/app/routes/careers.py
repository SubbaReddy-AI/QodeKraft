from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.job import Job
from app.utils.dependencies import get_current_admin


router = APIRouter(
    prefix="/careers",
    tags=["Careers"],
)


@router.get("")
def get_careers(
    db: Session = Depends(get_db),
):
    jobs = (
        db.query(Job)
        .order_by(Job.id.desc())
        .all()
    )

    return jobs