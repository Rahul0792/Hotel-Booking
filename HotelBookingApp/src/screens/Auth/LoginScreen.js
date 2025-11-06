import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";  // ✅ Import this
import InputField from "../../components/Common/InputField";
import Button from "../../components/Common/Button";
import { AuthContext } from "../../context/AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation(); // ✅ Initialize navigation

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { login } = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    const success = login(email, password);
    if (!success) {
      Alert.alert("Error", "Invalid email or password");
      return;
    }

    // ✅ Do NOT navigate manually — AppNavigator will handle redirect automatically
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <InputField label="Email" placeholder="Enter email" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <InputField label="Password" placeholder="Enter password" value={password} onChangeText={setPassword} secureTextEntry />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <Button title="Login" onPress={handleLogin} style={styles.button} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signup}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
  button: { marginTop: 20 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
  footerText: { color: "#666" },
  signup: { color: "#1E90FF", fontWeight: "bold" },
  error: { color: "red", fontSize: 12, marginTop: 2, marginBottom: 5 },
});

export default LoginScreen;
