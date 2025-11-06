// src/screens/Hotel/HotelDetailScreen.js
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import API from "../../api/api"; // Axios instance for API calls
import Header from "../../components/Common/Header";

export default class HotelDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: props.route.params?.hotel || null,
      loading: !props.route.params?.hotel, // Load from API if not passed
    };
  }

  componentDidMount() {
    const { hotel } = this.state;
    if (!hotel) {
      const hotelId = this.props.route.params?.hotelId;
      if (hotelId) {
        this.fetchHotelDetails(hotelId);
      }
    }
  }

  // ✅ Fetch hotel details from backend
  fetchHotelDetails = async (id) => {
    try {
      const response = await API.get(`/hotels/${id}`);
      this.setState({ hotel: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      this.setState({ loading: false });
    }
  };

  handleBookNow = () => {
    const { hotel } = this.state;
    this.props.navigation.navigate("BookingScreen", { hotel });
  };

  render() {
    const { hotel, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      );
    }

    if (!hotel) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Hotel details not found.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Header title={hotel.name} />
        <Image source={{ uri: hotel.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name}>{hotel.name}</Text>
          <Text style={styles.location}>{hotel.location}</Text>
          <Text style={styles.price}>₹{hotel.price} / night</Text>
          <Text style={styles.rating}>⭐ {hotel.rating}</Text>

          {hotel.description && (
            <Text style={styles.description}>{hotel.description}</Text>
          )}

          <TouchableOpacity style={styles.bookButton} onPress={this.handleBookNow}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    color: "#1E90FF",
    marginVertical: 6,
  },
  rating: {
    fontSize: 16,
    color: "#FF9800",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginTop: 10,
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
