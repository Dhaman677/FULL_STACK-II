# Experiment 7 — Role-Based Authorization (RBAC) with Spring Boot

## 📌 Objective

Implement Role-Based Access Control (RBAC) in a Spring Boot backend using Spring Security. The system supports two roles — `ROLE_USER` and `ROLE_ADMIN` — and restricts API access accordingly.

---

## 🧰 Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Framework    | Spring Boot 3.2.3       |
| Security     | Spring Security          |
| Database     | H2 (in-memory)          |
| ORM          | Spring Data JPA         |
| Build Tool   | Maven                   |
| Testing      | Postman                 |

---

## 📁 Project Structure

```
src/
├── main/
│   ├── java/com/example/experiment7/
│   │   ├── config/
│   │   │   └── SecurityConfig.java         ← RBAC rules & HTTP Basic Auth
│   │   ├── controller/
│   │   │   ├── AuthController.java         ← POST /api/auth/login
│   │   │   ├── PublicController.java       ← GET /api/public/**
│   │   │   ├── UserController.java         ← GET /api/user/**
│   │   │   └── AdminController.java        ← GET /api/admin/**
│   │   ├── dto/
│   │   │   ├── LoginRequest.java
│   │   │   └── LoginResponse.java
│   │   ├── entity/
│   │   │   └── User.java
│   │   ├── repository/
│   │   │   └── UserRepository.java
│   │   ├── service/
│   │   │   ├── CustomUserDetailsService.java
│   │   │   └── AuthService.java
│   │   └── Experiment7Application.java
│   └── resources/
│       ├── application.properties
│       └── data.sql                        ← Pre-seeded users
└── pom.xml

screenshots/
├── 01-login-success.png
├── 02-user-endpoint-success.png
├── 03-admin-endpoint-success.png
└── 04-access-denied.png
```

---

## 👤 Pre-seeded Test Users

| Username | Password | Role        |
|----------|----------|-------------|
| user1    | user123  | ROLE_USER   |
| admin1   | admin123 | ROLE_ADMIN  |

Passwords are stored as **BCrypt hashes** in `data.sql`.

---

## 🌐 API Endpoints

| Method | URL                       | Access         | Expected Response |
|--------|---------------------------|----------------|-------------------|
| GET    | `/api/public/hello`       | Everyone       | 200 OK            |
| GET    | `/api/public/info`        | Everyone       | 200 OK            |
| POST   | `/api/auth/login`         | Everyone       | 200 OK / 401      |
| GET    | `/api/user/profile`       | USER, ADMIN    | 200 OK / 401 / 403|
| GET    | `/api/user/dashboard`     | USER, ADMIN    | 200 OK / 401 / 403|
| GET    | `/api/admin/dashboard`    | ADMIN only     | 200 OK / 401 / 403|
| GET    | `/api/admin/users`        | ADMIN only     | 200 OK / 401 / 403|

---

## 🔐 Security Configuration Summary

```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**").permitAll()
    .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated()
)
.httpBasic(Customizer.withDefaults());
```

- **401 Unauthorized** — No credentials provided
- **403 Forbidden** — Valid credentials but insufficient role

---

## 🚀 How to Run

1. Clone the repository.
2. Open a terminal in the project root.
3. Run:
   ```bash
   mvn spring-boot:run
   ```
4. Server starts at `http://localhost:8080`
5. H2 Console: `http://localhost:8080/h2-console`  
   JDBC URL: `jdbc:h2:mem:experiment7db`

---

## 🧪 Postman Testing Guide

### Authentication Method
In Postman → **Authorization tab** → Type: **Basic Auth** → Enter username & password.

---

### Case 1: Public Endpoint (No Auth)
- **Method:** GET  
- **URL:** `http://localhost:8080/api/public/hello`  
- **Auth:** None  
- **Expected:** `200 OK`

```json
{ "message": "This is a public endpoint. No authentication required." }
```

---

### Case 2: Login via Custom Endpoint
- **Method:** POST  
- **URL:** `http://localhost:8080/api/auth/login`  
- **Body (JSON):**
```json
{ "username": "user1", "password": "user123" }
```
- **Expected:** `200 OK`
```json
{ "message": "Login successful", "username": "user1", "role": "ROLE_USER" }
```

---

### Case 3: USER Accesses User Endpoint ✅
- **Method:** GET  
- **URL:** `http://localhost:8080/api/user/profile`  
- **Auth:** Basic Auth → `user1` / `user123`  
- **Expected:** `200 OK`

---

### Case 4: USER Tries Admin Endpoint ❌
- **Method:** GET  
- **URL:** `http://localhost:8080/api/admin/dashboard`  
- **Auth:** Basic Auth → `user1` / `user123`  
- **Expected:** `403 Forbidden`

---

### Case 5: ADMIN Accesses Admin Endpoint ✅
- **Method:** GET  
- **URL:** `http://localhost:8080/api/admin/dashboard`  
- **Auth:** Basic Auth → `admin1` / `admin123`  
- **Expected:** `200 OK`
```json
{ "message": "Welcome, admin! You have full access.", "adminUser": "admin1" }
```

---

### Case 6: No Authentication ❌
- **Method:** GET  
- **URL:** `http://localhost:8080/api/user/profile`  
- **Auth:** None  
- **Expected:** `401 Unauthorized`

---

## 📸 Screenshots

| # | File | Description |
|---|------|-------------|
| 1 | `01-login-success.png` | Successful login via POST /api/auth/login |
| 2 | `02-user-endpoint-success.png` | user1 accessing /api/user/profile (200 OK) |
| 3 | `03-admin-endpoint-success.png` | admin1 accessing /api/admin/dashboard (200 OK) |
| 4 | `04-access-denied.png` | user1 getting 403 on /api/admin/dashboard |

---

## 📚 Key Concepts Demonstrated

- **Authentication** — Verifying who the user is (via HTTP Basic Auth)
- **Authorization** — Verifying what the user can do (role-based)
- **401 Unauthorized** — Identity not established
- **403 Forbidden** — Identity known but access denied
- **BCrypt** — Secure one-way password hashing
- **Spring Security FilterChain** — Declarative access rule configuration
