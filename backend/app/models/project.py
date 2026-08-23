from datetime import datetime

from sqlalchemy import Boolean, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    slug: Mapped[str] = mapped_column(
        String(200),
        unique=True,
        index=True,
        nullable=False
    )

    category: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    technologies: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    image: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    github_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    live_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True
    )

    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )