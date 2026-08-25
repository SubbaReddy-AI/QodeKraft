import os
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

# Render Secret File
RENDER_CREDENTIALS_FILE = Path(
    "/etc/secrets/google-service-account.json"
)

# Local development credentials
LOCAL_CREDENTIALS_FILE = (
    BASE_DIR
    / "credentials"
    / "google-service-account.json"
)

if RENDER_CREDENTIALS_FILE.exists():
    CREDENTIALS_FILE = RENDER_CREDENTIALS_FILE
else:
    CREDENTIALS_FILE = LOCAL_CREDENTIALS_FILE


# ============================================================
# GOOGLE DRIVE
# ============================================================

SCOPES = [
    "https://www.googleapis.com/auth/drive"
]

GOOGLE_DRIVE_FILE_ID = (
    "15InDWwNaLDcjBC40bailKcdI8BiLV_oP"
)


# ============================================================
# UPLOAD EXCEL TO GOOGLE DRIVE
# ============================================================

def upload_excel_to_google_drive(excel_file_path):

    if not CREDENTIALS_FILE.exists():
        raise FileNotFoundError(
            f"Google credentials not found: {CREDENTIALS_FILE}"
        )

    print(
        f"Using Google credentials: {CREDENTIALS_FILE}"
    )

    credentials = (
        service_account.Credentials
        .from_service_account_file(
            str(CREDENTIALS_FILE),
            scopes=SCOPES,
        )
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

    print(
        "Google Drive Excel updated successfully"
    )