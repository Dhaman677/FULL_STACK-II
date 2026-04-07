package com.example.experiment7.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Response body returned after a successful login via the custom endpoint.
 */
@Data
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String username;
    private String role;
}
