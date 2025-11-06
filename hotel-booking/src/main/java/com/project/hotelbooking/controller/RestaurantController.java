package com.project.hotelbooking.controller;

import com.project.hotelbooking.entity.Restaurant;
import com.project.hotelbooking.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    // ✅ GET all restaurants
    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        return ResponseEntity.ok(restaurants);
    }

    // ✅ GET restaurant by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getRestaurantById(@PathVariable Long id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        return restaurant.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Restaurant with ID " + id + " not found."));
    }

    // ✅ CREATE new restaurant
    @PostMapping
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
        Restaurant saved = restaurantRepository.save(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ✅ UPDATE restaurant
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurantDetails) {
        Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(id);

        if (optionalRestaurant.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Restaurant with ID " + id + " not found.");
        }

        Restaurant restaurant = optionalRestaurant.get();
        if (restaurantDetails.getName() != null) {
            restaurant.setName(restaurantDetails.getName());
        }
        if (restaurantDetails.getLocation() != null) {
            restaurant.setLocation(restaurantDetails.getLocation());
        }

        Restaurant updated = restaurantRepository.save(restaurant);
        return ResponseEntity.ok(updated);
    }

    // ✅ DELETE restaurant
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable Long id) {
        if (restaurantRepository.existsById(id)) {
            try {
                restaurantRepository.deleteById(id);
                return ResponseEntity.ok("✅ Restaurant with ID " + id + " deleted successfully.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("❌ Failed to delete restaurant. It may have linked records (e.g., menu items or bookings).");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("⚠️ Restaurant with ID " + id + " not found.");
        }
    }
}
