from app import create_app
from models import BaseTable
from database import engine

# Create tables
BaseTable.metadata.create_all(bind=engine)

app = create_app()

