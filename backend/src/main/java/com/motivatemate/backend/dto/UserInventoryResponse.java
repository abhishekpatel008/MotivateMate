package com.motivatemate.backend.dto;

import java.time.LocalDateTime;

import com.motivatemate.backend.model.UserInventory;
import lombok.Getter;

@Getter
public class UserInventoryResponse {
    private final Integer id;
    private final Integer userId;
    private final Integer itemId;
    private final Integer quantity;
    private final LocalDateTime purchasedAt;
    private final LocalDateTime updatedAt;

    public UserInventoryResponse(UserInventory userInventory) {
        this.id = userInventory.getId();
        this.userId = userInventory.getUser().getId();
        this.itemId = new ShopItemResponse(userInventory.getItem()).getId();
        this.quantity = userInventory.getQuantity();
        this.purchasedAt = userInventory.getPurchasedAt();
        this.updatedAt = userInventory.getUpdatedAt();
    }

}
