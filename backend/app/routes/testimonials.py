from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialResponse


router = APIRouter(
    prefix="/testimonials",
    tags=["Testimonials"]
)


@router.get(
    "",
    response_model=list[TestimonialResponse]
)
def get_testimonials(
    db: Session = Depends(get_db)
):

    return (
        db.query(Testimonial)
        .filter(
            Testimonial.is_active == True
        )
        .order_by(
            Testimonial.id.desc()
        )
        .all()
    )