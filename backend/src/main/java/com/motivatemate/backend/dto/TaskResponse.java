package com.motivatemate.backend.dto;

import com.motivatemate.backend.model.Task;
import lombok.Getter;
import java.time.LocalDateTime;

/**
 * API response shape for a {@link Task}.
 * 
 * <p>
 * Excludes the {@code user} relationship to prevent serializing the
 * owner object into every task response. The {@code userId} field is
 * included as a scalar value instead, which is sufficient for clients
 * that need to display ownership without loading the full user.
 * </p>
 */
@Getter
public class TaskResponse {
    private final Integer id;
    private final Integer userId;
    private final String title;
    private final String description;
    private final String priority;
    private final String difficulty;
    private final LocalDateTime dueDate;
    private final Boolean completed;
    private final LocalDateTime completedAt;
    private final Integer pointsWorth;
    private final Integer pointsEarned;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public TaskResponse(Task task) {
        this.id = task.getId();
        this.userId = task.getUser().getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.priority = task.getPriority();
        this.difficulty = task.getDifficulty();
        this.dueDate = task.getDueDate();
        this.completed = task.getCompleted();
        this.completedAt = task.getCompletedAt();
        this.pointsWorth = task.getPointsWorth();
        this.pointsEarned = task.getPointsEarned();
        this.createdAt = task.getCreatedAt();
        this.updatedAt = task.getUpdatedAt();
    }
}
