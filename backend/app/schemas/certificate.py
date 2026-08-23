from datetime import date

from pydantic import BaseModel, ConfigDict


class CertificateResponse(BaseModel):

    certificate_id: str

    name: str

    program: str

    issued_date: date

    status: str

    model_config = ConfigDict(
        from_attributes=True
    )