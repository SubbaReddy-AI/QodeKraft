from pydantic import BaseModel, EmailStr, Field


class RegistrationStartRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    referral_id: str | None = Field(default=None, max_length=100)
    course_slug: str = Field(min_length=1, max_length=200)


class RegistrationStartResponse(BaseModel):
    registration_id: str
    course_title: str
    amount: int
    currency: str
    razorpay_order_id: str
    razorpay_key_id: str


class RegistrationVerifyRequest(BaseModel):
    registration_id: str
    razorpay_payment_id: str
    razorpay_order_id: str
    razorpay_signature: str
    utr: str = Field(min_length=4, max_length=100)


class RegistrationSuccessResponse(BaseModel):
    success: bool
    registration_id: str
    course_title: str
    payment_status: str
    message: str
    email_sent: bool = False
