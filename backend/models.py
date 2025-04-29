import uuid
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String, Integer, DateTime
from decorators import inject_db
from database import BaseTable
from datetime import datetime 

class BaseModel(BaseTable):
    __abstract__ = True
    @inject_db
    def save_to_db(self, db):
        try:
            db.add(self)
            db.commit()
            db.refresh(self)
            return self
        except Exception as e:
            db.rollback()
            raise e
    

class SiteVisit(BaseModel):
    __tablename__ = "site_stats"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    url = Column(String, nullable=False)
    word_count = Column(Integer, nullable=False)
    image_count = Column(Integer, nullable=False)
    link_count = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now)

