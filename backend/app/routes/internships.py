from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    UploadFile
)
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.internship import Internship
from app.models.internship_application import (
    InternshipApplication
)
from app.schemas.internship import (
    InternshipApplicationCreate,
    InternshipResponse,
)
from app.services.file_service import save_upload
from app.services.notification_service import (
    notify_admin
)


router = APIRouter(
    prefix="/internships",
    tags=["Internships"]
)


@router.get(
    "",
    response_model=list[InternshipResponse]
)
def get_internships(
    db: Session = Depends(get_db)
):

    return (
        db.query(Internship)
        .filter(
            Internship.is_active == True
        )
        .all()
    )


@router.get(
    "/{slug}",
    response_model=InternshipResponse
)
def get_internship(
    slug: str,
    db: Session = Depends(get_db)
):

    return (
        db.query(Internship)
        .filter(
            Internship.slug == slug
        )
        .first()
    )


@router.post(
    "/apply"
)
async def apply_internship(
    name: str = Form(...),
    email: str = Form(...),
    phone: str | None = Form(None),
    internship: str = Form(...),
    message: str | None = Form(None),
    resume: UploadFile | None = File(None),
    db: Session = Depends(get_db)
):

    resume_path = None

    if resume:
        resume_path = await save_upload(
            resume,
            "resumes"
        )

    application = InternshipApplication(
        name=name,
        email=email,
        phone=phone,
        internship=internship,
        message=message,
        resume_path=resume_path
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    notify_admin(
        "New Internship Application",
        f"New application from {name}"
    )

    return {
        "message": "Application submitted successfully",
        "application_id": application.id
    }