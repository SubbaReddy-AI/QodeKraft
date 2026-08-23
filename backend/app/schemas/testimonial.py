from pydantic import BaseModel


class TestimonialResponse(BaseModel):
    id: int
    name: str
    role: str | None
    company: str | None
    content: str
    rating: int

    class Config:
        from_attributes = True