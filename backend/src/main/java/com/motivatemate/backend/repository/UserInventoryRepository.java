package com.motivatemate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.motivatemate.backend.model.UserInventory;
import java.util.List;
import java.util.Optional;

public interface UserInventoryRepository extends JpaRepository<UserInventory, Integer> {

    List<UserInventory> findByUserId(Integer userId);

    Optional<UserInventory> findByUserIdAndItemId(Integer userId, Integer itemId);

}
