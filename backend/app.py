from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi import FastAPI, Depends
from models import  SiteVisit
from database import SessionLocal


class PageVisit(BaseModel):
    url: str
    link_count: int 
    word_count: int 
    image_count: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

def create_app():
    app = FastAPI()


    @app.get('/')
    def retreive_root():
        return {'Hello': 'World'}

    @app.post('/api/page/visits', status_code=201)
    def save_page_visit(page_visit: PageVisit, db: Session = Depends(get_db)):
        db_visit = SiteVisit(**page_visit.model_dump())
        db.add(db_visit)
        db.commit()
        db.refresh(db_visit)
        return {'status': 'ok'}


    @app.get('/api/page/visits')
    def return_page_visits(url: str, db: Session = Depends(get_db)):
        visits = db.query(SiteVisit).filter(SiteVisit.url == url).all()
        return visits


    @app.get('/api/page/current/metrics')
    def return_current_page_metris(url: str, db: Session = Depends(get_db)):
        visit = db.query(SiteVisit).filter(SiteVisit.url == url).order_by(SiteVisit.created_at.desc()).first()
        if not visit:
            return {}
        return visit
    return app
