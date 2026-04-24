package com.example.experiment7.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Endpoints accessible ONLY by users with ROLE_ADMIN.
 * Any other role receives 403 Forbidden.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    /**
     * GET /api/admin/dashboard
     * Accessible by: ROLE_ADMIN only
     */
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, String>> dashboard(Authentication authentication) {
        return ResponseEntity.ok(
                Map.of(
                    "message", "Welcome, admin! You have full access.",
                    "adminUser", authentication.getName()
                )
        );
    }

    /**
     * GET /api/admin/users
     * Example admin-only management endpoint.
     */
    @GetMapping("/users")
    public ResponseEntity<Map<String, String>> manageUsers() {
        return ResponseEntity.ok(
                Map.of(
                    "message", "Admin: User management panel",
                    "registeredUsers", "user1 (ROLE_USER), admin1 (ROLE_ADMIN)"
                )
        );
    }
}
