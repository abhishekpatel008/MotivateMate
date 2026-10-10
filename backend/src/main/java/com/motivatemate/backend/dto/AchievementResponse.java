package com.motivatemate.backend.dto;

import com.motivatemate.backend.model.Achievement;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
public class AchievementResponse {
    private final Integer id;
    private final String name;
    private final String description;
    private final String criteriaType;
    private final Integer criteriaValue;
    private final Integer rewardPoints;
    private final LocalDateTime updatedAt;
    private final String badgeImageUrl;

    public AchievementResponse(Achievement achievement) {
        this.id = achievement.getId();
        this.name = achievement.getName();
        this.description = achievement.getDescription();
        this.criteriaType = achievement.getCriteriaType();
        this.criteriaValue = achievement.getCriteriaValue();
        this.rewardPoints = achievement.getRewardPoints();
        this.updatedAt = achievement.getUpdatedAt();
        this.badgeImageUrl = achievement.getBadgeImageUrl();
    }
}
