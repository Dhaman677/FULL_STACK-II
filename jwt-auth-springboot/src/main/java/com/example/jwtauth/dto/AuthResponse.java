package com.example.jwtauth.dto;

/**
 * dto/AuthResponse.java
 * Response DTO containing the JWT token after successful login.
 */
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private String username;
    private String role;
    private long expiresIn;

    public AuthResponse(String token, String username, String role, long expiresIn) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.expiresIn = expiresIn;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(long expiresIn) { this.expiresIn = expiresIn; }
}
