import React, { useState } from "react";
import { View, Text, TextInput, Button,TouchableOpacity, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Registered successfully!');
      navigation.navigate('Login'); // Redirect to Login Screen
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
   <View style={styles.container}>
         <Text style={styles.logoText}>Register</Text>
         
         <TextInput
           style={styles.input}
           placeholder="Name"
           placeholderTextColor="#bbb"
           value={username}
           onChangeText={setUsername}
         />
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
   
         <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister}>
           <Text style={styles.btnText}>Register</Text>
         </TouchableOpacity>
   
         <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate("Login")}>
           <Text style={styles.btnText}>Go to Login</Text>
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

export default RegisterScreen;
