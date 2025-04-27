from typing import Union
from pydantic import BaseModel, Field
from fastapi import FastAPI
from datetime import datetime

app = FastAPI()

db = []
class PageVisit(BaseModel):
    url: str
    link_count: int 
    word_count: int 
    image_count: int



@app.get('/')
def retreive_root():
    return {'Hello': 'World'}

@app.post('/api/page/visits', status_code=201)
def save_page_visit(page_visit: PageVisit):
    db.append({
        **page_visit.model_dump(),
        'created_at': datetime.now()
    })
    return {'status': 'ok'}


@app.get('/api/page/visits')
def return_page_visits(url: str):
    return [visit for visit in db if visit['url'] == url ] 


@app.get('/api/page/current/metrics')
def return_current_page_metris(url: str):
    filtered = [visit for visit in db if visit['url'] == url ] 

    if len(filtered) == 0:
        return []
    return filtered[  len(filtered)-1] 

