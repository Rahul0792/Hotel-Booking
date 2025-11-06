import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/Common/Button";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Hotel & Dine Booking</Text>

      <Button
        title="Book a Hotel"
        onPress={() => navigation.navigate("Hotels")} // ✅ Correct route name
      />

      <Button
        title="Find Restaurants"
        onPress={() => navigation.navigate("Dine")} // ✅ For DineListScreen
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
});

export default HomeScreen;
