from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

from database import SessionLocal, db_context

class DBContextMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        db = SessionLocal()
        token = db_context.set(db)
        try:
            response = await call_next(request)
            return response
        finally:
            db_context.reset(token)
            db.close()
