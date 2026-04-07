package com.example.experiment7.dto;

import lombok.Data;

/**
 * Request body for the optional custom login endpoint.
 */
@Data
public class LoginRequest {
    private String username;
    private String password;
}
