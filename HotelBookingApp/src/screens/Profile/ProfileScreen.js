import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        this.setState({ user: parsedUser }, () => this.fetchUserData(parsedUser.id));
      } else {
        this.setState({ loading: false });
        Alert.alert("Error", "User not found. Please log in again.");
      }
    } catch (error) {
      console.error("Error fetching user from storage:", error);
      this.setState({ loading: false });
    }
  }

  // Fetch updated user info from backend
  fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/api/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        this.setState({ user: data, loading: false });
      } else {
        this.setState({ loading: false });
        Alert.alert("Error", "Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      this.setState({ loading: false });
    }
  };

  handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    Alert.alert("Logged Out", "You have been logged out successfully.");
    this.props.navigation.replace("Login");
  };

  render() {
    const { user, loading } = this.state;
    const { navigation } = this.props;

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      );
    }

    if (!user) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>User data not found. Please log in.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri:
                user.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("MyBookings")}
          >
            <Text style={styles.optionText}>🏨 My Hotel Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("MyDineBookings")}
          >
            <Text style={styles.optionText}>🍽️ My Dine Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("CartScreen")}
          >
            <Text style={styles.optionText}>🛒 My Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate("PaymentScreen")}
          >
            <Text style={styles.optionText}>💳 Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, { backgroundColor: "#FF5252" }]}
            onPress={this.handleLogout}
          >
            <Text style={[styles.optionText, { color: "#fff" }]}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "#f00",
    textAlign: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  optionsContainer: {
    width: "100%",
  },
  optionButton: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
