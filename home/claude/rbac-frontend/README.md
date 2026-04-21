# RBAC Frontend — React + Bootstrap + MUI

React frontend for Experiment 7 RBAC Spring Boot backend.

## Tech Stack
- React 18
- React Router v6
- Axios
- Bootstrap 5
- Material UI (MUI)

## Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm start
```

App runs at: http://localhost:3000

> Make sure your Spring Boot backend is running at http://localhost:8080 first!

## Project Structure

```
src/
├── components/
│   ├── Login.js           ← Login page with credential form
│   ├── UserDashboard.js   ← USER role dashboard
│   └── AdminDashboard.js  ← ADMIN role dashboard (restricted)
├── App.js                 ← Routes + ProtectedRoute wrapper
├── App.css                ← Global styles & CSS variables
└── index.js
```

## Features

### Login Page
- Accepts username & password
- Calls POST /api/auth/login on backend
- Stores credentials in sessionStorage
- Redirects: USER → /user, ADMIN → /admin

### User Dashboard
- Fetches GET /api/user/profile (200 OK)
- Attempts GET /api/admin/dashboard (shows 403)
- Demonstrates role restriction visually

### Admin Dashboard
- Fetches GET /api/admin/dashboard (200 OK)
- Fetches GET /api/admin/users (200 OK)
- Fetches GET /api/user/profile (200 OK — admin can access all)

### Session Storage
- `user` — logged in username
- `role` — USER or ADMIN
- `credentials` — base64 encoded for Basic Auth headers

## Test Credentials

| Username | Password | Role       |
|----------|----------|------------|
| user1    | user123  | ROLE_USER  |
| admin1   | admin123 | ROLE_ADMIN |

## Screenshots to Capture
1. Login page UI
2. USER dashboard — profile fetch success (200)
3. USER dashboard — admin endpoint blocked (403 shown)
4. ADMIN dashboard — admin endpoint success (200)
5. sessionStorage in browser DevTools (F12 → Application → Session Storage)
