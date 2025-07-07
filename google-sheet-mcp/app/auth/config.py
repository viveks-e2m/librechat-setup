from pydantic_settings import BaseSettings
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    """
    Application and Google OAuth configuration loaded from environment variables or .env file.
    """
    CLIENT_SECRET_FILE: str = os.getenv('CLIENT_SECRET_FILE')
    GOOGLE_REDIRECT_URI: str = os.getenv('GOOGLE_REDIRECT_URI')
    GOOGLE_SPREEDSHEET_SCOPE: str = os.getenv('GOOGLE_SPREEDSHEET_SCOPE')
    GOOGLE_DRIVE_SCOPE: str = os.getenv('GOOGLE_DRIVE_SCOPE') 
settings = Settings()