from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    UploadFile
)
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.job import Job
from app.models.job_application import JobApplication
from app.schemas.career import JobResponse
from app.services.file_service import save_upload
from app.services.notification_service import notify_admin


router = APIRouter(
    prefix="/careers",
    tags=["Careers"]
)


@router.get(
    "",
    response_model=list[JobResponse]
)
def get_jobs(
    db: Session = Depends(get_db)
):

    return (
        db.query(Job)
        .filter(
            Job.is_active == True
        )
        .order_by(
            Job.id.desc()
        )
        .all()
    )


@router.get(
    "/{slug}",
    response_model=JobResponse
)
def get_job(
    slug: str,
    db: Session = Depends(get_db)
):

    return (
        db.query(Job)
        .filter(
            Job.slug == slug,
            Job.is_active == True
        )
        .first()
    )


@router.post(
    "/apply"
)
async def apply_job(
    name: str = Form(...),
    email: str = Form(...),
    phone: str | None = Form(None),
    position: str = Form(...),
    experience: str | None = Form(None),
    resume: UploadFile | None = File(None),
    db: Session = Depends(get_db)
):

    resume_path = None

    if resume:
        resume_path = await save_upload(
            resume,
            "resumes"
        )

    application = JobApplication(
        name=name,
        email=email,
        phone=phone,
        position=position,
        experience=experience,
        resume_path=resume_path
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    notify_admin(
        "New Job Application",
        f"New job application from {name}"
    )

    return {
        "message": "Job application submitted successfully",
        "application_id": application.id
    }