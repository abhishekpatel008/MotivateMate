package com.motivatemate.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.motivatemate.backend.service.PetService;
import com.motivatemate.backend.dto.PetResponse;

@RestController
@RequestMapping("/api/pets")
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<PetResponse> getPetByUserId(@PathVariable Integer userId) {
        return petService.getPetByUserId(userId).map(PetResponse::new).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
