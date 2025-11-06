package com.project.hotelbooking.controller;

import com.project.hotelbooking.entity.HotelBooking;
import com.project.hotelbooking.service.HotelBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotel_bookings")
@CrossOrigin(origins = "*")

public class HotelBookingController {

    @Autowired
    private HotelBookingService hotelBookingService;

    // Create new booking
    @PostMapping
    public ResponseEntity<HotelBooking> createBooking(@RequestBody HotelBooking booking) {
        HotelBooking savedBooking = hotelBookingService.createBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }

    // Update booking
    @PutMapping("/{id}")
    public ResponseEntity<HotelBooking> updateBooking(@PathVariable Long id, @RequestBody HotelBooking updatedBooking) {
        HotelBooking updated = hotelBookingService.updateBooking(id, updatedBooking);
        return ResponseEntity.ok(updated);
    }




    // Get all bookings
    @GetMapping
    public ResponseEntity<List<HotelBooking>> getAllBookings() {
        return ResponseEntity.ok(hotelBookingService.getAllBookings());
    }

    // Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<HotelBooking> getBookingById(@PathVariable Long id) {
        return hotelBookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete booking
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        hotelBookingService.deleteBooking(id);
        return ResponseEntity.ok("Hotel booking deleted successfully");
    }
}
