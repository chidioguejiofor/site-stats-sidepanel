import os
from config import DATABASE_URL


def test_root(client):
    response = client.get('/')
    assert response.json() == {'Hello': "World"}


def test_save_page_visit(client):
    response = client.post('/api/page/visits', json={
        'url': 'http://dev.to/chidioguejiofor',
        'link_count': 10,
        'word_count': 200,
        'image_count': 5
    })
    res_data = response.json()
    assert res_data['status'] == 'ok'
    assert isinstance(res_data['data'], object)
    assert res_data['data']['link_count'] == 10
    assert res_data['data']['word_count'] == 200
    assert res_data['data']['image_count'] == 5
    assert response.status_code == 201


def test_retrieve_visits(client):

    new_page_url =  'http://visit_to_retrieve.to/chidioguejiofor'
    client.post('/api/page/visits', json={
        'url':'http://another-url',
        'link_count': 10,
        'word_count': 210,
        'image_count': 5
    })

    client.post('/api/page/visits', json={
        'url':new_page_url,
        'link_count': 10,
        'word_count': 210,
        'image_count': 5
    })


    response = client.get(f'/api/page/visits?url={new_page_url}')
    res_data = response.json()

    assert len(res_data) == 1
    page_visit = res_data[0]
    assert page_visit is not None
    assert response.status_code == 200


def test_current_page_metrics(client):
    new_page_url =  'http://latest_page_metrics'
    client.post('/api/page/visits', json={
        'url':new_page_url,
        'link_count': 66,
        'word_count': 880,
        'image_count': 151
    })


    response = client.get(f'/api/page/current/metrics?url={new_page_url}')
    res_data = response.json()

    assert isinstance(res_data, dict)
    res_data['url'] == new_page_url
    res_data['word_count'] == 66

def test_current_page_metrics_should_return_404_when_url_is_not_found(client):
    new_page_url =  'http://some-uknown-url.com'

    response = client.get(f'/api/page/current/metrics?url={new_page_url}')
    res_data = response.json()

    assert response.status_code == 404
    assert res_data['message'] == 'No visit for that url'




