from pydantic import BaseModel


class CourseBase(BaseModel):
    title: str
    slug: str
    description: str
    level: str
    duration: str | None = None
    price: int | None = None


class CourseCreate(CourseBase):
    pass


class CourseResponse(CourseBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True