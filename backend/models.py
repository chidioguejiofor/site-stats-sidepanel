import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, String, Integer, DateTime
from database import BaseTable
from datetime import datetime 

class SiteVisit(BaseTable):
    __tablename__ = "site_stats"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, index=True)
    url = Column(String, nullable=False)
    word_count = Column(Integer, nullable=False)
    image_count = Column(Integer, nullable=False)
    link_count = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.now)

