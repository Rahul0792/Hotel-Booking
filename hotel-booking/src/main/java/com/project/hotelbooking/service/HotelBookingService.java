package com.project.hotelbooking.service;

import com.project.hotelbooking.entity.HotelBooking;
import com.project.hotelbooking.entity.Hotel;
import com.project.hotelbooking.entity.User;
import com.project.hotelbooking.repository.HotelBookingRepository;
import com.project.hotelbooking.repository.HotelRepository;
import com.project.hotelbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelBookingService {

    @Autowired
    private HotelBookingRepository bookingRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private HotelRepository hotelRepo;

    // Create booking
    public HotelBooking createBooking(HotelBooking booking) {
        User user = userRepo.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Hotel hotel = hotelRepo.findById(booking.getHotel().getId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        booking.setUser(user);
        booking.setHotel(hotel);

        return bookingRepo.save(booking);
    }

    // Update booking
    public HotelBooking updateBooking(Long id, HotelBooking updatedBooking) {
        HotelBooking existing = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (updatedBooking.getGuests() != 0) existing.setGuests(updatedBooking.getGuests());
        if (updatedBooking.getRoomType() != null) existing.setRoomType(updatedBooking.getRoomType());
        if (updatedBooking.getCheckIn() != null) existing.setCheckIn(updatedBooking.getCheckIn());
        if (updatedBooking.getCheckOut() != null) existing.setCheckOut(updatedBooking.getCheckOut());
        if (updatedBooking.getName() != null) existing.setName(updatedBooking.getName());
        if (updatedBooking.getEmail() != null) existing.setEmail(updatedBooking.getEmail());

        return bookingRepo.save(existing);
    }

    // Get all bookings
    public List<HotelBooking> getAllBookings() {
        return bookingRepo.findAll();
    }

    // Get booking by ID
    public Optional<HotelBooking> getBookingById(Long id) {
        return bookingRepo.findById(id);
    }

    // Delete booking
    public void deleteBooking(Long id) {
        bookingRepo.deleteById(id);
    }
}
