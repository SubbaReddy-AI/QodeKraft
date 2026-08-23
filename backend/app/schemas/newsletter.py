from pydantic import BaseModel, EmailStr


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterResponse(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    class Config:
        from_attributes = True