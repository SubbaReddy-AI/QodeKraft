from pydantic import BaseModel


class ProjectBase(BaseModel):
    title: str
    slug: str
    category: str
    description: str
    technologies: str | None = None
    github_url: str | None = None
    live_url: str | None = None
    is_featured: bool = False


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    id: int
    image: str | None
    is_active: bool

    class Config:
        from_attributes = True