from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_send_contact_message():
    response = client.post(
        "/api/contacts",
        json={
            "full_name": "Test User",
            "email": "test.user@example.com",
            "phone": "+91 9876543210",
            "subject": "Testing contact endpoint",
            "message": "This contact message was sent by a test.",
        },
    )

    assert response.status_code in {200, 201}


def test_contact_message_requires_valid_email():
    response = client.post(
        "/api/contacts",
        json={
            "full_name": "Test User",
            "email": "not-an-email",
            "phone": "+91 9876543210",
            "subject": "Invalid email test",
            "message": "Validation should reject this request.",
        },
    )

    assert response.status_code == 422