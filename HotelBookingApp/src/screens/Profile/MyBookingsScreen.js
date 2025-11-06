// src/screens/Profile/MyBookingsScreen.js
import React, { Component } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default class MyBookingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchBookings();
  }

  // ✅ Fetch hotel bookings from backend
  fetchBookings = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8080/api/bookings");
      this.setState({ bookings: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      Alert.alert("Error", "Unable to fetch bookings.");
      this.setState({ loading: false });
    }
  };

  // ✅ Delete a booking by ID
  handleDelete = (id) => {
    Alert.alert("Delete Booking", "Are you sure you want to delete this booking?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`http://10.0.2.2:8080/api/bookings/${id}`);
            this.setState((prev) => ({
              bookings: prev.bookings.filter((b) => b.id !== id),
            }));
            Alert.alert("Deleted!", "Booking removed successfully.");
          } catch (error) {
            console.error("Error deleting booking:", error);
            Alert.alert("Error", "Failed to delete booking.");
          }
        },
      },
    ]);
  };

  render() {
    const { bookings, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      );
    }

    if (bookings.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.noBookings}>No hotel bookings found.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>My Hotel Bookings</Text>

        {bookings.map((booking) => (
          <View key={booking.id} style={styles.bookingItemContainer}>
            <Text style={styles.label}>🏨 Hotel:</Text>
            <Text style={styles.value}>{booking.hotelName || booking.hotel?.name}</Text>

            <Text style={styles.label}>📍 Location:</Text>
            <Text style={styles.value}>{booking.location}</Text>

            <Text style={styles.label}>📅 Check-in:</Text>
            <Text style={styles.value}>{booking.checkIn}</Text>

            <Text style={styles.label}>📅 Check-out:</Text>
            <Text style={styles.value}>{booking.checkOut}</Text>

            <Text style={styles.label}>👤 Name:</Text>
            <Text style={styles.value}>{booking.name}</Text>

            <Text style={styles.label}>📞 Email:</Text>
            <Text style={styles.value}>{booking.email}</Text>

            <Text style={styles.label}>🧍 Guests:</Text>
            <Text style={styles.value}>{booking.guests}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => this.handleDelete(booking.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
    textAlign: "center",
  },
  bookingItemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  value: {
    fontSize: 15,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#FF4C4C",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noBookings: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    color: "#555",
    fontSize: 16,
  },
});
