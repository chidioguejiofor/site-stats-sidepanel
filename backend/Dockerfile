# Use Python image
FROM python:3.11-slim

WORKDIR /app

# Install pipenv
RUN pip install pipenv

# Copy only Pipfiles first to cache deps
COPY Pipfile Pipfile.lock ./
RUN pipenv install --deploy --ignore-pipfile

# Copy rest of the code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run app
CMD ["pipenv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
