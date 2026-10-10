package com.motivatemate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.motivatemate.backend.model.Achievement;

import java.util.Optional;

/**
 * Data access layer for {@link Achievement} entities.
 *
 * <p>
 * Inherits standard CRUD operations from {@link JpaRepository}.
 * Custom query methods follow Spring Data JPA's derived query naming
 * convention and are implemented automatically at runtime.
 * </p>
 */
public interface AchievementRepository extends JpaRepository<Achievement, Integer> {

    /**
     * Finds an achievement by its unique name.
     *
     * <p>
     * The {@code name} column has a unique constraint in the database,
     * so this method returns at most one result.
     * </p>
     *
     * @param name the achievement name to search for
     * @return the achievement if found, or empty if no achievement has that name
     */
    Optional<Achievement> findByName(String name);

}
