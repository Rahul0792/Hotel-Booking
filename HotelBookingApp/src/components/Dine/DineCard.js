import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const DineCard = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.location}>{restaurant.location}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#FFA500",
  },
  cuisine: {
    fontSize: 14,
    color: "#2E8B57",
    fontWeight: "bold",
  },
});

export default DineCard;
