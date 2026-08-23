from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_get_courses_returns_success():
    response = client.get("/api/courses")

    assert response.status_code == 200
    assert isinstance(response.json(), (list, dict))


def test_get_course_with_unknown_slug_returns_not_found():
    response = client.get(
        "/api/courses/course-that-does-not-exist"
    )

    assert response.status_code == 404