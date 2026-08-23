from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_login_rejects_invalid_credentials():
    response = client.post(
        "/api/auth/login",
        json={
            "email": "invalid@example.com",
            "password": "wrong-password",
        },
    )

    assert response.status_code in {400, 401}


def test_current_user_requires_token():
    response = client.get("/api/auth/me")

    assert response.status_code == 401