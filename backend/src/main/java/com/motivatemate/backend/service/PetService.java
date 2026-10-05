package com.motivatemate.backend.service;

import com.motivatemate.backend.model.Pet;
import com.motivatemate.backend.repository.PetRepository;

import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    // Get Pet by user id
    public Optional<Pet> getPetByUserId(Integer userId) {
        return petRepository.findByUserId(userId);
    }
}
