package com.motivatemate.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

/**
 * Represents an achievement earned by a {@link User}.
 *
 * <p>
 * Maps to the {@code user_achievements} table in PostgreSQL. This is a
 * junction table linking {@link User} and {@link Achievement}. Each row
 * means "this user earned this achievement at this time." The
 * {@code (user_id, achievement_id)} pair has a unique constraint, so a
 * user can earn each achievement at most once.
 * </p>
 *
 * @see User
 * @see Achievement
 */
@Entity
@Table(name = "user_achievements")
@Getter
@Setter
public class UserAchievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "achievement_id")
    private Achievement achievement;

    @Column(name = "earned_at")
    private LocalDateTime earnedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        if (earnedAt == null)
            earnedAt = LocalDateTime.now();
        if (updatedAt == null)
            updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
