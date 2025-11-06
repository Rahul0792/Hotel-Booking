// src/screens/Hotel/BookingScreen.js
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import API from "../../api/api"; // Axios instance
import Header from "../../components/Common/Header";

export default class BookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: props.route.params?.hotel || null,
      name: "",
      email: "",
      guests: "",
      checkIn: "",
      checkOut: "",
      loading: false,
    };
  }

  // ✅ Handle booking submission
  handleBooking = async () => {
    const { hotel, name, email, guests, checkIn, checkOut } = this.state;

    if (!name || !email || !guests || !checkIn || !checkOut) {
      Alert.alert("Missing Info", "Please fill all fields before booking.");
      return;
    }

    try {
      this.setState({ loading: true });

      const bookingData = {
        name,
        email,
        guests,
        check_in: checkIn,
        check_out: checkOut,
        hotel_id: hotel.id,
      };

      // ✅ API call to backend
      const response = await API.post("/hotel-bookings", bookingData);

      if (response.status === 201 || response.status === 200) {
        Alert.alert("Booking Successful!", "Your room has been booked.", [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("MyBookingsScreen"),
          },
        ]);
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("Error", "Unable to complete booking. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { hotel, name, email, guests, checkIn, checkOut, loading } = this.state;

    if (!hotel) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>No hotel details available.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Header title="Book Hotel" />
        <View style={styles.card}>
          <Text style={styles.hotelName}>{hotel.name}</Text>
          <Text style={styles.hotelDetails}>{hotel.location}</Text>
          <Text style={styles.hotelDetails}>₹{hotel.price} / night</Text>
          <Text style={styles.hotelDetails}>⭐ {hotel.rating}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => this.setState({ name: text })}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => this.setState({ email: text })}
          />

          <Text style={styles.label}>Guests</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of guests"
            keyboardType="numeric"
            value={guests}
            onChangeText={(text) => this.setState({ guests: text })}
          />

          <Text style={styles.label}>Check-In Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={checkIn}
            onChangeText={(text) => this.setState({ checkIn: text })}
          />

          <Text style={styles.label}>Check-Out Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={checkOut}
            onChangeText={(text) => this.setState({ checkOut: text })}
          />

          <TouchableOpacity
            style={styles.bookButton}
            onPress={this.handleBooking}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.bookButtonText}>Confirm Booking</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 3,
  },
  hotelName: { fontSize: 20, fontWeight: "bold", color: "#222" },
  hotelDetails: { fontSize: 16, color: "#555", marginTop: 4 },
  form: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  bookButton: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#999",
  },
});
