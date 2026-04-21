package com.example.jwtauth;

import com.example.jwtauth.model.User;
import com.example.jwtauth.model.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class JwtAuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(JwtAuthApplication.class, args);
    }

    /**
     * Seed the in-memory H2 database with a test user on startup.
     */
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("user123")) {
                User user = new User();
                user.setUsername("user123");
                user.setPassword(passwordEncoder.encode("password123"));
                user.setEmail("user123@example.com");
                user.setRole("ROLE_USER");
                userRepository.save(user);
                System.out.println("✅ Test user created: username=user123, password=password123");
            }

            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setEmail("admin@example.com");
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
                System.out.println("✅ Admin user created: username=admin, password=admin123");
            }
        };
    }
}
