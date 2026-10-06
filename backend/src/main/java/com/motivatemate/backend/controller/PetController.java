package com.motivatemate.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.motivatemate.backend.service.PetService;
import com.motivatemate.backend.dto.PetResponse;

/**
 * REST endpoints for pet retrieval.
 *
 * <p>
 * All endpoints are mounted under {@code /api/pets}. The current design
 * uses a path-based user ID because JWT authentication has not yet been
 * migrated. Once JWT is in place, the primary endpoint will become
 * {@code GET /api/pets/me} and read the user from the token.
 * </p>
 */
@RestController
@RequestMapping("/api/pets")
public class PetController {
    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    /**
     * Returns the pet belonging to a specific user.
     *
     * <p>
     * <b>Endpoint:</b> {@code GET /api/pets/{userId}}
     * </p>
     *
     * @param userId the ID of the user whose pet to retrieve
     * @return HTTP 200 with the pet, or HTTP 404 if the user has no pet
     */
    @GetMapping("/{userId}")
    public ResponseEntity<PetResponse> getPetByUserId(@PathVariable Integer userId) {
        return petService.getPetByUserId(userId).map(PetResponse::new).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
