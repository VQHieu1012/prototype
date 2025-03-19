import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URI", "postgresql://postgres:postgres@localhost:5432/quiz_search"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Application configuration
    DEBUG = os.environ.get("DEBUG", "False").lower() == "true"
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-key-please-change-in-production")

    # CORS configuration
    CORS_HEADERS = "Content-Type"
