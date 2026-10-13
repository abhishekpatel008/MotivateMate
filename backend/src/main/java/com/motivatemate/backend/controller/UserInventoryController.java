package com.motivatemate.backend.controller;

import com.motivatemate.backend.dto.UserInventoryResponse;
import com.motivatemate.backend.service.UserInventoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST endpoints for user inventory retrieval.
 *
 * <p>
 * Mounted under {@code /api/shop} to match the Node.js route structure.
 * The inventory endpoint returns all items the authenticated user owns.
 * </p>
 */
@RestController
@RequestMapping("/api/shop")
public class UserInventoryController {

    private final UserInventoryService userInventoryService;

    public UserInventoryController(UserInventoryService userInventoryService) {
        this.userInventoryService = userInventoryService;
    }

    /**
     * Returns the inventory for a specific user.
     *
     * <p>
     * <b>Endpoint:</b> {@code GET /api/shop/inventory/user/{userId}}
     * </p>
     *
     * @param userId the ID of the user whose inventory to retrieve
     * @return HTTP 200 with a JSON array of inventory entries (possibly empty)
     */
    @GetMapping("/inventory/user/{userId}")
    public ResponseEntity<List<UserInventoryResponse>> getUserInventoryByUserId(
            @PathVariable Integer userId) {
        List<UserInventoryResponse> inventory = userInventoryService.getUserInventoryByUserId(userId)
                .stream()
                .map(UserInventoryResponse::new)
                .toList();
        return ResponseEntity.ok(inventory);
    }
}