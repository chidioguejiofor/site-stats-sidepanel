
import pytest
from fastapi.testclient import TestClient
from app import create_app
from database import BaseTable, SessionLocal, engine, get_db

# Dependency override
def override_get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="session")
def app():
    app = create_app()
    app.dependency_overrides[get_db] = override_get_db
    return app

@pytest.fixture(scope="function")
def client(app):
    BaseTable.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    BaseTable.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function", autouse=True)
def setup_and_teardown_db():
    # Before test: create tables
    BaseTable.metadata.create_all(bind=engine)
    yield
    # After test: drop tables
    BaseTable.metadata.drop_all(bind=engine)
