import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

export default class DineListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchRestaurants();
  }

  fetchRestaurants = async () => {
    try {
      const response = await fetch("/restaurants");
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();
      this.setState({ restaurants: data, loading: false });
    } catch (error) {
      Alert.alert("⚠️ Error", error.message);
      this.setState({ loading: false });
    }
  };

  handleRestaurantPress = (restaurant) => {
    this.props.navigation.navigate("DineDetailScreen", { restaurant });
  };

  renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => this.handleRestaurantPress(item)}
    >
      <Image
        source={{
          uri:
            item.image ||
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
        <Text style={styles.rating}>⭐ {item.rating || "4.5"}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { restaurants, loading } = this.state;

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={styles.loadingText}>Loading restaurants...</Text>
        </View>
      );
    }

    if (restaurants.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No restaurants available.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Available Restaurants</Text>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={this.renderRestaurantItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: "#ff9800",
    marginTop: 2,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
