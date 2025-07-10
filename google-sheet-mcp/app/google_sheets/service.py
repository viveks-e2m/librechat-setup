from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

class GoogleSheetsService:
    def __init__(self, credentials: Credentials):
        self.service = build("sheets", "v4", credentials=credentials)
        # Also create a Drive service for listing spreadsheets
        self.drive_service = build("drive", "v3", credentials=credentials)

    def read_sheet(self, spreadsheet_id: str, range_: str) -> list:
        sheet = self.service.spreadsheets().values().get(
            spreadsheetId=spreadsheet_id,
            range=range_
        ).execute()
        return sheet.get("values", [])

    def list_sheets(self, spreadsheet_id: str) -> list:
        """List all sheet names in a spreadsheet."""
        spreadsheet = self.service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
        sheets = spreadsheet.get('sheets', [])
        return [sheet['properties']['title'] for sheet in sheets]

    def list_all_spreadsheets(self) -> list:
        """List all spreadsheets owned by the user."""
        try:
            # Query for Google Sheets files
            results = self.drive_service.files().list(
                q="mimeType='application/vnd.google-apps.spreadsheet'",
                fields="files(id,name,createdTime,modifiedTime,webViewLink)",
                orderBy="modifiedTime desc"
            ).execute()
            
            files = results.get('files', [])
            return [
                {
                    'id': file['id'],
                    'name': file['name'],
                    'createdTime': file['createdTime'],
                    'modifiedTime': file['modifiedTime'],
                    'webViewLink': file['webViewLink']
                }
                for file in files
            ]
        except Exception as e:
            raise Exception(f"Error listing spreadsheets: {str(e)}")

    def create_sheet(self, spreadsheet_id: str, title: str) -> dict:
        """Create a new sheet/tab in an existing spreadsheet."""
        requests = [{
            'addSheet': {
                'properties': {'title': title}
            }
        }]
        body = {'requests': requests}
        response = self.service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body=body
        ).execute()
        return response

    def create_spreadsheet(self, title: str) -> dict:
        """Create a new spreadsheet with the given title."""
        spreadsheet = {
            'properties': {'title': title}
        }
        response = self.service.spreadsheets().create(body=spreadsheet).execute()
        return response 