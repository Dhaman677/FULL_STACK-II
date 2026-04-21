package com.example.jwtauth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * controller/ProtectedController.java
 * Demonstrates routes that require a valid JWT token.
 * Equivalent to a protected route handler in authRoutes.js.
 *
 * Routes:
 *   GET /api/protected          — requires any valid JWT
 *   GET /api/protected/profile  — returns authenticated user's info
 *   GET /api/public/health      — publicly accessible, no token needed
 */
@RestController
public class ProtectedController {

    /**
     * Public health check — no authentication required.
     * GET /api/public/health
     */
    @GetMapping("/api/public/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "message", "JWT Auth API is running",
                "timestamp", System.currentTimeMillis()
        ));
    }

    /**
     * Protected route — requires valid JWT in Authorization header.
     * GET /api/protected
     * Header: Authorization: Bearer <your_token>
     */
    @GetMapping("/api/protected")
    public ResponseEntity<?> protectedRoute() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(Map.of(
                "message", "🎉 You have accessed a protected route!",
                "authenticatedUser", auth.getName(),
                "authorities", auth.getAuthorities().toString()
        ));
    }

    /**
     * Protected profile route — returns current user details.
     * GET /api/protected/profile
     * Header: Authorization: Bearer <your_token>
     */
    @GetMapping("/api/protected/profile")
    public ResponseEntity<?> getProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(Map.of(
                "username", auth.getName(),
                "role", auth.getAuthorities().toString(),
                "message", "Profile fetched successfully"
        ));
    }

    /**
     * Admin-only route example.
     * GET /api/protected/admin
     * Header: Authorization: Bearer <admin_token>
     */
    @GetMapping("/api/protected/admin")
    public ResponseEntity<?> adminRoute() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return ResponseEntity.status(403)
                    .body(Map.of("error", "Access denied. Admin role required."));
        }

        return ResponseEntity.ok(Map.of(
                "message", "Welcome, Admin!",
                "username", auth.getName(),
                "access", "FULL_ADMIN_ACCESS"
        ));
    }
}
