from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.config import settings
from app.database.connection import get_db
from app.models.course import Course
from app.models.course_registration import CourseRegistration
from app.schemas.course_registration import (
    RegistrationStartRequest,
    RegistrationStartResponse,
    RegistrationSuccessResponse,
    RegistrationVerifyRequest,
)
from app.services.email_service import send_email
from app.services.razorpay_service import (
    create_order,
    fetch_payment,
    payment_reference_values,
    verify_signature,
)


router = APIRouter(prefix="/course-registrations", tags=["Course Registrations"])

COURSE_REGISTRATION_FEE = 8500


def make_registration_id() -> str:
    return f"QKREG-{datetime.utcnow().year}-{uuid4().hex[:8].upper()}"

@router.post(
    "/start",
    response_model=RegistrationStartResponse,
    status_code=status.HTTP_201_CREATED,
)
def start_registration(
    payload: RegistrationStartRequest,
    db: Session = Depends(get_db),
):
    course = (
    db.query(Course)
    .filter(
        Course.is_active == True,
        (Course.slug == payload.course_slug)
        | (Course.title == payload.course_slug)
    )
    .first()
)
    if not course:
        raise HTTPException(status_code=404, detail="Selected course was not found.")
    # QodeKraft uses one fixed fee for every Academy course.
    fixed_fee = COURSE_REGISTRATION_FEE

    registration_id = make_registration_id()
    try:
        order = create_order(
            amount_rupees=fixed_fee,
            receipt=registration_id,
            notes={
                "registration_id": registration_id,
                "course_slug": course.slug,
            },
        )
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail="Unable to create the Razorpay payment order. Please try again.",
        ) from exc

    registration = CourseRegistration(
        registration_id=registration_id,
        full_name=payload.full_name.strip(),
        email=str(payload.email).lower(),
        phone=payload.phone.strip(),
        referral_id=payload.referral_id.strip() if payload.referral_id else None,
        course_id=course.id,
        course_slug=course.slug,
        course_title=course.title,
        amount=fixed_fee,
        razorpay_order_id=order["id"],
        payment_status="created",
    )
    db.add(registration)
    db.commit()

    return RegistrationStartResponse(
        registration_id=registration_id,
        course_title=course.title,
        amount=fixed_fee,
        currency="INR",
        razorpay_order_id=order["id"],
        razorpay_key_id=settings.RAZORPAY_KEY_ID,
    )


@router.post(
    "/verify",
    response_model=RegistrationSuccessResponse,
)
def verify_registration_payment(
    payload: RegistrationVerifyRequest,
    db: Session = Depends(get_db),
):
    registration = (
        db.query(CourseRegistration)
        .filter(CourseRegistration.registration_id == payload.registration_id)
        .first()
    )
    if not registration:
        raise HTTPException(status_code=404, detail="Registration could not be found.")

    if registration.payment_status == "paid":
        return RegistrationSuccessResponse(
            success=True,
            registration_id=registration.registration_id,
            course_title=registration.course_title,
            payment_status="paid",
            message="Registration is already confirmed.",
        )

    if payload.razorpay_order_id != registration.razorpay_order_id:
        raise HTTPException(status_code=400, detail="Payment order does not match this registration.")

    normalized_utr = payload.utr.strip().upper()
    if not normalized_utr:
        raise HTTPException(status_code=400, detail="Please enter the UTR / transaction reference number.")

    duplicate = (
        db.query(CourseRegistration)
        .filter(
            CourseRegistration.utr == normalized_utr,
            CourseRegistration.id != registration.id,
        )
        .first()
    )
    if duplicate:
        raise HTTPException(status_code=409, detail="This UTR has already been used for another registration.")

    try:
        if not verify_signature(
            registration.razorpay_order_id,
            payload.razorpay_payment_id,
            payload.razorpay_signature,
        ):
            raise HTTPException(status_code=400, detail="Payment signature verification failed.")

        payment = fetch_payment(payload.razorpay_payment_id)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Razorpay payment verification is temporarily unavailable.") from exc

    if payment.get("order_id") != registration.razorpay_order_id:
        raise HTTPException(status_code=400, detail="Payment is not linked to this registration order.")

    if int(payment.get("amount", 0)) != registration.amount * 100:
        raise HTTPException(status_code=400, detail="Payment amount does not match the selected course.")

    if payment.get("status") != "captured" or not payment.get("captured"):
        raise HTTPException(status_code=400, detail="Payment is not captured yet. Please wait and try again.")

    razorpay_refs = payment_reference_values(payment)
    if razorpay_refs and normalized_utr not in razorpay_refs:
        raise HTTPException(
            status_code=400,
            detail="The UTR / transaction reference does not match the Razorpay payment.",
        )

    registration.razorpay_payment_id = payload.razorpay_payment_id
    registration.razorpay_signature = payload.razorpay_signature
    registration.utr = normalized_utr
    registration.payment_status = "paid"
    registration.paid_at = datetime.utcnow()

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="This payment or UTR has already been registered.") from exc

    subject = f"QodeKraft Registration Successful — {registration.registration_id}"
    body = f"""Hello {registration.full_name},

Your QodeKraft course registration is successful.

Registration ID: {registration.registration_id}
Course: {registration.course_title}
Payment Status: Paid
Amount: ₹{registration.amount:,}
UTR / Transaction Reference: {registration.utr}

Your payment was verified successfully through Razorpay.
Please keep your Registration ID for future communication.

Thank you for choosing QodeKraft.

Regards,
QodeKraft Academy
"""
    email_sent = send_email(registration.email, subject, body)

    return RegistrationSuccessResponse(
        success=True,
        registration_id=registration.registration_id,
        course_title=registration.course_title,
        payment_status="paid",
        message=(
            "Registration successful. Payment verified and confirmation email sent."
            if email_sent
            else "Registration successful and payment verified. Email delivery is pending SMTP configuration."
        ),
        email_sent=email_sent,
    )
