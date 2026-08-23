from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.newsletter import Newsletter
from app.schemas.newsletter import (
    NewsletterCreate,
    NewsletterResponse,
)


router = APIRouter(
    prefix="/newsletter",
    tags=["Newsletter"]
)


@router.post(
    "",
    response_model=NewsletterResponse
)
def subscribe(
    data: NewsletterCreate,
    db: Session = Depends(get_db)
):

    existing = (
        db.query(Newsletter)
        .filter(
            Newsletter.email == data.email
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already subscribed"
        )

    subscriber = Newsletter(
        email=data.email
    )

    db.add(subscriber)
    db.commit()
    db.refresh(subscriber)

    return subscriber