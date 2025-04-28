from fastapi import APIRouter
from fastapi.responses import JSONResponse
from repo import SiteVisitRepo
from validators import PageVisit, PageVisitResponse


router = APIRouter()

@router.get('/')
def retreive_root():
    return {'Hello': 'World'}


@router.post('/api/page/visits', status_code=201)
def save_page_visit(page_visit: PageVisit):
    try:
        new_page_visit = SiteVisitRepo.save_page_visit(page_visit)
        return {'status': 'ok', 'data': PageVisitResponse.model_validate(new_page_visit)}
    except: 
        return JSONResponse(content={'message': "Unknown error occured"}, status_code=500)



@router.get('/api/page/visits')
def return_page_visits(url: str):
    try:
        visits =  SiteVisitRepo.retrieve_page_page_visits(url)
        return [PageVisitResponse.model_validate(visit) for visit in visits]
    except:
        return JSONResponse(content={'message': "Unknown error occured"}, status_code=500)
        

@router.get('/api/page/current/metrics')
def return_latest_page_metris(url: str):
    try:
        latest_visit = SiteVisitRepo.get_lastest_page_visit(url)

        if not latest_visit:
            return JSONResponse(content={'message': "No visit for that url"}, status_code=404)

        return   PageVisitResponse.model_validate(latest_visit)
    except:
        return JSONResponse(content={'message': "Unknown error occured"}, status_code=500)
