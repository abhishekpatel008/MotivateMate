package com.motivatemate.backend.dto;

import com.motivatemate.backend.model.User;
import lombok.Getter;
import java.time.LocalDateTime;

/**
 * API response shape for a {@link User}.
 * 
 * <p>
 * Excludes the {@code passwordHash} field to prevent credential
 * leakage in HTTP responses. Also excludes the {@code pet} and
 * {@code tasks} relationships to avoid serializing the full object
 * graph when only the user profile is needed.
 * </p>
 */
@Getter
public class UserResponse {
    private final Integer id;
    private final String username;
    private final String email;
    private final Integer points;
    private final Integer level;
    private final Integer streakDays;
    private final LocalDateTime createdAt;

    public UserResponse(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.points = user.getPoints();
        this.level = user.getLevel();
        this.streakDays = user.getStreakDays();
        this.createdAt = user.getCreatedAt();
    }
}
