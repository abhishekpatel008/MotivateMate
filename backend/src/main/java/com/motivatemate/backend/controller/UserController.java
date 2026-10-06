package com.motivatemate.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.motivatemate.backend.dto.UserResponse;
import com.motivatemate.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * REST endpoints for user profile operations.
 *
 * <p>
 * All endpoints are mounted under {@code /api/users}. Responses use
 * {@link UserResponse} to avoid exposing sensitive entity fields such as
 * the password hash.
 * </p>
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    // Dependency Injection
    private UserService userService;

    // Constructor
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Returns all users in the system.
     *
     * <p>
     * <b>Endpoint:</b> {@code GET /api/users}
     * </p>
     *
     * @return HTTP 200 with a JSON array of users (possibly empty)
     */
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> users = userService.getAllUsers().stream().map(UserResponse::new).toList();
        return ResponseEntity.ok(users);
    }

    /**
     * Returns a single user by ID.
     *
     * <p>
     * <b>Endpoint:</b> {@code GET /api/users/{id}}
     * </p>
     *
     * @param id the user's ID
     * @return HTTP 200 with the user, or HTTP 404 if no user has that ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Integer id) {
        return userService.getUserById(id).map(UserResponse::new).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
