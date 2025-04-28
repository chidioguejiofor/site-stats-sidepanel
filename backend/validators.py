from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

class PageVisit(BaseModel):
    url: str
    link_count: int 
    word_count: int 
    image_count: int


class PageVisitResponse(PageVisit):
    id: UUID
    created_at: datetime
    class Config:
        from_attributes = True 