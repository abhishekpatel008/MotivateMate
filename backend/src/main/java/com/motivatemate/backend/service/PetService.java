package com.motivatemate.backend.service;

import com.motivatemate.backend.model.Pet;
import com.motivatemate.backend.repository.PetRepository;

import org.springframework.stereotype.Service;
import java.util.Optional;

/**
 * Business logic for pet retrieval.
 *
 * <p>
 * Delegates database access to {@link PetRepository}. Currently supports
 * read operations only. Write operations (feeding, playing, using items)
 * will be added when the shop and inventory features are migrated.
 * </p>
 */
@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    /**
     * Retrieves the pet belonging to a specific user.
     *
     * <p>
     * Each user has at most one pet. The user ID is typically extracted
     * from the JWT token once authentication is implemented.
     * </p>
     *
     * @param userId the ID of the user whose pet to retrieve
     * @return the pet if found, or empty if the user has no pet
     */
    public Optional<Pet> getPetByUserId(Integer userId) {
        return petRepository.findByUserId(userId);
    }
}
