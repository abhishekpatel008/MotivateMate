package com.motivatemate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.motivatemate.backend.model.ShopItem;

public interface ShopItemRepository extends JpaRepository<ShopItem, Integer> {

}
