from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_get_projects_returns_success():
    response = client.get("/api/projects")

    assert response.status_code == 200
    assert isinstance(response.json(), (list, dict))


def test_get_project_with_unknown_slug_returns_not_found():
    response = client.get(
        "/api/projects/project-that-does-not-exist"
    )

    assert response.status_code == 404