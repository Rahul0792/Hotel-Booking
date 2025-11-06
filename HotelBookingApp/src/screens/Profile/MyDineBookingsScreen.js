import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default class MyDineBookingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dineBookings: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchDineBookings();
  }

  // Fetch all dine bookings from backend
  async fetchDineBookings() {
    try {
      const response = await axios.get("http://10.0.2.2:8080/api/dine_bookings");
      this.setState({ dineBookings: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching dine bookings:", error);
      this.setState({ error: "Failed to load dine bookings", loading: false });
    }
  }

  renderBooking = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>🍽️ {item.name}</Text>
      <Text style={styles.detail}>Email: {item.email}</Text>
      <Text style={styles.detail}>Guests: {item.guests}</Text>
      <Text style={styles.detail}>Room Type: {item.room_type}</Text>
      <Text style={styles.detail}>Check-in: {item.check_in}</Text>
      <Text style={styles.detail}>Check-out: {item.check_out}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => this.handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Cancel Booking</Text>
      </TouchableOpacity>
    </View>
  );

  // Delete booking from backend
  async handleDelete(id) {
    try {
      await axios.delete(`http://10.0.2.2:8080/api/dine_bookings/${id}`);
      this.setState((prevState) => ({
        dineBookings: prevState.dineBookings.filter((b) => b.id !== id),
      }));
      alert("Booking canceled successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to cancel booking!");
    }
  }

  render() {
    const { dineBookings, loading, error } = this.state;

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>My Dine Bookings</Text>
        {dineBookings.length === 0 ? (
          <Text style={styles.noBookings}>No dine bookings found.</Text>
        ) : (
          <FlatList
            data={dineBookings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={this.renderBooking}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#333" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#222" },
  detail: { fontSize: 15, color: "#555", marginTop: 2 },
  error: { color: "red", fontSize: 16 },
  noBookings: { fontSize: 16, color: "#777", textAlign: "center", marginTop: 50 },
  deleteButton: {
    backgroundColor: "#FF5252",
    padding: 8,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});

