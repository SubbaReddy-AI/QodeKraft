from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class News(Base):
    __tablename__ = "news"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(250),
        nullable=False
    )

    slug: Mapped[str] = mapped_column(
        String(250),
        unique=True,
        index=True,
        nullable=False
    )

    excerpt: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    image: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    is_published: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    published_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )