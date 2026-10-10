package com.motivatemate.backend.service;

import org.springframework.stereotype.Service;
import com.motivatemate.backend.model.Achievement;
import com.motivatemate.backend.repository.AchievementRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public AchievementService(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    public Optional<Achievement> findAchievementById(Integer id) {
        return achievementRepository.findById(id);
    }
}
