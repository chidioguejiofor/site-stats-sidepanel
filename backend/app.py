from fastapi import FastAPI
from routes import router as page_visits_router
from middleware import DBContextMiddleware

def create_app():
    app = FastAPI()
    app.include_router(page_visits_router)
    app.add_middleware(DBContextMiddleware)
    return app
