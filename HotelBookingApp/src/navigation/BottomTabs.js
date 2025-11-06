// src/navigation/BottomTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import HotelListScreen from "../screens/Hotel/HotelListScreen";
import DineListScreen from "../screens/Dine/DineListScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

import HomeIcon from "../../assets/icons/home.png";
import HotelIcon from "../../assets/icons/hotel.png";
import DineIcon from "../../assets/icons/dine.png";
import ProfileIcon from "../../assets/icons/profile.png";

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { height: 60, paddingBottom: 5, paddingTop: 5 },
      tabBarIcon: () => {
        let iconSource;

        switch (route.name) {
          case "Home":
            iconSource = HotelIcon;
            break;
          case "Hotels":
            iconSource = HotelIcon;
            break;
          case "Dine":
            iconSource = DineIcon;
            break;
          case "Profile":
            iconSource = ProfileIcon;
            break;
          default:
            iconSource = HomeIcon;
        }

        return <Image source={iconSource} style={styles.icon} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Hotels" component={HotelListScreen} />
    <Tab.Screen name="Dine" component={DineListScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default BottomTabs;
