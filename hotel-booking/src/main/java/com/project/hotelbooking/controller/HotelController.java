package com.project.hotelbooking.controller;

import com.project.hotelbooking.entity.Hotel;
import com.project.hotelbooking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    // Get all hotels
    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    // Get hotel by ID
    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        return hotelRepository.findById(id)
                .map(ResponseEntity::ok)  // ✅ now this works
                .orElse(ResponseEntity.notFound().build());
    }

    // Create hotel
    @PostMapping
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    // Update hotel
    @PutMapping("/{id}")
    public ResponseEntity<Hotel> updateHotel(@PathVariable Long id, @RequestBody Hotel updatedHotel) {
        return hotelRepository.findById(id).map(hotel -> {
            if(updatedHotel.getName() != null) hotel.setName(updatedHotel.getName());
            if(updatedHotel.getLocation() != null) hotel.setLocation(updatedHotel.getLocation());
            if(updatedHotel.getPrice() != null) hotel.setPrice(updatedHotel.getPrice());
            if(updatedHotel.getRating() != null) hotel.setRating(updatedHotel.getRating());
            hotelRepository.save(hotel);
            return ResponseEntity.ok(hotel);
        }).orElse(ResponseEntity.notFound().build());
    }

    // Delete hotel
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHotel(@PathVariable Long id) {
        if(hotelRepository.existsById(id)) {
            hotelRepository.deleteById(id);
            return ResponseEntity.ok("Hotel deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
