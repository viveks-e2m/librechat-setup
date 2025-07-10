import os
import json
from google_auth_oauthlib.flow import InstalledAppFlow

# If you want both Drive and Sheets access:
SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
]


def main():
    # Path to your downloaded credentials.json
    creds_file = "credentials.json"
    if not os.path.exists(creds_file):
        print("ERROR: credentials.json not found in current directory.")
        return

    flow = InstalledAppFlow.from_client_secrets_file(creds_file, SCOPES)
    creds = flow.run_local_server(port=8000, access_type="offline", prompt="consent")

    # Save credentials to a file
    with open("google_user_token.json", "w") as token_file:
        json.dump(
            {
                "token": creds.token,
                "refresh_token": creds.refresh_token,
                "token_uri": creds.token_uri,
                "client_id": creds.client_id,
                "client_secret": creds.client_secret,
                "scopes": creds.scopes,
            },
            token_file,
            indent=2,
        )

    print("✅ Credentials saved to google_user_token.json")
    print("Access Token:", creds.token)
    print("Refresh Token:", creds.refresh_token)


if __name__ == "__main__":
    main()
