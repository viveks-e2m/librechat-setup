from google_auth_oauthlib.flow import InstalledAppFlow
from app.auth.config import settings
from app.auth.utils import save_credentials
import os


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


if __name__ == "__main__":
    user_id = input("Enter user_id to authenticate: ")
    run_oauth_flow_save_credentials(user_id)