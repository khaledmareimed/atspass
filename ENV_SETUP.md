# Environment Setup Guide

## 📋 Required Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
# Your external server URL (REQUIRED)
SERV_URL=http://localhost:8000

# For production, use your actual server URL:
# SERV_URL=https://your-api-server.com

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (if using Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🔍 Testing the Setup

1. **Create `.env.local` file** with the variables above
2. **Start the dev server**: `npm run dev`
3. **Test environment**: Visit `http://localhost:3000/api/test-env`
4. **Test full flow**: Visit `http://localhost:3000/dashboard`

## 📊 Console Output

When you visit the dashboard, you'll now see detailed console output like this:

```
🚀 =============== EXTERNAL API REQUEST START ===============
🔍 [SERVER] Starting checkUserStatus...
⏰ [SERVER] Request timestamp: 2025-01-16T10:30:45.123Z

📋 [REQUEST DETAILS]
├── Base URL: http://localhost:8000
├── User Email: user@example.com
├── Username: John Doe
├── Encoded Email: user%40example.com
└── Encoded Username: John%20Doe

🌐 [REQUEST CONFIGURATION]
├── Method: GET
├── Full URL: http://localhost:8000/api/users/check?email=user%40example.com&username=John%20Doe
├── Headers: {
  "Content-Type": "application/json",
  "User-Agent": "NextJS-App/1.0"
}
└── Cache: no-store

📡 [MAKING REQUEST...]
🔄 Sending request to external server...

📨 [RESPONSE RECEIVED]
├── Status Code: 200
├── Status Text: OK
├── OK Status: ✅ Success
├── Headers: {...}
└── Duration: 245ms

📄 [RAW RESPONSE]
Raw response text: {"success":true,"exists":true,"message":"User found","data":{...}}

📊 [PARSED RESPONSE DATA]
Complete response object:
{
  "success": true,
  "exists": true,
  "message": "User email already exists",
  "data": {
    "username": "John",
    "email": "user@example.com",
    "isSetupComplete": false,
    "createdAt": "2025-01-16T10:30:45.123Z",
    "updatedAt": "2025-01-16T10:30:45.123Z",
    "id": "user-id-123"
  }
}

🔍 [RESPONSE ANALYSIS]
├── Success: ✅ True
├── User Exists: ✅ True
├── Message: User email already exists
├── User ID: user-id-123
├── Username: John
├── Email: user@example.com
├── Setup Complete: ❌ False
├── Setup Complete Type: boolean
├── Created At: 2025-01-16T10:30:45.123Z
└── Updated At: 2025-01-16T10:30:45.123Z

✅ [REQUEST SUCCESSFUL]
Request completed in 245ms
🚀 =============== EXTERNAL API REQUEST END (SUCCESS) ===============
```

## 🚨 Common Issues

1. **SERV_URL not set**: You'll see `❌ NOT SET` in the logs
2. **Server not running**: You'll see connection errors
3. **Wrong URL format**: Check the full URL in the logs
4. **JSON parse errors**: Check the raw response text

## 🔧 Debugging Tips

- Check the **REQUEST DETAILS** section for correct encoding
- Look at the **RESPONSE RECEIVED** section for HTTP status
- Examine the **RAW RESPONSE** to see exactly what your server returns
- Use the **RESPONSE ANALYSIS** to understand the parsed data 