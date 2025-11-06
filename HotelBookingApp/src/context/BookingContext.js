import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [dineBookings, setDineBookings] = useState([]);

  const addHotelBooking = (booking) => setHotelBookings((prev) => [...prev, booking]);
  const addDineBooking = (booking) => setDineBookings((prev) => [...prev, booking]);

  return (
    <BookingContext.Provider
      value={{
        hotelBookings, // ✅ make sure these are provided
        dineBookings,
        addHotelBooking,
        addDineBooking,
        setHotelBookings,
        setDineBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
