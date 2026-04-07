package com.example.experiment7.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Endpoints accessible by authenticated users with ROLE_USER or ROLE_ADMIN.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    /**
     * GET /api/user/profile
     * Accessible by: ROLE_USER, ROLE_ADMIN
     * Returns 401 if unauthenticated, 403 if wrong role.
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> profile(Authentication authentication) {
        return ResponseEntity.ok(
                Map.of(
                    "message", "Welcome, authenticated user!",
                    "username", authentication.getName(),
                    "role", authentication.getAuthorities().toString()
                )
        );
    }

    /**
     * GET /api/user/dashboard
     * Another user-level endpoint for additional testing.
     */
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, String>> dashboard(Authentication authentication) {
        return ResponseEntity.ok(
                Map.of(
                    "message", "User dashboard loaded successfully.",
                    "loggedInAs", authentication.getName()
                )
        );
    }
}
