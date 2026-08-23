from pydantic import BaseModel, EmailStr


class InternshipBase(BaseModel):
    title: str
    slug: str
    description: str
    duration: str | None = None
    eligibility: str | None = None


class InternshipCreate(InternshipBase):
    pass


class InternshipResponse(InternshipBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True


class InternshipApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    internship: str
    message: str | None = None