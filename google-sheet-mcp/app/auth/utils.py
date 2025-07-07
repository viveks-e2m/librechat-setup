import os
import json
from bson import ObjectId
from pymongo import MongoClient
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from auth.config import settings

TOKEN_DIR = "tokens"

os.makedirs(TOKEN_DIR, exist_ok=True)


def save_credentials(user_id: str, credentials: Credentials):
    data = {
        "token": credentials.token,
        "refresh_token": credentials.refresh_token,
        "token_uri": credentials.token_uri,
        "client_id": credentials.client_id,
        "client_secret": credentials.client_secret,
        "scopes": credentials.scopes,
    }
    with open(os.path.join(TOKEN_DIR, f"{user_id}.json"), "w") as f:
        json.dump(data, f)


def load_credentials(user_id: str) -> Credentials:
    path = os.path.join(TOKEN_DIR, f"{user_id}.json")
    if not os.path.exists(path):
        raise FileNotFoundError(f"No credentials found for user_id '{user_id}'. Please authenticate via /auth/login?user_id={user_id}")
    with open(path, "r") as f:
        data = json.load(f)
    return Credentials(**data) 

def get_user_google_credentials(user_id):
    # Connect to MongoDB
    mongo_uri = os.environ.get("MONGO_URI", "mongodb://localhost:27017")
    db_name = os.environ.get("MONGO_DB", "LibreChat")
    client = MongoClient(mongo_uri)
    db = client[db_name]

    # Fetch user document
    user = db.users.find_one({"_id": ObjectId(user_id)})

    if not user:
        raise Exception("User not found in MongoDB.")
    if "googleRefreshToken" not in user or not user["googleRefreshToken"]:
        raise Exception("No Google refresh token found for this user.")

    # You may want to store these in environment variables or a config file
    client_id = os.environ.get("GOOGLE_CLIENT_ID")
    client_secret = os.environ.get("GOOGLE_CLIENT_SECRET")
    token_uri = "https://oauth2.googleapis.com/token"
    scopes = [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/spreadsheets",
        "profile",
        "email"
    ]

    creds = Credentials(
        token=user.get("googleAccessToken", ""),  # May be expired, but Google will refresh it
        refresh_token=user["googleRefreshToken"],
        token_uri=token_uri,
        client_id=client_id,
        client_secret=client_secret,
        scopes=scopes
    )
    return creds

def run_oauth_flow_save_credentials(user_id: str):
    """
    Runs the Google OAuth flow for a user and saves the credentials.
    Args:
        user_id (str): The user ID to associate with the credentials.
    """
    # Scopes: can be a list or a comma-separated string in your .env
    scopes = settings.GOOGLE_SPREEDSHEET_SCOPE
    if isinstance(scopes, str):
        scopes = [s.strip() for s in scopes.split(",") if s.strip()]

    flow = InstalledAppFlow.from_client_secrets_file(
        settings.CLIENT_SECRET_FILE,
        scopes=scopes
    )
    creds = flow.run_local_server(port=8000)
    save_credentials(user_id, creds)
    print(f"Credentials saved for user_id: {user_id}")