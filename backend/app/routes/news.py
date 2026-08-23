from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.news import News
from app.schemas.news import NewsResponse


router = APIRouter(
    prefix="/news",
    tags=["News"]
)


@router.get(
    "",
    response_model=list[NewsResponse]
)
def get_news(
    db: Session = Depends(get_db)
):

    return (
        db.query(News)
        .filter(
            News.is_published == True
        )
        .order_by(
            News.published_at.desc()
        )
        .all()
    )


@router.get(
    "/{slug}",
    response_model=NewsResponse
)
def get_news_article(
    slug: str,
    db: Session = Depends(get_db)
):

    return (
        db.query(News)
        .filter(
            News.slug == slug,
            News.is_published == True
        )
        .first()
    )