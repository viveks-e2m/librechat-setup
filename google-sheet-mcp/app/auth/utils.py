import os
import json
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