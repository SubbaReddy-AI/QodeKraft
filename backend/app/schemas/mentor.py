from pydantic import BaseModel


class MentorResponse(BaseModel):
    id: int
    name: str
    role: str
    bio: str | None
    image: str | None
    is_active: bool

    class Config:
        from_attributes = True