import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const SettingsScreen = ({ navigation }) => {
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <View >
      <Text style={styles.card}>Empty</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
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
    marginBottom: 15,
    marginHorizontal: 20,
  },
});


export default SettingsScreen;