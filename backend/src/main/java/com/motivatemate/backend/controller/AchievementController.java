package com.motivatemate.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.motivatemate.backend.service.AchievementService;
import com.motivatemate.backend.dto.AchievementResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public ResponseEntity<List<AchievementResponse>> getAllAchievements() {
        List<AchievementResponse> achievements = achievementService.getAllAchievements().stream()
                .map(AchievementResponse::new).toList();
        return ResponseEntity.ok(achievements);
    }

}
