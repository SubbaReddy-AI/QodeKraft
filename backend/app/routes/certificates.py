from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.certificate import Certificate
from app.schemas.certificate import CertificateResponse


router = APIRouter(
    prefix="/certificates",
    tags=["Certificates"]
)


@router.get(
    "/verify/{certificate_id}",
    response_model=CertificateResponse
)
def verify_certificate(
    certificate_id: str,
    db: Session = Depends(get_db)
):

    certificate = (
        db.query(Certificate)
        .filter(
            Certificate.certificate_id
            == certificate_id
        )
        .first()
    )

    if certificate is None:

        raise HTTPException(
            status_code=404,
            detail="Certificate not found."
        )

    if certificate.status.upper() != "VALID":

        raise HTTPException(
            status_code=400,
            detail="Certificate is not valid."
        )

    return certificate