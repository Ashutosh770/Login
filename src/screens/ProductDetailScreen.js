import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;

  // Fetch product details using the productId (or from the state, if passed already)
  const product = productId; // Assuming you pass the full product data from HomeScreen

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6347",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ProductDetailScreen;
