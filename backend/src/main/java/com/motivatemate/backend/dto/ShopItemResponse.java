package com.motivatemate.backend.dto;

import lombok.Getter;
import java.time.LocalDateTime;

import com.motivatemate.backend.model.ShopItem;

@Getter
public class ShopItemResponse {
    private final Integer id;
    private final String name;
    private final String description;
    private final String itemType;
    private final String effectType;
    private final Integer effectValue;
    private final Integer costPoints;
    private final String rarity;
    private final String imageUrl;
    private final LocalDateTime updatedAt;

    public ShopItemResponse(ShopItem shopItem) {
        this.id = shopItem.getId();
        this.name = shopItem.getName();
        this.description = shopItem.getDescription();
        this.itemType = shopItem.getItemType();
        this.effectType = shopItem.getEffectType();
        this.effectValue = shopItem.getEffectValue();
        this.costPoints = shopItem.getCostPoints();
        this.rarity = shopItem.getRarity();
        this.imageUrl = shopItem.getImageUrl();
        this.updatedAt = shopItem.getUpdatedAt();
    }
}
