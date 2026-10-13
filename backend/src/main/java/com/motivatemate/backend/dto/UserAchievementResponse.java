package com.motivatemate.backend.dto;

import com.motivatemate.backend.model.UserAchievement;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * API response shape for a {@link UserAchievement} entry.
 *
 * <p>
 * Includes the full {@link AchievementResponse} so the frontend can
 * display achievement details (name, description, badge) without making
 * a separate request. The {@code userId} is excluded because the client
 * already knows which user is authenticated.
 * </p>
 */
@Getter
public class UserAchievementResponse {
    private final Integer id;
    private final AchievementResponse achievement;
    private final LocalDateTime earnedAt;

    /**
     * Maps a {@link UserAchievement} entity to a client-safe response.
     *
     * @param userAchievement the entity to map; must not be null
     */
    public UserAchievementResponse(UserAchievement userAchievement) {
        this.id = userAchievement.getId();
        this.achievement = new AchievementResponse(userAchievement.getAchievement());
        this.earnedAt = userAchievement.getEarnedAt();
    }

}
