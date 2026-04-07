package com.example.experiment7.controller;

import com.example.experiment7.dto.LoginRequest;
import com.example.experiment7.dto.LoginResponse;
import com.example.experiment7.entity.User;
import com.example.experiment7.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

/**
 * Optional custom login endpoint.
 *
 * POST /api/auth/login  → validates credentials and returns user info.
 *
 * For basic Postman testing you can also use HTTP Basic Auth directly
 * on any secured endpoint — this controller is an extra convenience.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    /**
     * POST /api/auth/login
     * Body: { "username": "user1", "password": "user123" }
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            // Fetch role from DB for the response body
            User user = userRepository.findByUsername(request.getUsername())
                    .orElseThrow();

            LoginResponse response = new LoginResponse(
                    "Login successful",
                    user.getUsername(),
                    user.getRole()
            );

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401)
                    .body("{\"error\": \"Invalid username or password\"}");
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401)
                    .body("{\"error\": \"Authentication failed\"}");
        }
    }
}
