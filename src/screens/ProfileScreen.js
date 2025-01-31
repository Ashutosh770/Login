import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); // Use the useNavigation hook

  const handleLogout = async () => {
    try {
      // Add a confirmation dialog before logging out
      Alert.alert(
        "Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              await signOut(auth);
              Alert.alert("Success", "Logged out successfully!");
              navigation.replace("Login"); // Redirect to Login screen after logout
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <View style={styles.card}>
          <Text style={styles.detail}>Email: {user.email}</Text>
          <Text style={styles.detail}>User ID: {user.uid}</Text>
        </View>
      ) : (
        <Text style={styles.error}>No user found. Please log in.</Text>
      )}

      <View style={styles.settingsContainer}>
        <Text style={styles.title}>Settings</Text>
        <Button title="Logout" onPress={handleLogout} color="#ff4d4d" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  settingsContainer: {
    marginTop: 20,
  },
});

export default ProfileScreen;