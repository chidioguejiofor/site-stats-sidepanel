from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import inject_db
from validators import PageVisit
from models import  SiteVisit

class SiteVisitRepo:
    @staticmethod
    @inject_db
    def save_page_visit(page_visit: PageVisit, db):
        db_visit = SiteVisit(**page_visit.model_dump())
        db.add(db_visit)
        db.commit()
        db.refresh(db_visit)
        return db_visit

    @staticmethod
    @inject_db
    def retrieve_page_page_visits(url: str, db):
        visits = db.query(SiteVisit).filter(
            SiteVisit.url == url
        ).order_by(
            SiteVisit.created_at.desc()
        ).all()        
        
        return visits

    @classmethod
    def get_lastest_page_visit(cls, url):
        visits = cls.retrieve_page_page_visits(url)
        if len(visits) == 0:
            return None
        return visits[0]

    
