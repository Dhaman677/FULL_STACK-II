package com.example.experiment7.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    /**
     * Role stored as a single string, e.g. "ROLE_USER" or "ROLE_ADMIN".
     * Spring Security uses the "ROLE_" prefix convention.
     */
    @Column(nullable = false)
    private String role;
}
