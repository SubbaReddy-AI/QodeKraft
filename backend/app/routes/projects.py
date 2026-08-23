from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.project import Project
from app.schemas.project import ProjectResponse


router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.get(
    "",
    response_model=list[ProjectResponse]
)
def get_projects(
    db: Session = Depends(get_db)
):

    return (
        db.query(Project)
        .filter(
            Project.is_active == True
        )
        .order_by(
            Project.id.desc()
        )
        .all()
    )


@router.get(
    "/featured",
    response_model=list[ProjectResponse]
)
def get_featured_projects(
    db: Session = Depends(get_db)
):

    return (
        db.query(Project)
        .filter(
            Project.is_active == True,
            Project.is_featured == True
        )
        .all()
    )


@router.get(
    "/{slug}",
    response_model=ProjectResponse
)
def get_project(
    slug: str,
    db: Session = Depends(get_db)
):

    return (
        db.query(Project)
        .filter(
            Project.slug == slug,
            Project.is_active == True
        )
        .first()
    )