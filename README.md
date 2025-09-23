Azure AD SSO with React (TS) and FastAPI - A Beginner's Guide
This project is a complete, step-by-step example of how to implement Azure Active Directory (AD) Single Sign-On (SSO) in a modern web application using a React frontend and a FastAPI backend.

How It Works
The login flow uses the OAuth 2.0 Authorization Code Flow.

Frontend Login: The user clicks "Login" on the React app. The app redirects them to the Microsoft login page provided by Azure AD.

Azure AD Authentication: The user signs in with their Microsoft credentials.

Redirect to Backend: After a successful login, Azure AD redirects the user back to a specific endpoint on our FastAPI backend, providing an authorization_code.

Token Exchange: The backend receives the authorization_code, and securely exchanges it for an access_token by communicating directly with Azure AD. This step requires a client secret.

Redirect to Frontend: The backend then redirects the user back to the React application's dashboard page, passing the user's name as a query parameter.

Authenticated State: The frontend now has the user's information and can display the authenticated dashboard.

Azure Portal Setup (Crucial Steps)
Before running the code, you must register an application in your Azure AD tenant.

1. Find your Tenant ID
Go to the Azure Portal.

Search for and select Azure Active Directory.

On the Overview page, you will see your Tenant ID. Copy this value.

2. Register a New Application
In Azure Active Directory, go to App registrations in the left-hand menu.

Click + New registration.

Give your application a name (e.g., ReactFastAPISSO).

For Supported account types, choose "Accounts in this organizational directory only (Default Directory only - Single tenant)".

Under Redirect URI (optional):

Select Web from the dropdown.

Enter the backend redirect URI: http://localhost:8000/get_token

Click Register.

3. Get your Application (Client) ID
Once the app is registered, you'll be taken to its Overview page.

Copy the Application (client) ID. You will need this for both the frontend and backend.

4. Create a Client Secret for the Backend
In your app registration, go to Certificates & secrets.

Click + New client secret.

Add a description (e.g., MyWebAppSecret) and choose an expiration period.

Click Add.

IMPORTANT: Copy the secret's Value immediately. You will not be able to see it again after you leave this page.

5. Configure Frontend Redirect URI
In your app registration, go to Authentication.

Under Platform configurations, click Add a platform.

Select Single-page application (SPA).

Enter the frontend redirect URI: http://localhost:5173

Click Configure.

You now have all the values you need:

Tenant ID

Application (Client) ID

Client Secret

Project Setup and Running
Backend (FastAPI)
Navigate to the backend directory:

cd backend

Create a Python virtual environment and activate it:

# For Windows
python -m venv venv
.\venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source .venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Create a .env file in the backend directory and add your Azure credentials:

CLIENT_ID="YOUR_APPLICATION_CLIENT_ID"
CLIENT_SECRET="YOUR_CLIENT_SECRET_VALUE"
TENANT_ID="YOUR_TENANT_ID"

Run the backend server:

uvicorn main:app --reload

The backend will be running at http://localhost:8000.

Frontend (React)
Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install



Run the frontend app:

npm run dev

The frontend will be running at http://localhost:5173.

Now you can open your browser to http://localhost:5173 and test the login flow!