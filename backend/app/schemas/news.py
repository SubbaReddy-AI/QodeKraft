from datetime import datetime

from pydantic import BaseModel


class NewsResponse(BaseModel):
    id: int
    title: str
    slug: str
    excerpt: str | None
    content: str
    image: str | None
    is_published: bool
    published_at: datetime | None

    class Config:
        from_attributes = True