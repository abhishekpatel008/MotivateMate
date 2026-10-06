package com.motivatemate.backend.dto;

import lombok.Getter;
import com.motivatemate.backend.model.Pet;
import java.time.LocalDateTime;

/**
 * API response shape for a {@link Pet}.
 *
 * <p>
 * Excludes the {@code user} relationship to prevent serializing the
 * entire owner object into every pet response. The {@code userId} field
 * is included as a scalar value instead.
 * </p>
 */
@Getter
public class PetResponse {
    private final Integer id;
    private final Integer userId;
    private final String name;
    private final String type;
    private final Integer level;
    private final Integer experience;
    private final Integer hunger;
    private final Integer happiness;
    private final Integer energy;
    private final LocalDateTime createdAt;

    /**
     * Maps a {@link Pet} entity to a client-safe response.
     *
     * @param pet the entity to map; must not be null
     */
    public PetResponse(Pet pet) {
        this.id = pet.getId();
        this.userId = pet.getUser().getId();
        this.name = pet.getName();
        this.type = pet.getType();
        this.level = pet.getLevel();
        this.experience = pet.getExperience();
        this.hunger = pet.getHunger();
        this.happiness = pet.getHappiness();
        this.energy = pet.getEnergy();
        this.createdAt = pet.getCreatedAt();
    }

}
