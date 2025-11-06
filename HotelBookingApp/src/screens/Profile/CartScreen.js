import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      loading: true,
      totalAmount: 0,
    };
  }

  componentDidMount() {
    this.fetchCartItems();
  }

  // Fetch cart items from backend
  fetchCartItems = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/api/cart");
      if (response.ok) {
        const data = await response.json();
        const total = data.reduce((sum, item) => sum + item.price, 0);
        this.setState({ cartItems: data, totalAmount: total, loading: false });
      } else {
        Alert.alert("Error", "Failed to fetch cart items");
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      Alert.alert("Error", "Something went wrong while fetching cart items");
      this.setState({ loading: false });
    }
  };

  // Remove item from cart
  handleRemoveItem = async (itemId) => {
    Alert.alert("Confirm", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(
              `http://10.0.2.2:8080/api/cart/${itemId}`,
              { method: "DELETE" }
            );

            if (response.ok) {
              this.setState((prevState) => {
                const updatedCart = prevState.cartItems.filter(
                  (item) => item.id !== itemId
                );
                const newTotal = updatedCart.reduce(
                  (sum, item) => sum + item.price,
                  0
                );
                return { cartItems: updatedCart, totalAmount: newTotal };
              });
              Alert.alert("Removed", "Item removed from cart");
            } else {
              Alert.alert("Error", "Failed to remove item from cart");
            }
          } catch (error) {
            console.error("Error removing cart item:", error);
            Alert.alert("Error", "Something went wrong while removing item");
          }
        },
      },
    ]);
  };

  renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{
          uri:
            item.image ||
            "https://cdn-icons-png.flaticon.com/512/3081/3081840.png",
        }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => this.handleRemoveItem(item.id)}
      >
        <Text style={styles.removeButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  handleCheckout = () => {
    const { navigation } = this.props;
    const { totalAmount } = this.state;

    if (totalAmount <= 0) {
      Alert.alert("Cart Empty", "Add items before proceeding to payment.");
      return;
    }

    navigation.navigate("PaymentScreen", { totalAmount });
  };

  render() {
    const { loading, cartItems, totalAmount } = this.state;

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading your cart...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>🛒 My Cart</Text>

        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={this.renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        )}

        {cartItems.length > 0 && (
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ₹{totalAmount}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={this.handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#222",
  },
  listContainer: {
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginVertical: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 22,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#777",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
