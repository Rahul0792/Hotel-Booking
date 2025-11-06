// src/components/Hotel/RoomDetailCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const RoomDetailCard = ({ room, onBook }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: room.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.type}>{room.type}</Text>
        <Text style={styles.description}>{room.description}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{room.price}/night</Text>
          <TouchableOpacity style={styles.button} onPress={onBook}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  type: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
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
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E8B57",
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RoomDetailCard;
