package com.motivatemate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.motivatemate.backend.model.Pet;
import java.util.Optional;

public interface PetRepository extends JpaRepository<Pet, Integer> {

    Optional<Pet> findByUserId(Integer userId);
}