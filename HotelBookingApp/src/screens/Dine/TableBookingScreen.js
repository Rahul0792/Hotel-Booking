// src/screens/Dine/TableBookingScreen.js
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

export default class TableBookingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      guests: "",
      date: "",
      time: "",
      loading: false,
    };
  }

  handleBooking = async () => {
    const { name, phone, guests, date, time } = this.state;
    const { restaurant } = this.props.route.params;

    if (!name || !phone || !guests || !date || !time) {
      Alert.alert("Validation Error", "Please fill in all fields before booking.");
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await axios.post("/dine_bookings", {
        name,
        phone,
        guests,
        check_in: date,
        check_out: time,
        restaurant_name: restaurant.name,
        location: restaurant.location,
      });

      Alert.alert("Success", "Table booked successfully!");
      this.props.navigation.navigate("MyDineBookingsScreen");
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("Error", "Failed to book the table. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { restaurant } = this.props.route.params;
    const { name, phone, guests, date, time, loading } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Book a Table at {restaurant.name}</Text>
        <Text style={styles.subText}>📍 {restaurant.location}</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => this.setState({ phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Guests (e.g. 4)"
            keyboardType="numeric"
            value={guests}
            onChangeText={(text) => this.setState({ guests: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            value={date}
            onChangeText={(text) => this.setState({ date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Time (HH:MM)"
            value={time}
            onChangeText={(text) => this.setState({ time: text })}
          />

          <TouchableOpacity
            style={[styles.button, loading && { backgroundColor: "#aaa" }]}
            onPress={this.handleBooking}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Booking..." : "Confirm Booking"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginVertical: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
