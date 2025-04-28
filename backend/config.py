import os

DATABASE_URL = os.getenv('DATABASE_URL')
if os.getenv('ENV') =='test':
    DATABASE_URL = os.getenv('TEST_DATABASE_URL')

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set")
