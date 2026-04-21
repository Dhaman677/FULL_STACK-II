package com.example.jwtauth.controller;

import com.example.jwtauth.dto.AuthResponse;
import com.example.jwtauth.dto.LoginRequest;
import com.example.jwtauth.dto.RegisterRequest;
import com.example.jwtauth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * controller/AuthController.java
 * Handles login, registration, and logout requests.
 * Equivalent to authController.js in a Node.js project.
 *
 * Routes:
 *   POST /api/auth/login     — authenticate user, return JWT
 *   POST /api/auth/register  — register new user, return JWT
 *   POST /api/auth/logout    — client-side logout (invalidate token client-side)
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * LOGIN — POST /api/auth/login
     * Body: { "username": "user123", "password": "password123" }
     * Returns: { "token": "...", "type": "Bearer", "username": "...", "role": "...", "expiresIn": 86400000 }
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Invalid username or password"));
        }
    }

    /**
     * REGISTER — POST /api/auth/register
     * Body: { "username": "newuser", "password": "pass123", "email": "email@example.com" }
     * Returns: JWT token for the new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.status(201).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * LOGOUT — POST /api/auth/logout
     * JWT is stateless — true server-side invalidation requires a token blacklist.
     * This endpoint signals the client to discard the token.
     * For full invalidation, implement a Redis-backed token blacklist.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        // In a production app, add the token to a blacklist here (e.g., Redis)
        return ResponseEntity.ok(Map.of(
                "message", "Logged out successfully. Please discard your token.",
                "note", "JWT is stateless — ensure you remove the token from client storage."
        ));
    }
}
