import google.auth
import os
import json
from mcp.server.fastmcp import FastMCP, Context
from googleapiclient.errors import HttpError
from google_sheets.service import GoogleSheetsService
from auth.utils import get_user_google_credentials


from auth.config import settings

mcp = FastMCP(
    name="google-sheets-mcp",
    host="0.0.0.0",
    port=8000,
)


@mcp.tool(
    description="Reads and retrieves structured data from Google Sheets using authenticated access for a specific user. Returns data as a list of dicts using the first row as headers."
)
def read_sheet(user_id:str,sheet_id: str, range_: str):
    """
    Reads data from a Google Sheet for a specific user and returns it as a list of dicts.
    Args:
        user_id (str): The user ID whose credentials will be used.
        sheet_id (str): The ID of the Google Sheet.
        range_ (str): The range to read (e.g., 'Sheet1!A1:C10').
    Returns:
        dict: {"data": list of dicts, one per row, using the first row as headers}
    Raises:
        FileNotFoundError: If credentials for the user are not found.
    """
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    data = service.read_sheet(sheet_id, range_)
    if data and len(data) > 1:
        headers = data[0]
        rows = data[1:]
        dict_rows = [dict(zip(headers, row)) for row in rows]
        return {"data": dict_rows}
    else:
        return {"data": []}


@mcp.tool(
    description="Lists all sheet names in a Google Spreadsheet for a specific user."
)
def list_sheets(user_id: str, sheet_id: str, context: Context):
    """
    Lists all sheet names in a Google Spreadsheet for a specific user.
    Args:
        user_id (str): The user ID whose credentials will be used.
        sheet_id (str): The ID of the Google Spreadsheet.
    Returns:
        dict: {"sheets": list of sheet names}
    Raises:
        FileNotFoundError: If credentials for the user are not found.
    """
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    sheets = service.list_sheets(sheet_id)
    return {"sheets": sheets}


@mcp.tool(
    description="Appends a row to a specific sheet in a Google Spreadsheet for a specific user."
)
def append_row(user_id: str, sheet_id: str, sheet_name: str, row_values: list):
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    try:
        result = (
            service.service.spreadsheets()
            .values()
            .append(
                spreadsheetId=sheet_id,
                range=f"{sheet_name}",
                valueInputOption="USER_ENTERED",
                insertDataOption="INSERT_ROWS",
                body={"values": [row_values]},
            )
            .execute()
        )
        return {"result": result}
    except HttpError as e:
        return {"error": str(e)}


@mcp.tool(
    description="Updates a single cell in a Google Spreadsheet for a specific user."
)
def update_cell(user_id: str, sheet_id: str, cell: str, value: str):
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    try:
        result = (
            service.service.spreadsheets()
            .values()
            .update(
                spreadsheetId=sheet_id,
                range=cell,
                valueInputOption="USER_ENTERED",
                body={"values": [[value]]},
            )
            .execute()
        )
        return {"result": result}
    except HttpError as e:
        return {"error": str(e)}


@mcp.tool(
    description="Deletes a row from a specific sheet in a Google Spreadsheet for a specific user."
)
def delete_row(user_id: str, sheet_id: str, sheet_name: str, row_index: int):
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    try:
        # Get sheetId (not sheet name) for batchUpdate
        spreadsheet = (
            service.service.spreadsheets().get(spreadsheetId=sheet_id).execute()
        )
        sheet_id_num = None
        for s in spreadsheet["sheets"]:
            if s["properties"]["title"] == sheet_name:
                sheet_id_num = s["properties"]["sheetId"]
                break
        if sheet_id_num is None:
            return {"error": f"Sheet {sheet_name} not found."}
        batch_update_request = {
            "requests": [
                {
                    "deleteDimension": {
                        "range": {
                            "sheetId": sheet_id_num,
                            "dimension": "ROWS",
                            "startIndex": row_index,
                            "endIndex": row_index + 1,
                        }
                    }
                }
            ]
        }
        result = (
            service.service.spreadsheets()
            .batchUpdate(spreadsheetId=sheet_id, body=batch_update_request)
            .execute()
        )
        return {"result": result}
    except HttpError as e:
        return {"error": str(e)}


@mcp.tool(
    description="Creates a new sheet/tab in a Google Spreadsheet for a specific user."
)
def create_sheet(user_id: str, sheet_id: str, new_sheet_name: str):
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    try:
        requests = [{"addSheet": {"properties": {"title": new_sheet_name}}}]
        body = {"requests": requests}
        result = (
            service.service.spreadsheets()
            .batchUpdate(spreadsheetId=sheet_id, body=body)
            .execute()
        )
        return {"result": result}
    except HttpError as e:
        return {"error": str(e)}


@mcp.tool(description="Gets metadata for a Google Spreadsheet for a specific user.")
def get_spreadsheet_metadata(user_id: str, sheet_id: str):
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    try:
        spreadsheet = (
            service.service.spreadsheets().get(spreadsheetId=sheet_id).execute()
        )
        return {
            "title": spreadsheet.get("properties", {}).get("title"),
            "sheets": [s["properties"]["title"] for s in spreadsheet.get("sheets", [])],
        }
    except HttpError as e:
        return {"error": str(e)}


@mcp.tool(
    description="Lists all Google Spreadsheets owned by the user. Returns a list of spreadsheets with their IDs, names, creation dates, and modification dates."
)
def list_all_spreadsheets(user_id: str):
    """
    Lists all Google Spreadsheets owned by the user.
    Args:
        user_id (str): The user ID whose credentials will be used.
    Returns:
        dict: {"spreadsheets": list of spreadsheet objects with id, name, createdTime, modifiedTime, webViewLink}
    Raises:
        FileNotFoundError: If credentials for the user are not found.
    """
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    try:
        spreadsheets = service.list_all_spreadsheets()
        return {"spreadsheets": spreadsheets}
    except Exception as e:
        return {"error": str(e)}


@mcp.tool(
    description="Creates a new Google Spreadsheet with the specified title for a specific user."
)
def create_new_spreadsheet(user_id: str, title: str):
    """
    Creates a new Google Spreadsheet with the specified title.
    Args:
        user_id (str): The user ID whose credentials will be used.
        title (str): The title for the new spreadsheet.
    Returns:
        dict: {"result": spreadsheet creation result with id, title, etc.}
    Raises:
        FileNotFoundError: If credentials for the user are not found.
    """
    try:
        creds = get_user_google_credentials(user_id)
    except FileNotFoundError as e:
        return {"error": str(e)}
    service = GoogleSheetsService(creds)
    try:
        result = service.create_spreadsheet(title)
        return {"result": result}
    except HttpError as e:
        return {"error": str(e)}


if __name__ == "__main__":
    mcp.run(transport="streamable-http")
