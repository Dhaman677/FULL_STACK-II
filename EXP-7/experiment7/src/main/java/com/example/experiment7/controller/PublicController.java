package com.example.experiment7.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Publicly accessible endpoints — no authentication required.
 */
@RestController
@RequestMapping("/api/public")
public class PublicController {

    /**
     * GET /api/public/hello
     * Expected: 200 OK — anyone can access this.
     */
    @GetMapping("/hello")
    public ResponseEntity<Map<String, String>> hello() {
        return ResponseEntity.ok(
                Map.of("message", "This is a public endpoint. No authentication required.")
        );
    }

    /**
     * GET /api/public/info
     * Returns a brief description of the API.
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, String>> info() {
        return ResponseEntity.ok(
                Map.of(
                    "application", "Experiment 7 — RBAC with Spring Security",
                    "endpoints", "/api/public (open), /api/user (USER+ADMIN), /api/admin (ADMIN only)"
                )
        );
    }
}
