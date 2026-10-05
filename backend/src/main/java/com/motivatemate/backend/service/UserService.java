package com.motivatemate.backend.service;

import com.motivatemate.backend.model.User;
import com.motivatemate.backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Business logic for user lookup and profile operations.
 *
 * <p>
 * This service delegates database access to {@link UserRepository} and
 * is used by both {@code UserController} (for profile endpoints) and
 * {@code AuthService} (for login and registration).
 * </p>
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    // Constructor
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieves all users in the system.
     *
     * <p>
     * Intended for administrative use. Frontend clients should not call
     * this endpoint in production because it returns every user record.
     * </p>
     *
     * @return a list of all users, or an empty list if none exist
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by their primary key.
     *
     * @param id the user's ID
     * @return the user if found, or empty if no user has that ID
     */
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    /**
     * Retrieves a user by their unique username.
     *
     * <p>
     * Used by {@code AuthService} during login when the identifier
     * provided by the client is a username rather than an email.
     * </p>
     *
     * @param username the username to search for
     * @return the user if found, or empty if no user has that username
     */
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
