package com.motivatemate.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "title", nullable =  false, length = 200)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "priority", length = 10)
    private String priority;

    @Column(name = "difficulty", length = 10)
    private String difficulty;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "completed")
    private Boolean completed;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "points_worth")
    private Integer pointsWorth;

    @Column(name = "points_earned")
    private Integer pointsEarned;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    protected void onCreate() {
        if (completed == null)
            completed = false;
        if (pointsEarned == null)
            pointsEarned = 0;
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
