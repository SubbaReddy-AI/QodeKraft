from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_get_internships_returns_success():
    response = client.get("/api/internships")

    assert response.status_code == 200
    assert isinstance(response.json(), (list, dict))


def test_get_internship_with_unknown_slug_returns_not_found():
    response = client.get(
        "/api/internships/internship-that-does-not-exist"
    )

    assert response.status_code == 404