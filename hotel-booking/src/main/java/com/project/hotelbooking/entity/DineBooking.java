package com.project.hotelbooking.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "dine_bookings")
@Getter
@Setter
public class DineBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // ✅ make sure this points to com.project.hotelbooking.entity.User

    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    @Column(nullable = false)
    private String bookingDate;

    @Column(nullable = false)
    private int numberOfPeople;
}
