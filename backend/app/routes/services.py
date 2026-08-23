from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.service import Service
from app.schemas.service import ServiceResponse


router = APIRouter(
    prefix="/services",
    tags=["Services"]
)


@router.get(
    "",
    response_model=list[ServiceResponse]
)
def get_services(
    db: Session = Depends(get_db)
):

    return (
        db.query(Service)
        .filter(
            Service.is_active == True
        )
        .order_by(
            Service.display_order
        )
        .all()
    )


@router.get(
    "/{slug}",
    response_model=ServiceResponse
)
def get_service(
    slug: str,
    db: Session = Depends(get_db)
):

    return (
        db.query(Service)
        .filter(
            Service.slug == slug,
            Service.is_active == True
        )
        .first()
    )