package com.example.jwtauth.routes;

/**
 * routes/RouteDocumentation.java
 *
 * This file documents all available API routes.
 * In Spring Boot, routing is defined directly in controllers via @RequestMapping.
 * This class serves as a reference — equivalent to authRoutes.js in Node.js.
 *
 * ════════════════════════════════════════════════════
 *  PUBLIC ROUTES (no token required)
 * ════════════════════════════════════════════════════
 *
 *  POST /api/auth/login
 *    Body:    { "username": "user123", "password": "password123" }
 *    Returns: { "token": "...", "type": "Bearer", "username": "...", "role": "...", "expiresIn": 86400000 }
 *
 *  POST /api/auth/register
 *    Body:    { "username": "newuser", "password": "pass123", "email": "test@example.com" }
 *    Returns: { "token": "...", ... }
 *
 *  GET /api/public/health
 *    Returns: { "status": "UP", "message": "...", "timestamp": ... }
 *
 * ════════════════════════════════════════════════════
 *  PROTECTED ROUTES (JWT required)
 *  Header: Authorization: Bearer <your_jwt_token>
 * ════════════════════════════════════════════════════
 *
 *  GET /api/protected
 *    Returns: { "message": "...", "authenticatedUser": "...", "authorities": "..." }
 *
 *  GET /api/protected/profile
 *    Returns: { "username": "...", "role": "...", "message": "..." }
 *
 *  GET /api/protected/admin
 *    Returns: Admin-only data (requires ROLE_ADMIN)
 *
 *  POST /api/auth/logout
 *    Header:  Authorization: Bearer <token>
 *    Returns: Logout confirmation message
 *
 * ════════════════════════════════════════════════════
 *  TEST CREDENTIALS (seeded on startup)
 * ════════════════════════════════════════════════════
 *
 *  User:   username=user123, password=password123, role=ROLE_USER
 *  Admin:  username=admin,   password=admin123,    role=ROLE_ADMIN
 *
 * ════════════════════════════════════════════════════
 *  H2 CONSOLE (dev only)
 * ════════════════════════════════════════════════════
 *
 *  URL:      http://localhost:8080/h2-console
 *  JDBC URL: jdbc:h2:mem:jwtauthdb
 *  Username: sa
 *  Password: (empty)
 */
public class RouteDocumentation {
    // This class is intentionally left empty.
    // It exists purely for route documentation purposes.
}
