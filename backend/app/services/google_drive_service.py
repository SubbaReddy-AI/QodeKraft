from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload


BASE_DIR = Path(__file__).resolve().parent.parent

CREDENTIALS_FILE = (
    BASE_DIR
    / "credentials"
    / "google-service-account.json"
)

SCOPES = [
    "https://www.googleapis.com/auth/drive"
]

GOOGLE_DRIVE_FILE_ID = "15InDWwNaLDcjBC40bailKcdI8BiLV_oP"


def upload_excel_to_google_drive(excel_file_path):
    credentials = service_account.Credentials.from_service_account_file(
        str(CREDENTIALS_FILE),
        scopes=SCOPES,
    )

    drive_service = build(
        "drive",
        "v3",
        credentials=credentials,
    )

    media = MediaFileUpload(
        str(excel_file_path),
        mimetype=(
            "application/vnd.openxmlformats-officedocument."
            "spreadsheetml.sheet"
        ),
        resumable=True,
    )

    drive_service.files().update(
        fileId=GOOGLE_DRIVE_FILE_ID,
        media_body=media,
    ).execute()

    print("Google Drive Excel updated successfully")