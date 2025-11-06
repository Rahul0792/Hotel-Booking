package com.project.hotelbooking.service;

import com.project.hotelbooking.entity.DineBooking;
import com.project.hotelbooking.entity.HotelBooking;
import com.project.hotelbooking.repository.DineBookingRepository;
import com.project.hotelbooking.repository.HotelBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private HotelBookingRepository hotelBookingRepository;

    @Autowired
    private DineBookingRepository dineBookingRepository;

    // ================== Hotel Bookings ==================

    public List<HotelBooking> getAllHotelBookings() {
        return hotelBookingRepository.findAll();
    }

    public Optional<HotelBooking> getHotelBookingById(Long id) {
        return hotelBookingRepository.findById(id);
    }

    public HotelBooking createHotelBooking(HotelBooking booking) {
        return hotelBookingRepository.save(booking);
    }

    public HotelBooking updateHotelBooking(Long id, HotelBooking updatedBooking) {
        return hotelBookingRepository.findById(id).map(existing -> {
            if (updatedBooking.getCheckIn() != null) existing.setCheckIn(updatedBooking.getCheckIn());
            if (updatedBooking.getCheckOut() != null) existing.setCheckOut(updatedBooking.getCheckOut());
            if (updatedBooking.getGuests() != 0) existing.setGuests(updatedBooking.getGuests());
            if (updatedBooking.getName() != null) existing.setName(updatedBooking.getName());
            if (updatedBooking.getEmail() != null) existing.setEmail(updatedBooking.getEmail());
            if (updatedBooking.getRoomType() != null) existing.setRoomType(updatedBooking.getRoomType());
            if (updatedBooking.getUser() != null) existing.setUser(updatedBooking.getUser());
            if (updatedBooking.getHotel() != null) existing.setHotel(updatedBooking.getHotel());
            return hotelBookingRepository.save(existing);
        }).orElse(null);
    }

    public boolean deleteHotelBooking(Long id) {
        if (hotelBookingRepository.existsById(id)) {
            hotelBookingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // ================== Dine Bookings ==================

    public List<DineBooking> getAllDineBookings() {
        return dineBookingRepository.findAll();
    }

    public Optional<DineBooking> getDineBookingById(Long id) {
        return dineBookingRepository.findById(id);
    }

    public DineBooking createDineBooking(DineBooking booking) {
        return dineBookingRepository.save(booking);
    }

    public DineBooking updateDineBooking(Long id, DineBooking updatedBooking) {
        return dineBookingRepository.findById(id).map(existing -> {
            if (updatedBooking.getBookingDate() != null)
                existing.setBookingDate(updatedBooking.getBookingDate());
            if (updatedBooking.getNumberOfPeople() != 0)
                existing.setNumberOfPeople(updatedBooking.getNumberOfPeople());
            if (updatedBooking.getRestaurant() != null)
                existing.setRestaurant(updatedBooking.getRestaurant());
            if (updatedBooking.getUser() != null)
                existing.setUser(updatedBooking.getUser());
            return dineBookingRepository.save(existing);
        }).orElse(null);
    }

    public boolean deleteDineBooking(Long id) {
        if (dineBookingRepository.existsById(id)) {
            dineBookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
