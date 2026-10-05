package com.motivatemate.backend.model;

import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * User: Represents the user of the MotivateMate application
 * 
 * <p>
 * Maps to the {@code users} table in PostgreSQL. Each user has a unique
 * username and email, accumulates points by completing tasks and owns exactly
 * one {@link Pet} and zero or more {@link Task}s.
 * </p>
 * 
 * @see Pet
 * @see Task
 */

@Entity
@Table(name = "users")

@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Column(name = "points")
    private Integer points;

    @Column(name = "level")
    private Integer level;

    @Column(name = "streak_days")
    private Integer streakDays;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Pet pet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null)
            createdAt = LocalDateTime.now();
        if (updatedAt == null)
            updatedAt = LocalDateTime.now();
        if (points == null)
            points = 0;
        if (level == null)
            level = 1;
        if (streakDays == null)
            streakDays = 0;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
