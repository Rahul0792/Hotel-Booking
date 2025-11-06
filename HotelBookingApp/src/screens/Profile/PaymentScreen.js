import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";

export default class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.route.params?.totalAmount || 0,
      paymentMethod: "Credit Card",
      cardNumber: "",
      cardHolder: "",
      loading: false,
    };
  }

  handlePayment = async () => {
    const { amount, paymentMethod, cardNumber, cardHolder } = this.state;

    if (!cardNumber || !cardHolder) {
      Alert.alert("Incomplete Details", "Please fill in all payment fields.");
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await fetch("http://10.0.2.2:8080/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          method: paymentMethod,
          cardNumber,
          cardHolder,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // simulate success
        Alert.alert("Success", "Payment completed successfully!", [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("MainTabs"),
          },
        ]);
      } else {
        Alert.alert("Payment Failed", "There was an issue processing your payment.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      Alert.alert("Error", "Something went wrong while processing payment.");
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { amount, paymentMethod, loading, cardNumber, cardHolder } = this.state;

    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Processing Payment...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>💳 Payment</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.amount}>₹{amount}</Text>

          <Text style={[styles.label, { marginTop: 10 }]}>Payment Method:</Text>
          <Text style={styles.method}>{paymentMethod}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={cardHolder}
            onChangeText={(text) => this.setState({ cardHolder: text })}
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
            maxLength={16}
            value={cardNumber}
            onChangeText={(text) => this.setState({ cardNumber: text })}
          />
        </View>

        <TouchableOpacity style={styles.payButton} onPress={this.handlePayment}>
          <Text style={styles.payButtonText}>Pay ₹{amount}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  summaryCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 4,
  },
  method: {
    fontSize: 18,
    color: "#333",
    marginTop: 4,
  },
  inputContainer: {
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  payButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
