package com.motivatemate.backend.service;

import org.springframework.stereotype.Service;

import com.motivatemate.backend.repository.UserInventoryRepository;
import com.motivatemate.backend.model.UserInventory;
import java.util.List;
import java.util.Optional;

@Service
public class UserInventoryService {

    private final UserInventoryRepository userInventoryRepository;

    public UserInventoryService(UserInventoryRepository userInventoryRepository) {
        this.userInventoryRepository = userInventoryRepository;
    }

    public List<UserInventory> getUserInventoryByUserId(Integer userId) {
        return userInventoryRepository.findByUserId(userId);
    }

    public Optional<UserInventory> getUserInventoryById(Integer id) {
        return userInventoryRepository.findById(id);
    }

}
