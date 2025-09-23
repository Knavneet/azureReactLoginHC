import os
import msal
from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests

# Load environment variables from .env file
load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
TENANT_ID = os.getenv("TENANT_ID")
AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"

# This is the API scope you want to call.
# For this example, we'll just read the user's profile.
SCOPES = ["User.Read"]

# This is the URL where the user will be redirected to after they sign in
REDIRECT_PATH = "/get_token"
REDIRECT_URI = f"http://localhost:8000{REDIRECT_PATH}"

# This is the URL for the frontend dashboard
FRONTEND_DASHBOARD_URL = "http://localhost:5173/dashboard"

app = FastAPI()

# --- CORS Middleware ---
# This allows the frontend (running on localhost:5173) to communicate with the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MSAL Setup ---
# Create a confidential client application instance
msal_app = msal.ConfidentialClientApplication(
    CLIENT_ID, authority=AUTHORITY, client_credential=CLIENT_SECRET
)

@app.get("/login")
async def login():
    """
    Endpoint to initiate the login process.
    Redirects the user to the Azure AD login page.
    """
    # Generate the authorization URL
    auth_url = msal_app.get_authorization_request_url(
        SCOPES,
        redirect_uri=REDIRECT_URI
    )
    return RedirectResponse(url=auth_url)


@app.get(REDIRECT_PATH)
async def get_token(request: Request, code: str):
    """
    This is the redirect URI endpoint.
    Azure AD redirects the user here after successful authentication.
    The function acquires an access token and then gets user info.
    """
    # Acquire token by authorization code
    token_result = msal_app.acquire_token_by_authorization_code(
        code,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )

    if "error" in token_result:
        return {"error": token_result.get("error"), "error_description": token_result.get("error_description")}

    # At this point, you have an access token.
    # You can use it to call Microsoft Graph API or your own protected APIs.
    access_token = token_result.get("access_token")

    # Use the token to get user's profile info from Microsoft Graph
    graph_url = "https://graph.microsoft.com/v1.0/me"
    headers = {"Authorization": f"Bearer {access_token}"}
    user_info_response = requests.get(graph_url, headers=headers)
    
    user_info = user_info_response.json()
    user_name = user_info.get("displayName", "User")

    # Redirect to the frontend dashboard with the user's name
    # In a real app, you would typically set a secure session cookie here
    # instead of passing the name in the URL.
    redirect_url = f"{FRONTEND_DASHBOARD_URL}?name={user_name}"
    return RedirectResponse(url=redirect_url)

@app.get("/")
def read_root():
    return {"message": "Azure AD SSO Backend is running."}
