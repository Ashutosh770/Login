import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Success", "Logged out successfully!");
      navigation.replace("Login"); // Redirect to Login screen after logout
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Logout" onPress={handleLogout} color="#ff4d4d" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SettingsScreen;
