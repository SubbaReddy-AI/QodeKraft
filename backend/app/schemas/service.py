from pydantic import BaseModel


class ServiceBase(BaseModel):
    title: str
    slug: str
    category: str
    description: str
    icon: str | None = None
    display_order: int = 0


class ServiceCreate(ServiceBase):
    pass


class ServiceResponse(ServiceBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True