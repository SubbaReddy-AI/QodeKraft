from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.certificate import Certificate
from app.utils.dependencies import get_current_admin


router = APIRouter(
    prefix="/certificates",
    tags=["Certificates"],
)


@router.get("")
def get_certificates(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    certificates = (
        db.query(Certificate)
        .order_by(Certificate.id.desc())
        .all()
    )

    return certificates


@router.get("/verify/{certificate_id}")
def verify_certificate(
    certificate_id: str,
    db: Session = Depends(get_db),
):
    certificate = (
        db.query(Certificate)
        .filter(
            Certificate.certificate_id == certificate_id
        )
        .first()
    )

    if not certificate:
        raise HTTPException(
            status_code=404,
            detail="Certificate not found",
        )

    return {
        "valid": True,
        "certificate": certificate,
    }