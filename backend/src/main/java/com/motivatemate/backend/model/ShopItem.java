package com.motivatemate.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "shop_items")
@Getter
@Setter
public class ShopItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "item_type", nullable = false, length = 20)
    private String itemType;

    @Column(name = "effect_type", nullable = false, length = 20)
    private String effectType;

    @Column(name = "effect_value")
    private Integer effectValue;

    @Column(name = "cost_points", nullable = false)
    private Integer costPoints;

    @Column(name = "rarity", length = 20)
    private String rarity;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        if (effectValue == null)
            effectValue = 10;
        if (rarity == null)
            rarity = "common";
        if (updatedAt == null)
            updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
