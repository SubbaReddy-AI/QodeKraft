from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.job_application import JobApplication
from app.utils.dependencies import get_current_admin


router = APIRouter(
    prefix="/applications",
    tags=["Applications"],
)


@router.get("")
def get_applications(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    applications = (
        db.query(JobApplication)
        .order_by(JobApplication.id.desc())
        .all()
    )

    return applications