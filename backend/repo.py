from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from decorators import inject_db
from validators import PageVisit
from models import  SiteVisit

class SiteVisitRepo:
    @staticmethod
    def save_page_visit(page_visit: PageVisit):
        new_site_visit = SiteVisit(**page_visit.model_dump())
        new_site_visit.save_to_db()
        return new_site_visit

    @staticmethod
    @inject_db
    def retrieve_page_page_visits(url: str, db):
        visits = db.query(SiteVisit).filter(
            SiteVisit.url == url
        ).order_by(
            SiteVisit.created_at.desc()
        ).all()        
        
        return visits
    

    @staticmethod
    @inject_db
    def delete_all_page_visits(db: Session):
        db.query(SiteVisit).delete()
        db.commit()

    @classmethod
    def get_lastest_page_visit(cls, url):
        visits = cls.retrieve_page_page_visits(url)
        if len(visits) == 0:
            return None
        return visits[0]

    
