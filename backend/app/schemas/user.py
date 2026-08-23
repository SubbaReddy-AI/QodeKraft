from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool
    is_admin: bool

    class Config:
        from_attributes = True