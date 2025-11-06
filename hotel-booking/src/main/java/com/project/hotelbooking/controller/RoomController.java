package com.project.hotelbooking.controller;

import com.project.hotelbooking.entity.Room;
import com.project.hotelbooking.entity.Hotel;
import com.project.hotelbooking.repository.RoomRepository;
import com.project.hotelbooking.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    // ✅ Get all rooms
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomRepository.findAll());
    }

    // ✅ Create new room
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        if (room.getHotel() != null && room.getHotel().getId() != null) {
            Hotel hotel = hotelRepository.findById(room.getHotel().getId())
                    .orElseThrow(() -> new RuntimeException("Hotel not found"));
            room.setHotel(hotel);
        }
        Room savedRoom = roomRepository.save(room);
        return ResponseEntity.ok(savedRoom);
    }

    // ✅ Get room by ID
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return roomRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Update room
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room updatedRoom) {
        return roomRepository.findById(id).map(existingRoom -> {
            if (updatedRoom.getType() != null) existingRoom.setType(updatedRoom.getType());
            if (updatedRoom.getDescription() != null) existingRoom.setDescription(updatedRoom.getDescription());
            if (updatedRoom.getPrice() != null) existingRoom.setPrice(updatedRoom.getPrice());

            // Update hotel if provided
            if (updatedRoom.getHotel() != null && updatedRoom.getHotel().getId() != null) {
                Hotel hotel = hotelRepository.findById(updatedRoom.getHotel().getId())
                        .orElseThrow(() -> new RuntimeException("Hotel not found"));
                existingRoom.setHotel(hotel);
            }

            Room savedRoom = roomRepository.save(existingRoom);
            return ResponseEntity.ok(savedRoom);
        }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete room
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        if (!roomRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        roomRepository.deleteById(id);
        return ResponseEntity.ok("Room deleted successfully");
    }
}
