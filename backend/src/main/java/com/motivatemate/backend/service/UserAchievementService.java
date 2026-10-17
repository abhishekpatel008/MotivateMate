package com.motivatemate.backend.service;

import com.motivatemate.backend.model.UserAchievement;
//import com.motivatemate.backend.repository.TaskRepository;
import com.motivatemate.backend.repository.UserAchievementRepository;
//import com.motivatemate.backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Business logic for user achievement retrieval.
 *
 * <p>
 * Delegates database access to {@link UserAchievementRepository}.
 * This service currently supports read operations only. The achievement
 * awarding logic will be added when the task completion flow is migrated.
 * </p>
 */
@Service
public class UserAchievementService {

    private final UserAchievementRepository userAchievementRepository;

    public UserAchievementService(UserAchievementRepository userAchievementRepository) {
        this.userAchievementRepository = userAchievementRepository;
    }

    /**
     * Retrieves all achievements earned by a specific user.
     *
     * @param userId the ID of the user whose achievements to retrieve
     * @return a list of earned achievements for that user, or an empty list
     */
    public List<UserAchievement> getAchievementsForUser(Integer userId) {
        return userAchievementRepository.findByUserId(userId);
    }

}
