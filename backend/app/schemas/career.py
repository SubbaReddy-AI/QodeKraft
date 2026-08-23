from pydantic import BaseModel


class JobBase(BaseModel):
    title: str
    slug: str
    location: str | None = None
    employment_type: str
    description: str
    requirements: str | None = None


class JobCreate(JobBase):
    pass


class JobResponse(JobBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True