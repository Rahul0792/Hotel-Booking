// src/screens/Hotel/HotelListScreen.js
import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import API from "../../api/api"; // Axios instance for API calls
import Header from "../../components/Common/Header";

export default class HotelListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchHotels();
  }

  // ✅ Fetch hotels from backend API
  fetchHotels = async () => {
    try {
      const response = await API.get("/hotels");
      this.setState({ hotels: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching hotels:", error);
      this.setState({ loading: false });
    }
  };

  navigateToDetails = (hotel) => {
    this.props.navigation.navigate("HotelDetail", { hotel });
  };

  renderHotelCard = (hotel) => (
    <TouchableOpacity
      key={hotel.id}
      style={styles.card}
      onPress={() => this.navigateToDetails(hotel)}
    >
      <Image source={{ uri: hotel.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{hotel.name}</Text>
        <Text style={styles.location}>{hotel.location}</Text>
        <Text style={styles.price}>₹{hotel.price} / night</Text>
        <Text style={styles.rating}>⭐ {hotel.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { hotels, loading } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Header title="Available Hotels" />
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
        ) : hotels.length === 0 ? (
          <Text style={styles.noData}>No hotels found.</Text>
        ) : (
          hotels.map(this.renderHotelCard)
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    margin: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    color: "#666",
  },
  price: {
    marginTop: 5,
    color: "#333",
  },
  rating: {
    marginTop: 5,
    color: "#ff9800",
  },
  noData: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
  },
});
