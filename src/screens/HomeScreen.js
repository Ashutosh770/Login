import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useCart } from "../components/CartContext"; // Import Cart Context

const HomeScreen = ({ navigation }) => {
  const { cart, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (page) => {
    if (!hasMore && page > 1) return;

    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
      const data = await response.json();

      if (data.products.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { productId: item })}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, cart.some((p) => p.id === item.id) && styles.addedButton]}
              onPress={() => addToCart(item)}
              disabled={cart.some((p) => p.id === item.id)}
            >
              <Text style={styles.buttonText}>
                {cart.some((p) => p.id === item.id) ? "Added" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        estimatedItemSize={327}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Cart Button */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("CartScreen")}
      >
        <Text style={styles.buttonText}>Go to Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#fff",
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
  image: {
    width: width * 0.5,
    height: 150,
    resizeMode: "contain",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#ff6347",
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#ff6347",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addedButton: {
    backgroundColor: "#28a745",
  },
  cartButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
