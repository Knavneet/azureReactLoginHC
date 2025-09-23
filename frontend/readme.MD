Azure AD Setup for React + FastAPI SSO

Tenant ID

Azure Portal → Azure Active Directory → Overview → copy Tenant ID

Register Application

Azure AD → App registrations → New registration

Name: ReactFastAPISSO

Accounts: Single tenant

Redirect URI (Web): http://localhost:8000/get_token

Register

Application (Client) ID

From Overview of your app → copy Application (client) ID

Client Secret

Certificates & secrets → New client secret

Add description + expiration → Add → copy Value (save securely)

Frontend Redirect URI

Authentication → Add a platform → SPA

Redirect URI: http://localhost:5173

Save

Now you have:

Tenant ID

Client ID

Client Secret
