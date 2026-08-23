import sys
import os

# ---------------------------------------------------------------------------
# 1. Add backend/ to sys.path so `from app.main import app` resolves.
# ---------------------------------------------------------------------------
BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "backend"))
sys.path.insert(0, BACKEND_DIR)

# ---------------------------------------------------------------------------
# 2. Load backend/.env before any app module is imported.
#    pydantic-settings uses env_file=".env" (relative to CWD), but pytest
#    runs from the project root, so we load it explicitly here instead.
# ---------------------------------------------------------------------------
from dotenv import load_dotenv  # noqa: E402  (import after sys.path is set)

load_dotenv(os.path.join(BACKEND_DIR, ".env"))
