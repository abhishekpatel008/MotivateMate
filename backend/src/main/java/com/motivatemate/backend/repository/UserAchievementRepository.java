package com.motivatemate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.motivatemate.backend.model.UserAchievement;

import java.util.List;
import java.util.Optional;

/**
 * Data access layer for {@link UserAchievement} entities.
 *
 * <p>
 * Inherits standard CRUD operations from {@link JpaRepository}.
 * The {@code (user_id, achievement_id)} pair has a unique constraint,
 * so lookups by that pair return at most one result.
 * </p>
 */
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Integer> {

    /**
     * Finds all achievements earned by a specific user.
     *
     * @param userId the ID of the user whose achievements to retrieve
     * @return a list of earned achievements for that user, or an empty list
     */
    List<UserAchievement> findByUserId(Integer userId);

    /**
     * Finds a specific earned achievement by user and achievement.
     *
     * @param userId        the ID of the user
     * @param achievementId the ID of the achievement
     * @return the earned achievement if found, or empty otherwise
     */
    Optional<UserAchievement> findByUserIdAndAchievementId(Integer userId, Integer achievementId);

}
