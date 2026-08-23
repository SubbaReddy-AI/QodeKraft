from datetime import date

from sqlalchemy import (
    Column,
    Date,
    Integer,
    String,
    UniqueConstraint,
)

from app.database.base import Base


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    certificate_id = Column(
        String(100),
        unique=True,
        nullable=False,
        index=True
    )

    name = Column(
        String(150),
        nullable=False
    )

    program = Column(
        String(200),
        nullable=False
    )

    issued_date = Column(
        Date,
        nullable=False,
        default=date.today
    )

    status = Column(
        String(30),
        nullable=False,
        default="VALID"
    )

    __table_args__ = (
        UniqueConstraint(
            "certificate_id",
            name="uq_certificate_id"
        ),
    )