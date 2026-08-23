from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: str | None = None
    service: str | None = None
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    company: str | None
    service: str | None
    message: str
    status: str

    class Config:
        from_attributes = True