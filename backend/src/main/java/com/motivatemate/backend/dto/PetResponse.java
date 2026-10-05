package com.motivatemate.backend.dto;

import lombok.Getter;
import com.motivatemate.backend.model.Pet;
import java.time.LocalDateTime;

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
