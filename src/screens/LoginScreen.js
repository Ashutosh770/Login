import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Attempting to log in with email:", email);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("HomeTabs"); // Redirect to Bottom Tab Navigator
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#bbb"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#bbb"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.btnText}>Go to Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e056fd",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#535c68",
    fontSize: 18,
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    backgroundColor: "#2c3e50",
    marginBottom: 16,
  },
  primaryBtn: {
    width: "90%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#000",
    marginTop: 10,
  },
  secondaryBtn: {
    width: "90%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#333",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
