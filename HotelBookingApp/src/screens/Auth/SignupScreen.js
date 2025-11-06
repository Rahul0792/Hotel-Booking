import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import InputField from "../../components/Common/InputField";
import Button from "../../components/Common/Button";
import { AuthContext } from "../../context/AuthContext";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { signup } = useContext(AuthContext);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;

    const success = signup({ name, email, password });
    if (!success) {
      Alert.alert("Error", "Email already exists!");
      return;
    }

    Alert.alert("Success", "Account created successfully!", [
      { text: "Go to Login", onPress: () => navigation.navigate("Login") },
      { text: "Stay", style: "cancel" },
    ]);

    setName(""); setEmail(""); setPassword(""); setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <InputField label="Name" placeholder="Enter name" value={name} onChangeText={setName} />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <InputField label="Email" placeholder="Enter email" value={email} onChangeText={setEmail} />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <InputField label="Password" placeholder="Enter password" value={password} onChangeText={setPassword} secureTextEntry />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <Button title="Sign Up" onPress={handleSignup} style={styles.button} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signup}> Login</Text>
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

export default SignupScreen;
