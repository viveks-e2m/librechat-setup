# Use official Python image
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Install system dependencies (if needed for pip packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code (excluding venv and tokens)
COPY app ./app

# Set environment variables (if needed)
# ENV ...

# Expose port if needed (not strictly necessary for stdio transport)
EXPOSE 8000

# Set entrypoint to run the MCP server
CMD ["python3", "app/server.py"] 