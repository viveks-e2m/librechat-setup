from google_auth_oauthlib.flow import InstalledAppFlow
from app.auth.config import settings
# from auth.utils import save_credentials
import os
from bson import ObjectId
from pymongo import MongoClient
from google.oauth2.credentials import Credentials

def get_user_google_credentials(email:str):
    # Connect to MongoDB
    print("Entered inside the get user google credentials \n")
    mongo_uri = os.environ.get("MONGO_URI", "mongodb://mongodb:27017")
    db_name = os.environ.get("MONGO_DB", "LibreChat")
    client = MongoClient(mongo_uri)
    db = client[db_name]

    # Fetch user document
    user = db.users.find_one({"email": ObjectId(email)})

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


if __name__ == "__main__":
    # user_id = input("Enter user_id to authenticate: ")
    print(get_user_google_credentials("202211069@dau.ac.in"))