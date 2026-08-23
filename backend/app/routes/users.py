from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User
from app.schemas.user import UserResponse
from app.utils.dependencies import get_current_admin


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "",
    response_model=list[UserResponse]
)
def get_users(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):

    return (
        db.query(User)
        .order_by(
            User.id.desc()
        )
        .all()
    )