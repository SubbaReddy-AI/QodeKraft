from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.contact_message import ContactMessage
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.notification_service import notify_admin
from app.excel.exporter import export_all_data


router = APIRouter(
    prefix="/contacts",
    tags=["Contact"],
)


@router.post(
    "",
    response_model=ContactResponse,
)
def create_contact(
    data: ContactCreate,
    db: Session = Depends(get_db),
):
    contact = ContactMessage(
        name=data.name,
        email=data.email,
        company=data.company,
        service=data.service,
        message=data.message,
    )

    # Save contact to MySQL
    db.add(contact)
    db.commit()
    db.refresh(contact)

    # Update Excel file
    export_all_data(db)

    # Send admin notification
    notify_admin(
        "New QodeKraft Contact Enquiry",
        (
            f"Name: {data.name}\n"
            f"Email: {data.email}\n"
            f"Service: {data.service}\n\n"
            f"{data.message}"
        ),
    )

    return contact