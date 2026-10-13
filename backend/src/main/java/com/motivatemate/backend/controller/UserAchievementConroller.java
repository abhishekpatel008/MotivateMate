package com.motivatemate.backend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.motivatemate.backend.dto.UserAchievementResponse;
import com.motivatemate.backend.model.UserAchievement;
import com.motivatemate.backend.service.UserAchievementService;
import org.springframework.http.ResponseEntity;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * REST endpoints for user achievement retrieval.
 *
 * <p>
 * Mounted under {@code /api/achievements} to match the Node.js route
 * structure. The user endpoint returns all achievements earned by a
 * specific user.
 * </p>
 */
@RestController
@RequestMapping("/api/achievements")
public class UserAchievementConroller {
    private final UserAchievementService userAchievementService;

    public UserAchievementConroller(UserAchievementService userAchievementService) {
        this.userAchievementService = userAchievementService;
    }

    /**
     * Returns all achievements earned by a specific user.
     *
     * <p>
     * <b>Endpoint:</b> {@code GET /api/achievements/user/{userId}}
     * </p>
     *
     * @param userId the ID of the user whose achievements to retrieve
     * @return HTTP 200 with a JSON array of earned achievements (possibly empty)
     */

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserAchievementResponse>> getAchievementsForUser(@PathVariable Integer userId) {
        List<UserAchievementResponse> achievements = userAchievementService
                .getAchievementsForUser(userId)
                .stream()
                .map(UserAchievementResponse::new)
                .toList();
        return ResponseEntity.ok(achievements);
    }
}
