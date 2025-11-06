// src/navigation/MainStackNavigator.js
import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";

// Hotel Screens
import HotelListScreen from "../screens/Hotel/HotelListScreen";
import HotelDetailScreen from "../screens/Hotel/HotelDetailScreen";
import BookingScreen from "../screens/Hotel/BookingScreen";

// Dine Screens
import DineListScreen from "../screens/Dine/DineListScreen";
import DineDetailScreen from "../screens/Dine/DineDetailScreen";
import TableBookingScreen from "../screens/Dine/TableBookingScreen";

// Profile Screens
import ProfileScreen from "../screens/Profile/ProfileScreen";
import MyBookingsScreen from "../screens/Profile/MyBookingsScreen";
import MyDineBookingsScreen from "../screens/Profile/MyDineBookingsScreen";
import CartScreen from "../screens/Profile/CartScreen";
import PaymentScreen from "../screens/Profile/PaymentScreen";

const Stack = createNativeStackNavigator();

export default class MainStackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="HotelList" component={HotelListScreen} />
        <Stack.Screen name="HotelDetail" component={HotelDetailScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="DineList" component={DineListScreen} />
        <Stack.Screen name="DineDetail" component={DineDetailScreen} />
        <Stack.Screen name="TableBooking" component={TableBookingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="MyDineBookings" component={MyDineBookingsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    );
  }
}
