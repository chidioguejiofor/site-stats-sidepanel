from functools import wraps
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL
from sqlalchemy.orm import Session
from contextvars import ContextVar
from contextvars import ContextVar
from sqlalchemy.orm import Session

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

BaseTable = declarative_base()

db_context: ContextVar[Session] = ContextVar("db_context")


