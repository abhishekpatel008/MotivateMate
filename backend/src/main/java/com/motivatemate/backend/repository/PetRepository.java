package com.motivatemate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.motivatemate.backend.model.Pet;
import java.util.Optional;

/**
 * Data access layer for {@link Pet} entities.
 *
 * <p>
 * Inherits standard CRUD operations from {@link JpaRepository}.
 * Custom query methods follow Spring Data JPA's derived query naming
 * convention and are implemented automatically at runtime.
 * </p>
 */
public interface PetRepository extends JpaRepository<Pet, Integer> {

    /**
     * Finds the pet belonging to a given user.
     *
     * <p>
     * Because each user has at most one pet, this method returns at most
     * one result. It searches by the {@code user_id} foreign key, not by
     * the pet's primary key.
     * </p>
     *
     * @param userId the ID of the user whose pet to find
     * @return the pet if found, or empty if the user has no pet
     */
    Optional<Pet> findByUserId(Integer userId);
}