# MODULAR ARCHITECTURE
How does work access token and refresh token full diagram

               LOGIN
                │
                ▼
     Server Creates Tokens
                │
      ┌─────────┴─────────┐
      ▼                   ▼
 Access Token      Refresh Token
 (Memory)         (HttpOnly Cookie)
      │                   │
      └─────────┬─────────┘
                ▼
        GET /profile
                │
                ▼
     Access Token Expired
                │
                ▼
        Server Returns 401
                │
                ▼
 Axios Response Interceptor
                │
                ▼
 POST /auth/refresh-token
                │
                ▼
 Browser Automatically Sends
 Refresh Token Cookie
                │
                ▼
 Server Verifies Refresh Token
                │
                ▼
 Generates New Access Token
                │
                ▼
 Returns New Access Token
                │
                ▼
 Interceptor Stores New Token
                │
                ▼
 Retries Original Request
                │
                ▼
        User Gets Response