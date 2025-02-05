import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../components/CartContext";

const CartScreen = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold",
    color: "#555",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
    paddingLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#ff6347",
    marginBottom: 5,
  },
  removeButton: {
    padding: 8,
    backgroundColor: "#dc3545",
    borderRadius: 5,
    alignItems: "center",
    width: 100,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CartScreen;
