from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.contact_message import ContactMessage
from app.utils.dependencies import get_current_admin


router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"],
)


# ============================================================
# ADMIN - GET CONTACT MESSAGES
# ============================================================

@router.get("")
def get_contacts(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
):
    contacts = (
        db.query(ContactMessage)
        .order_by(ContactMessage.id.desc())
        .all()
    )

    return contacts


# ============================================================
# PUBLIC - CREATE CONTACT MESSAGE
# ============================================================

@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
def create_contact(
    payload: dict,
    db: Session = Depends(get_db),
):
    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip().lower()
    company = str(payload.get("company", "")).strip()
    service = str(payload.get("service", "")).strip()
    message = str(payload.get("message", "")).strip()

    # Validate required fields
    if not name:
        raise HTTPException(
            status_code=400,
            detail="Name is required.",
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email is required.",
        )

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message is required.",
        )

    # Create contact record using ONLY fields
    # that actually exist in ContactMessage
    contact = ContactMessage(
        name=name,
        email=email,
        company=company or None,
        service=service or None,
        message=message,
    )

    db.add(contact)
    db.commit()
    db.refresh(contact)

    return {
        "success": True,
        "message": "Your enquiry has been submitted successfully.",
        "contact_id": contact.id,
    }