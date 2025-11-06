package com.project.hotelbooking.repository;

import com.project.hotelbooking.entity.DineBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DineBookingRepository extends JpaRepository<DineBooking, Long> {
    List<DineBooking> findByUserId(Long userId);
}