package com.project.hotelbooking.service;

import com.project.hotelbooking.entity.MenuItem;
import com.project.hotelbooking.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public Optional<MenuItem> getMenuItemById(Long id) {
        return menuItemRepository.findById(id);
    }

    public MenuItem updateMenuItem(Long id, MenuItem updatedMenuItem) {
        return menuItemRepository.findById(id).map(menuItem -> {
            if (updatedMenuItem.getName() != null) menuItem.setName(updatedMenuItem.getName());
            if (updatedMenuItem.getPrice() != 0) menuItem.setPrice(updatedMenuItem.getPrice());
            if (updatedMenuItem.getRestaurant() != null) menuItem.setRestaurant(updatedMenuItem.getRestaurant());
            return menuItemRepository.save(menuItem);
        }).orElseThrow(() -> new RuntimeException("MenuItem not found with id " + id));
    }

    public void deleteMenuItem(Long id) {
        menuItemRepository.deleteById(id);
    }
}
