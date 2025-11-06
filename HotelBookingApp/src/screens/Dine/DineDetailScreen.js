import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";

export default class DineDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      guests: "",
      date: "",
      time: "",
      loading: false,
    };
  }

  handleBooking = async () => {
    const { name, email, guests, date, time } = this.state;
    const { dine } = this.props.route.params;

    if (!name || !email || !guests || !date || !time) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    this.setState({ loading: true });

    try {
      await axios.post("/dine_bookings", {
        name,
        email,
        guests,
        check_in: date,
        check_out: time,
        restaurant_name: dine.name,
        location: dine.location,
      });

      Alert.alert("Success", "Your table has been booked successfully!");
      this.props.navigation.navigate("MyDineBookings");
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert("Error", "Failed to book the table. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { dine } = this.props.route.params;
    const { name, email, guests, date, time, loading } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: dine.image }} style={styles.image} />
        <Text style={styles.title}>{dine.name}</Text>
        <Text style={styles.location}>📍 {dine.location}</Text>
        <Text style={styles.cuisine}>🍴 Cuisine: {dine.cuisine}</Text>
        <Text style={styles.rating}>⭐ {dine.rating}</Text>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Book Your Table</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => this.setState({ email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Guests"
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
            style={[styles.button, loading && { backgroundColor: "#ccc" }]}
            onPress={this.handleBooking}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Booking..." : "Book Table"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
    color: "#222",
  },
  location: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginVertical: 5,
  },
  cuisine: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  rating: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  form: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
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
