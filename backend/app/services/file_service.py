from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.config import settings


ALLOWED_EXTENSIONS = {
    ".pdf",
    ".doc",
    ".docx",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp"
}


async def save_upload(
    file: UploadFile,
    folder: str
) -> str:

    extension = Path(
        file.filename or ""
    ).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError(
            "Unsupported file type"
        )

    directory = (
        Path(settings.UPLOAD_DIR)
        / folder
    )

    directory.mkdir(
        parents=True,
        exist_ok=True
    )

    filename = (
        f"{uuid4().hex}"
        f"{extension}"
    )

    file_path = directory / filename

    content = await file.read()

    max_size = (
        settings.MAX_UPLOAD_SIZE_MB
        * 1024
        * 1024
    )

    if len(content) > max_size:
        raise ValueError(
            "File exceeds maximum allowed size"
        )

    file_path.write_bytes(content)

    return str(file_path)