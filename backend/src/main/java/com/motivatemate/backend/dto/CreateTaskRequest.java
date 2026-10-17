package com.motivatemate.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Request shape for creating a new task.
 *
 * <p>
 * Contains only the fields the client is allowed to provide. The
 * {@code pointsWorth} is calculated on the server from {@code priority}
 * and {@code difficulty}, and {@code completed} always starts as false.
 * The {@code userId} is not in the request because it comes from the
 * authenticated user (currently a path variable, later a JWT claim).
 * </p>
 */
@Getter
@Setter
public class CreateTaskRequest {
    private String title;
    private String description;
    private String priority;
    private String difficulty;
    private LocalDateTime dueDate;

}