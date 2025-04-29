from functools import wraps
from database import db_context

def inject_db(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        db = db_context.get()
        return func(*args, db=db, **kwargs)
    return wrapper
