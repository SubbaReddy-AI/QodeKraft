from app.config import settings
from app.services.email_service import send_email


def notify_admin(
    subject: str,
    message: str
):

    if not settings.ADMIN_EMAIL:
        return False

    return send_email(
        settings.ADMIN_EMAIL,
        subject,
        message
    )