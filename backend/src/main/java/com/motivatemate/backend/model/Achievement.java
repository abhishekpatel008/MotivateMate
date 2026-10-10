package com.motivatemate.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Represents an achievement that a {@link User} can earn.
 *
 * <p>
 * Maps to the {@code achievements} table in PostgreSQL. Achievements
 * are defined once and awarded to users when they meet a specific criterion
 * (for example, completing 10 tasks). The {@code criteriaType} field
 * determines which user stat is checked, and {@code criteriaValue} is the
 * threshold that must be reached.
 * </p>
 *
 * @see UserAchievement
 */

@Entity
@Table(name = "achievements")
@Getter
@Setter
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = false, length = 100, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "criteria_type", nullable = false, length = 50)
    private String criteriaType;

    @Column(name = "criteria_value", nullable = false)
    private Integer criteriaValue;

    @Column(name = "reward_points")
    private Integer rewardPoints;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "badge_image_url", length = 255)
    private String badgeImageUrl;

    @PrePersist
    protected void onCreate() {
        if (rewardPoints == null)
            rewardPoints = 50;
        if (updatedAt == null)
            updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
