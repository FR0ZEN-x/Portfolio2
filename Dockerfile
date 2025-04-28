Dockerfile
FROM python:3.10-slim

# Accept SECRET_KEY at build time
ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=5000

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc build-essential \
  && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --upgrade pip && \
    sed -i 's/certifi==2025.1.31/certifi/g' requirements.txt && \
    sed -i 's/pytz==2025.1/pytz/g' requirements.txt && \
    sed -i 's/urllib3==2.3.0/urllib3/g' requirements.txt && \
    sed -i '/logging==/d' requirements.txt && \
    pip install --no-cache-dir -r requirements.txt

# Copy app source (env is excluded by .dockerignore/.gitignore)
COPY . .

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]