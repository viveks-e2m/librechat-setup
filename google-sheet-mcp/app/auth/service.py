from google_auth_oauthlib.flow import Flow
from config import settings


class AuthService:
    def get_auth_url(self):
        flow = Flow.from_client_secrets_file(
            settings.CLIENT_SECRETS_FILE,
            scopes=settings.SCOPES,
            redirect_uri=settings.REDIRECT_URI,
        )
        url, _ = flow.authorization_url(prompt="consent")
        return url

    def fetch_credentials(self, code: str):
        flow = Flow.from_client_secrets_file(
            settings.CLIENT_SECRETS_FILE,
            scopes=settings.SCOPES,
            redirect_uri=settings.REDIRECT_URI,
        )
        flow.fetch_token(code=code)
        return flow.credentials