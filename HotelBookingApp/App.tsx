// App.js
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import { BookingProvider } from "./src/context/BookingContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <BookingProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </BookingProvider>
      </AuthProvider>
    );
  }
}
