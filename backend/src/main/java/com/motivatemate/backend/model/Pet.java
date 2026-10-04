package com.motivatemate.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "pets")
@Getter
@Setter
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "type", length = 20)
    private String type;

    @Column(name = "level")
    private Integer level;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "hunger")
    private Integer hunger;

    @Column(name = "happiness")
    private Integer happiness;

    @Column(name = "energy")
    private Integer energy;

    @Column(name = "last_interaction")
    private LocalDateTime lastInteraction;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (level == null)
            level = 1;
        if (experience == null)
            experience = 0;
        if (hunger == null)
            hunger = 50;
        if (happiness == null)
            happiness = 50;
        if (energy == null)
            energy = 50;
        if (lastInteraction == null)
            lastInteraction = LocalDateTime.now();
        if (createdAt == null)
            createdAt = LocalDateTime.now();
        if (updatedAt == null)
            updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
