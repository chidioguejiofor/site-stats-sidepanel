from functools import wraps
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL
from sqlalchemy.orm import Session

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

BaseTable = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def inject_db(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        db_gen = get_db()
        db: Session = next(db_gen)
        try:
            return func(*args, db=db, **kwargs)
        finally:
            db.close()
    return wrapper
