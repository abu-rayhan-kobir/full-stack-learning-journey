# MODULAR ARCHITECTURE
How does work access token and refresh token full diagram

                    LOGIN
                      │
        Email + Password
                      │
                      ▼
             Password Correct?
                 │
          Yes ───┘
                 │
                 ▼
      ┌─────────────────────┐
      │ Generate AccessToken│
      │ (15 Minutes)        │
      └─────────────────────┘
                 │
                 ▼
      ┌─────────────────────┐
      │ Generate Refresh    │
      │ Token (30 Days)     │
      └─────────────────────┘
                 │
      ┌──────────┴───────────┐
      ▼                      ▼
Access Token           Refresh Token
(Authorization)     (HttpOnly Cookie)
      │                      │
      └──────────┬───────────┘
                 ▼
             User Uses App
                 │
                 ▼
      Access Token Expired
                 │
                 ▼
 Browser → /refresh-token
      (Refresh Token)
                 │
                 ▼
      Server Verifies Token
                 │
                 ▼
      Find User in Database
                 │
        User Exists?
           │
      Yes ─┘
           │
           ▼
Generate New Access Token
           │
           ▼
 Return New Access Token
           │
           ▼
 Browser Continues Normally