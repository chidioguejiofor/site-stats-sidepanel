from fastapi import FastAPI
from routes import router as page_visits_router
    
def create_app():
    app = FastAPI()
    app.include_router(page_visits_router)
    return app
