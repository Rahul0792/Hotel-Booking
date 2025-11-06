// src/navigation/AppNavigator.js
import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MainStackNavigator from "./MainStackNavigator";
import { AuthContext } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default class AppNavigator extends Component {
  static contextType = AuthContext;

  render() {
    const { user } = this.context;

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainStackNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    );
  }
}
