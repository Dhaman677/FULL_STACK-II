# JWT Authentication — Spring Boot

A complete JWT (JSON Web Token) authentication system built with **Spring Boot 3**, **Spring Security**, and **H2 in-memory database**.

---

## 📁 Project Structure

```
src/
├── main/
│   ├── java/com/example/jwtauth/
│   │   ├── JwtAuthApplication.java          # Main entry point (server.js equivalent)
│   │   ├── config/
│   │   │   └── SecurityConfig.java          # Spring Security + JWT filter setup
│   │   ├── controller/
│   │   │   ├── AuthController.java          # Login, Register, Logout handlers
│   │   │   └── ProtectedController.java     # Protected & public route handlers
│   │   ├── dto/
│   │   │   ├── LoginRequest.java            # Request body for login
│   │   │   ├── RegisterRequest.java         # Request body for register
│   │   │   └── AuthResponse.java            # Response with JWT token
│   │   ├── middleware/
│   │   │   └── JwtAuthFilter.java           # JWT validation filter (authMiddleware.js)
│   │   ├── model/
│   │   │   ├── User.java                    # User entity (userModel.js)
│   │   │   └── UserRepository.java          # JPA repository
│   │   ├── routes/
│   │   │   └── RouteDocumentation.java      # Route reference (authRoutes.js)
│   │   └── service/
│   │       ├── AuthService.java             # Login/register business logic
│   │       ├── JwtService.java              # Token generation & validation
│   │       └── UserDetailsServiceImpl.java  # Spring Security user loader
│   └── resources/
│       └── application.properties          # App config (DB, JWT secret, port)
├── screenshots/                             # Postman screenshots go here
├── docs/                                    # Additional documentation
├── .env                                     # Environment variable reference
├── pom.xml                                  # Maven dependencies
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+

### Run the Application

```bash
# Clone and navigate to project
cd jwt-auth-springboot

# Build and run
mvn spring-boot:run
```

The server starts at: `http://localhost:8080`

### Default Test Credentials (seeded automatically)

| Username   | Password      | Role        |
|------------|---------------|-------------|
| `user123`  | `password123` | `ROLE_USER` |
| `admin`    | `admin123`    | `ROLE_ADMIN`|

---

## 📡 API Endpoints

### Public Routes (no token required)

| Method | URL                    | Description        |
|--------|------------------------|--------------------|
| POST   | `/api/auth/login`      | Login & get token  |
| POST   | `/api/auth/register`   | Register new user  |
| GET    | `/api/public/health`   | Health check       |

### Protected Routes (JWT required)

| Method | URL                      | Description                  |
|--------|--------------------------|------------------------------|
| GET    | `/api/protected`         | Access protected resource    |
| GET    | `/api/protected/profile` | Get current user profile     |
| GET    | `/api/protected/admin`   | Admin-only route             |
| POST   | `/api/auth/logout`       | Logout (client-side)         |

---

## 🧪 Postman Testing Guide

### Step 1 — Login Request

```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "username": "user123",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "username": "user123",
  "role": "ROLE_USER",
  "expiresIn": 86400000
}
```

---

### Step 2 — Access Protected Route

Copy the `token` from Step 1 and add it to the Authorization header:

```
GET http://localhost:8080/api/protected
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Expected Response (200 OK):**
```json
{
  "message": "🎉 You have accessed a protected route!",
  "authenticatedUser": "user123",
  "authorities": "[ROLE_USER]"
}
```

**Without token (401 Unauthorized):**
```json
{
  "error": "Invalid or expired token"
}
```

---

### Step 3 — Logout

```
POST http://localhost:8080/api/auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Expected Response (200 OK):**
```json
{
  "message": "Logged out successfully. Please discard your token.",
  "note": "JWT is stateless — ensure you remove the token from client storage."
}
```

---

## 🔐 How JWT Authentication Works

```
Client                          Server
  │                               │
  │  POST /api/auth/login         │
  │  { username, password } ───► │
  │                               │  1. Validate credentials
  │                               │  2. Generate JWT (signed with secret)
  │  ◄─── { token: "eyJ..." }    │
  │                               │
  │  GET /api/protected           │
  │  Authorization: Bearer eyJ... │
  │  ──────────────────────────► │  3. JwtAuthFilter intercepts
  │                               │  4. Extract & validate token
  │                               │  5. Set authenticated user in SecurityContext
  │  ◄─── { protected data }     │  6. Route handler returns data
```

### Token Structure (JWT)
```
Header.Payload.Signature
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIiwiaWF0IjoxNjk5MDAwMDAwfQ.xxxxx
```

---

## ⚙️ Configuration

Edit `src/main/resources/application.properties`:

```properties
# JWT Secret (change this in production!)
jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970

# Token expiry (milliseconds) — 86400000 = 24 hours
jwt.expiration=86400000

# Server port
server.port=8080
```

---

## 📦 Dependencies (`pom.xml`)

| Dependency                          | Purpose                          |
|-------------------------------------|----------------------------------|
| `spring-boot-starter-web`           | REST API support                 |
| `spring-boot-starter-security`      | Authentication & authorization   |
| `spring-boot-starter-data-jpa`      | Database ORM                     |
| `h2`                                | In-memory database (dev/testing) |
| `jjwt-api` / `jjwt-impl`           | JWT token library                |
| `lombok`                            | Reduce boilerplate code          |

---

## 🗄️ H2 Database Console (Dev Only)

Access the database at: `http://localhost:8080/h2-console`

- **JDBC URL:** `jdbc:h2:mem:jwtauthdb`
- **Username:** `sa`
- **Password:** *(leave blank)*

---

## 📸 Screenshots

Add your Postman screenshots to the `screenshots/` folder:

1. `01_login_success.png` — Login request + token response
2. `02_protected_route.png` — Accessing protected route with token
3. `03_logout.png` — Logout request
4. `04_unauthorized.png` *(optional)* — Access without token (401 response)

---

## 🔒 Security Notes

- JWT secret must be **at least 256 bits** (32+ characters) in production
- Use environment variables for secrets — never commit them to Git
- Consider implementing a **token blacklist** (Redis) for true logout support
- Enable **HTTPS** in production to protect tokens in transit
