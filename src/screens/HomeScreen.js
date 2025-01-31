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

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetail(page); // Fetch data when page changes
  }, [page]);

  const fetchProductDetail = async (page) => {
    if (!hasMore && page > 1) return; // Exit if no more data is available

    setLoading(true); // Start loading

    try {
      const limit = 10;
      const offset = (page - 1) * limit; // Calculate offset based on page number
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setProducts((prevProducts) => {
          // Filter out duplicates before appending new data
          const newProducts = data.filter(
            (newItem) => !prevProducts.some((prevItem) => prevItem.id === newItem.id)
          );
          return [...prevProducts, ...newProducts];
        });
      } else {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleNextPage = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  const handlePreviousPage = () => {
    if (page > 1 && !loading) {
      setPage((prevPage) => prevPage - 1); // Decrement page number
    }
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
  data={products}
  keyExtractor={(item) => `${item.id}-${page}`} // Combine id and page number to ensure uniqueness
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { productId: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  )}
  estimatedItemSize={327} // Add estimatedItemSize
  contentContainerStyle={{ paddingBottom: 20 }}
/>
      {/* Pagination Buttons */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.button, page === 1 && styles.disabledButton]}
          onPress={handlePreviousPage}
          disabled={page === 1 || loading}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>Page {page}</Text>

        <TouchableOpacity
          style={[styles.button, !hasMore && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={!hasMore || loading}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ff6347" />
        </View>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  image: {
    width: width * 0.5,
    height: 200, // Adjusted height for better display
    marginBottom: 10,
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
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "#ff6347",
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;