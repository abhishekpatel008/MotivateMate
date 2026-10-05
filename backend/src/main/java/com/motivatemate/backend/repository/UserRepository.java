package com.motivatemate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.motivatemate.backend.model.User;
import java.util.Optional;

/**
 * Data access layer for {@link User} entities.
 *
 * <p>
 * Inherits standard CRUD operations from {@link JpaRepository}.
 * Custom query methods follow Spring Data JPA's derived query naming
 * convention and are implemented automatically at runtime.
 * </p>
 */
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Finds a user by their unique username.
     *
     * @param username the username to search for
     * @return the user if found, or empty if no user has that username
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a user by their unique email address.
     *
     * @param email the email to search for
     * @return the user if found, or empty if no user has that email
     */
    Optional<User> findByEmail(String email);
}
