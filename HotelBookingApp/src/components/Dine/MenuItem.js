import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const MenuItem = ({ item, quantity = 0, onIncrease, onDecrease }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{item.price}</Text>

          {quantity > 0 ? (
            <View style={styles.counterBox}>
              <TouchableOpacity onPress={onDecrease} style={styles.counterButton}>
                <Text style={styles.counterText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={onIncrease} style={styles.counterButton}>
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={onIncrease} style={styles.addButton}>
              <Text style={styles.addText}>ADD</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 12 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  description: { fontSize: 14, color: "#666", marginTop: 4 },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: { fontSize: 16, fontWeight: "bold", color: "#2E8B57" },
  addButton: { backgroundColor: "#ff6347", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  addText: { color: "#fff", fontWeight: "bold" },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ff6347",
    borderRadius: 8,
    overflow: "hidden",
  },
  counterButton: { backgroundColor: "#ff6347", paddingHorizontal: 10, paddingVertical: 4 },
  counterText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  quantityText: { fontSize: 16, fontWeight: "bold", color: "#333", paddingHorizontal: 10 },
});

export default MenuItem;
