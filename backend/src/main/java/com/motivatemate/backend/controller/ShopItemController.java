package com.motivatemate.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.motivatemate.backend.dto.ShopItemResponse;
import com.motivatemate.backend.service.ShopItemService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

/**
 * REST endpoints for shop item retrieval.
 *
 * <p>
 * All endpoints are mounted under {@code /api/shop}. This controller
 * currently supports read operations only. The purchase endpoint will be
 * added when the {@code UserInventory} feature is migrated.
 * </p>
 */
@RestController
@RequestMapping("/api/shop/")
public class ShopItemController {

    private final ShopItemService shopItemService;

    public ShopItemController(ShopItemService shopItemService) {
        this.shopItemService = shopItemService;
    }

    /**
     * Returns all items available in the shop.
     *
     * <p>
     * <b>Endpoint:</b> {@code GET /api/shop/items}
     * </p>
     *
     * @return HTTP 200 with a JSON array of shop items (possibly empty)
     */
    @GetMapping("/items")
    public ResponseEntity<List<ShopItemResponse>> getAllShopItems() {
        List<ShopItemResponse> items = shopItemService.getShopItems()
                .stream()
                .map(ShopItemResponse::new)
                .toList();
        return ResponseEntity.ok(items);
    }

    /**
     * Returns a single shop item by ID.
     *
     * <p>
     * <b>Endpoint:</b> {@code GET /api/shop/items/{id}}
     * </p>
     *
     * @param id the item's ID
     * @return HTTP 200 with the item, or HTTP 404 if no item has that ID
     */
    @GetMapping("/items/{id}")
    public ResponseEntity<ShopItemResponse> getShopItemById(@PathVariable Integer id) {
        return shopItemService.getShopItemById(id)
                .map(ShopItemResponse::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
