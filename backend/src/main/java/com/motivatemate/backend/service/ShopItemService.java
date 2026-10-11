package com.motivatemate.backend.service;

import org.springframework.stereotype.Service;
import com.motivatemate.backend.repository.ShopItemRepository;
import com.motivatemate.backend.model.ShopItem;

import java.util.List;
import java.util.Optional;

@Service
public class ShopItemService {

    private final ShopItemRepository shopItemRepository;

    public ShopItemService(ShopItemRepository shopItemRepository) {
        this.shopItemRepository = shopItemRepository;
    }

    public List<ShopItem> getShopItems() {
        return shopItemRepository.findAll();
    }

    public Optional<ShopItem> getShopItemById(Integer id) {
        return shopItemRepository.findById(id);
    }
}
