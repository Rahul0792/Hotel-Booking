package com.project.hotelbooking.controller;

import com.project.hotelbooking.entity.DineBooking;
import com.project.hotelbooking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dine_bookings")
@CrossOrigin(origins = "*")
public class DineBookingController {

    @Autowired
    private BookingService bookingService; // Use consistent naming

    // ✅ Create new dine booking
    @PostMapping
    public ResponseEntity<DineBooking> createBooking(@RequestBody DineBooking dineBooking) {
        DineBooking savedBooking = bookingService.createDineBooking(dineBooking);
        return ResponseEntity.ok(savedBooking);
    }

    // ✅ Update existing dine booking
    @PutMapping("/{id}")
    public ResponseEntity<DineBooking> updateBooking(@PathVariable Long id, @RequestBody DineBooking updatedBooking) {
        DineBooking updated = bookingService.updateDineBooking(id, updatedBooking);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Get all dine bookings
    @GetMapping
    public ResponseEntity<List<DineBooking>> getAllBookings() {
        List<DineBooking> bookings = bookingService.getAllDineBookings();
        return ResponseEntity.ok(bookings);
    }

    // ✅ Get dine booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<DineBooking> getBookingById(@PathVariable Long id) {
        Optional<DineBooking> booking = bookingService.getDineBookingById(id);
        return booking.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete dine booking
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        boolean deleted = bookingService.deleteDineBooking(id);
        if (deleted) {
            return ResponseEntity.ok("Dine booking deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
