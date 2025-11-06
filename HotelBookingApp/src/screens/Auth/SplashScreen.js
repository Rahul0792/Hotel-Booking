// src/screens/Auth/SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); // Must match name in AuthNavigator
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require("../../../assets/icons/hotel.png")} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.title}>Hotel & Dine Booking</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#fff" 
  },
  logo: { 
    width: 250,  // bigger width
    height: 250, // bigger height
    marginBottom: 30 
  },
  title: { 
    fontSize: 36,       // bigger text
    fontWeight: "bold", 
    color: "#1E90FF", 
    textAlign: "center" 
  },
});

export default SplashScreen;
