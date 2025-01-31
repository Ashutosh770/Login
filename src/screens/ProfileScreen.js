import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../config/firebase";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

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
        <>
        <View style={styles.card}>
        <Text style={styles.detail}>Email: {user.email}</Text>
        <Text style={styles.detail}>User ID: {user.uid}</Text>
        </View>
          
        </>
      ) : (
        <Text style={styles.error}>No user found</Text>
      )}
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
    marginBottom: 15,
    marginHorizontal: 20,},
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
});

export default ProfileScreen;
